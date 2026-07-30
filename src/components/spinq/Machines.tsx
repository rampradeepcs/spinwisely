"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { QMark } from "./Nav";
import { Reveal, SectionHeading, Tilt, cx } from "./primitives";

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

function Connector({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 2 40"
      className={cx("mx-auto h-10 w-[2px] text-brand/70", flip && "rotate-180")}
      aria-hidden
    >
      <line
        x1="1"
        y1="0"
        x2="1"
        y2="40"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="3 6"
        strokeLinecap="round"
        className="animate-dash"
      />
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
            src={m.img}
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

        <div className="mt-16">
          {/* Top row */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {TOP.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.07} className="h-full">
                <MachineCard m={m} open={open === m.name} onToggle={() => toggle(m.name)} />
              </Reveal>
            ))}
          </div>

          {/* Connectors + hub */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4">
              {TOP.map((m) => (
                <Connector key={m.name} />
              ))}
            </div>
            <Reveal y={14}>
              <div className="glass relative mx-auto flex max-w-xl items-center justify-center gap-3 overflow-hidden rounded-2xl px-8 py-4">
                <span
                  className="absolute inset-0 bg-gradient-to-r from-brand/10 via-purple/10 to-blue/10"
                  aria-hidden
                />
                <QMark className="h-6 w-6" />
                <span className="font-display text-[15px] font-bold tracking-[0.18em] text-fg">
                  SPIN-Q QUALITY HUB
                </span>
                <span className="relative ml-1 flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>
            </Reveal>
            <div className="grid grid-cols-4">
              {BOTTOM.map((m) => (
                <Connector key={m.name} flip />
              ))}
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
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            {BOTTOM.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.07} className="h-full">
                <MachineCard m={m} open={open === m.name} onToggle={() => toggle(m.name)} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
