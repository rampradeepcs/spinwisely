const MODULES = [
  "Sliver Weight Monitoring",
  "Count & Skein Strength",
  "Twist Testing",
  "Roving Hank",
  "Waste % Monitoring",
  "A% Testing",
  "Evenness Analytics",
  "Single Yarn Strength",
  "Fiber Test Analysis",
  "Cpk Trend Analysis",
  "Quality Score",
  "SLA-Driven Alerts",
];

/** Infinite marquee of Spin-Q test modules — the platform's coverage at a glance. */
export function Marquee() {
  const row = [...MODULES, ...MODULES];
  return (
    <section
      className="relative border-y border-line bg-surface/60 py-5"
      aria-label="Supported quality modules"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-bg to-transparent" />
      <div className="overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-10 pr-10">
          {row.map((m, i) => (
            <span
              key={i}
              className="flex items-center gap-10 whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.16em] text-faint"
              aria-hidden={i >= MODULES.length}
            >
              {m}
              <span className="h-1 w-1 rounded-full bg-brand/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
