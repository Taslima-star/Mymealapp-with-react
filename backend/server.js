import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db.js";

const app = express();

// Middleware
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
  const { email, password, name, phone } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const sql = "INSERT INTO users (email, password, ) VALUES (?,?)";
  db.query(sql, [email, password,], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User added successfully!", id: results.insertId });
  });
});

// ============================
// Start the server
// ============================
app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
