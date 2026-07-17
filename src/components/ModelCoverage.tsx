import { modelCoverage } from "@/lib/data";
import { SectionHead } from "./Section";
import { Reveal } from "./Reveal";

/** "Parts available for" — machine-model coverage across the spinning line. */
export function ModelCoverage() {
  const allModels = modelCoverage
    .filter((f) => f.family !== "Top Rollers")
    .flatMap((f) => f.models);

  return (
    <section id="coverage" className="relative overflow-hidden border-y border-line bg-surface py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          align="center"
          eyebrow="Parts Availability"
          title={
            <>
              One partner, <span className="text-brand-gradient">every model</span>
            </>
          }
          intro="OEM-quality spares stocked and manufactured for the machines running in your mill — across more than 50 models."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modelCoverage.map((f, i) => (
            <Reveal
              key={f.family}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className={f.family === "Top Rollers" ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <div className="group h-full rounded-2xl border border-line bg-surface3 p-6 shadow-card surface-tint transition-transform duration-500 hover:-translate-y-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-fg">{f.family}</h3>
                  <span className="shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-faint">
                    {f.family === "Top Rollers" ? "All cots" : `${f.models.length} models`}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {f.models.map((m) => (
                    <span
                      key={m}
                      className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-xs font-medium text-muted transition-colors group-hover:border-brand/30"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* full-bleed model ticker */}
      <div className="relative mt-16 border-y border-line bg-surface3/60 py-4 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap">
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="flex gap-8">
              {allModels.map((m, i) => (
                <span
                  key={`${m}-${i}`}
                  className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-faint"
                >
                  {m}
                  <span className="ml-8 text-brand/50">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
