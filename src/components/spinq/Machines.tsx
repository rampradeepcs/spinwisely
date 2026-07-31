"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { QMark } from "./Nav";
import { Reveal, SectionHeading, Tilt, cx } from "./primitives";
import { asset } from "@/lib/asset";

type Machine = {
  name: string;
  img: string;
  detail: string;
  tags: string[];
};

const TOP: Machine[] = [
  {
    name: "Single Yarn Strength Tester",
    img: "/spinq/eq-yarn-strength.png",
    detail: "RKM, elongation and break profiles captured per cop, streamed straight into trend analytics.",
    tags: ["RKM", "Elongation", "Break profile"],
  },
  {
    name: "Fiber Analyser",
    img: "/spinq/eq-fiber-analyser.png",
    detail: "Length, strength, micronaire and maturity — fiber lab results synced automatically.",
    tags: ["Length", "Micronaire", "Maturity"],
  },
  {
    name: "High Volume Fibre Tester",
    img: "/spinq/eq-hvi.png",
    detail: "Full HVI bale profiles parsed from equipment exports and matched to lots.",
    tags: ["HVI", "Bale management"],
  },
  {
    name: "Evenness Tester",
    img: "/spinq/eq-evenness.png",
    detail: "U%, CVm%, imperfections and spectrograms analysed live across every channel.",
    tags: ["CVm%", "IPI", "Spectrogram"],
  },
];

const BOTTOM: Machine[] = [
  {
    name: "Quality Kiosk",
    img: "/spinq/eq-kiosk.png",
    detail: "Touch-first capture of manual tests right on the shop floor — weights, wastes and checks.",
    tags: ["Shop floor", "Touch UI"],
  },
  {
    name: "Sliver & Roving Wrap Reel",
    img: "/spinq/eq-wrap-reel.png",
    detail: "Sliver and roving wrappings with instant hank and CV% computation — no calculators.",
    tags: ["Sliver weight", "Hank"],
  },
  {
    name: "Yarn Wrap Reel",
    img: "/spinq/eq-yarn-reel.png",
    detail: "Count and skein strength testing with automatic count-CV and realisation tracking.",
    tags: ["Count", "Skein strength"],
  },
  {
    name: "Yarn Twist Tester",
    img: "/spinq/eq-twist.png",
    detail: "TPI/TPM twist results logged against machine, lot and count for drift detection.",
    tags: ["TPI / TPM", "Twist CV"],
  },
];

/**
 * Curved spokes from every machine card to the central hub medallion.
 * Anchors are measured from static wrappers (unaffected by entrance
 * transforms) and recomputed when the diagram resizes, e.g. when a
 * card expands.
 */
