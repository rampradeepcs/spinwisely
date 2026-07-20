import Image from "next/image";
import { categoryCount } from "@/lib/catalog";
import Link from "next/link";
import type { Category } from "@/lib/catalog";
import { Icons } from "@/components/Icons";

export function CategoryCard({ category }: { category: Category }) {
  const Icon = Icons[category.icon];
  const previews = category.products.slice(0, 3);
  return (
    <Link
      href={`/products/${category.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card"
    >
      <div className="relative grid grid-cols-3 gap-px bg-white">
        {previews.map((p) => (
          <div key={p.id} className="relative aspect-square">
            <Image
              src={p.img}
              alt=""
              fill
              sizes="20vw"
              className="object-contain p-2.5"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20">
            <Icon className="h-6 w-6" />
          </div>
          <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
            {categoryCount(category)} parts
          </span>
        </div>
        <h3 className="mt-5 font-display text-xl font-semibold text-fg">{category.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{category.blurb}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
          Browse category
          <Icons.arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
