"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ParticleField } from "./ParticleField";
import { BrowserFrame } from "./BrowserFrame";
import { Magnetic, Reveal, SectionTag, WordReveal } from "./primitives";
import { asset } from "@/lib/asset";

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  /* Cursor parallax — normalized -0.5 … 0.5 */
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const px = useSpring(nx, { stiffness: 60, damping: 20 });
  const py = useSpring(ny, { stiffness: 60, damping: 20 });

  const cardL_x = useTransform(px, (v) => v * -34);
  const cardL_y = useTransform(py, (v) => v * -22);
  const cardR_x = useTransform(px, (v) => v * 42);
  const cardR_y = useTransform(py, (v) => v * 26);
  const chipL_x = useTransform(px, (v) => v * 56);
  const chipL_y = useTransform(py, (v) => v * 34);
  const chipR_x = useTransform(px, (v) => v * -48);
  const chipR_y = useTransform(py, (v) => v * -30);
  const main_x = useTransform(px, (v) => v * 10);
  const main_rY = useTransform(px, (v) => v * 4);

  /* Scroll-linked drift of the visual */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    nx.set((e.clientX - r.left) / r.width - 0.5);
    ny.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onPointerMove}
      className="noise relative flex min-h-svh flex-col items-center overflow-hidden pt-36 sm:pt-44"
    >
      {/* Background layers */}
      <div className="mesh-hero absolute inset-0" aria-hidden />
      <div
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(75%_60%_at_50%_30%,#000,transparent)]"
        aria-hidden
      />
      <ParticleField className="absolute inset-0 h-full w-full" />
      <div
        className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-bg"
        aria-hidden
      />

      {/* Copy */}
      <motion.div
        style={{ opacity: copyOpacity }}
        className="relative z-10 flex flex-col items-center px-5 text-center"
      >
        <Reveal delay={0.05} y={16}>
          <SectionTag>Spin-Q Quality Hub · 24/7</SectionTag>
        </Reveal>

        <h1 className="mt-7 font-display text-[13.5vw] font-bold leading-[0.98] tracking-[-0.03em] sm:text-7xl lg:text-[92px]">
          <span className="block">
            <WordReveal text="Quality Analysis." delay={0.15} />
          </span>
          <span className="block">
            <WordReveal
              text="Reimagined."
              delay={0.4}
              accentWords={["Reimagined"]}
            />
          </span>
        </h1>

        <Reveal delay={0.6} className="mt-7 max-w-2xl">
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            <span className="font-semibold text-fg">Collect.</span>{" "}
            <span className="font-semibold text-fg">Analyse.</span>{" "}
            <span className="font-semibold text-fg">Notify.</span>{" "}
            <span className="font-semibold text-brand-glow">Act.</span> — all from
            one intelligent platform. Connect every testing instrument, automate
            quality analysis and detect deviations the instant they happen.
          </p>
        </Reveal>

        <Reveal delay={0.75} className="mt-9">
          <div className="flex flex-col items-center gap-3.5 sm:flex-row">
            <Magnetic>
              <a
                href="#cta"
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-brand px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_44px_-8px_rgba(230,54,65,0.4)] transition-all hover:bg-brand-600 hover:shadow-[0_0_60px_-6px_rgba(230,54,65,0.5)]"
              >
                Book Demo
                <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden>
                  <path d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#screens"
                className="group inline-flex items-center gap-2.5 rounded-2xl border border-line2 bg-black/[0.03] px-7 py-3.5 text-[15px] font-semibold text-fg backdrop-blur transition-colors hover:bg-black/[0.06]"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/10 transition-colors group-hover:bg-brand">
                  <svg viewBox="0 0 10 10" className="ml-0.5 h-2.5 w-2.5" fill="currentColor" aria-hidden>
                    <path d="M1.5 1.2v7.6L8.5 5z" />
                  </svg>
                </span>
                Watch Platform
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </motion.div>

      {/* Floating product visual */}
      <motion.div
        style={{ y: visualY, scale: visualScale }}
        className="relative z-10 mt-16 w-full max-w-6xl px-4 pb-10 sm:mt-20 sm:px-8"
      >
        <div className="relative mx-auto max-w-4xl [perspective:1600px]">
          {/* Glow bed under the dashboard */}
          <div
            className="absolute -inset-x-8 top-8 bottom-0 rounded-[40px] bg-gradient-to-tr from-brand/8 via-purple/8 to-blue/8 blur-3xl"
            aria-hidden
          />

          <Reveal delay={0.45} y={60}>
            <motion.div style={{ x: main_x, rotateY: main_rY, transformStyle: "preserve-3d" }}>
              <motion.div
                initial={reduced ? undefined : { rotateX: 16 }}
                whileInView={{ rotateX: 5 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <BrowserFrame
                  src={asset("/spinq/dash-quality-trends.png")}
                  alt="Spin-Q Quality Hub — historical CVm% quality trend dashboard"
                  priority
                />
              </motion.div>
            </motion.div>
          </Reveal>

          {/* Floating card — Quality Score (left) */}
          <motion.div
            style={{ x: cardL_x, y: cardL_y }}
            className="absolute -left-6 top-[14%] hidden w-[240px] lg:block xl:-left-28 xl:w-[290px]"
          >
            <Reveal delay={0.9} y={40}>
              <div className="animate-float-y overflow-hidden rounded-xl border border-line2 shadow-[0_40px_90px_-30px_rgba(15,18,30,0.35)]">
                <Image
                  src={asset("/spinq/dash-quality-score.png")}
                  alt="Spin-Q Quality Score — 81.8% overall daily QC performance"
                  width={580}
                  height={362}
                  className="w-full"
                  sizes="290px"
                />
              </div>
            </Reveal>
          </motion.div>

          {/* Floating card — Alert management (right) */}
          <motion.div
            style={{ x: cardR_x, y: cardR_y }}
            className="absolute -right-6 bottom-[8%] hidden w-[260px] lg:block xl:-right-32 xl:w-[320px]"
          >
            <Reveal delay={1.05} y={40}>
              <div className="animate-float-y overflow-hidden rounded-xl border border-line2 shadow-[0_40px_90px_-30px_rgba(15,18,30,0.35)] [animation-delay:-3s]">
                <Image
                  src={asset("/spinq/dash-alerts.png")}
                  alt="Spin-Q alert management — SLA-tracked quality alerts"
                  width={640}
                  height={330}
                  className="w-full"
                  sizes="320px"
                />
              </div>
            </Reveal>
          </motion.div>

          {/* Glass KPI chips */}
          <motion.div
            style={{ x: chipL_x, y: chipL_y }}
            className="absolute -top-8 left-[6%] hidden md:block"
          >
            <Reveal delay={1.2} y={24}>
              <div className="glass animate-float-y flex items-center gap-3 rounded-2xl px-4 py-3 [animation-delay:-1.5s]">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue/15 text-blue">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                    <path d="M2 13.5V9M6 13.5V5.5M10 13.5V7.5M14 13.5V2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <div className="text-left">
                  <div className="font-display text-lg font-bold leading-none text-fg">98%</div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-faint">
                    Visibility
                  </div>
                </div>
              </div>
            </Reveal>
          </motion.div>

          <motion.div
            style={{ x: chipR_x, y: chipR_y }}
            className="absolute -top-4 right-[4%] hidden md:block"
          >
            <Reveal delay={1.35} y={24}>
              <div className="glass animate-float-y flex items-center gap-3 rounded-2xl px-4 py-3 [animation-delay:-4.5s]">
                <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand-glow">
                  <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 animate-pulse-soft rounded-full bg-brand" />
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                    <path d="M8 2a4 4 0 0 0-4 4v2.5L2.5 11h11L12 8.5V6a4 4 0 0 0-4-4ZM6.5 13a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className="text-left">
                  <div className="font-display text-sm font-semibold leading-tight text-fg">
                    Deviation detected
                  </div>
                  <div className="mt-0.5 text-[10px] font-medium text-faint">
                    CV% high · Ring Frame · 22m SLA
                  </div>
                </div>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: copyOpacity }}
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-hidden
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-faint">
          Scroll
        </span>
        <div className="h-9 w-[22px] rounded-full border border-line2 p-1">
          <motion.div
            className="mx-auto h-2 w-1 rounded-full bg-muted"
            animate={reduced ? undefined : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
