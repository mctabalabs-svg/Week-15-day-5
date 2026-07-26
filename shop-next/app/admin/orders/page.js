import pool, { queryWithRetry } from "@/lib/db";

export default async function AdminOrdersPage({ searchParams }) {
  const sp = await searchParams;
  const status = sp.status || "all";
  const limit = 20;
  const offset = parseInt(sp.offset || "0", 10);

  let sql = "SELECT id, customer_name, total_cents, status, created_at FROM orders";
  const queryParams = [];
  if (status !== "all") {
    queryParams.push(status);
    sql += ` WHERE status = $${queryParams.length}`;
  }
  sql += ` ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

  const { rows } = await queryWithRetry(sql, queryParams);

  return (
    <main>
      <h1>Orders</h1>
      <nav style={{ marginBottom: "1rem" }}>
        {["all", "pending", "paid", "fulfilled", "cancelled"].map((s) => (
          <a
            key={s}
            href={`/admin/orders?status=${s}`}
            style={{ marginRight: "0.5rem", fontWeight: status === s ? "bold" : "normal" }}
          >
            {s === "all" ? "All" : s[0].toUpperCase() + s.slice(1)}
          </a>
        ))}
      </nav>
      <table>
        <thead><tr><th>ID</th><th>Customer</th><th>Total</th><th>Status</th></tr></thead>
        <tbody>
          {rows.map((o) => (
            <tr key={o.id}>
              <td><a href={`/admin/orders/${o.id}`}>{o.id.slice(0, 8)}</a></td>
              <td>{o.customer_name}</td>
              <td>KES {(o.total_cents / 100).toLocaleString()}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}