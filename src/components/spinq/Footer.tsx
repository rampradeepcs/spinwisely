"use client";

import { useState } from "react";
import { Wordmark } from "./Nav";

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Platform", href: "#platform" },
      { label: "Workflow", href: "#workflow" },
      { label: "Insights", href: "#insights" },
      { label: "Outcomes", href: "#outcomes" },
      { label: "Platform Screens", href: "#screens" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Spinning Mills", href: "#platform" },
      { label: "Corporate Groups", href: "#enterprise" },
      { label: "Quality Labs", href: "#platform" },
      { label: "Multi-Plant Analytics", href: "#enterprise" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Book a Demo", href: "#cta" },
      { label: "Customer Journey", href: "#journey" },
      { label: "Feature List", href: "#features" },
      { label: "Contact", href: "mailto:info@spinwisely.com" },
    ],
  },
];

function Social({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-muted transition-all hover:border-line2 hover:bg-black/5 hover:text-fg"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative border-t border-line bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          {/* Brand + newsletter */}
          <div>
            <Wordmark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Spin-Q Quality Hub — real-time quality intelligence for spinning
              mills. Collect. Analyse. Notify. Act.
            </p>
            <form
              className="mt-7"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `mailto:info@spinwisely.com?subject=Spin-Q%20Updates&body=${encodeURIComponent(
                  `Please add ${email || "me"} to the Spin-Q product updates list.`,
                )}`;
              }}
            >
              <label
                htmlFor="newsletter"
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-faint"
              >
                Product updates
              </label>
              <div className="mt-2.5 flex max-w-sm overflow-hidden rounded-xl border border-line bg-white shadow-[0_2px_10px_-4px_rgba(15,18,30,0.1)] focus-within:border-line2">
                <input
                  id="newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="work email"
                  className="w-full bg-transparent px-4 py-3 text-sm text-fg outline-none placeholder:text-faint"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div className="mt-7 flex gap-2.5">
              <Social label="Spinwisely on LinkedIn" href="https://www.linkedin.com/search/results/companies/?keywords=spinwisely">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M3.6 2.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0ZM1.4 5h2.4v9H1.4V5Zm4.3 0h2.3v1.2h.1c.3-.6 1.1-1.3 2.3-1.3 2.5 0 3 1.6 3 3.8V14h-2.4V9.3c0-1.1 0-2.6-1.6-2.6S7.6 8 7.6 9.2V14H5.7V5Z" />
                </svg>
              </Social>
              <Social label="Spinwisely on YouTube" href="https://www.youtube.com/results?search_query=spinwisely+spin-q">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M15.3 4.6a1.9 1.9 0 0 0-1.3-1.3C12.8 3 8 3 8 3s-4.8 0-6 .3A1.9 1.9 0 0 0 .7 4.6 19.6 19.6 0 0 0 .4 8c0 1.2.1 2.3.3 3.4.2.6.7 1.1 1.3 1.3 1.2.3 6 .3 6 .3s4.8 0 6-.3a1.9 1.9 0 0 0 1.3-1.3c.2-1.1.3-2.2.3-3.4 0-1.2-.1-2.3-.3-3.4ZM6.5 10.1V5.9L10.5 8l-4 2.1Z" />
                </svg>
              </Social>
              <Social label="Contact Spinwisely by email" href="mailto:info@spinwisely.com">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
                  <path d="M2 4.5A1.5 1.5 0 0 1 3.5 3h9A1.5 1.5 0 0 1 14 4.5v7A1.5 1.5 0 0 1 12.5 13h-9A1.5 1.5 0 0 1 2 11.5v-7Zm.7.5 4.7 3.4a1 1 0 0 0 1.2 0L13.3 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </Social>
            </div>
          </div>

          {/* Link columns + contacts */}
          <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">
            {COLS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-muted transition-colors hover:text-fg"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-faint">
                Company
              </h3>
              <ul className="mt-4 space-y-4 text-sm text-muted">
                <li>
                  <span className="block font-semibold text-fg">Spinwisely LLC</span>
                  <span className="mt-0.5 block text-[13px]">Developed in USA 🇺🇸</span>
                  <a
                    href="mailto:info@spinwisely.com"
                    className="mt-1 block text-[13px] text-brand-glow hover:underline"
                  >
                    info@spinwisely.com
                  </a>
                </li>
                <li>
                  <span className="block font-semibold text-fg">Nachi Tekneka</span>
                  <span className="mt-0.5 block text-[13px]">
                    Globally licensed · Coimbatore, India 🇮🇳
                  </span>
                  <a
                    href="mailto:info@nachitekneka.com"
                    className="mt-1 block text-[13px] text-brand-glow hover:underline"
                  >
                    info@nachitekneka.com
                  </a>
                  <a href="tel:+914222670091" className="mt-1 block text-[13px] hover:text-fg">
                    +91 422 267 0091
                  </a>
                  <a href="tel:+919600309320" className="block text-[13px] hover:text-fg">
                    +91 9600 309 320
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 sm:flex-row">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} Spinwisely LLC. All rights reserved.
          </p>
          <p className="text-xs text-faint">
            Powered by <span className="text-muted">Spinwisely</span> · Delivered by{" "}
            <span className="text-muted">Nachi Tekneka</span> ·{" "}
            <a href="https://www.spinwisely.com" className="hover:text-fg">
              www.spinwisely.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
