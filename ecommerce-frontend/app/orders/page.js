"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/lib/api";
import Table from "@/components/Table";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  async function loadOrders() {
    const data = await getOrders();
    setOrders(data);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Orders</h1>

      <Table
        columns={["id", "customer_id", "total_price"]}
        data={orders}
      />
    </div>
  );
}