import { queryWithRetry } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/app/cart/AddToCartButton";

function formatPrice(cents) {
  return `KES ${(cents / 100).toLocaleString()}`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { rows } = await queryWithRetry(
    "SELECT name, description, image_url FROM products WHERE slug = $1",
    [slug]
  );
  const product = rows[0];

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      images: product.image_url ? [{ url: product.image_url }] : [],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const { rows } = await queryWithRetry("SELECT * FROM products WHERE slug = $1", [slug]);
  const product = rows[0];
  if (!product) notFound();

  return (
    <main>
      <Link
        href="/products"
        className="inline-flex text-sm font-semibold text-blue-600 hover:text-blue-800"
      >
        Back to products
      </Link>

      <section className="mt-6 grid gap-8 rounded-3xl border border-gray-200 bg-white p-4 shadow-sm md:grid-cols-2 md:p-6 lg:p-8">
        <div className="overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={product.image_url}
            alt={product.name}
            width={900}
            height={700}
            className="h-full min-h-[320px] w-full object-cover md:min-h-[420px]"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Mctaba Shop
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-semibold text-gray-600">
            {formatPrice(product.price_cents)}
          </p>
          <p className="mt-5 text-base leading-7 text-gray-700">{product.description}</p>

          <AddToCartButton productId={product.id} priceCents={product.price_cents} />

          <div className="mt-6 flex flex-wrap gap-3">
            <span
              className={
                product.in_stock > 0
                  ? "rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700"
                  : "rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700"
              }
            >
              {product.in_stock > 0 ? `${product.in_stock} in stock` : "Out of stock"}
            </span>
            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700">
              Premium roast
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}