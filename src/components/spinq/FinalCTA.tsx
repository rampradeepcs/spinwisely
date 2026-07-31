"use client";

import { motion, useReducedMotion } from "motion/react";
import { ParticleField } from "./ParticleField";
import { Magnetic, Reveal, WordReveal } from "./primitives";

export function FinalCTA() {
  const reduced = useReducedMotion();
  return (
    <section id="cta" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <Reveal y={50}>
          <div className="panel-grad noise relative overflow-hidden rounded-[2rem] px-6 py-20 sm:rounded-[2.75rem] sm:px-12 sm:py-28">
            <div
              className="bg-grid-invert absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_70%_at_50%_50%,#000,transparent)]"
              aria-hidden
            />
            <ParticleField className="absolute inset-0 h-full w-full opacity-70" density={14000} />
            {/* Breathing core glow */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-[540px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,255,255,0.14), rgba(230,54,65,0.12) 40%, transparent 72%)",
              }}
              animate={reduced ? undefined : { scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15" aria-hidden />

            <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-white" />
                  Get started
                </span>
              </Reveal>
              <h2 className="mt-7 font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                <span className="block">
                  <WordReveal text="Ready to modernize" wordClass="text-white" />
                </span>
                <span className="block">
                  <WordReveal
                    text="quality management?"
                    delay={0.25}
                    wordClass="text-white/80"
                  />
                </span>
              </h2>
              <Reveal delay={0.35} className="mt-6 max-w-xl">
                <p className="text-base leading-relaxed text-white/65 sm:text-lg">
                  See Spin-Q Quality Hub live on your own instruments — and watch
                  a deviation close its loop in real time.
                </p>
              </Reveal>
              <Reveal delay={0.5} className="mt-10">
                <div className="flex flex-col items-center gap-3.5 sm:flex-row">
                  <Magnetic>
                    <a
                      href="mailto:info@spinwisely.com?subject=Spin-Q%20Quality%20Hub%20%E2%80%94%20Live%20Demo%20Request"
                      className="group inline-flex items-center gap-2.5 rounded-2xl bg-white px-8 py-4 text-[15px] font-semibold text-[#16102e] shadow-[0_20px_50px_-16px_rgba(0,0,0,0.5)] transition-all hover:shadow-[0_26px_60px_-14px_rgba(0,0,0,0.6)]"
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
                      className="inline-flex items-center gap-2.5 rounded-2xl border border-white/25 bg-white/10 px-8 py-4 text-[15px] font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
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
                <p className="text-xs text-white/50">
                  24/7 platform · Deployed by Nachi Tekneka · Coimbatore, India
                </p>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
