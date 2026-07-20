import type { Product } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

export function ProductBrowser({
  products,
  count,
}: {
  products: Product[];
  count?: string;
}) {
  return (
    <div>
      <p className="text-sm text-faint">
        {count ?? products.length} {products.length === 1 && !count ? "part" : "parts"}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
