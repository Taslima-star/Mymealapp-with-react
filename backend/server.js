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
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ============================
// POST new user
// ============================
app.post("/api/users", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User added successfully!", id: results.insertId });
  });
});

// ============================
// SEND OTP (for login)
// ============================
app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  console.log("Generated OTP:", otp);

  try {
    // Save OTP to DB or memory (simple version below)
    const sql = "UPDATE users SET otp=? WHERE email=?";
    db.query(sql, [otp, email], async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // If user doesn't exist, create one
      if (results.affectedRows === 0) {
        const insert = "INSERT INTO users (email, otp) VALUES (?, ?)";
        db.query(insert, [email, otp]);
      }

      // Send email using Nodemailer
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
  if (!email || !otp)
    return res.status(400).json({ error: "Email and OTP required" });

  const sql = "SELECT * FROM users WHERE email=? AND otp=?";
  db.query(sql, [email, otp], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) {
      res.json({ message: "OTP verified successfully!" });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  });
});

// ============================
// Start the server
// ============================
app.listen(5000, () =>
  console.log("✅ Server running on http://localhost:5000")
);
