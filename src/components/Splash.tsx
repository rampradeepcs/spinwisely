"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "./Loader";

/**
 * Initial-load splash showing the animated NT loader, then fades away.
 * The CSS `.splash` animation guarantees it hides even if JS is slow;
 * this effect removes it from the DOM after it has faded.
 */
export function Splash() {
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let done = false;
    const remove = () => {
      if (done) return;
      done = true;
      setGone(true);
    };
    const el = ref.current;
    el?.addEventListener("animationend", remove, { once: true });
    // Safety fallback in case animationend never fires.
    const t = setTimeout(remove, 3500);
    return () => {
      clearTimeout(t);
      el?.removeEventListener("animationend", remove);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={ref}
      className="splash fixed inset-0 z-[300] grid place-items-center bg-bg"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-7">
        <Loader size={104} />
        <span className="font-display text-sm font-medium tracking-tight text-muted">
          nachi <span className="text-fg">tekneka</span>
        </span>
      </div>
    </div>
  );
}
