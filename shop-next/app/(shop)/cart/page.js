"use client";
import { useCart } from "@/app/cart/CartContext";
import Link from "next/link";

function formatPrice(cents) {
  return `KES ${(cents / 100).toLocaleString()}`;
}

export default function CartPage() {
  const { state, dispatch } = useCart();
  const { items, status } = state;

  if (status === "checking_out") {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <p className="text-gray-700 mb-8">Thank you for your order. This is a demo checkout view.</p>
        <div className="flex gap-4">
          <button
            onClick={() => dispatch({ type: "BACK" })}
            className="rounded-lg bg-gray-900 px-6 py-3 text-white hover:bg-gray-800"
          >
            Back to cart
          </button>
          <button
            onClick={() => dispatch({ type: "CLEAR" })}
            className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-50"
          >
            Place order (clear cart)
          </button>
        </div>
      </main>
    );
  }

  const isEmpty = items.length === 0;

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <Link href="/products" className="text-sm text-blue-600 hover:text-blue-800">
          Continue shopping
        </Link>
      </div>

      {isEmpty ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link
            href="/products"
            className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white">
            {items.map((item) => (
              <li key={item.productId} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-semibold text-gray-900">{item.productName || `Product ${item.productId}`}</p>
                  <p className="text-sm text-gray-600">
                    {formatPrice(item.priceCents)} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-900">
                    {formatPrice(item.priceCents * item.quantity)}
                  </span>
                  <button
                    onClick={() => dispatch({ type: "REMOVE_ITEM", productId: item.productId })}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-bold">
              {formatPrice(items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0))}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => dispatch({ type: "PROCEED" })}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              Proceed to checkout
            </button>
            <button
              onClick={() => dispatch({ type: "CLEAR" })}
              className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-50"
            >
              Clear cart
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
