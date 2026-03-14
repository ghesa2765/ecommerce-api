// index.js
const express = require("express");
const cors = require("cors");

const customersRoutes = require("./routes/customers");
const productsRoutes = require("./routes/products");
const ordersRoutes = require("./routes/orders");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/customers", customersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Ecommerce API running" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

if (process.env.NODE_ENV !== "production") {
  const PORT = 3333;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;