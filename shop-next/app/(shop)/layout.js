// app/(shop)/layout.js

import Link from "next/link";
import { CartProvider } from "@/app/cart/CartContext";
import CartBadge from "@/app/cart/CartBadge";

export default function ShopLayout({ children }) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <header className="bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
            <Link href="/" className="font-bold text-xl">
              Shop
            </Link>

            <nav className="space-x-4">
              <Link href="/products">All Products</Link>
              <Link href="/about">About</Link>
              <CartBadge />
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-6xl mx-auto w-full p-4">
          {children}
        </main>

        <footer className="bg-gray-100 text-center py-4">
          Mctaba Shop
        </footer>
      </div>
    </CartProvider>
  );
}