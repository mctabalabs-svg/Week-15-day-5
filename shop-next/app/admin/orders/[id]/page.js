import pool, { queryWithRetry } from "@/lib/db";
import { notFound } from "next/navigation";
import { updateStatus } from "./updateStatus";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function AdminOrderPage({ params }) {
  const { id } = await params;

  if (!UUID_REGEX.test(id)) notFound();

  const { rows } = await queryWithRetry("SELECT * FROM orders WHERE id = $1", [id]);
  const order = rows[0];
  if (!order) notFound();

  const { rows: items } = await queryWithRetry(
    "SELECT oi.*, p.name FROM order_items oi JOIN products p ON p.id = oi.product_id WHERE oi.order_id = $1",
    [id]
  );

  return (
    <main>
      <h1>Order {order.id.slice(0, 8)}</h1>
      <p>
        <strong>Customer:</strong> {order.customer_name}
      </p>
      <p>
        <strong>Email:</strong> {order.customer_email}
      </p>
      <p>
        <strong>Phone:</strong> {order.customer_phone}
      </p>
      <p>
        <strong>Address:</strong> {order.customer_address}
      </p>
      <p>
        <strong>Total:</strong> KES {(order.total_cents / 100).toLocaleString()}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>

      <form action={updateStatus.bind(null, order.id)}>
        <select name="newStatus" defaultValue={order.status}>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="fulfilled">Fulfilled</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit">Update Status</button>
      </form>

      <h2>Items</h2>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            {i.quantity}x {i.name} — KES {(i.price_cents / 100).toLocaleString()}
          </li>
        ))}
      </ul>
    </main>
  );
}
