const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all customers
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM customers");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET customer by id
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM customers WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ error: "Customer not found" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create customer
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    const [result] = await db.query(
      "INSERT INTO customers (name,email) VALUES (?,?)",
      [name, email]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      email
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE customer
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM customers WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Customer not found" });

    res.json({ message: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;