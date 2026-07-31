"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { cx } from "./primitives";

const LINKS = [
  { href: "#platform", label: "Platform" },
  { href: "#workflow", label: "Workflow" },
  { href: "#insights", label: "Insights" },
  { href: "#outcomes", label: "Outcomes" },
  { href: "#screens", label: "Screens" },
];

export function QMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle
        cx="32"
        cy="30"
        r="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        className="text-brand"
      />
      <rect
        x="37"
        y="37"
        width="19"
        height="9"
        rx="4.5"
        transform="rotate(45 37 37)"
        fill="currentColor"
        className="text-brand"
      />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-2.5" aria-label="Spinwisely home">
      <QMark className="h-7 w-7 transition-transform duration-500 group-hover:rotate-[360deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-[0.22em] text-fg">
          SPINWISELY
        </span>
        {!compact && (
          <span className="mt-1 hidden whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.3em] text-faint sm:block">
            Spin-Q Quality Hub
          </span>
        )}
      </span>
    </a>
  );
}

/** Floating centered pill nav — icon, links, solid ink CTA. */
export function Nav() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Scroll progress */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-brand via-purple to-blue"
        style={{ scaleX: progress }}
      />

      <div className="flex justify-center px-3">
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong pointer-events-auto mt-4 flex items-center gap-0.5 rounded-2xl p-1.5 shadow-[0_18px_50px_-20px_rgba(15,18,30,0.3)]"
        >
          <a
            href="#top"
            aria-label="Spinwisely home"
            className="group flex items-center gap-2 rounded-xl px-2.5 py-2 transition-colors hover:bg-black/5"
          >
            <QMark className="h-6 w-6 transition-transform duration-500 group-hover:rotate-[360deg]" />
            <span className="hidden font-display text-[12px] font-bold tracking-[0.2em] text-fg min-[420px]:block md:hidden lg:block">
              SPINWISELY
            </span>
          </a>

          <nav className="hidden items-center md:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-xl px-3.5 py-2 text-[13px] font-medium text-muted transition-colors hover:bg-black/5 hover:text-fg"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#cta"
            className="ml-1.5 hidden items-center gap-2 rounded-xl bg-fg px-4.5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-black hover:shadow-[0_10px_28px_-10px_rgba(15,18,30,0.6)] sm:inline-flex"
          >
            Book Demo
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
              <path
                d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-black/5 md:hidden"
          >
            <div className="relative h-3 w-4.5">
              <span
                className={cx(
                  "absolute left-0 top-0 h-[1.5px] w-full bg-fg transition-all duration-300",
                  open && "top-1/2 -translate-y-1/2 rotate-45",
                )}
              />
              <span
                className={cx(
                  "absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-fg transition-opacity duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={cx(
                  "absolute bottom-0 left-0 h-[1.5px] w-full bg-fg transition-all duration-300",
                  open && "bottom-1/2 translate-y-1/2 -rotate-45",
                )}
              />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong pointer-events-auto mx-auto mt-2 w-[min(92vw,360px)] rounded-2xl p-3 md:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="rounded-xl px-4 py-3.5 text-[15px] font-medium text-fg transition-colors hover:bg-black/5"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-fg px-4 py-3.5 text-center text-[15px] font-semibold text-white"
              >
                Book Demo
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
