const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all orders
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM orders");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET order by id
router.get("/:id", async (req, res) => {
  try {
    const [orders] = await db.query(
      "SELECT * FROM orders WHERE id = ?",
      [req.params.id]
    );

    if (orders.length === 0)
      return res.status(404).json({ error: "Order not found" });

    const [items] = await db.query(
      "SELECT * FROM order_items WHERE order_id = ?",
      [req.params.id]
    );

    res.json({
      ...orders[0],
      items
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST order
router.post("/", async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { customer_id, items } = req.body;

    await connection.beginTransaction();

    let total = 0;

    for (const item of items) {
      const [products] = await connection.query(
        "SELECT * FROM products WHERE id = ?",
        [item.product_id]
      );

      if (products.length === 0)
        throw new Error("Product not found");

      const product = products[0];

      if (product.stock < item.quantity)
        throw new Error("Insufficient stock");

      total += product.price * item.quantity;
    }

    const [orderResult] = await connection.query(
      "INSERT INTO orders (customer_id,total,status) VALUES (?,?,?)",
      [customer_id, total, "placed"]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      const [product] = await connection.query(
        "SELECT price FROM products WHERE id = ?",
        [item.product_id]
      );

      const price = product[0].price;

      await connection.query(
        `INSERT INTO order_items (order_id,product_id,quantity,price)
         VALUES (?,?,?,?)`,
        [orderId, item.product_id, item.quantity, price]
      );

      await connection.query(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [item.quantity, item.product_id]
      );
    }

    await connection.commit();

    res.status(201).json({
      order_id: orderId,
      total
    });

  } catch (err) {
    await connection.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    connection.release();
  }
});

// DELETE order
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM orders WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Order not found" });

    res.json({ message: "Order deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;