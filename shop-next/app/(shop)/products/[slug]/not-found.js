import Link from "next/link";

export default function NotFound() {
  return (
    <main className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-gray-950">Product not found</h1>
      <p className="mt-3 text-gray-600">The product you are looking for does not exist.</p>
      <Link
        href="/products"
        className="mt-6 inline-flex rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700"
      >
        Back to products
      </Link>
    </main>
  );
}
