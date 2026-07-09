"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

export function ProductBrowser({ products }: { products: Product[] }) {
  const [q, setQ] = useState("");
  const [fit, setFit] = useState("All");

  const fits = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) =>
      p.fit.split(/[·,]/).forEach((f) => {
        const t = f.trim();
        if (t) set.add(t);
      }),
    );
    return ["All", ...Array.from(set).sort()];
  }, [products]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return products.filter((p) => {
      const matchQ =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.fit.toLowerCase().includes(query);
      const matchFit = fit === "All" || p.fit.includes(fit);
      return matchQ && matchFit;
    });
  }, [products, q, fit]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-xs">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search parts…"
            className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-4 text-sm text-fg placeholder:text-faint transition-colors focus:border-brand/50 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {fits.slice(0, 9).map((f) => (
            <button
              key={f}
              onClick={() => setFit(f)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                fit === f
                  ? "border-transparent bg-brand text-white"
                  : "border-line text-muted hover:border-brand/40 hover:text-fg"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-sm text-faint">
        {filtered.length} {filtered.length === 1 ? "part" : "parts"}
        {fit !== "All" && ` · ${fit}`}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-line py-16 text-center">
          <p className="text-muted">No parts match your search.</p>
          <button
            onClick={() => {
              setQ("");
              setFit("All");
            }}
            className="mt-3 text-sm font-semibold text-brand hover:text-brand-glow"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
