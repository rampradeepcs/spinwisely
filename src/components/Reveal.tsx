"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** stagger index 1–5 → applies reveal-delay-n */
  delay?: 1 | 2 | 3 | 4 | 5;
  as?: keyof React.JSX.IntrinsicElements;
};

/** Fade + rise into view once, using IntersectionObserver. */
export function Reveal({ children, className = "", delay, as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`reveal ${delay ? `reveal-delay-${delay}` : ""} ${seen ? "is-visible" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
