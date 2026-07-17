"use client";

import { useState } from "react";
import { inverterMatrix, retrofitSystems } from "@/lib/data";
import { SectionHead } from "./Section";
import { Reveal } from "./Reveal";
import { Icons } from "./Icons";

const tabs = ["Inverter upgrades", "Electrical conversions"] as const;

export function RetrofitMatrix() {
  const [tab, setTab] = useState(0);

  return (
    <section id="retrofit-matrix" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          eyebrow="Retrofit Compatibility"
          title={
            <>
              Is your machine <span className="text-brand-gradient">covered?</span>
            </>
          }
          intro="Exact drive and conversion mappings from the Nachi SpinLyfeX™ retrofit program — legacy electronics out, proven Yaskawa platforms in."
        />

        <Reveal className="mt-10" delay={2}>
          <div className="inline-flex rounded-full border border-line bg-surface p-1">
            {tabs.map((t, i) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(i)}
                aria-pressed={tab === i}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  tab === i ? "bg-brand text-white" : "text-muted hover:text-fg"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-6" delay={3}>
          <div className="overflow-hidden rounded-2xl border border-line bg-surface3 shadow-card surface-tint">
            <div className="overflow-x-auto">
              {tab === 0 ? <InverterTable /> : <SystemsTable />}
            </div>
            <p className="border-t border-line px-5 py-3 text-xs text-faint">
              Model not listed? Our engineering team regularly maps new machines —{" "}
              <a href="/contact" className="font-semibold text-brand">
                ask about your configuration
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const th =
  "px-5 py-3.5 text-left text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-faint whitespace-nowrap";
const td = "px-5 py-3.5 text-sm text-muted whitespace-nowrap";

function DeptCell({ dept, show }: { dept: string; show: boolean }) {
  return (
    <td className={`${td} font-display font-semibold uppercase tracking-wide ${show ? "text-brand" : "text-transparent"}`}>
      {dept}
    </td>
  );
}

function InverterTable() {
  return (
    <table className="w-full min-w-[46rem] border-collapse">
      <thead className="border-b border-line bg-surface">
        <tr>
          <th className={th}>Department</th>
          <th className={th}>Machine</th>
          <th className={th}>Model</th>
          <th className={th}>Cat. No.</th>
          <th className={th}>From</th>
          <th className={th}>To</th>
        </tr>
      </thead>
      <tbody>
        {inverterMatrix.map((r, i) => (
          <tr key={i} className="border-b border-line last:border-0 transition-colors hover:bg-surface">
            <DeptCell dept={r.dept} show={i === 0 || inverterMatrix[i - 1].dept !== r.dept} />
            <td className={`${td} font-medium text-fg`}>{r.machine}</td>
            <td className={td}>{r.model}</td>
            <td className={td}>{r.cat}</td>
            <td className={td}>{r.from}</td>
            <td className={`${td} font-semibold text-fg`}>
              <span className="inline-flex items-center gap-2">
                <Icons.arrow className="h-3.5 w-3.5 text-brand" />
                {r.to}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SystemsTable() {
  return (
    <table className="w-full min-w-[46rem] border-collapse">
      <thead className="border-b border-line bg-surface">
        <tr>
          <th className={th}>Department</th>
          <th className={th}>Make</th>
          <th className={th}>Model</th>
          <th className={th}>Modification</th>
        </tr>
      </thead>
      <tbody>
        {retrofitSystems.map((r, i) => (
          <tr key={i} className="border-b border-line last:border-0 transition-colors hover:bg-surface">
            <DeptCell dept={r.dept} show={i === 0 || retrofitSystems[i - 1].dept !== r.dept} />
            <td className={`${td} font-medium text-fg`}>{r.make}</td>
            <td className={td}>{r.model}</td>
            <td className={`${td} !whitespace-normal min-w-[18rem]`}>{r.mod}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
