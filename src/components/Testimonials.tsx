"use client";

import { useEffect, useState } from "react";
import { testimonials } from "@/lib/data";
import { Eyebrow } from "./Section";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-brand opacity-30" />
      <div className="container-x">
        <div className="mx-auto max-w-4xl text-center">
          <Eyebrow>Trusted by mills worldwide</Eyebrow>

          <div className="relative mt-10 min-h-[15rem] md:min-h-[13rem]">
            {testimonials.map((t, idx) => (
              <figure
                key={idx}
                className="absolute inset-0 flex flex-col items-center transition-all duration-700"
                style={{
                  opacity: idx === i ? 1 : 0,
                  transform: `translateY(${idx === i ? 0 : 20}px)`,
                  pointerEvents: idx === i ? "auto" : "none",
                }}
              >
                <span className="font-display text-6xl leading-none text-brand/40">“</span>
                <blockquote className="-mt-4 text-balance text-xl font-medium leading-relaxed text-fg md:text-2xl">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold text-fg">{t.author}</span>
                  <span className="mx-2 text-faint">·</span>
                  <span className="text-faint">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2.5">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Testimonial ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === i ? "w-8 bg-brand" : "w-1.5 bg-fg/20 hover:bg-fg/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
