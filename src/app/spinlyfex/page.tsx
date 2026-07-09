import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { spinlyfex, maxxFeatures } from "@/lib/data";
import { PageHero } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Icons } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Nachi SpinLyfeX™ — Retrofit Systems",
  description:
    "Nachi SpinLyfeX™ retrofit series — servo upgrades, inverter upgrades and carding auto-levelers that modernize spinning machinery while preserving originality.",
};

export default function SpinLyfeXPage() {
  return (
    <main>
      <PageHero
        eyebrow="Nachi SpinLyfeX™"
        title={
          <>
            Retrofits that <span className="text-brand-gradient">extend machine life</span>
          </>
        }
        intro="Our specialized retrofit and engineered-solutions series modernizes classic spinning machinery — restoring precision, cutting maintenance and preserving the originality of the machine."
      >
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Enquire about a retrofit
            <Icons.arrow className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      <div className="container-x py-16 md:py-24">
        <div className="flex flex-col gap-6">
          {spinlyfex.map((s, i) => (
            <Reveal key={s.id}>
              <article
                className={`grid items-center gap-8 rounded-[1.75rem] border border-line bg-surface p-6 md:p-10 lg:grid-cols-2 ${
                  s.featured ? "ring-1 ring-brand/30" : ""
                }`}
              >
                <div className={i % 2 ? "lg:order-2" : ""}>
                  <div className="flex flex-wrap items-center gap-2">
                    {s.featured && (
                      <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand ring-1 ring-brand/30">
                        Flagship system
                      </span>
                    )}
                    <span className="rounded-full bg-surface2 px-3 py-1 text-xs font-medium text-muted">
                      {s.fit}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-semibold text-fg md:text-3xl">
                    {s.name}
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{s.summary}</p>

                  {s.id === "maxx" ? (
                    <ul className="mt-6 space-y-2.5">
                      {maxxFeatures.map((f) => (
                        <li key={f} className="flex gap-3 text-sm text-muted">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
                            <Icons.tested className="h-3.5 w-3.5" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {["OEM-level quality", "Plug & play", "Preserves originality", "Faster delivery"].map(
                        (t) => (
                          <span
                            key={t}
                            className="rounded-lg border border-line bg-bg px-3 py-1.5 text-xs text-muted"
                          >
                            {t}
                          </span>
                        ),
                      )}
                    </div>
                  )}

                  <Link
                    href="/contact"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-glow"
                  >
                    Enquire about this system
                    <Icons.arrow className="h-4 w-4" />
                  </Link>
                </div>

                <div className={`relative grid place-items-center ${i % 2 ? "lg:order-1" : ""}`}>
                  <div
                    className="absolute inset-8 rounded-full opacity-45 blur-3xl"
                    style={{ background: `radial-gradient(circle, ${s.accent}40, transparent 70%)` }}
                  />
                  <div className="relative w-full overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-card">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={s.img}
                        alt={s.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-2xl border border-brand/20 bg-gradient-to-r from-brand/[0.08] to-transparent p-8 md:flex-row md:p-10">
            <div>
              <h2 className="font-display text-2xl font-semibold text-fg">
                Not sure which system fits your machine?
              </h2>
              <p className="mt-2 text-muted">
                Send us your machine model — we&apos;ll recommend the right retrofit.
              </p>
            </div>
            <Link
              href="/contact"
              className="shine inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Talk to an engineer
              <Icons.arrow className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
