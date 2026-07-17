"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides, company } from "@/lib/data";
import { Icons } from "@/components/Icons";

const AUTOPLAY_MS = 5500;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  const go = useCallback((next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (paused || reduced.current) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused]);

  const slide = heroSlides[index];

  return (
    <section
      id="top"
      aria-label="Nachi Tekneka highlights"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-bg grain"
    >
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-radial-brand opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]" />

      <div className="container-x relative flex flex-1 flex-col justify-center gap-10 pb-16 pt-28 md:gap-12 md:pt-32 lg:flex-row lg:items-center lg:gap-14">
        {/* Copy */}
        <div className="flex max-w-2xl flex-col items-start lg:flex-1">
          <p className="eyebrow mb-5 flex items-center gap-2 text-brand">
            <span className="h-px w-8 bg-brand" />
            {company.cert}
          </p>
          <h1 className="h-display text-balance text-5xl text-gradient sm:text-6xl lg:text-7xl">
            Engineering the future of the{" "}
            <span className="text-brand-gradient">spinning industry</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">
            Nachi SpinLyfeX™ retrofits, OEM-level spare parts and onsite technical
            services — from blowroom to ring frame.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="/spinlyfex"
              className="shine group inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              Explore SpinLyfeX
              <Icons.arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/contact"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-7 text-sm font-semibold text-fg transition-colors hover:bg-surface2"
            >
              Request a quote
            </a>
          </div>

          {/* trust strip */}
          <dl className="mt-12 hidden grid-cols-3 gap-8 border-t border-line pt-6 sm:grid">
            {[
              ["500+", "Trusted customers"],
              ["3", "Countries, one network"],
              ["ISO", "9001:2015 certified"],
            ].map(([v, l]) => (
              <div key={l} className="flex flex-col">
                <dt className="order-last text-xs uppercase tracking-[0.16em] text-faint">{l}</dt>
                <dd className="font-display text-2xl font-semibold text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Carousel */}
        <div
          className="w-full max-w-xl lg:flex-1"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Products and services"
            className="glass-strong relative overflow-hidden rounded-3xl shadow-card"
          >
            {/* slide viewport */}
            <div className="relative">
              <div
                className="flex transition-transform duration-700"
                style={{
                  transform: `translateX(-${index * 100}%)`,
                  transitionTimingFunction: "var(--ease-out-expo)",
                }}
              >
                {heroSlides.map((s, i) => (
                  <div
                    key={s.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${heroSlides.length}: ${s.title}`}
                    aria-hidden={i !== index}
                    className="w-full shrink-0"
                  >
                    <div className="relative m-4 mb-0 overflow-hidden rounded-2xl bg-white">
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-1"
                        style={{ background: s.accent }}
                      />
                      <Image
                        src={s.img}
                        alt={s.title}
                        width={1160}
                        height={640}
                        priority={i === 0}
                        className="aspect-[16/9] w-full object-contain p-4"
                      />
                    </div>
                    <div className="p-6 md:p-7">
                      <p
                        className="text-[0.68rem] font-semibold uppercase tracking-[0.22em]"
                        style={{ color: s.accent }}
                      >
                        {s.kicker}
                      </p>
                      <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-fg">
                        {s.title}
                      </h2>
                      <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-faint">
                        {s.fit}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
                      <a
                        href={s.href}
                        tabIndex={i === index ? 0 : -1}
                        className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
                      >
                        {s.cta}
                        <Icons.arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* controls */}
            <div className="flex items-center justify-between border-t border-line px-6 py-4">
              <div className="flex items-center gap-2">
                {heroSlides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`Go to slide ${i + 1}: ${s.title}`}
                    aria-current={i === index}
                    onClick={() => go(i)}
                    className="group flex h-6 items-center"
                  >
                    <span
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === index
                          ? "w-7 bg-brand"
                          : "w-1.5 bg-fg/25 group-hover:bg-fg/50"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={() => go(index - 1)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg transition-colors hover:bg-surface2"
                >
                  <Icons.arrow className="h-4 w-4 rotate-180" />
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={() => go(index + 1)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-fg transition-colors hover:bg-surface2"
                >
                  <Icons.arrow className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