function ConnectorLayer({
  diagramRef,
  cardRefs,
  hubRef,
}: {
  diagramRef: React.RefObject<HTMLDivElement | null>;
  cardRefs: React.RefObject<(HTMLDivElement | null)[]>;
  hubRef: React.RefObject<HTMLDivElement | null>;
}) {
  const reduced = useReducedMotion();
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    const root = diagramRef.current;
    if (!root) return;

    const compute = () => {
      const hub = hubRef.current;
      if (!hub) return;
      const c = root.getBoundingClientRect();
      const h = hub.getBoundingClientRect();
      if (h.width === 0) {
        setPaths([]);
        return;
      }
      const hx = h.left + h.width / 2 - c.left;
      const hy = h.top + h.height / 2 - c.top;
      const r = h.width / 2 + 8;
      const next: string[] = [];
      for (const card of cardRefs.current ?? []) {
        if (!card) continue;
        const b = card.getBoundingClientRect();
        const isTop = b.top + b.height / 2 - c.top < hy;
        const x = b.left + b.width / 2 - c.left;
        const y = (isTop ? b.bottom : b.top) - c.top;
        const dx = x - hx;
        const dy = y - hy;
        const len = Math.hypot(dx, dy) || 1;
        const ex = hx + (dx / len) * r;
        const ey = hy + (dy / len) * r;
        const my = (y + ey) / 2;
        next.push(`M ${x} ${y} C ${x} ${my}, ${ex} ${my}, ${ex} ${ey}`);
      }
      setPaths(next);
    };

    const raf = requestAnimationFrame(compute);
    // Late recompute — dev CSS can apply after mount, leaving the hub 0-wide
    // on the first pass.
    const settle = setTimeout(compute, 600);
    const ro = new ResizeObserver(() => compute());
    ro.observe(root);
    if (hubRef.current) ro.observe(hubRef.current);
    window.addEventListener("resize", compute);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [diagramRef, cardRefs, hubRef]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
      aria-hidden
    >
      <defs>
        <linearGradient id="hub-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e63641" />
          <stop offset="0.55" stopColor="#7c4dff" />
          <stop offset="1" stopColor="#3b6ff0" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <g key={i}>
          <path
            d={d}
            fill="none"
            stroke="url(#hub-line)"
            strokeWidth="1.5"
            strokeDasharray="4 7"
            strokeLinecap="round"
            className="animate-dash"
            style={{ animationDelay: `${-i * 0.35}s` }}
            opacity="0.55"
          />
          {!reduced && (
            <circle r="3" fill="#e63641" opacity="0.85">
              <animateMotion
                dur={`${3 + (i % 4) * 0.7}s`}
                begin={`${i * 0.45}s`}
                repeatCount="indefinite"
                path={d}
              />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
}

function MachineCard({
  m,
  open,
  onToggle,
}: {
  m: Machine;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <Tilt max={7} className="group h-full">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className={cx(
          "flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-surface text-left transition-all duration-300",
          open
            ? "border-brand/50 shadow-[0_0_50px_-15px_rgba(230,54,65,0.3)]"
            : "border-line hover:border-line2 hover:shadow-[0_0_50px_-18px_rgba(124,77,255,0.25)]",
        )}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[radial-gradient(80%_75%_at_50%_38%,#eef0f6_0%,#fbfbfd_100%)]">
          <div
            className="absolute inset-x-6 bottom-4 h-3 rounded-[100%] bg-black/12 blur-md transition-opacity duration-500 group-hover:opacity-70"
            aria-hidden
          />
          <Image
            src={asset(m.img)}
            alt={m.name}
            fill
            className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 270px"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-[14.5px] font-semibold leading-snug text-fg">
              {m.name}
            </h3>
            <span
              className={cx(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line text-faint transition-transform duration-300",
                open && "rotate-45 border-brand/50 text-brand-glow",
              )}
              aria-hidden
            >
              <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none">
                <path d="M5 1.5v7M1.5 5h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
          </div>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="pt-2 text-[13px] leading-relaxed text-muted">{m.detail}</p>
                <div className="flex flex-wrap gap-1.5 pt-3">
                  {m.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[10.5px] font-medium text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </Tilt>
  );
}

export function Machines() {
  const [open, setOpen] = useState<string | null>(null);
  const toggle = (name: string) => setOpen((v) => (v === name ? null : name));

  const diagramRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section id="platform" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mesh-soft absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          tag="Instrument ecosystem"
          title="Every machine. One platform."
          accentWords={["One"]}
          sub="Spin-Q integrates lab equipment from all leading brands — every tester becomes a live signal. Tap a card to see what it streams."
        />

        <div ref={diagramRef} className="relative mt-16">
          <ConnectorLayer diagramRef={diagramRef} cardRefs={cardRefs} hubRef={hubRef} />

          {/* Top row */}
          <div className="relative z-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {TOP.map((m, i) => (
              <div
                key={m.name}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="h-full"
              >
                <Reveal delay={i * 0.07} className="h-full">
                  <MachineCard m={m} open={open === m.name} onToggle={() => toggle(m.name)} />
                </Reveal>
              </div>
            ))}
          </div>

          {/* Central hub medallion */}
          <div className="relative z-10 my-12 hidden justify-center lg:flex">
            <div
              ref={hubRef}
              className="h-36 w-36 rounded-full bg-[conic-gradient(from_140deg,#e63641,#7c4dff,#3b6ff0,#e63641)] p-[2.5px] shadow-[0_28px_70px_-28px_rgba(124,77,255,0.55)]"
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-full bg-white">
                <QMark className="h-9 w-9" />
                <span className="font-display text-[11px] font-bold tracking-[0.2em] text-fg">
                  SPIN-Q
                </span>
                <span className="flex items-center gap-1.5 text-[8.5px] font-semibold uppercase tracking-[0.16em] text-emerald-600">
                  <span className="h-1 w-1 animate-pulse-soft rounded-full bg-emerald-500" />
                  Hub · Live
                </span>
              </div>
            </div>
          </div>

          {/* Mobile hub divider */}
          <div className="my-6 flex items-center justify-center gap-3 lg:hidden">
            <QMark className="h-5 w-5" />
            <span className="font-display text-xs font-bold tracking-[0.18em] text-fg">
              SPIN-Q QUALITY HUB
            </span>
          </div>

          {/* Bottom row */}
          <div className="relative z-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {BOTTOM.map((m, i) => (
              <div
                key={m.name}
                ref={(el) => {
                  cardRefs.current[TOP.length + i] = el;
                }}
                className="h-full"
              >
                <Reveal delay={i * 0.07} className="h-full">
                  <MachineCard m={m} open={open === m.name} onToggle={() => toggle(m.name)} />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
