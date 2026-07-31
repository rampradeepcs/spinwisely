"use client";

import { motion, useReducedMotion } from "motion/react";
import { ParticleField } from "./ParticleField";
import { Magnetic, Reveal, SectionTag, WordReveal } from "./primitives";

export function FinalCTA() {
  const reduced = useReducedMotion();
  return (
    <section id="cta" className="noise relative overflow-hidden py-32 sm:py-44">
      <ParticleField className="absolute inset-0 h-full w-full" density={12000} />
      <div
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_50%,#000,transparent)]"
        aria-hidden
      />
      {/* Breathing core glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[540px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(230,54,65,0.10), rgba(124,77,255,0.07) 45%, transparent 72%)",
        }}
        animate={reduced ? undefined : { scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
        <Reveal>
          <SectionTag>Get started</SectionTag>
        </Reveal>
        <h2 className="mt-7 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="block">
            <WordReveal text="Ready to modernize" />
          </span>
          <span className="block">
            <WordReveal
              text="quality management?"
              delay={0.25}
              accentWords={["quality"]}
            />
          </span>
        </h2>
        <Reveal delay={0.35} className="mt-6 max-w-xl">
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            See Spin-Q Quality Hub live on your own instruments — and watch a
            deviation close its loop in real time.
          </p>
        </Reveal>
        <Reveal delay={0.5} className="mt-10">
          <div className="flex flex-col items-center gap-3.5 sm:flex-row">
            <Magnetic>
              <a
                href="mailto:info@spinwisely.com?subject=Spin-Q%20Quality%20Hub%20%E2%80%94%20Live%20Demo%20Request"
                className="group inline-flex items-center gap-2.5 rounded-2xl bg-brand px-8 py-4 text-[15px] font-semibold text-white shadow-[0_0_54px_-8px_rgba(230,54,65,0.45)] transition-all hover:bg-brand-600 hover:shadow-[0_0_70px_-4px_rgba(230,54,65,0.5)]"
              >
                Book Live Demo
                <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" aria-hidden>
                  <path d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="tel:+919600309320"
                className="inline-flex items-center gap-2.5 rounded-2xl border border-line2 bg-black/[0.03] px-8 py-4 text-[15px] font-semibold text-fg backdrop-blur transition-colors hover:bg-black/[0.06]"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                  <path d="M3 2.5h3l1.3 3.2-1.6 1.2a10 10 0 0 0 3.4 3.4l1.2-1.6 3.2 1.3v3a1 1 0 0 1-1.1 1A12.4 12.4 0 0 1 2 3.6a1 1 0 0 1 1-1.1Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                </svg>
                Talk to an Expert
              </a>
            </Magnetic>
          </div>
        </Reveal>
        <Reveal delay={0.65} className="mt-8">
          <p className="text-xs text-faint">
            24/7 platform · Deployed by Nachi Tekneka · Coimbatore, India
          </p>
        </Reveal>
      </div>
    </section>
  );
}
