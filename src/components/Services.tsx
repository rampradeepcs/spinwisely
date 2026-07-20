import Image from "next/image";
import { services } from "@/lib/data";
import { asset } from "@/lib/asset";
import { SectionHead } from "./Section";
import { Reveal } from "./Reveal";
import { Icons } from "./Icons";

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          eyebrow="Onsite Technical Services"
          title={
            <>
              Expert audits that <span className="text-brand-gradient">restore performance</span>
            </>
          }
          intro="Our experienced service team performs comprehensive onsite assessments, calibration and rebuilds — backed by laboratory analysis and prioritized action plans."
          align="center"
        />

        {/* Spectrogram — measurable audit results, before and after */}
        <Reveal delay={2}>
          <figure className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <Image
              src={asset("/hero/audit-charts-v2.jpg")}
              alt="Sliver spectrogram before and after a technical audit — the fault peak is eliminated"
              width={1554}
              height={395}
              className="w-full px-6 pt-6"
            />
            <figcaption className="px-6 py-4 text-center text-sm text-faint">
              Spectrogram analysis before and after an audit — mechanical fault peak eliminated,
              sliver evenness restored.
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/60 p-8 transition-all duration-500 hover:border-brand/30">
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-brand text-white shadow-[0_10px_30px_-8px] shadow-brand/60">
                  <Icons.shield className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-fg">{s.name}</h3>
                <ul className="mt-5 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2}>
          <div className="mt-6 flex flex-col items-center justify-between gap-6 rounded-2xl border border-brand/20 bg-gradient-to-r from-brand/[0.08] to-transparent p-8 md:flex-row md:p-10">
            <div>
              <h3 className="font-display text-2xl font-semibold text-fg">
                Need a machine assessed?
              </h3>
              <p className="mt-2 text-muted">
                Book an onsite technical audit with our engineering team.
              </p>
            </div>
            <a
              href="/contact"
              className="shine inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              Schedule an audit
              <Icons.arrow className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
