"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: "red" | "blue" | "purple";
};

type Pulse = {
  a: number;
  b: number;
  t: number;
  speed: number;
};

const COLORS = {
  red: "230, 54, 65",
  blue: "59, 111, 240",
  purple: "124, 77, 255",
} as const;

/**
 * Novu-style particle network: drifting nodes, proximity connections and
 * glowing signal pulses travelling along the links. Canvas 2D — cheap,
 * paused offscreen, static under reduced motion.
 */
export function ParticleField({
  density = 9000,
  maxParticles = 110,
  linkDist = 130,
  mouse = true,
  className,
}: {
  /** One particle per `density` px². Lower = denser. */
  density?: number;
  maxParticles?: number;
  linkDist?: number;
  mouse?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    let particles: Particle[] = [];
    let pulses: Pulse[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    const pointer = { x: -9999, y: -9999 };

    const pick = (): Particle["hue"] => {
      const r = Math.random();
      return r < 0.2 ? "red" : r < 0.6 ? "blue" : "purple";
    };

    const seed = () => {
      const count = Math.min(maxParticles, Math.round((width * height) / density));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 0.8 + Math.random() * 1.5,
        hue: pick(),
      }));
      pulses = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduced) draw(); // render one static frame
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist * linkDist) {
            const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.14;
            ctx.strokeStyle = `rgba(110, 118, 145, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const p of particles) {
        ctx.fillStyle = `rgba(${COLORS[p.hue]}, 0.55)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Signal pulses
      for (const s of pulses) {
        const a = particles[s.a];
        const b = particles[s.b];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * s.t;
        const y = a.y + (b.y - a.y) * s.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
        g.addColorStop(0, "rgba(230, 54, 65, 0.75)");
        g.addColorStop(1, "rgba(230, 54, 65, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Gentle attraction toward the pointer
        if (mouse) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 160 * 160 && d2 > 1) {
            const f = 0.012 / Math.sqrt(d2);
            p.vx += dx * f;
            p.vy += dy * f;
          }
        }

        // Speed cap + wrap
        const sp = Math.hypot(p.vx, p.vy);
        if (sp > 0.5) {
          p.vx = (p.vx / sp) * 0.5;
          p.vy = (p.vy / sp) * 0.5;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      // Spawn / advance pulses
      if (pulses.length < 6 && Math.random() < 0.05 && particles.length > 1) {
        const a = Math.floor(Math.random() * particles.length);
        let b = -1;
        let best = Infinity;
        for (let j = 0; j < particles.length; j++) {
          if (j === a) continue;
          const dx = particles[a].x - particles[j].x;
          const dy = particles[a].y - particles[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < best && d2 < linkDist * linkDist * 2.5) {
            best = d2;
            b = j;
          }
        }
        if (b >= 0) pulses.push({ a, b, t: 0, speed: 0.008 + Math.random() * 0.01 });
      }
      pulses = pulses.filter((s) => (s.t += s.speed) < 1);

      draw();
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "80px" },
    );
    io.observe(canvas);

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    if (mouse && !reduced) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [density, maxParticles, linkDist, mouse]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
