"use client";
import { useCart } from "@/app/cart/CartContext";

export default function AddToCartButton({ productId, priceCents }) {
  const { dispatch } = useCart();
  return (
    <button
      onClick={() => dispatch({ type: "ADD_ITEM", productId, priceCents })}
      className="rounded-full bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
    >
      Add to cart
    </button>
  );
}
