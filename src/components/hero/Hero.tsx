"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { heroCallouts, company } from "@/lib/data";
import { Icons } from "@/components/Icons";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

function SceneFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-24 w-24 rounded-full border border-line border-t-brand animate-spin-slow" />
    </div>
  );
}

const stages = [
  { at: 0.12, side: "left" as const },
  { at: 0.42, side: "right" as const },
  { at: 0.72, side: "left" as const },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [stage, setStage] = useState(-1);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    let raf = 0;
    const tick = () => {
      const sec = sectionRef.current;
      const sticky = stickyRef.current;
      if (sec && sticky) {
        const rect = sec.getBoundingClientRect();
        const total = sec.offsetHeight - window.innerHeight;
        const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
        progress.current = p;

        // drive cheap CSS vars (no React re-render)
        sticky.style.setProperty("--p", p.toFixed(4));
        sticky.style.setProperty("--head", String(Math.max(0, 1 - p / 0.16)));

        // discrete callout stage
        let s = -1;
        for (let i = 0; i < stages.length; i++) {
          if (p >= stages[i].at && p < (stages[i + 1]?.at ?? 1.01)) s = i;
        }
        setStage((prev) => (prev === s ? prev : s));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[360vh]"
      aria-label="Interactive product hero"
    >
      <div
        ref={stickyRef}
        className="stage-dark sticky top-0 h-screen w-full overflow-hidden bg-bg grain"
        style={{ ["--p" as string]: 0, ["--head" as string]: 1 }}
      >
        {/* ambient backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-radial-brand opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]" />

        {/* 3D canvas */}
        <div className="absolute inset-0">
          <Scene progress={progress} />
        </div>

        {/* Legibility scrim behind hero text (above canvas, below text) */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[68%] bg-gradient-to-b from-bg via-bg/55 to-transparent md:h-[58%]"
          style={{ opacity: "calc(0.35 + 0.65 * var(--head))" }}
        />

        {/* Top headline — fades out on scroll */}
        <div
          className="absolute inset-x-0 top-0 z-10 flex flex-col items-center px-6 pt-28 text-center md:pt-32"
          style={{
            opacity: "var(--head)",
            transform: "translateY(calc((1 - var(--head)) * -30px))",
          }}
        >
          <p className="eyebrow mb-5 flex items-center gap-2 text-brand">
            <span className="h-px w-8 bg-brand" />
            {company.cert}
            <span className="h-px w-8 bg-brand" />
          </p>
          <h1 className="h-display text-balance text-5xl text-gradient sm:text-6xl md:text-7xl lg:text-[5.6rem]">
            Engineering the future
            <br />
            of the <span className="text-brand-gradient">spinning industry</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted [text-shadow:0_1px_16px_rgba(0,0,0,0.55)] md:text-lg">
            Nachi SpinLyfeX™ retrofits, OEM-level spare parts and onsite technical
            services — from blowroom to ring frame.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
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
        </div>

        {/* Product label — appears after headline fades */}
        <div
          className="pointer-events-none absolute inset-x-0 top-24 z-10 text-center transition-opacity duration-500 md:top-28"
          style={{ opacity: stage >= 0 && !reduced ? 1 : 0 }}
        >
          <p className="eyebrow text-faint">Nachi SpinLyfeX™ · Servo Upgrade MAXX</p>
        </div>

        {/* Scroll-driven feature callouts */}
        {!reduced &&
          heroCallouts.map((c, i) => (
            <Callout key={c.id} active={stage === i} side={stages[i].side} data={c} />
          ))}

        {/* Scroll cue */}
        <div
          className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 text-faint transition-opacity"
          style={{ opacity: "var(--head)" }}
        >
          <span className="text-[0.7rem] uppercase tracking-[0.3em]">Scroll to reveal</span>
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-fg/25">
            <span className="mt-1.5 h-2 w-1 animate-bounce rounded-full bg-fg/50" />
          </span>
        </div>
      </div>
    </section>
  );
}

function Callout({
  active,
  side,
  data,
}: {
  active: boolean;
  side: "left" | "right";
  data: { title: string; body: string };
}) {
  return (
    <div
      className={`absolute top-1/2 z-10 w-[min(20rem,80vw)] -translate-y-1/2 ${
        side === "left" ? "left-6 md:left-16" : "right-6 md:right-16"
      }`}
      style={{
        opacity: active ? 1 : 0,
        transform: `translateY(-50%) translateX(${active ? "0" : side === "left" ? "-16px" : "16px"})`,
        transition: "opacity .6s var(--ease-out-expo), transform .6s var(--ease-out-expo)",
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <div className="glass-strong rounded-2xl p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-brand/60 [animation:pulse-ring_1.6s_ease-out_infinite]" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
          </span>
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-brand">
            Feature
          </span>
        </div>
        <h3 className="font-display text-lg font-semibold leading-tight text-fg">
          {data.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{data.body}</p>
      </div>
    </div>
  );
}
