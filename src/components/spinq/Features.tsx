"use client";

import { Reveal, SectionHeading, SpotlightCard } from "./primitives";

const FEATURES = [
  {
    title: "Equipment Integration",
    body: "Lab data import & sync — automated file parsing from every instrument export.",
    icon: <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />,
    tint: "text-blue",
    bg: "bg-blue/12",
    spot: "rgba(59, 111, 240, 0.10)",
  },
  {
    title: "SPC Analytics",
    body: "Control charts and rule-based deviation detection on every stream.",
    icon: <path d="M3 20h18M5 17V9m4.5 8v-6m4.5 6V7m4.5 10v-4M4 5.5c3-2 5 2 8 0s5 2 8 0" />,
    tint: "text-purple",
    bg: "bg-purple/12",
    spot: "rgba(124, 77, 255, 0.10)",
  },
  {
    title: "Real-time Alerts",
    body: "Instant out-of-limit notifications with SLA tracking and escalation.",
    icon: <path d="M12 3a5 5 0 0 0-5 5v3.5L5 15h14l-2-3.5V8a5 5 0 0 0-5-5Zm-2.5 15a2.5 2.5 0 0 0 5 0M18 4l2 2M6 4 4 6" />,
    tint: "text-brand-glow",
    bg: "bg-brand/12",
    spot: "rgba(230, 54, 65, 0.10)",
  },
  {
    title: "Cross-Plant Analytics",
    body: "3D control bands and comparisons across all connected plants.",
    icon: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.5-2.2 4-5.4 4-9s-1.5-6.8-4-9c-2.5 2.2-4 5.4-4 9s1.5 6.8 4 9ZM3.5 9h17M3.5 15h17" />,
    tint: "text-blue",
    bg: "bg-blue/12",
    spot: "rgba(59, 111, 240, 0.10)",
  },
  {
    title: "Process Capability",
    body: "Cpk trend analysis by department, product, machine and week.",
    icon: <path d="M3 20h18M6 20c0-6 2.7-11 6-11s6 5 6 11M12 4v2" />,
    tint: "text-purple",
    bg: "bg-purple/12",
    spot: "rgba(124, 77, 255, 0.10)",
  },
  {
    title: "Quality Score",
    body: "One weighted score for testing efficiency, compliance and retests.",
    icon: <path d="m12 3 2.7 5.6 6.3.8-4.6 4.2 1.2 6.1L12 16.8l-5.6 2.9 1.2-6.1L3 9.4l6.3-.8L12 3Z" />,
    tint: "text-brand-glow",
    bg: "bg-brand/12",
    spot: "rgba(230, 54, 65, 0.10)",
  },
  {
    title: "Scheduled Reports",
    body: "Automated email delivery of the reports your team already reads.",
    icon: <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm0 2 7.1 4.7a2 2 0 0 0 1.8 0L20 8M8 2v4m8-4v4" />,
    tint: "text-blue",
    bg: "bg-blue/12",
    spot: "rgba(59, 111, 240, 0.10)",
  },
  {
    title: "Excel / PDF Export",
    body: "Every view exports pixel-perfect for audits and customer claims.",
    icon: <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9m-6-6 6 6m-6-6v6h6M9 13l2.5 4M11.5 13 9 17m5.5-4v4h2" />,
    tint: "text-purple",
    bg: "bg-purple/12",
    spot: "rgba(124, 77, 255, 0.10)",
  },
  {
    title: "Trend Analytics",
    body: "Historical drill-down by channel, lot, count, machine and date range.",
    icon: <path d="M4 17l5-5 4 4 7-8m0 0h-5m5 0v5" />,
    tint: "text-brand-glow",
    bg: "bg-brand/12",
    spot: "rgba(230, 54, 65, 0.10)",
  },
  {
    title: "Machine Insights",
    body: "Equipment-level deep slice — granular analytics per machine and lot.",
    icon: <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.2l2.1-1.6-2-3.4-2.5 1a7.5 7.5 0 0 0-2-1.2L14.5 3h-5l-.4 2.6a7.5 7.5 0 0 0-2 1.2l-2.5-1-2 3.4 2.1 1.6a7.4 7.4 0 0 0 0 2.4L2.6 14.8l2 3.4 2.5-1a7.5 7.5 0 0 0 2 1.2l.4 2.6h5l.4-2.6a7.5 7.5 0 0 0 2-1.2l2.5 1 2-3.4-2.1-1.6c.1-.4.1-.8.1-1.2Z" />,
    tint: "text-blue",
    bg: "bg-blue/12",
    spot: "rgba(59, 111, 240, 0.10)",
  },
];

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-28 sm:py-36">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          tag="Platform features"
          title="Everything a quality team needs."
          accentWords={["Everything"]}
          sub="Documented Spin-Q capabilities — from the lab bench to the boardroom."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 5) * 0.06} className="h-full">
              <SpotlightCard
                className="h-full rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-line2"
                spotColor={f.spot}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${f.bg} ${f.tint} shadow-[0_0_24px_-6px_currentColor] transition-transform duration-300 group-hover:scale-110`}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {f.icon}
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-[15px] font-semibold leading-snug text-fg">
                  {f.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                  {f.body}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
