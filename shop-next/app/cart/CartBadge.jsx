"use client";
import Link from "next/link";
import { useCart } from "@/app/cart/CartContext";

export default function CartBadge() {
  const { state } = useCart();
  const count = state.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <Link href="/cart" className="hover:underline">
      Cart ({count})
    </Link>
  );
}
