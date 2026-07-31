"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Reveal, SectionHeading, SpotlightCard, cx } from "./primitives";

const STEPS = [
  { label: "Manual", desc: "Registers & Excel", icon: <path d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm9 0v5h5M8 13h8M8 17h5" /> },
  { label: "Collection", desc: "Every instrument", icon: <path d="M4 7a8 3 0 0 1 16 0v10a8 3 0 0 1-16 0V7Zm0 5a8 3 0 0 0 16 0M4 7a8 3 0 0 0 16 0" /> },
  { label: "Cloud", desc: "One quality lake", icon: <path d="M7 18a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 18.3 10 3.8 3.8 0 0 1 17.5 18H7Z" /> },
  { label: "AI Analytics", desc: "Trends · Cpk · SPC", icon: <path d="M12 3v3m0 12v3M3 12h3m12 0h3M6 6l2 2m8 8 2 2m0-12-2 2M8 16l-2 2m6-9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /> },
  { label: "Alerts", desc: "SLA-driven, mobile", icon: <path d="M12 3a5 5 0 0 0-5 5v3.5L5 15h14l-2-3.5V8a5 5 0 0 0-5-5Zm-2.5 15a2.5 2.5 0 0 0 5 0" /> },
  { label: "Action", desc: "Loop closed on floor", icon: <path d="M20 7 9.5 17.5 4 12" /> },
  { label: "Improvement", desc: "Continuous gains", icon: <path d="M4 17l5-5 4 4 7-8m0 0h-5m5 0v5" /> },
] as const;

const WORKFLOW = [
  {
    n: "01",
    title: "Collect.",
    body: "Test results stream directly from every instrument and plant register — no re-typing, no USB sticks.",
    accent: "text-blue",
    ring: "bg-blue/12 text-blue",
  },
  {
    n: "02",
    title: "Analyse.",
    body: "Trends, Cpk and cross-plant comparisons computed in real time, the moment a reading lands.",
    accent: "text-purple",
    ring: "bg-purple/12 text-purple",
  },
  {
    n: "03",
    title: "Notify.",
    body: "SLA-driven mobile alerts reach the right technician fast — with full context attached.",
    accent: "text-brand-glow",
    ring: "bg-brand/12 text-brand-glow",
  },
  {
    n: "04",
    title: "Act.",
    body: "Two-way feedback closes the loop: deviation, resolution and every corrective step, logged.",
    accent: "text-fg",
    ring: "bg-black/10 text-fg",
  },
];

export function Pipeline() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.85", "end 0.45"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const lineScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section id="workflow" className="relative overflow-hidden py-28 sm:py-36">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          tag="How it works"
          title="From collection to intelligence."
          accentWords={["intelligence"]}
          sub="One continuous pipeline replaces the paper trail — from the lab bench to a closed corrective loop."
        />

        {/* Animated pipeline rail */}
        <div ref={railRef} className="mt-20">
          {/* Desktop — horizontal */}
          <div className="relative hidden lg:block">
            <div className="absolute left-[7%] right-[7%] top-7 h-px bg-line" aria-hidden />
            <motion.div
              className="absolute left-[7%] right-[7%] top-7 h-px origin-left bg-gradient-to-r from-blue via-purple to-brand shadow-[0_0_12px_rgba(124,77,255,0.5)]"
              style={{ scaleX: lineScale }}
              aria-hidden
            />
            <ol className="relative grid grid-cols-7">
              {STEPS.map((s, i) => (
                <li key={s.label} className="flex flex-col items-center text-center">
                  <Reveal delay={i * 0.1} y={20} className="flex flex-col items-center">
                    <span
                      className={cx(
                        "relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border transition-colors",
                        i === 0
                          ? "border-line bg-surface text-faint"
                          : "border-line bg-white text-fg shadow-[0_10px_24px_-14px_rgba(15,18,30,0.3)]",
                      )}
                    >
                      {i > 0 && (
                        <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-black/[0.04] to-transparent" aria-hidden />
                      )}
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        {s.icon}
                      </svg>
                    </span>
                    <span className={cx("mt-4 font-display text-[15px] font-semibold", i === 0 ? "text-faint line-through decoration-1" : "text-fg")}>
                      {s.label}
                    </span>
                    <span className="mt-1 text-xs text-faint">{s.desc}</span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* Mobile — vertical */}
          <div className="relative lg:hidden">
            <div className="absolute bottom-4 left-7 top-4 w-px bg-line" aria-hidden />
            <motion.div
              className="absolute bottom-4 left-7 top-4 w-px origin-top bg-gradient-to-b from-blue via-purple to-brand"
              style={{ scaleY: lineScale }}
              aria-hidden
            />
            <ol className="space-y-7">
              {STEPS.map((s, i) => (
                <li key={s.label}>
                  <Reveal delay={i * 0.06} y={18}>
                    <div className="flex items-center gap-5">
                      <span
                        className={cx(
                          "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border",
                          i === 0 ? "border-line bg-surface text-faint" : "border-line bg-white text-fg shadow-[0_10px_24px_-14px_rgba(15,18,30,0.3)]",
                        )}
                      >
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          {s.icon}
                        </svg>
                      </span>
                      <div>
                        <div className={cx("font-display text-[15px] font-semibold", i === 0 ? "text-faint line-through decoration-1" : "text-fg")}>
                          {s.label}
                        </div>
                        <div className="mt-0.5 text-[13px] text-faint">{s.desc}</div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Collect / Analyse / Notify / Act */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WORKFLOW.map((w, i) => (
            <Reveal key={w.n} delay={i * 0.09} className="h-full">
              <SpotlightCard
                className="h-full rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line2"
                spotColor="rgba(124, 77, 255, 0.08)"
              >
                <div className={cx("font-display text-sm font-bold tracking-widest", w.accent)}>
                  {w.n}
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-fg">{w.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{w.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
