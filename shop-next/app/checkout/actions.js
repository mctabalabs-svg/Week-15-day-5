"use server";

import pool from "@/lib/db";

export async function createOrder(formData) {
  const customerName = formData.get("name");
  const customerEmail = formData.get("email");
  const customerPhone = formData.get("phone");
  const customerAddress = formData.get("address");
  const paymentMethod = formData.get("paymentMethod");
  const itemsJson = formData.get("items");
  const items = JSON.parse(itemsJson ?? "[]");

  if (!customerName || !customerEmail || !customerAddress || items.length === 0) {
    return { error: "Missing required fields" };
  }

  const total = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);

  const client = await pool.connect();
  let transactionStarted = false;
  try {
    await client.query("SET statement_timeout = '15000'");
    await client.query("SET idle_in_transaction_session_timeout = '15000'");
    await client.query("BEGIN");
    transactionStarted = true;

    const orderResult = await client.query(
      `INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total_cents, payment_method)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [customerName, customerEmail, customerPhone, customerAddress, total, paymentMethod]
    );
    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price_cents)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.productId, item.quantity, item.priceCents]
      );
    }

    await client.query("COMMIT");
    return { orderId };
  } catch (err) {
    if (transactionStarted) {
      await client.query("ROLLBACK");
    }
    return { error: err.message };
  } finally {
    client.release();
  }
}
