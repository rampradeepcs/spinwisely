"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/** Inline script (run before paint) that applies the stored theme — prevents FOUC. */
export const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark') document.documentElement.setAttribute('data-theme','dark');
  } catch(e){}
})();
`;

export function ThemeToggle({
  className = "",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const current =
      document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`relative grid h-10 w-10 place-items-center rounded-full border transition-colors ${
        onDark
          ? "border-white/25 text-white hover:bg-white/10"
          : "border-line text-fg hover:bg-surface2"
      } ${className}`}
    >
      <span className="sr-only">Toggle theme</span>
      {/* Sun */}
      <svg
        viewBox="0 0 24 24"
        className="theme-ico absolute h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={{
          opacity: mounted && isDark ? 0 : 1,
          transform: mounted && isDark ? "rotate(-90deg) scale(0.5)" : "none",
        }}
        aria-hidden
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.5M12 19v2.5M4.4 4.4l1.8 1.8M17.8 17.8l1.8 1.8M2.5 12H5M19 12h2.5M4.4 19.6l1.8-1.8M17.8 6.2l1.8-1.8" />
      </svg>
      {/* Moon */}
      <svg
        viewBox="0 0 24 24"
        className="theme-ico absolute h-[18px] w-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          opacity: mounted && isDark ? 1 : 0,
          transform: mounted && isDark ? "none" : "rotate(90deg) scale(0.5)",
        }}
        aria-hidden
      >
        <path d="M20 14.5A8 8 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5Z" />
      </svg>
    </button>
  );
}
