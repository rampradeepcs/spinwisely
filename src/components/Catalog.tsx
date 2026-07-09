import Link from "next/link";
import { categories, catalogStats } from "@/lib/catalog";
import { SectionHead } from "./Section";
import { Reveal } from "./Reveal";
import { Icons } from "./Icons";
import { CategoryCard } from "./catalog/CategoryCard";

export function Catalog() {
  return (
    <section id="products" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHead
            eyebrow="Premium Parts Catalog"
            title={
              <>
                Thousands of parts, <span className="text-brand-gradient">one source</span>
              </>
            }
            intro={`OEM-level spares across ${catalogStats.categories} categories — for every department of the spinning line.`}
          />
          <Reveal delay={2}>
            <Link
              href="/products"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-line px-5 text-sm font-semibold text-fg transition-colors hover:bg-surface2"
            >
              View full catalog
              <Icons.arrow className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((c, i) => (
            <Reveal key={c.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <CategoryCard category={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
