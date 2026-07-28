"use client";

import { useEffect, useState } from "react";
import { company, offices } from "@/lib/data";
import { Logo } from "./Logo";

/**
 * Temporary pre-launch gate. Covers the entire site until launch.
 *
 * To remove: delete <ComingSoon /> from src/app/layout.tsx (or set
 * ENABLED to false). As a safety net it also hides itself automatically
 * once the launch date has passed.
 */
const ENABLED = true;
const LAUNCH = new Date("2026-08-03T00:00:00+05:30");

export function ComingSoon() {
  const [visible, setVisible] = useState(ENABLED);

  useEffect(() => {
    if (Date.now() >= LAUNCH.getTime()) setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    // Lock <html> (the Navbar manages body overflow for its own menu).
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [visible]);

  if (!visible) return null;

  const hq = offices[0];

  return (
    <div
      className="fixed inset-0 z-[500] overflow-y-auto bg-bg"
      role="dialog"
      aria-modal="true"
      aria-label="Website coming soon"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-radial-brand opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]" />

      <div className="relative flex min-h-full flex-col items-center justify-center px-6 py-16 text-center">
        <div className="text-fg">
          <Logo />
        </div>

        <p className="eyebrow mt-10 flex items-center gap-2 text-brand">
          <span className="h-px w-8 bg-brand" />
          {company.cert}
          <span className="h-px w-8 bg-brand" />
        </p>

        <h1 className="h-display mt-5 text-balance text-5xl text-gradient sm:text-6xl md:text-7xl">
          Coming <span className="text-brand-gradient">soon</span>
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted md:text-lg">
          {company.brandLine} — Nachi SpinLyfeX™ retrofits, OEM-level spare parts
          and onsite technical services, from blowroom to ring frame.
        </p>

        <p className="mt-8 rounded-full border border-brand/30 bg-brand/[0.06] px-6 py-2.5 text-sm font-semibold text-brand">
          We are launching our website on 03 August 2026
        </p>

        {/* Contacts */}
        <div className="mt-12 grid w-full max-w-2xl gap-3 text-sm sm:grid-cols-3">
          <a
            href={`tel:${company.mobile.replace(/\s/g, "")}`}
            className="rounded-xl border border-line bg-surface/60 p-4 transition-colors hover:border-brand/40"
          >
            <p className="text-xs uppercase tracking-wide text-faint">Call us</p>
            <p className="mt-1 font-semibold text-fg">{company.mobile}</p>
          </a>
          <a
            href={`mailto:${company.email}`}
            className="rounded-xl border border-line bg-surface/60 p-4 transition-colors hover:border-brand/40"
          >
            <p className="text-xs uppercase tracking-wide text-faint">Email</p>
            <p className="mt-1 font-semibold text-fg">{company.email}</p>
          </a>
          <a
            href={`https://wa.me/${company.mobile.replace(/[^\d]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-line bg-surface/60 p-4 transition-colors hover:border-brand/40"
          >
            <p className="text-xs uppercase tracking-wide text-faint">WhatsApp</p>
            <p className="mt-1 font-semibold text-fg">{company.mobile}</p>
          </a>
        </div>

        <p className="mt-8 max-w-md text-xs leading-relaxed text-faint">
          {hq.role} · {hq.address.join(" ")}
        </p>
      </div>
    </div>
  );
}
