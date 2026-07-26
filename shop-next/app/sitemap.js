import pool from "@/lib/db";

export default async function sitemap() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com";

  try {
    const { rows: products } = await pool.query(
      "SELECT slug, created_at FROM products"
    );

    return [
      {
        url: `${base}/`,
        lastModified: new Date(),
      },
      {
        url: `${base}/products`,
        lastModified: new Date(),
      },
      ...products.map((product) => ({
        url: `${base}/products/${product.slug}`,
        lastModified: product.created_at,
      })),
    ];
  } catch (error) {
    console.error("Sitemap generation failed:", error);

    return [
      {
        url: `${base}/`,
        lastModified: new Date(),
      },
      {
        url: `${base}/products`,
        lastModified: new Date(),
      },
    ];
  }
}