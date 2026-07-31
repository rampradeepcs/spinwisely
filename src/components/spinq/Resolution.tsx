"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { Reveal, SectionHeading, cx } from "./primitives";
import { asset } from "@/lib/asset";

const STEPS = [
  {
    title: "Deviation",
    body: "A reading exceeds its SPC threshold — the rule fires automatically, 24/7.",
  },
  {
    title: "Alert",
    body: "A mobile notification reaches the assigned technician with full context.",
  },
  {
    title: "Assign",
    body: "Ownership and an SLA timer attach to the event the moment it opens.",
  },
  {
    title: "Correct",
    body: "Root cause and corrective step are logged from the app, on the floor.",
  },
  {
    title: "Resolved",
    body: "The reading returns to spec and the loop closes with two-way feedback.",
  },
  {
    title: "Archived",
    body: "Every event lands in history — auditable, searchable, learnable.",
  },
];

const SLA_BOARD = [
  { title: "CV% high · Ring Frame", plant: "Plant Erode-B · #4821", left: "22m left", p: "P1", urgent: true },
  { title: "Imperfections · Carding", plant: "Plant Indore-C · #4818", left: "1h 12m", p: "P2", urgent: false },
  { title: "Count variation · Simplex", plant: "Plant Coimbatore-A · #4815", left: "2h 04m", p: "P3", urgent: false },
  { title: "Moisture drift · Lab", plant: "Plant Surat-D · #4810", left: "3h 41m", p: "P4", urgent: false },
];

function StepNode({
  index,
  done,
  current,
  last,
}: {
  index: number;
  done: boolean;
  current: boolean;
  last: boolean;
}) {
  const check = (
    <svg viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <path d="M2 6.5 5 9.5 10 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  return (
    <span
      className={cx(
        "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-[12px] font-bold transition-all duration-500",
        current
          ? last
            ? "border-transparent bg-emerald-500 text-white shadow-[0_10px_24px_-8px_rgba(16,185,129,0.7)]"
            : "border-transparent bg-gradient-to-br from-brand to-purple text-white shadow-[0_10px_24px_-8px_rgba(124,77,255,0.7)]"
          : done
            ? "border-emerald-500/35 bg-emerald-500/10 text-emerald-600"
            : "border-line bg-surface text-faint",
      )}
    >
      {done && !current ? check : last ? check : index + 1}
    </span>
  );
}

