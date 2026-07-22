import { downloads } from "@/lib/data";
import { SectionHead } from "./Section";
import { Reveal } from "./Reveal";
import { Icons } from "./Icons";

export function Downloads() {
  return (
    <section id="downloads" className="relative border-t border-line bg-surface py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          eyebrow="Resources"
          title={
            <>
              Brochures & <span className="text-brand-gradient">technical documents</span>
            </>
          }
          intro="Download product catalogs, retrofit specifications and compatibility references for your team."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {downloads.map((d, i) => (
            <Reveal key={d.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <a
                href={d.href ?? "/contact"}
                target={d.href ? "_blank" : undefined}
                rel={d.href ? "noopener noreferrer" : undefined}
                className="group flex h-full flex-col rounded-2xl border border-line bg-gradient-to-b from-[color-mix(in_oklab,var(--fg)_5%,transparent)] to-transparent p-7 transition-all duration-500 hover:-translate-y-1 hover:border-brand/40"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20 transition-transform duration-500 group-hover:scale-110">
                    <Icons.download className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wide text-faint">
                    {d.meta}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-fg">{d.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{d.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                  {d.href ? "Download PDF" : "Request document"}
                  <Icons.arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
