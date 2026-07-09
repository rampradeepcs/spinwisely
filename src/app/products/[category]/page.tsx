import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/catalog";
import { PageHero } from "@/components/Section";
import { ProductBrowser } from "@/components/catalog/ProductBrowser";
import { Icons } from "@/components/Icons";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return { title: "Category not found" };
  return {
    title: `${cat.name} — Parts`,
    description: cat.blurb,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const others = categories.filter((c) => c.id !== cat.id);

  return (
    <main>
      <PageHero
        eyebrow={cat.department}
        title={<span className="text-gradient">{cat.name}</span>}
        intro={cat.blurb}
      >
        <nav className="mt-2 flex items-center gap-2 text-sm text-faint" aria-label="Breadcrumb">
          <Link href="/products" className="hover:text-brand">
            Products
          </Link>
          <span>/</span>
          <span className="text-muted">{cat.name}</span>
        </nav>
      </PageHero>

      <section className="py-12 md:py-16">
        <div className="container-x">
          <ProductBrowser products={cat.products} />
        </div>
      </section>

      {/* Other categories */}
      <section className="border-t border-line bg-surface py-14 md:py-20">
        <div className="container-x">
          <h2 className="font-display text-2xl font-semibold text-fg">Other categories</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {others.map((c) => {
              const Icon = Icons[c.icon];
              return (
                <Link
                  key={c.id}
                  href={`/products/${c.slug}`}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-bg px-4 py-2.5 text-sm font-medium text-fg transition-all hover:border-brand/40 hover:text-brand"
                >
                  <Icon className="h-4 w-4 text-brand" />
                  {c.name}
                  <span className="text-faint">{c.products.length}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
