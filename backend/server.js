import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import db from "./db.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// GET all users
// ============================
app.get("/api/users", (req, res) => {
  db.query("SELECT id, name, email, phone, created_at FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ============================
// POST new user (signup)
// ============================
app.post("/api/users", (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  const sql = "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)";
  db.query(sql, [name || "", email, password, phone || ""], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User added successfully!", id: results.insertId });
  });
});

// ============================
// GET all plans
// ============================
app.get("/api/plans", (req, res) => {
  db.query("SELECT * FROM plans", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ============================
// GET all meals
// ============================
app.get("/api/meals", (req, res) => {
  db.query("SELECT * FROM meals", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ============================
// POST new order (calculate total_amount)
// ============================
app.post("/api/orders", (req, res) => {
  const { user_id, plan_id, meals } = req.body;
  if (!user_id || !plan_id || !meals || !meals.length)
    return res.status(400).json({ error: "User, plan, and meals required" });

  // Calculate total amount based on meal prices
  const mealIds = meals.map(m => m.meal_id);
  const placeholders = mealIds.map(() => "?").join(",");
  const sql = `SELECT id, price FROM meals WHERE id IN (${placeholders})`;

  db.query(sql, mealIds, (err, mealResults) => {
    if (err) return res.status(500).json({ error: err.message });

    let totalAmount = 0;
    mealResults.forEach(meal => {
      const quantity = meals.find(m => m.meal_id === meal.id)?.quantity || 1;
      totalAmount += meal.price * quantity;
    });

    // Insert order
    const orderSql = "INSERT INTO orders (user_id, plan_id, status, total_amount) VALUES (?, ?, 'pending', ?)";
    db.query(orderSql, [user_id, plan_id, totalAmount], (err2, results) => {
      if (err2) return res.status(500).json({ error: err2.message });

      const orderId = results.insertId;

      // Insert order meals
      const mealSql = "INSERT INTO order_meals (order_id, meal_id, quantity) VALUES ?";
      const mealValues = meals.map(m => [orderId, m.meal_id, m.quantity || 1]);

      db.query(mealSql, [mealValues], (err3) => {
        if (err3) return res.status(500).json({ error: err3.message });
        res.json({ message: "Order placed successfully!", orderId, totalAmount });
      });
    });
  });
});

// ============================
// GET all orders with nested meals
// ============================
app.get("/api/orders", (req, res) => {
  const sql = `
    SELECT o.id AS order_id, o.user_id, o.plan_id, o.status, o.total_amount, 
           om.meal_id, om.quantity, m.name AS meal_name
    FROM orders o
    LEFT JOIN order_meals om ON o.id = om.order_id
    LEFT JOIN meals m ON om.meal_id = m.id
    ORDER BY o.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const orders = [];
    const map = new Map();

    results.forEach(row => {
      if (!map.has(row.order_id)) {
        map.set(row.order_id, {
          order_id: row.order_id,
          user_id: row.user_id,
          plan_id: row.plan_id,
          status: row.status,
          total_amount: row.total_amount,
          meals: [],
        });
        orders.push(map.get(row.order_id));
      }
      if (row.meal_id) {
        map.get(row.order_id).meals.push({
          meal_id: row.meal_id,
          name: row.meal_name,
          quantity: row.quantity,
        });
      }
    });

    res.json(orders);
  });
});

// ============================
// SEND OTP
// ============================
app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  console.log("Generated OTP:", otp);

  try {
    const sql = "UPDATE users SET otp=? WHERE email=?";
    db.query(sql, [otp, email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.affectedRows === 0) {
        const insert = "INSERT INTO users (email, otp) VALUES (?, ?)";
        db.query(insert, [email, otp]);
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "yourgmail@gmail.com",
          pass: "your-app-password",
        },
      });

      await transporter.sendMail({
        from: "My Meals <yourgmail@gmail.com>",
        to: email,
        subject: "Your OTP for My Meals Login",
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
      });

      res.json({ message: "OTP sent successfully!" });
    });
  } catch (err) {
    console.error("OTP send error:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// ============================
// VERIFY OTP
// ============================
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: "Email and OTP required" });

  const sql = "SELECT * FROM users WHERE email=? AND otp=?";
  db.query(sql, [email, otp], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) {
      res.json({ message: "OTP verified successfully!", user: results[0] });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  });
});

// ============================
// Start server
// ============================
app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
