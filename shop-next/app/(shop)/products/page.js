import { isRecoveryModeError, queryWithRetry } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Products | Mctaba Shop",
  description: "Browse all products at Mctaba Shop",
  openGraph: {
    title: "Products | Mctaba Shop",
    description: "Browse all products at Mctaba Shop",
    type: "website",
  },
};

function formatPrice(cents) {
  return `KES ${(cents / 100).toLocaleString()}`;
}

export default async function ProductsPage() {
  let products = [];
  try {
    const result = await queryWithRetry(
      "SELECT id, slug, name, price_cents, image_url FROM products ORDER BY name"
    );
    products = result.rows;
  } catch (error) {
    
    console.log("Error message:", error?.message);
    console.log("Error code:", error?.code);
    console.log("Error detail:", error?.detail);
    if (!isRecoveryModeError(error)) {
      
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
  <h1 className="text-3xl font-bold mb-8">
    Products
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {products.map(product => (
      <Link
        key={product.slug}
        href={`/products/${product.slug}`}
      >
        <article className="border rounded-lg p-4 shadow hover:shadow-lg hover:-translate-y-1 transition">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-48 object-cover rounded"
          />

          <h2 className="font-semibold mt-3 text-lg">
            {product.name}
          </h2>

          <p className="text-gray-600">
            {formatPrice(product.price_cents)}
          </p>
        </article>
      </Link>
    ))}
  </div>
</div>
  );
}