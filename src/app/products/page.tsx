import type { Metadata } from "next";
import Link from "next/link";
import { categories, catalogStats } from "@/lib/catalog";
import { PageHero } from "@/components/Section";
import { CategoryCard } from "@/components/catalog/CategoryCard";
import { Reveal } from "@/components/Reveal";
import { Icons } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Products — Parts Catalog",
  description:
    "Browse the full Nachi Tekneka parts catalog: electrical & electronics, pneumatics, and precision mechanicals for every department of the spinning line.",
};

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Premium Parts Catalog"
        title={
          <>
            Thousands of parts, <span className="text-brand-gradient">one source</span>
          </>
        }
        intro={`OEM-level spare parts across ${catalogStats.categories} categories and ${catalogStats.products}+ listed items — from blowroom to ring frame. Explore by department below.`}
      >
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/downloads"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            <Icons.download className="h-4 w-4" />
            Download full catalog
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-semibold text-fg transition-colors hover:bg-surface2"
          >
            Request a part
          </Link>
        </div>
      </PageHero>

      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <Reveal key={c.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <CategoryCard category={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
