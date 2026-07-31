"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
} from "react";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/* Section label pill                                                  */
/* ------------------------------------------------------------------ */

export function SectionTag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border border-line2 bg-black/[0.03] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_10px_2px_rgba(230,54,65,0.4)]" />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll reveal — blur-to-sharp rise                                  */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  blur = true,
  once = true,
  className,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  once?: boolean;
  className?: string;
} & HTMLMotionProps<"div">) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={
        reduced
          ? { opacity: 1 }
          : { opacity: 0, y, filter: blur ? "blur(10px)" : "blur(0px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Word-by-word headline reveal                                        */
/* ------------------------------------------------------------------ */

export function WordReveal({
  text,
  className,
  delay = 0,
  accentWords = [],
  accentClass = "text-grad-brand",
  wordClass = "text-grad",
}: {
  text: string;
  className?: string;
  delay?: number;
  accentWords?: string[];
  accentClass?: string;
  /** Gradient/color class applied per word (background-clip doesn't survive nested overflow wrappers). */
  wordClass?: string;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  // No overflow mask, no filter, no clip-painting parent: WebKit smears
  // background-clip:text glyphs when clips/filters animate around them.
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={cx(
            "inline-block",
            accentWords.includes(word.replace(/[.,]/g, "")) ? accentClass : wordClass,
          )}
          initial={
            reduced ? { opacity: 1 } : { opacity: 0, y: "0.55em" }
          }
          whileInView={{ opacity: 1, y: "0em" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Animated counter                                                    */
/* ------------------------------------------------------------------ */

export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  const shown = reduced && inView ? to : value;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic hover wrapper                                              */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.6 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={cx("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 3D tilt card                                                        */
/* ------------------------------------------------------------------ */

export function Tilt({
  children,
  max = 8,
  className,
  glare = true,
}: {
  children: ReactNode;
  max?: number;
  className?: string;
  glare?: boolean;
}) {
  const reduced = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 220,
    damping: 20,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 220,
    damping: 20,
  });
  const glareX = useTransform(px, [0, 1], ["20%", "80%"]);
  const glareY = useTransform(py, [0, 1], ["15%", "85%"]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(340px circle at ${gx} ${gy}, rgba(255,255,255,0.1), transparent 60%)`,
  );

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{
        rotateX: reduced ? 0 : rx,
        rotateY: reduced ? 0 : ry,
        transformStyle: "preserve-3d",
      }}
      className={cx("relative [perspective:1200px]", className)}
    >
      {children}
      {glare && !reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Spotlight card — cursor-tracked border/interior glow                */
/* ------------------------------------------------------------------ */

export function SpotlightCard({
  children,
  className,
  spotColor = "rgba(230, 54, 65, 0.10)",
}: {
  children: ReactNode;
  className?: string;
  spotColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -400, y: -400 });

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onPointerLeave={() => setPos({ x: -400, y: -400 })}
      className={cx("group relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, ${spotColor}, transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading block                                               */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  tag,
  title,
  accentWords = [],
  sub,
  align = "center",
  className,
}: {
  tag: string;
  title: string;
  accentWords?: string[];
  sub?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "relative z-10 flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <Reveal>
        <SectionTag>{tag}</SectionTag>
      </Reveal>
      <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
        <WordReveal text={title} accentWords={accentWords} delay={0.05} />
      </h2>
      {sub && (
        <Reveal delay={0.15}>
          <p
            className={cx(
              "max-w-xl text-base leading-relaxed text-muted sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {sub}
          </p>
        </Reveal>
      )}
    </div>
  );
}
