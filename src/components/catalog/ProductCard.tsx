import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { getCategory } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  const cat = getCategory(
    // resolve slug from category id
    (product.category && catSlugFor(product.category)) || "",
  );
  const href = cat ? `/products/${cat.slug}/${product.id}` : "#";
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-400 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card"
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        <Image
          src={product.img}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.06]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-sm font-semibold leading-snug text-fg">{product.name}</h3>
        <p className="mt-auto pt-1 text-xs font-medium text-brand">{product.fit}</p>
      </div>
    </Link>
  );
}

/** Map category id → slug without importing the whole list each render. */
function catSlugFor(id: string): string {
  const map: Record<string, string> = {
    electrical: "electrical-electronics",
    pneumatics: "pneumatics",
    blowroom: "blow-room-carding",
    lapformer: "lap-former",
    comber: "comber",
    drawframe: "draw-frame",
    ringframe: "ring-compact-frame",
    toproller: "top-roller",
  };
  return map[id] ?? "";
}
