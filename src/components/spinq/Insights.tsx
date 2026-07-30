"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrowserFrame } from "./BrowserFrame";
import { Counter, Reveal, SectionHeading, cx } from "./primitives";
import { asset } from "@/lib/asset";

const VIEWS = [
  {
    key: "summary",
    label: "Department Summary",
    src: "/spinq/dash-quality-score.png",
    alt: "Spin-Q daily QC performance report with module-wise KPI details",
    url: "app.spinwisely.com/daily-report",
  },
  {
    key: "trend",
    label: "Quality Trend",
    src: "/spinq/dash-quality-trends.png",
    alt: "Spin-Q historical CVm% quality trend across test platforms",
    url: "app.spinwisely.com/trends",
  },
  {
    key: "compliance",
    label: "Compliance",
    src: "/spinq/dash-process-capability.png",
    alt: "Spin-Q process capability index (Cpk) compliance analysis",
    url: "app.spinwisely.com/cpk",
  },
  {
    key: "performance",
    label: "Performance",
    src: "/spinq/dash-stat-output.png",
    alt: "Spin-Q statistical analysis output — Welch's t-test comparison",
    url: "app.spinwisely.com/statistics",
  },
];

const DEPARTMENTS = [
  { name: "Blow Room", value: 98, tone: "bg-emerald-500" },
  { name: "Carding", value: 94, tone: "bg-emerald-500" },
  { name: "Drawing", value: 96, tone: "bg-emerald-500" },
  { name: "Simplex", value: 88, tone: "bg-amber-400" },
  { name: "Ring Frame", value: 79, tone: "bg-brand" },
  { name: "Auto-Coner", value: 92, tone: "bg-emerald-500" },
];

export function Insights() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  /* Auto-rotate views until the user takes over */
  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setActive((v) => (v + 1) % VIEWS.length), 5000);
    return () => clearInterval(id);
  }, [paused, reduced]);

  const view = VIEWS[active];

  return (
    <section id="insights" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mesh-soft absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          tag="Speed"
          title="Insights in seconds."
          accentWords={["seconds"]}
          sub="Quality intelligence in just 5 clicks — from any department, any product, any machine, to an answer."
        />

        {/* View switcher */}
        <Reveal className="mt-12">
          <div
            className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1.5 rounded-2xl border border-line bg-surface p-1.5"
            role="tablist"
            aria-label="Dashboard views"
          >
            {VIEWS.map((v, i) => (
              <button
                key={v.key}
                role="tab"
                aria-selected={active === i}
                onClick={() => {
                  setActive(i);
                  setPaused(true);
                }}
                className={cx(
                  "relative rounded-xl px-4 py-2 text-[13px] font-medium transition-colors",
                  active === i ? "text-white" : "text-muted hover:text-fg",
                )}
              >
                {active === i && (
                  <motion.span
                    layoutId="insights-tab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand to-purple/80"
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className="relative">{v.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Showcase */}
        <div className="relative mt-10">
          <div
            className="absolute -inset-x-10 inset-y-10 rounded-[48px] bg-gradient-to-tr from-purple/10 via-transparent to-blue/10 blur-3xl"
            aria-hidden
          />
          <Reveal className="relative">
            <div className="relative mx-auto max-w-4xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={view.key}
                  initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.985, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.01, filter: "blur(6px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <BrowserFrame src={asset(view.src)} alt={view.alt} url={view.url} />
                </motion.div>
              </AnimatePresence>

              {/* Floating metric — department summary */}
              <Reveal delay={0.25} y={26} className="absolute -left-4 -top-8 hidden w-[240px] lg:block xl:-left-24">
                <div className="glass-strong animate-float-y rounded-2xl p-5">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-faint">
                    Department Summary
                  </div>
                  <ul className="mt-3.5 space-y-2.5">
                    {DEPARTMENTS.map((d, i) => (
                      <li key={d.name} className="flex items-center gap-2.5">
                        <span className="w-[74px] shrink-0 text-[11px] font-medium text-muted">
                          {d.name}
                        </span>
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/[0.06]">
                          <motion.span
                            className={cx("block h-full rounded-full", d.tone)}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${d.value}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </span>
                        <span className="w-8 text-right text-[11px] font-semibold text-fg">
                          {d.value}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Floating metric — compliance */}
              <Reveal delay={0.4} y={26} className="absolute -bottom-8 -right-4 hidden lg:block xl:-right-20">
                <div className="glass-strong animate-float-y rounded-2xl px-5 py-4 [animation-delay:-2.5s]">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-faint">
                    Compliance rate
                  </div>
                  <div className="mt-1 font-display text-3xl font-bold text-fg">
                    <Counter to={79.4} decimals={1} suffix="%" />
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Ring Frame drags the average
                  </div>
                </div>
              </Reveal>

              {/* 5 clicks chip */}
              <Reveal delay={0.5} y={20} className="absolute -top-6 right-6 hidden md:block">
                <div className="glass animate-float-y flex items-center gap-2.5 rounded-full px-4 py-2.5 [animation-delay:-5s]">
                  <span className="flex items-center gap-1" aria-hidden>
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-brand"
                        initial={{ opacity: 0.25 }}
                        whileInView={{ opacity: [0.25, 1, 0.25] }}
                        viewport={{ once: false }}
                        transition={{ duration: 2, delay: i * 0.35, repeat: Infinity }}
                      />
                    ))}
                  </span>
                  <span className="text-xs font-semibold text-fg">
                    Any answer in 5 clicks
                  </span>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
