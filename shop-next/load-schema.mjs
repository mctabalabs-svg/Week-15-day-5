import { readFileSync } from "fs";
import { Pool } from "pg";

const env = readFileSync(new URL("./.env.local", import.meta.url), "utf8");
for (const raw of env.split(/\r?\n/)) {
  const line = raw.trim();
  if (!line) continue;
  const i = line.indexOf("=");
  process.env[line.slice(0, i).trim()] = line.slice(i + 1).trim();
}

const pool = new Pool({
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT, 10),
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 15000,
});

const sql = readFileSync(new URL("./schema.sql", import.meta.url), "utf8");

try {
  await pool.query(sql);
  const orders = await pool.query("SELECT to_regclass('public.orders') AS t");
  const items = await pool.query("SELECT to_regclass('public.order_items') AS t");
  console.log("orders:", orders.rows[0].t, "| order_items:", items.rows[0].t);
} catch (err) {
  console.error("LOAD FAILED:", err.message);
  process.exit(1);
} finally {
  await pool.end();
}
