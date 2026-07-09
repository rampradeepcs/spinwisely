"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/data";

function useCountUp(target: number, run: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return n;
}

function Stat({ value, suffix, label, run }: (typeof stats)[number] & { run: boolean }) {
  const n = useCountUp(value, run);
  return (
    <div className="relative flex flex-col gap-2 px-2 py-6 text-center md:px-6">
      <span className="h-display text-5xl text-fg md:text-6xl">
        {n}
        <span className="text-brand">{suffix}</span>
      </span>
      <span className="text-sm text-faint">{label}</span>
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative z-10 -mt-1 border-y border-line bg-surface/80">
      <div ref={ref} className="container-x">
        <div className="grid grid-cols-2 divide-x divide-y divide-line md:grid-cols-4 md:divide-y-0">
          {stats.map((s) => (
            <Stat key={s.label} {...s} run={run} />
          ))}
        </div>
        <p className="pb-6 text-center text-xs text-faint">
          *Typical electrical maintenance reduction reported with SpinLyfeX auto-leveler retrofits.
        </p>
      </div>
    </section>
  );
}
