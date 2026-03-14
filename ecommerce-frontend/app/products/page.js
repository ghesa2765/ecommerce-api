"use client";

import { useEffect, useState } from "react";
import { getProducts, createProduct } from "@/lib/api";
import Table from "@/components/Table";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function loadProducts() {
    const data = await getProducts();
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await createProduct({
      name,
      price: Number(price),
    });

    setName("");
    setPrice("");
    loadProducts();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Products</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          className="border p-2"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4">
          Add
        </button>
      </form>

      <Table columns={["id", "name", "price"]} data={products} />
    </div>
  );
}