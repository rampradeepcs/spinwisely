import type { Metadata } from "next";
import { PageHero } from "@/components/Section";
import { Careers } from "@/components/Careers";

export const metadata: Metadata = {
  title: "Careers — Join Nachi Tekneka",
  description:
    "Build the future of the spinning industry. Open roles in engineering, service, sales and manufacturing at Nachi Tekneka, Coimbatore — apply online.",
};

export default function CareersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Build what keeps the world&apos;s{" "}
            <span className="text-brand-gradient">mills spinning</span>
          </>
        }
        intro="We're a hands-on engineering company solving real problems for spinning mills on three continents. If precision, machines and craft excite you — you'll fit right in."
      >
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="#open-roles"
            className="shine inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
          >
            See open roles
          </a>
          <a
            href="#apply"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-7 text-sm font-semibold text-fg transition-colors hover:bg-surface2"
          >
            Apply directly
          </a>
        </div>
      </PageHero>
      <Careers />
    </main>
  );
}
