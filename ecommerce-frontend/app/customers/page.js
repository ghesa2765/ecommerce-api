"use client";

import { useEffect, useState } from "react";
import { getCustomers, createCustomer } from "@/lib/api";
import Table from "@/components/Table";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCustomers() {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await createCustomer({ name });
    setName("");
    loadCustomers();
  }

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1 className="text-2xl font-bold">Customers</h1>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          className="border p-2"
          placeholder="Customer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4 py-2">
          Add
        </button>
      </form>

      <Table columns={["id", "name"]} data={customers} />
    </div>
  );
}