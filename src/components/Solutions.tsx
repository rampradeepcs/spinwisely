"use client";

import { useState } from "react";
import { solutions } from "@/lib/data";
import { SectionHead } from "./Section";
import { Icons } from "./Icons";

export function Solutions() {
  const [hover, setHover] = useState(0);

  return (
    <section id="solutions" className="relative border-y border-line bg-surface py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            eyebrow="Industry Solutions"
            title={
              <>
                From blowroom to <span className="text-brand-gradient">ring frame</span>
              </>
            }
            intro="Complete electrical conversions, drive modernization and mechanical retrofits across every stage of yarn manufacturing."
          />
          <div className="mt-10 hidden aspect-video items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-[color-mix(in_oklab,var(--fg)_6%,transparent)] to-transparent lg:flex">
            <ProcessLine active={hover} />
          </div>
        </div>

        <ul className="flex flex-col">
          {solutions.map((s, i) => (
            <li
              key={s.name}
              onMouseEnter={() => setHover(i)}
              className="group relative border-b border-line py-6 transition-colors"
            >
              <div
                className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-brand/[0.07] to-transparent transition-transform duration-500 group-hover:scale-x-100"
                style={{ borderRadius: 12 }}
              />
              <div className="relative flex items-baseline gap-5 px-1">
                <span className="font-display text-sm text-brand/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-semibold text-fg transition-transform duration-500 group-hover:translate-x-1.5 md:text-3xl">
                    {s.name}
                  </h3>
                  <p className="mt-1.5 max-w-md text-sm text-faint">{s.detail}</p>
                </div>
                <Icons.arrow className="h-6 w-6 -translate-x-2 text-brand opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProcessLine({ active }: { active: number }) {
  const steps = solutions.length;
  return (
    <svg viewBox="0 0 400 120" className="w-full px-8">
      <line x1="20" y1="60" x2="380" y2="60" stroke="#ffffff20" strokeWidth="2" />
      <line
        x1="20"
        y1="60"
        x2={20 + (360 / (steps - 1)) * active}
        y2="60"
        stroke="#ed3237"
        strokeWidth="2"
        style={{ transition: "all .5s var(--ease-out-expo)" }}
      />
      {solutions.map((s, i) => {
        const x = 20 + (360 / (steps - 1)) * i;
        const on = i <= active;
        return (
          <g key={s.name}>
            <circle
              cx={x}
              cy="60"
              r={i === active ? 9 : 5}
              fill={on ? "#ed3237" : "#2a2a30"}
              style={{ transition: "all .4s var(--ease-out-expo)" }}
            />
            <text
              x={x}
              y={i % 2 ? 90 : 34}
              textAnchor="middle"
              className="font-display"
              fontSize="10"
              fill={i === active ? "#fff" : "#ffffff70"}
            >
              {s.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
