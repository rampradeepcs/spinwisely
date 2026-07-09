import type { Metadata } from "next";
import { Company } from "@/components/Company";
import { Stats } from "@/components/Stats";
import { GlobalPresence } from "@/components/GlobalPresence";
import { Testimonials } from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Company — About Nachi Tekneka",
  description:
    "Nachi Tekneka is a specialized engineering company serving the spinning industry worldwide with OEM-level parts, SpinLyfeX™ retrofits and technical services. ISO 9001:2015 certified.",
};

export default function AboutPage() {
  return (
    <main className="pt-16">
      <Company />
      <Stats />
      <GlobalPresence />
      <Testimonials />
    </main>
  );
}
