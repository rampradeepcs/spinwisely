import { qualityPillars } from "@/lib/data";
import { SectionHead } from "./Section";
import { Reveal } from "./Reveal";
import { Icons } from "./Icons";

export function Quality() {
  return (
    <section className="relative border-y border-line bg-surface py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          eyebrow="OEM-Level Quality"
          title={
            <>
              Affordable prices.
              <br />
              <span className="text-brand-gradient">Faster delivery.</span>
            </>
          }
          intro="Every Nachi Tekneka part is engineered to match original equipment performance — verified, tested and built on a deep understanding of how each component actually works."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {qualityPillars.map((q, i) => {
            const Icon = Icons[q.icon];
            return (
              <Reveal key={q.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-[color-mix(in_oklab,var(--fg)_5%,transparent)] to-transparent p-7 transition-all duration-500 hover:border-brand/40 hover:from-brand/[0.06]">
                  <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20 transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold leading-snug text-fg">
                    {q.title}
                  </h3>
                  <span className="mt-4 block h-px w-10 bg-brand/50 transition-all duration-500 group-hover:w-full" />
                  <span className="pointer-events-none absolute right-5 top-5 font-display text-5xl font-bold text-fg/[0.04]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
