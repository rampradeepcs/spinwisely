"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Soft ambient glow that trails the pointer across the whole page.
 * Desktop pointers only; disabled for touch and reduced motion.
 */
export function CursorGlow() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.7 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.7 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      // Mounting on first movement keeps the effect body state-free.
      setEnabled(true);
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(closest-side, rgba(124,77,255,0.07), rgba(59,111,240,0.035) 45%, transparent 70%)",
      }}
    />
  );
}
