import pool from "@/lib/db";
import { notFound } from "next/navigation";

export default async function OrderPage({ params }) {
  const { id } = await params;

  const { rows } = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
  const order = rows[0];
  if (!order) notFound();

  const { rows: items } = await pool.query(
    "SELECT oi.*, p.name FROM order_items oi JOIN products p ON p.id = oi.product_id WHERE oi.order_id = $1",
    [id]
  );

  return (
    <main>
      <h1>Order {order.id.slice(0, 8)}</h1>
      <p>Status: {order.status}</p>
      <p>Total: KES {(order.total_cents / 100).toLocaleString()}</p>
      <ul>
        {items.map((i) => (
          <li key={i.id}>{i.quantity}x {i.name}</li>
        ))}
      </ul>
    </main>
  );
}
