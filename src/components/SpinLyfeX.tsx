"use client";

import { useState } from "react";
import Image from "next/image";
import { spinlyfex, maxxFeatures } from "@/lib/data";
import { SectionHead } from "./Section";
import { Reveal } from "./Reveal";
import { Icons } from "./Icons";

export function SpinLyfeX() {
  const [active, setActive] = useState(2); // default: MAXX
  const p = spinlyfex[active];

  return (
    <section id="spinlyfex" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -top-20 right-0 h-[40rem] w-[40rem] rounded-full bg-radial-brand opacity-40" />
      <div className="container-x">
        <SectionHead
          eyebrow="Nachi SpinLyfeX™"
          title={
            <>
              Retrofit systems that <span className="text-brand-gradient">extend machine life</span>
            </>
          }
          intro="Our engineered retrofit series modernizes classic spinning machinery — restoring precision, cutting maintenance and preserving originality. Choose a system to explore."
        />

        {/* Tabs */}
        <div className="mt-12 flex flex-wrap gap-2.5">
          {spinlyfex.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                active === i
                  ? "border-transparent bg-brand text-white shadow-[0_8px_30px_-8px] shadow-brand/60"
                  : "border-line text-muted hover:border-fg/25 hover:text-fg"
              }`}
            >
              {s.name.replace("SpinLyfeX ", "")}
            </button>
          ))}
        </div>

        {/* Active product panel */}
        <div
          key={p.id}
          className="mt-8 grid items-center gap-8 rounded-[1.75rem] border border-line bg-gradient-to-b from-[color-mix(in_oklab,var(--fg)_5%,transparent)] to-transparent p-6 [animation:fade-up_.6s_var(--ease-out-expo)] md:grid-cols-2 md:p-10"
        >
          <div className="relative order-2 md:order-1">
            <div className="flex flex-wrap items-center gap-2">
              {p.featured && (
                <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand ring-1 ring-brand/30">
                  Flagship system
                </span>
              )}
              <span className="rounded-full bg-surface2 px-3 py-1 text-xs font-medium text-muted">
                {p.fit}
              </span>
            </div>
            <h3 className="mt-5 font-display text-3xl font-semibold text-fg md:text-4xl">
              {p.name}
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{p.summary}</p>

            {active === 2 ? (
              <ul className="mt-7 space-y-3">
                {maxxFeatures.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-muted">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                      <Icons.tested className="h-3.5 w-3.5" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-7 flex flex-wrap gap-2.5">
                {["OEM-level quality", "Plug & play", "Preserves originality", "Faster delivery"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-line bg-surface2 px-3 py-1.5 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            )}

            <a
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-glow"
            >
              Enquire about this system
              <Icons.arrow className="h-4 w-4" />
            </a>
          </div>

          <div className="relative order-1 grid place-items-center md:order-2">
            <div
              className="absolute inset-6 rounded-full opacity-50 blur-3xl"
              style={{ background: `radial-gradient(circle, ${p.accent}40, transparent 70%)` }}
            />
            <div className="relative w-full overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-card">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
