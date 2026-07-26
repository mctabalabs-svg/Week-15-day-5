import Counter from "../components/Counter";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mctaba Shop",
  description: "Your local online store",
  openGraph: {
    title: "Mctaba Shop",
    description: "Your local online store",
    type: "website",
  },
};

export default async function HomePage() {
  let posts = [];
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=5",
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      posts = await res.json();
    }
  } catch {
    posts = [];
  }

  return (
    <main>
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
          Mctaba Shop
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
          Welcome to Mctaba Shop — Day 5 Preview
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
          Discover curated products, fresh updates, and a simple shopping experience.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/products" className="rounded-full bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700">
            Shop now
          </Link>
          <Link href="/about" className="rounded-full border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
            Learn more
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-950">Latest updates</h2>
        <ul className="mt-4 space-y-3">
          {posts.map((post) => (
            <li key={post.id} className="rounded-2xl bg-gray-50 p-4">
              <p className="font-semibold text-gray-950">{post.title}</p>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8">
        <Counter />
      </div>
    </main>
  );
}
