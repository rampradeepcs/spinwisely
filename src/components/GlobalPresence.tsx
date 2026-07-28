"use client";

import { useState } from "react";
import { offices } from "@/lib/data";
import { asset } from "@/lib/asset";
import { SectionHead } from "./Section";
import { Reveal } from "./Reveal";

/** Office cards — tap a city to expand its full address. */
function OfficeList() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-10 space-y-3">
      {offices.map((o, i) => {
        const expanded = open === i;
        return (
          <Reveal key={o.city} delay={((i % 3) + 1) as 1 | 2 | 3}>
            <div
              className={`rounded-xl border bg-surface/60 transition-colors ${
                expanded ? "border-brand/40" : "border-line hover:border-brand/30"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : i)}
                aria-expanded={expanded}
                aria-controls={`office-address-${i}`}
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <span className="text-2xl" aria-hidden>
                  {o.flag}
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-display font-semibold text-fg">{o.city}</h3>
                    <span className="text-sm text-faint">{o.country}</span>
                  </div>
                  <p className="text-sm text-faint">{o.role}</p>
                </div>
                <svg
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 shrink-0 text-faint transition-transform duration-300 ${
                    expanded ? "rotate-180 text-brand" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                id={`office-address-${i}`}
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <address className="border-t border-line px-4 py-4 pl-[3.75rem] text-sm not-italic leading-relaxed text-muted">
                    {o.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export function GlobalPresence() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHead
            eyebrow="Global Presence"
            title={
              <>
                One network,<br />
                <span className="text-brand-gradient">three continents</span>
              </>
            }
            intro="Headquartered in Coimbatore, India, with operations serving mills across the Americas and beyond — engineering support wherever you spin."
          />
          <OfficeList />
        </div>

        <Reveal delay={2}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="absolute inset-0 bg-grid opacity-40" />
            {/* Dotted world map (Natural Earth land, same projection as office x/y) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/world-dots.svg")}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full [mask-image:radial-gradient(90%_90%_at_50%_50%,#000,transparent)]"
            />
            {/* markers */}
            {offices.map((o) => (
              <div
                key={o.city}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${o.x}%`, top: `${o.y}%` }}
              >
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-brand/60 [animation:pulse-ring_2s_ease-out_infinite]" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-brand ring-2 ring-brand/30" />
                </span>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-bg/80 px-2 py-0.5 text-[0.7rem] font-medium text-muted backdrop-blur">
                  {o.city}
                </span>
              </div>
            ))}
            {/* connection arcs */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M19.7 33.1 Q 44 16 67.7 49.2" fill="none" stroke="#ed3237" strokeWidth="0.4" strokeDasharray="1 1.5" opacity="0.7" />
              <path d="M21.2 44.7 Q 45 70 67.7 49.2" fill="none" stroke="#ed3237" strokeWidth="0.4" strokeDasharray="1 1.5" opacity="0.7" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

