"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BrowserFrame } from "./BrowserFrame";
import { Counter, Reveal, SectionHeading } from "./primitives";
import { asset } from "@/lib/asset";

/* Plant pins — % positions on the dot-matrix world map */
const PLANTS = [
  { name: "Coimbatore · Plant A", x: 67, y: 55, tests: 212, delay: 0 },
  { name: "Indore · Plant B", x: 66, y: 46, tests: 187, delay: 0.9 },
  { name: "Monterrey · Plant C", x: 16.5, y: 43, tests: 164, delay: 1.8 },
  { name: "Izmir · Plant D", x: 53.5, y: 37, tests: 141, delay: 2.7 },
];

/* Dashed arc from plant a to plant b in the same %-coordinate space as the pins */
const arc = (a: (typeof PLANTS)[number], b: (typeof PLANTS)[number], lift: number) =>
  `M${a.x} ${a.y} Q ${(a.x + b.x) / 2} ${(a.y + b.y) / 2 - lift}, ${b.x} ${b.y}`;

const STREAMS = [
  arc(PLANTS[2], PLANTS[0], 24),
  arc(PLANTS[3], PLANTS[1], 9),
  arc(PLANTS[1], PLANTS[0], 3),
];

const BULLETS = [
  {
    title: "One corporate view",
    body: "Leaders running multiple plants see every mill's quality data unified under their corporate dashboard.",
  },
  {
    title: "Cross-plant analytics",
    body: "Compare departments, products and machines across sites — one query, every plant.",
  },
  {
    title: "Overdue alert management",
    body: "Real-time visibility of quality events with SLA tracking and overdue escalation.",
  },
];

export function Enterprise() {
  const zoomRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: zoomRef,
    offset: ["start 0.95", "start 0.35"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.6, 1]);

  return (
    <section id="enterprise" className="relative overflow-hidden py-28 sm:py-36">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          tag="Enterprise scale"
          title="Every plant. One unified dashboard."
          accentWords={["unified"]}
          sub="Real-time cross-plant analytics for corporate quality teams — from a single mill to a global group."
        />

        {/* World map */}
        <Reveal className="mt-16">
          <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
            <div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue/[0.04]"
              aria-hidden
            />
            <div className="relative mx-auto aspect-[4/2.6] max-w-3xl sm:aspect-[4/2.2]">
              {/* Dot-matrix continents */}
              <div
                className="world-mask absolute inset-0 text-slate-400/80"
                style={{
                  // CSS url()s don't get the deploy base path — set the mask here.
                  maskImage: `url(${asset("/world-dots.svg")})`,
                  WebkitMaskImage: `url(${asset("/world-dots.svg")})`,
                }}
                aria-hidden
              />

              {/* Data streams between plants */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full text-purple"
                aria-hidden
              >
                {STREAMS.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.35"
                    strokeDasharray="1.6 2.4"
                    strokeLinecap="round"
                    className="animate-dash opacity-70"
                    style={{ animationDelay: `${-i * 0.8}s` }}
                  />
                ))}
              </svg>

              {/* Plant pins */}
              {PLANTS.map((p) => (
                <div
                  key={p.name}
                  className="group/pin absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span
                    className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 animate-pulse-soft rounded-full bg-brand/25"
                    style={{ animationDelay: `${-p.delay}s` }}
                    aria-hidden
                  />
                  <span className="relative block h-2.5 w-2.5 rounded-full bg-brand shadow-[0_0_14px_2px_rgba(230,54,65,0.5)]" />
                  <div className="glass-strong pointer-events-none absolute bottom-5 left-1/2 z-10 hidden w-max -translate-x-1/2 rounded-xl px-3.5 py-2.5 opacity-0 transition-opacity duration-300 group-hover/pin:opacity-100 sm:block">
                    <div className="text-[11.5px] font-semibold text-fg">{p.name}</div>
                    <div className="mt-0.5 text-[10px] text-faint">
                      {p.tests} tests this week · live
                    </div>
                  </div>
                </div>
              ))}

              {/* Floating KPI cards */}
              <Reveal delay={0.3} y={20} className="absolute left-0 top-[62%] sm:left-[4%]">
                <div className="glass-strong animate-float-y rounded-2xl px-5 py-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-faint">
                    Visibility
                  </div>
                  <div className="mt-1 font-display text-3xl font-bold text-fg">
                    <Counter to={98} suffix="%" />
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted">across 12 plants</div>
                </div>
              </Reveal>
              <Reveal delay={0.45} y={20} className="absolute right-0 top-[16%] sm:right-[6%]">
                <div className="glass-strong animate-float-y rounded-2xl px-5 py-4 [animation-delay:-3.5s]">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-faint">
                    Decisions
                    <svg viewBox="0 0 12 12" className="h-3 w-3 text-emerald-400" fill="none" aria-hidden>
                      <path d="M2 10l4-4 2 2 3-4m0 0H8m3 0v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="mt-1 font-display text-3xl font-bold text-fg">
                    <Counter to={5} suffix="×" />
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted">faster on average</div>
                </div>
              </Reveal>
            </div>

            {/* Bullets */}
            <div className="relative mt-10 grid gap-4 border-t border-line pt-8 sm:grid-cols-3">
              {BULLETS.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.1}>
                  <div className="flex gap-3.5">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/12 text-brand-glow">
                      <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" aria-hidden>
                        <path d="M2.5 7.5 6 11l5.5-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div>
                      <h3 className="font-display text-[15px] font-semibold text-fg">
                        {b.title}
                      </h3>
                      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
                        {b.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Corporate dashboard — scroll zoom */}
        <div ref={zoomRef} className="mt-14">
          <motion.div style={{ scale, opacity }}>
            <BrowserFrame
              src={asset("/spinq/dash-channel-trend.png")}
              alt="Spin-Q channel quality trend — weekly channel averages by department"
              url="app.spinwisely.com/corporate"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
