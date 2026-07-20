import { Reveal } from "./Reveal";

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="eyebrow inline-flex items-center gap-2.5 text-brand">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex max-w-3xl flex-col gap-5 ${
        align === "center" ? "mx-auto items-center text-center" : "items-start"
      }`}
    >
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="h-display text-balance text-4xl text-gradient sm:text-5xl md:text-[3.4rem]">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={2}>
          <p className="text-pretty text-base leading-relaxed text-muted md:text-lg">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Page hero band used across sub-pages for a consistent look.
 *  Pass `aside` to show visual content on the right (stacks below on mobile). */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
  aside,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-radial-brand opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent)]" />
      <div className="container-x relative">
        <div
          className={
            aside
              ? "grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"
              : undefined
          }
        >
          <div className="flex max-w-3xl flex-col gap-5">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="h-display text-balance text-5xl text-gradient sm:text-6xl md:text-7xl">
              {title}
            </h1>
            {intro && (
              <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">
                {intro}
              </p>
            )}
            {children}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
