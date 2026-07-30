"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Reveal, SectionHeading, cx } from "./primitives";

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

export function Resolution() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.7", "end 0.85"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)));
  });

  const phoneRotate = useTransform(scrollYProgress, [0, 1], [-7, 5]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [30, -30]);

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
            <div className="absolute bottom-5 left-[21px] top-5 w-px bg-line" aria-hidden />
            <motion.div
              className="absolute left-[21px] top-5 w-px origin-top bg-gradient-to-b from-brand via-purple to-emerald-400"
              style={{
                height: "calc(100% - 40px)",
                scaleY: useTransform(scrollYProgress, [0, 1], [0.08, 1]),
              }}
              aria-hidden
            />
            <ol className="space-y-2">
              {STEPS.map((s, i) => {
                const isActive = i <= active;
                const isCurrent = i === active;
                return (
                  <li key={s.title}>
                    <div
                      className={cx(
                        "relative flex gap-5 rounded-2xl p-4 transition-all duration-500",
                        isCurrent && "glass",
                      )}
                    >
                      <span
                        className={cx(
                          "relative z-10 mt-0.5 flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border text-[11px] font-bold transition-all duration-500",
                          isActive
                            ? i === STEPS.length - 1 && isCurrent
                              ? "border-emerald-500 bg-emerald-500/12 text-emerald-600 shadow-[0_0_16px_rgba(16,185,129,0.35)]"
                              : "border-brand bg-brand/15 text-brand-glow shadow-[0_0_16px_rgba(230,54,65,0.28)]"
                            : "border-line bg-surface text-faint",
                        )}
                      >
                        {i === STEPS.length - 1 ? (
                          <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" aria-hidden>
                            <path d="M2 6.5 5 9.5 10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          i + 1
                        )}
                      </span>
                      <div>
                        <h3
                          className={cx(
                            "font-display text-[17px] font-semibold transition-colors duration-500",
                            isActive ? "text-fg" : "text-faint",
                          )}
                        >
                          {s.title}
                        </h3>
                        <p
                          className={cx(
                            "mt-1 text-sm leading-relaxed transition-colors duration-500",
                            isActive ? "text-muted" : "text-faint/70",
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

          {/* Phone + SLA board */}
          <div className="lg:sticky lg:top-28">
            <div className="relative mx-auto max-w-md">
              <div
                className="absolute inset-8 rounded-full bg-gradient-to-tr from-brand/15 to-purple/15 blur-3xl"
                aria-hidden
              />
              <motion.div
                style={reduced ? undefined : { rotate: phoneRotate, y: phoneY }}
                className="relative"
              >
                <Image
                  src="/spinq/phone-alerts.png"
                  alt="Spin-Q mobile alerts — plant process warnings with acknowledge actions"
                  width={640}
                  height={595}
                  className="w-full drop-shadow-[0_40px_50px_rgba(15,18,30,0.35)]"
                  sizes="(max-width: 1024px) 100vw, 448px"
                />
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
              </motion.div>

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
