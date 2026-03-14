import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex gap-6">
      
      <Link href="/" className="font-bold">
        Dashboard
      </Link>

      <Link href="/customers">
        Customers
      </Link>

      <Link href="/products">
        Products
      </Link>

      <Link href="/orders">
        Orders
      </Link>

      <Link href="/create-order">
        Create Order
      </Link>

    </nav>
  );
}