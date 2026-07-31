"use client";

import { Counter, Reveal, WordReveal, cx } from "./primitives";

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

/** Dark cinematic chapter — mirrors the brochure's black outcomes page. */
export function Outcomes() {
  return (
    <section id="outcomes" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <Reveal y={40}>
          <div className="panel-dark noise relative overflow-hidden rounded-[2rem] px-6 py-16 sm:rounded-[2.75rem] sm:px-12 sm:py-20">
            <div
              className="bg-grid-invert absolute inset-0 opacity-50 [mask-image:radial-gradient(70%_70%_at_50%_30%,#000,transparent)]"
              aria-hidden
            />
            {/* Ghost display word, reference-style */}
            <div
              className="pointer-events-none absolute -right-6 top-6 select-none font-display text-[26vw] font-bold leading-none tracking-tighter text-white/[0.04] sm:text-[220px]"
              aria-hidden
            >
              KPIs
            </div>

            <div className="relative flex flex-col items-center gap-5 text-center">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_10px_2px_rgba(230,54,65,0.6)]" />
                  Business outcomes
                </span>
              </Reveal>
              <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                <WordReveal
                  text="Measurable. Everywhere."
                  accentWords={["Measurable."]}
                  wordClass="text-grad-invert"
                  delay={0.05}
                />
              </h2>
              <Reveal delay={0.15}>
                <p className="mx-auto max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
                  Enterprise KPIs, not vanity metrics — what mills measure after
                  going live on Spin-Q.
                </p>
              </Reveal>
            </div>

            <div className="relative mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {OUTCOMES.map((o, i) => (
                <Reveal key={o.title} delay={i * 0.1} className="h-full">
                  <div className="group flex h-full flex-col bg-[#0c0a15]/95 p-8 transition-colors duration-500 hover:bg-[#131024]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                        Outcome {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cx(
                          "flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em]",
                          o.dir === "up" ? "text-emerald-400" : "text-brand-glow",
                        )}
                      >
                        <svg viewBox="0 0 10 10" className={cx("h-2.5 w-2.5", o.dir === "down" && "rotate-180")} fill="none" aria-hidden>
                          <path d="M5 8.5v-7m0 0L1.8 4.7M5 1.5l3.2 3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {o.chip}
                      </span>
                    </div>
                    <div className="mt-8 flex items-baseline gap-1.5">
                      <span className="text-xs font-medium italic text-white/35">up to</span>
                    </div>
                    <div className="text-grad-invert font-display text-[64px] font-bold leading-none tracking-tight transition-transform duration-500 group-hover:scale-[1.04] lg:text-[72px]">
                      <Counter to={o.value} suffix={o.suffix} duration={2.2} />
                    </div>
                    <h3 className="mt-5 font-display text-[16px] font-semibold text-white">
                      {o.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/55">
                      {o.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <p className="relative mt-7 flex items-center justify-center gap-2 text-center text-xs text-white/40">
                <span className="text-brand-glow" aria-hidden>
                  *
                </span>
                Results depend on your raw material and process.
              </p>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