export function Resolution() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.7", "end 0.85"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)));
  });

  const railScale = useTransform(scrollYProgress, [0, 1], [0.08, 1]);

  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          tag="Closed loop"
          title="From deviation to resolution."
          accentWords={["resolution"]}
          sub="Spin-Q doesn't stop at detection — every deviation is chased to a logged, SLA-tracked resolution."
        />

        <div ref={trackRef} className="mt-16 grid items-start gap-12 lg:grid-cols-2">
          {/* Workflow rail */}
          <div className="relative">
            <div className="absolute bottom-8 left-[33px] top-8 w-px bg-line" aria-hidden />
            <motion.div
              className="absolute left-[33px] top-8 w-px origin-top bg-gradient-to-b from-brand via-purple to-emerald-400"
              style={{ height: "calc(100% - 64px)", scaleY: railScale }}
              aria-hidden
            />
            <ol className="space-y-3">
              {STEPS.map((s, i) => {
                const done = i <= active;
                const current = i === active;
                const last = i === STEPS.length - 1;
                return (
                  <li key={s.title}>
                    <div
                      className={cx(
                        "relative flex items-start gap-4 rounded-2xl border p-4 transition-all duration-500",
                        current
                          ? "border-line2 bg-surface shadow-[0_24px_60px_-28px_rgba(124,77,255,0.45)]"
                          : "border-transparent",
                      )}
                    >
                      <StepNode index={i} done={done} current={current} last={last} />
                      <div className="min-w-0 pt-0.5">
                        <div className="flex items-center gap-2.5">
                          <h3
                            className={cx(
                              "font-display text-[16px] font-semibold transition-colors duration-500",
                              done ? "text-fg" : "text-faint",
                            )}
                          >
                            {s.title}
                          </h3>
                          {current && (
                            <span
                              className={cx(
                                "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em]",
                                last
                                  ? "bg-emerald-500/12 text-emerald-600"
                                  : "bg-brand/10 text-brand",
                              )}
                            >
                              {last ? "Closed" : "In progress"}
                            </span>
                          )}
                        </div>
                        <p
                          className={cx(
                            "mt-1 text-sm leading-relaxed transition-colors duration-500",
                            done ? "text-muted" : "text-faint/70",
                          )}
                        >
                          {s.body}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Phone + SLA board — static while scrolling */}
          <div className="lg:sticky lg:top-28">
            <div className="relative mx-auto max-w-md">
              <div
                className="absolute inset-8 rounded-full bg-gradient-to-tr from-brand/15 to-purple/15 blur-3xl"
                aria-hidden
              />
              <div className="relative">
                {/* Gradient stage card — the arm exits through the card edge */}
                <div className="panel-grad noise relative overflow-hidden rounded-[2rem] shadow-[0_60px_120px_-45px_rgba(44,26,107,0.55)]">
                  <div
                    className="bg-grid-invert absolute inset-0 opacity-40 [mask-image:radial-gradient(90%_80%_at_50%_20%,#000,transparent)]"
                    aria-hidden
                  />
                  <Image
                    src={asset("/spinq/phone-alerts.png")}
                    alt="Spin-Q mobile alerts — plant process warnings with acknowledge actions"
                    width={640}
                    height={595}
                    className="relative mt-6 w-full"
                    sizes="(max-width: 1024px) 100vw, 448px"
                  />
                  <div
                    className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15"
                    aria-hidden
                  />
                </div>
                {/* Notification pop-in */}
                <motion.div
                  key={active >= 1 ? "on" : "off"}
                  initial={{ opacity: 0, y: 14, scale: 0.92 }}
                  animate={
                    active >= 1
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 14, scale: 0.92 }
                  }
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-strong absolute -top-3 left-1/2 flex w-[86%] max-w-[320px] -translate-x-1/2 items-center gap-3 rounded-2xl p-3.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand-glow">
                    <svg viewBox="0 0 16 16" className="h-4.5 w-4.5" fill="none" aria-hidden>
                      <path d="M8 2a4 4 0 0 0-4 4v2.5L2.5 11h11L12 8.5V6a4 4 0 0 0-4-4ZM6.5 13a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-[12.5px] font-semibold text-fg">
                      Quality Alert · {STEPS[Math.min(active, 4)].title}
                    </div>
                    <div className="mt-0.5 truncate text-[11px] text-muted">
                      Evenness Tester · 2 parameters out of limit
                    </div>
                  </div>
                  <span
                    className={cx(
                      "ml-auto shrink-0 rounded-md px-2 py-1 text-[9.5px] font-bold uppercase tracking-wide",
                      active >= 4
                        ? "bg-emerald-500/12 text-emerald-600"
                        : "bg-brand/15 text-brand-glow",
                    )}
                  >
                    {active >= 4 ? "Resolved" : "Open"}
                  </span>
                </motion.div>
              </div>

              {/* SLA board */}
              <Reveal delay={0.15} className="relative -mt-6">
                <div className="glass-strong rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-faint">
                      The SLA board
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                      <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-500" />
                      Open-alert SLA 96%
                    </span>
                  </div>
                  <ul className="mt-4 divide-y divide-line">
                    {SLA_BOARD.map((a) => (
                      <li key={a.title} className="flex items-center gap-3 py-2.5">
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[12.5px] font-semibold text-fg">
                            {a.title}
                          </div>
                          <div className="mt-0.5 truncate text-[10.5px] text-faint">
                            {a.plant}
                          </div>
                        </div>
                        <span
                          className={cx(
                            "shrink-0 text-[11px] font-semibold",
                            a.urgent ? "text-brand-glow" : "text-muted",
                          )}
                        >
                          {a.left}
                        </span>
                        <span className="shrink-0 rounded-md bg-black/[0.05] px-1.5 py-0.5 text-[9.5px] font-bold text-faint">
                          {a.p}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
