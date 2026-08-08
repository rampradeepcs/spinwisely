"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Reveal, SectionHeading } from "./primitives";

const STEPS = [
  {
    title: "Book Demo",
    body: "A 30-minute walkthrough on your own quality data, not a canned deck.",
    meta: "Day 0",
  },
  {
    title: "Connect Instruments",
    body: "We wire every tester and register into Spin-Q in a single day — all leading brands supported.",
    meta: "Day 1",
  },
  {
    title: "Import Existing Data",
    body: "Your historical registers and spreadsheets come along, parsed automatically overnight.",
    meta: "Day 2",
  },
  {
    title: "AI Learns",
    body: "Baselines, control limits and alert rules tune themselves to your process in under 48 hours.",
    meta: "Day 3–4",
  },
  {
    title: "Go Live",
    body: "Dashboards, mobile alerts and scheduled reports switch on for every team.",
    meta: "Day 5",
  },
  {
    title: "Continuous Optimization",
    body: "Quality scores climb as every closed loop teaches the next one.",
    meta: "Ongoing",
  },
];

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.6"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const lineScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="relative overflow-hidden py-28 sm:py-36">
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading
          tag="Customer journey"
          title="Live in days. Not quarters."
          accentWords={["days."]}
          sub="Just 5 days to go live from start — a proven onboarding path from first demo to a continuously improving mill."
        />

        <div ref={ref} className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute bottom-6 left-[27px] top-6 w-px bg-line sm:left-1/2" aria-hidden />
          <motion.div
            className="absolute bottom-6 left-[27px] top-6 w-px origin-top bg-gradient-to-b from-brand via-purple to-blue shadow-[0_0_14px_rgba(124,77,255,0.45)] sm:left-1/2"
            style={{ scaleY: lineScale }}
            aria-hidden
          />
          <ol className="space-y-10">
            {STEPS.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <li key={s.title} className="relative">
                  <Reveal delay={0.05} y={26}>
                    <div
                      className={`flex items-start gap-6 sm:gap-0 ${
                        right ? "sm:flex-row-reverse" : ""
                      }`}
                    >
                      {/* Node */}
                      <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-white font-display text-sm font-bold text-fg shadow-[0_10px_24px_-14px_rgba(15,18,30,0.3)] sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                        {String(i + 1).padStart(2, "0")}
                        <span
                          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand/10 to-purple/10"
                          aria-hidden
                        />
                      </span>
                      {/* Card */}
                      <div
                        className={`w-full sm:w-[calc(50%-52px)] ${
                          right ? "sm:mr-auto sm:text-right" : "sm:ml-auto"
                        }`}
                      >
                        <div className="group rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:border-line2 hover:shadow-[0_0_40px_-18px_rgba(124,77,255,0.28)]">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-glow">
                            {s.meta}
                          </span>
                          <h3 className="mt-2 font-display text-lg font-semibold text-fg">
                            {s.title}
                          </h3>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted">
                            {s.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
