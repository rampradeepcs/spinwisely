import { SectionHead } from "./Section";
import { Reveal } from "./Reveal";
import { Icons } from "./Icons";

const achievements = [
  { icon: "shield", title: "ISO 9001:2015", note: "Certified quality management system" },
  { icon: "globe", title: "3 Global Offices", note: "India · USA · Mexico" },
  { icon: "clock", title: "Faster Delivery", note: "Shorter lead times than OEM" },
  { icon: "engineered", title: "In-house Engineering", note: "Deep spinning-domain expertise" },
];

export function Company() {
  return (
    <section id="company" className="relative border-y border-line bg-surface py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHead
            eyebrow="About Nachi Tekneka"
            title={
              <>
                Not just parts —<br />
                <span className="text-brand-gradient">parts for solutions</span>
              </>
            }
          />
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
            <p>
              Nachi Tekneka is a specialized engineering company serving the spinning
              industry with high-quality spare parts, retrofit systems and technical
              solutions. From blowroom to spinning applications, we deliver OEM-level
              quality with precision engineering, reliable performance, affordable
              pricing and faster delivery.
            </p>
            <p>
              With deep technical expertise and practical industry experience, we develop
              innovative solutions that improve yarn quality, increase production
              efficiency, reduce maintenance and extend machine life for spinning mills
              worldwide.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border-l-2 border-brand bg-gradient-to-r from-brand/[0.07] to-transparent p-6">
            <h3 className="font-display text-lg font-semibold text-fg">Nachi SpinLyfeX™</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Our specialized retrofit and engineered-solutions series — innovative
              OEM-level solutions focused on reliability, efficiency and cost-effective
              operation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 self-center">
          {achievements.map((a, i) => {
            const Icon = Icons[a.icon];
            return (
              <Reveal key={a.title} delay={((i % 2) + 1) as 1 | 2}>
                <div className="group h-full rounded-2xl border border-line bg-gradient-to-b from-[color-mix(in_oklab,var(--fg)_5%,transparent)] to-transparent p-6 transition-all duration-500 hover:border-brand/30">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand/10 text-brand ring-1 ring-brand/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-fg">{a.title}</h3>
                  <p className="mt-1 text-sm text-faint">{a.note}</p>
                </div>
              </Reveal>
            );
          })}
          <Reveal delay={2} className="col-span-2">
            <div className="flex items-center gap-5 rounded-2xl border border-line bg-surface2 p-6">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full border-2 border-brand/40 text-center">
                <span className="font-display text-[0.6rem] font-bold leading-none text-fg">
                  ISO
                  <br />
                  9001
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                Operating under an internationally recognized quality management system —
                our commitment to consistent quality, continuous improvement and customer
                satisfaction.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
