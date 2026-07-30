"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal, SectionHeading, cx } from "./primitives";

const SLIDES = [
  {
    key: "channel",
    label: "Channel Quality Trends",
    src: "/spinq/dash-channel-trend.png",
    alt: "Channel quality trend — weekly channel averages by department",
  },
  {
    key: "cpk",
    label: "Process Capability",
    src: "/spinq/dash-process-capability.png",
    alt: "Process capability index (Cpk) trend analysis",
  },
  {
    key: "stats",
    label: "Statistical Analysis",
    src: "/spinq/dash-stat-hub.png",
    alt: "Statistical analysis hub — hypothesis testing and variance analysis",
  },
  {
    key: "score",
    label: "Quality Score",
    src: "/spinq/dash-quality-score.png",
    alt: "Spin-Q quality score — daily QC performance report",
  },
];

export function Screens() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setActive((v) => (v + 1) % SLIDES.length), 4600);
    return () => clearInterval(id);
  }, [paused, reduced]);

  return (
    <section id="screens" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mesh-soft absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          tag="Platform screens"
          title="Built for every screen on the floor."
          accentWords={["every"]}
          sub="The same live truth on the lab monitor, the manager's iPad and the technician's phone."
        />

        <div className="relative mt-16 flex items-end justify-center gap-6 lg:gap-10">
          {/* iPad — left */}
          <Reveal delay={0.2} className="hidden w-[220px] shrink-0 lg:block xl:w-[260px]">
            <div className="animate-float-y overflow-hidden rounded-2xl border border-line bg-surface2 shadow-[0_40px_80px_-30px_rgba(15,18,30,0.35)]">
              <Image
                src="/spinq/ipad-stand.jpg"
                alt="Spin-Q testing performance dashboard on a floor-mounted iPad"
                width={520}
                height={390}
                className="w-full"
                sizes="260px"
              />
            </div>
          </Reveal>

          {/* Monitor — center */}
          <Reveal className="w-full max-w-3xl">
            <figure
              className="relative"
              onPointerEnter={() => setPaused(true)}
              onPointerLeave={() => setPaused(false)}
            >
              {/* Bezel */}
              <div className="relative overflow-hidden rounded-2xl border-[10px] border-[#1a1c24] bg-black shadow-[0_70px_140px_-40px_rgba(15,18,30,0.4),inset_0_0_0_1px_rgba(255,255,255,0.06)]">
                <div className="relative aspect-[16/10]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={SLIDES[active].key}
                      initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={SLIDES[active].src}
                        alt={SLIDES[active].alt}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                    </motion.div>
                  </AnimatePresence>
                  {/* Glass reflection */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.09] via-transparent to-transparent"
                    aria-hidden
                  />
                </div>
              </div>
              {/* Stand */}
              <div className="mx-auto h-14 w-16 bg-gradient-to-b from-[#1a1c24] to-[#0d0e14]" aria-hidden />
              <div className="mx-auto h-2 w-44 rounded-full bg-[#1a1c24]" aria-hidden />
              <div
                className="mx-auto mt-3 h-4 w-2/3 rounded-[100%] bg-black/70 blur-xl"
                aria-hidden
              />
              <figcaption className="sr-only">{SLIDES[active].alt}</figcaption>
            </figure>
          </Reveal>

          {/* Phone — right */}
          <Reveal delay={0.3} className="hidden w-[170px] shrink-0 lg:block xl:w-[200px]">
            <div className="animate-float-y [animation-delay:-3s]">
              <Image
                src="/spinq/phone-alerts.png"
                alt="Spin-Q mobile alert feed in hand"
                width={400}
                height={372}
                className="w-full drop-shadow-[0_30px_40px_rgba(15,18,30,0.3)]"
                sizes="200px"
              />
            </div>
          </Reveal>
        </div>

        {/* Slide picker */}
        <Reveal delay={0.15} className="mt-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.key}
                onClick={() => {
                  setActive(i);
                  setPaused(true);
                }}
                aria-pressed={active === i}
                className={cx(
                  "rounded-full border px-4 py-2 text-[12.5px] font-medium transition-all duration-300",
                  active === i
                    ? "border-brand/50 bg-brand/10 text-fg shadow-[0_0_24px_-8px_rgba(230,54,65,0.4)]"
                    : "border-line bg-transparent text-muted hover:border-line2 hover:text-fg",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
