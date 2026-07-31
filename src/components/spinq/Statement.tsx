"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { WordReveal } from "./primitives";
import { asset } from "@/lib/asset";

/**
 * Editorial interlude — huge display type with product cards drifting
 * across the words as you scroll.
 */
export function Statement() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const xL = useTransform(scrollYProgress, [0, 1], [-90, 70]);
  const yL = useTransform(scrollYProgress, [0, 1], [60, -80]);
  const rL = useTransform(scrollYProgress, [0, 1], [-10, -2]);
  const xR = useTransform(scrollYProgress, [0, 1], [90, -80]);
  const yR = useTransform(scrollYProgress, [0, 1], [-40, 70]);
  const rR = useTransform(scrollYProgress, [0, 1], [8, 2]);
  const yP = useTransform(scrollYProgress, [0, 1], [110, -110]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32 sm:py-48">
      <div className="mesh-soft absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="relative text-center font-display text-[12vw] font-bold leading-[0.96] tracking-[-0.03em] lg:text-[120px]">
          <span className="block">
            <WordReveal text="Every machine" />
          </span>
          <span className="block">
            <WordReveal text="speaks." delay={0.15} />
          </span>
          <span className="block">
            <WordReveal
              text="Spin-Q listens."
              delay={0.3}
              accentWords={["Spin-Q", "listens."]}
            />
          </span>
        </h2>

        {/* Drifting product cards */}
        <motion.div
          style={reduced ? undefined : { x: xL, y: yL, rotate: rL }}
          className="pointer-events-none absolute left-[2%] top-[6%] z-10 w-[190px] sm:w-[240px] lg:left-[6%]"
          aria-hidden
        >
          <div className="overflow-hidden rounded-xl border border-line2 bg-surface shadow-[0_40px_90px_-30px_rgba(15,18,30,0.4)]">
            <Image
              src={asset("/spinq/dash-quality-score.png")}
              alt=""
              width={480}
              height={300}
              className="w-full"
              sizes="240px"
            />
          </div>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { x: xR, y: yR, rotate: rR }}
          className="pointer-events-none absolute right-[2%] top-[38%] z-10 w-[210px] sm:w-[270px] lg:right-[5%]"
          aria-hidden
        >
          <div className="overflow-hidden rounded-xl border border-line2 bg-surface shadow-[0_40px_90px_-30px_rgba(15,18,30,0.4)]">
            <Image
              src={asset("/spinq/dash-alerts.png")}
              alt=""
              width={520}
              height={268}
              className="w-full"
              sizes="270px"
            />
          </div>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { y: yP }}
          className="pointer-events-none absolute bottom-[-6%] left-[16%] z-10 hidden w-[150px] sm:block lg:w-[180px]"
          aria-hidden
        >
          <Image
            src={asset("/spinq/phone-alerts.png")}
            alt=""
            width={360}
            height={334}
            className="w-full drop-shadow-[0_30px_40px_rgba(15,18,30,0.35)]"
            sizes="180px"
          />
        </motion.div>
      </div>
    </section>
  );
}
