// app/admin/orders/[id]/updateStatus.js
"use server";
import pool, { queryWithRetry } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateStatus(orderId, formData) {
  const newStatus = formData.get("newStatus");
  await queryWithRetry(
    "UPDATE orders SET status = $1 WHERE id = $2",
    [newStatus, orderId]
  );
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
}