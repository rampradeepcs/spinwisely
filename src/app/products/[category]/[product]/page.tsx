import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getProduct } from "@/lib/catalog";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Icons } from "@/components/Icons";

export function generateStaticParams() {
  return categories.flatMap((c) =>
    c.products.map((p) => ({ category: c.slug, product: p.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}): Promise<Metadata> {
  const { category, product } = await params;
  const found = getProduct(category, product);
  if (!found) return { title: "Product not found" };
  return {
    title: `${found.product.name} — ${found.cat.name}`,
    description: `${found.product.name} for ${found.product.fit}. OEM-level ${found.cat.name} spare part from Nachi Tekneka.`,
  };
}

const highlights = [
  { icon: "materials", text: "Equal & equivalent raw materials" },
  { icon: "precision", text: "Precision dimensional accuracy" },
  { icon: "tested", text: "Assembly-tested before dispatch" },
  { icon: "clock", text: "Faster delivery than OEM" },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category, product } = await params;
  const found = getProduct(category, product);
  if (!found) notFound();
  const { cat, product: p, related } = found;

  return (
    <main className="pt-28 md:pt-32">
      <div className="container-x">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-faint" aria-label="Breadcrumb">
          <Link href="/products" className="hover:text-brand">Products</Link>
          <span>/</span>
          <Link href={`/products/${cat.slug}`} className="hover:text-brand">{cat.name}</Link>
          <span>/</span>
          <span className="text-muted">{p.name}</span>
        </nav>

        {/* Detail */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-white">
            <div className="relative aspect-square">
              <Image
                src={p.img}
                alt={p.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8"
              />
            </div>
            <span className="absolute left-5 top-5 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
              OEM-level quality
            </span>
          </div>

          <div className="flex flex-col">
            <Link
              href={`/products/${cat.slug}`}
              className="text-sm font-semibold uppercase tracking-wide text-brand"
            >
              {cat.name}
            </Link>
            <h1 className="mt-3 font-display text-3xl font-semibold text-fg md:text-5xl">
              {p.name}
            </h1>

            <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
              <p className="text-xs uppercase tracking-wide text-faint">Machine compatibility</p>
              <p className="mt-1.5 text-lg font-medium text-fg">{p.fit}</p>
              <p className="mt-1 text-sm text-muted">Department: {cat.department}</p>
            </div>

            <ul className="mt-6 grid grid-cols-2 gap-3">
              {highlights.map((h) => {
                const Icon = Icons[h.icon];
                return (
                  <li
                    key={h.text}
                    className="flex items-center gap-3 rounded-xl border border-line bg-surface p-3.5 text-sm text-muted"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                    {h.text}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="shine inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              >
                Request a quote
                <Icons.arrow className="h-4 w-4" />
              </Link>
              <Link
                href="/downloads"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line px-7 text-sm font-semibold text-fg transition-colors hover:bg-surface2"
              >
                <Icons.download className="h-4 w-4" />
                Datasheet
              </Link>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-faint">
              Part specifications sourced from the Nachi Tekneka catalog. Contact our team for
              exact dimensions, pricing and availability for your machine.
            </p>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-line pt-14">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl font-semibold text-fg">
                More from {cat.name}
              </h2>
              <Link
                href={`/products/${cat.slug}`}
                className="hidden items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-glow sm:inline-flex"
              >
                View all
                <Icons.arrow className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
              {related.map((r) => (
                <ProductCard key={r.id} product={r} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="h-20 md:h-28" />
    </main>
  );
}
