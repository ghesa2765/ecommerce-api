"use client";

import { useState } from "react";
import { createOrder } from "@/lib/api";

export default function CreateOrder() {
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await createOrder({
      customer_id: Number(customerId),
      product_id: Number(productId),
      qty: Number(qty),
    });

    alert("Order created");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Create Order</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4 w-64">
        <input
          className="border p-2"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <input
          className="border p-2"
          placeholder="Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />

        <button className="bg-green-500 text-white p-2">
          Create
        </button>
      </form>
    </div>
  );
}