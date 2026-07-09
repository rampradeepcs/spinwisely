import { offices } from "@/lib/data";
import { SectionHead } from "./Section";
import { Reveal } from "./Reveal";

export function GlobalPresence() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHead
            eyebrow="Global Presence"
            title={
              <>
                One network,<br />
                <span className="text-brand-gradient">three continents</span>
              </>
            }
            intro="Headquartered in Coimbatore, India, with operations serving mills across the Americas and beyond — engineering support wherever you spin."
          />
          <div className="mt-10 space-y-3">
            {offices.map((o, i) => (
              <Reveal key={o.city} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className="flex items-center gap-4 rounded-xl border border-line bg-surface/60 p-4 transition-colors hover:border-brand/30">
                  <span className="text-2xl" aria-hidden>
                    {o.flag}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-display font-semibold text-fg">{o.city}</h3>
                      <span className="text-sm text-faint">{o.country}</span>
                    </div>
                    <p className="text-sm text-faint">{o.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={2}>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-surface md:aspect-[4/3]">
            <div className="absolute inset-0 bg-grid opacity-40" />
            <MapDots />
            {/* markers */}
            {offices.map((o) => (
              <div
                key={o.city}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${o.x}%`, top: `${o.y}%` }}
              >
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-brand/60 [animation:pulse-ring_2s_ease-out_infinite]" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-brand ring-2 ring-brand/30" />
                </span>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-bg/80 px-2 py-0.5 text-[0.7rem] font-medium text-muted backdrop-blur">
                  {o.city}
                </span>
              </div>
            ))}
            {/* connection arcs */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M20 42 Q 45 20 70 58" fill="none" stroke="#ed3237" strokeWidth="0.4" strokeDasharray="1 1.5" opacity="0.7" />
              <path d="M22 55 Q 45 75 70 58" fill="none" stroke="#ed3237" strokeWidth="0.4" strokeDasharray="1 1.5" opacity="0.7" />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Abstract dotted landmass field. */
function MapDots() {
  const dots: React.ReactElement[] = [];
  const rng = mulberry32(42);
  for (let i = 0; i < 260; i++) {
    const x = rng() * 100;
    const y = 15 + rng() * 70;
    // rough continental clustering weight
    const near =
      Math.abs(x - 20) < 14 || Math.abs(x - 48) < 8 || Math.abs(x - 70) < 16 || Math.abs(x - 85) < 8;
    if (!near && rng() > 0.35) continue;
    dots.push(
      <circle key={i} cx={x} cy={y} r={0.5} fill="#ffffff" opacity={0.18 + rng() * 0.22} />,
    );
  }
  return (
    <svg
      className="absolute inset-0 h-full w-full [mask-image:radial-gradient(80%_80%_at_50%_50%,#000,transparent)]"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {dots}
    </svg>
  );
}

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
