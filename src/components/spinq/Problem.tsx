"use client";

import Image from "next/image";
import { Counter, Reveal, SectionHeading, SpotlightCard } from "./primitives";

const PAINS = [
  {
    title: "Trapped Data",
    body: "Results locked in offline registers and spreadsheets — impossible to access, track or analyse.",
    stat: { to: 0, suffix: "", label: "central visibility" },
    icon: (
      <path d="M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    ),
  },
  {
    title: "Manual Errors",
    body: "Hand entry and manual calculations create human errors, inconsistent records and rework.",
    stat: { to: 90, suffix: "%", label: "of effort is re-keying" },
    icon: (
      <path d="M12 9v4m0 4h.01M5.1 19h13.8c1.5 0 2.5-1.7 1.7-3L13.7 4a2 2 0 0 0-3.4 0L3.4 16c-.8 1.3.2 3 1.7 3Z" />
    ),
  },
  {
    title: "Delayed Decisions",
    body: "Data reaches decision-makers days late — slow reactions turn small drifts into big losses.",
    stat: { to: 3, suffix: " days", label: "typical reporting lag" },
    icon: (
      <path d="M12 8v4l2.5 2.5M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9Z" />
    ),
  },
  {
    title: "Poor Visibility",
    body: "No live view across departments or plants — deviations surface only after the yarn is spun.",
    stat: { to: 0, suffix: "", label: "real-time signals" },
    icon: (
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 3l18 18" />
    ),
  },
];

const OLD_WAY = [
  "Paper lab registers",
  "Excel reconciliation",
  "Manual SPC charts",
  "End-of-shift reporting",
  "Broken feedback loops",
];

export function Problem() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="mesh-soft absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          tag="The Problem"
          title="Manual quality control can't keep up."
          accentWords={["can't"]}
          sub="Every spinning mill runs world-class instruments. Almost none of that data ever becomes a decision — it dies in registers, spreadsheets and delay."
        />

        {/* Cinematic split — old factory vs Spin-Q */}
        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl border border-line bg-surface p-8 sm:p-10">
              <div
                className="bg-grid-fine absolute inset-0 opacity-60 [mask-image:radial-gradient(80%_80%_at_50%_0%,#000,transparent)]"
                aria-hidden
              />
              <span className="relative inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-faint">
                Before · The old factory
              </span>
              <ul className="relative mt-8 space-y-4">
                {OLD_WAY.map((item, i) => (
                  <Reveal key={item} delay={0.1 + i * 0.08} y={16}>
                    <li className="flex items-center gap-3.5 text-[15px] text-faint">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line text-faint">
                        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" aria-hidden>
                          <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                      </span>
                      <span className="line-through decoration-faint/40 decoration-1">
                        {item}
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
              <p className="relative mt-9 border-t border-line pt-6 text-sm leading-relaxed text-faint">
                Quality engineers spend their day producing reports instead of
                improving quality.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="h-full">
            <div className="relative h-full overflow-hidden rounded-3xl border border-brand/25 bg-surface p-8 shadow-[0_0_80px_-30px_rgba(230,54,65,0.2)] sm:p-10">
              <div
                className="absolute inset-0 bg-gradient-to-br from-brand/6 via-transparent to-purple/6"
                aria-hidden
              />
              <span className="relative inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-brand-glow">
                <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-brand" />
                After · Spin-Q Quality Hub
              </span>
              <div className="relative mt-7 overflow-hidden rounded-xl border border-line2 shadow-2xl">
                <Image
                  src="/spinq/dash-process-capability.png"
                  alt="Spin-Q process capability (Cpk) trend analysis by department"
                  width={840}
                  height={525}
                  className="w-full"
                  sizes="(max-width: 1024px) 100vw, 520px"
                />
              </div>
              <div className="relative mt-6 flex flex-wrap gap-2">
                {["AI analytics", "Automation", "Real-time insight", "Closed loops"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full bg-black/[0.04] px-3 py-1.5 text-xs font-medium text-muted"
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Pain cards with stats */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PAINS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="h-full">
              <SpotlightCard className="h-full rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] text-muted">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {p.icon}
                  </svg>
                </span>
                <div className="mt-5 font-display text-2xl font-bold text-fg">
                  {p.stat.to === 0 ? (
                    "Zero"
                  ) : (
                    <Counter to={p.stat.to} suffix={p.stat.suffix} />
                  )}
                  <span className="ml-2 align-middle text-[11px] font-medium uppercase tracking-wider text-faint">
                    {p.stat.label}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-[17px] font-semibold text-fg">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
