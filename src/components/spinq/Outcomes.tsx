"use client";

import { motion, useReducedMotion } from "motion/react";
import { Counter, Reveal, SectionHeading, cx } from "./primitives";

const OUTCOMES = [
  {
    value: 90,
    suffix: "%",
    dir: "down" as const,
    chip: "Toil",
    title: "Manual work reduced",
    body: "Test entry, copy-paste and reconciliation work — eliminated.",
  },
  {
    value: 99,
    suffix: "%",
    dir: "up" as const,
    chip: "Sight",
    title: "Visibility",
    body: "Of plant-floor activity now visible from a single screen.",
  },
  {
    value: 10,
    suffix: "×",
    dir: "up" as const,
    chip: "Speed",
    title: "Faster response",
    body: "From spotted deviation to dispatched technician.",
  },
  {
    value: 40,
    suffix: "%",
    dir: "down" as const,
    chip: "Loss",
    title: "Reduced quality losses",
    body: "Fewer winder cuts, customer claims, reprocess and wastage.",
  },
];

export function Outcomes() {
  const reduced = useReducedMotion();
  return (
    <section id="outcomes" className="relative overflow-hidden py-28 sm:py-36">
      {/* Pulsing ambient gradient */}
      <motion.div
        className="absolute inset-0"
        animate={reduced ? undefined : { opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <div className="mesh-hero absolute inset-0" />
      </motion.div>
      <div
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          tag="Business outcomes"
          title="Measurable. Everywhere."
          accentWords={["Measurable"]}
          sub="Enterprise KPIs, not vanity metrics — what mills measure after going live on Spin-Q."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {OUTCOMES.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.1} className="h-full">
              <div className="group flex h-full flex-col bg-surface p-8 transition-colors duration-500 hover:bg-surface2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">
                    Outcome {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cx(
                      "flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em]",
                      o.dir === "up" ? "text-emerald-600" : "text-brand-glow",
                    )}
                  >
                    <svg viewBox="0 0 10 10" className={cx("h-2.5 w-2.5", o.dir === "down" && "rotate-180")} fill="none" aria-hidden>
                      <path d="M5 8.5v-7m0 0L1.8 4.7M5 1.5l3.2 3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {o.chip}
                  </span>
                </div>
                <div className="mt-8 flex items-baseline gap-1.5">
                  <span className="text-xs font-medium italic text-faint">up to</span>
                </div>
                <div className="font-display text-[64px] font-bold leading-none tracking-tight text-grad transition-transform duration-500 group-hover:scale-[1.04] lg:text-[72px]">
                  <Counter to={o.value} suffix={o.suffix} duration={2.2} />
                </div>
                <h3 className="mt-5 font-display text-[16px] font-semibold text-fg">
                  {o.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">{o.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-faint">
            <span className="text-brand" aria-hidden>
              *
            </span>
            Results depend on your raw material and process.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
