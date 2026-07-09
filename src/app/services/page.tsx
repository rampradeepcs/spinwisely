import type { Metadata } from "next";
import { Services } from "@/components/Services";

export const metadata: Metadata = {
  title: "Onsite Technical Services",
  description:
    "Expert onsite audits, calibration and rebuilds for draw frames, combers and ring frames — backed by laboratory analysis and prioritized action plans.",
};

export default function ServicesPage() {
  return (
    <main className="pt-16">
      <Services />
    </main>
  );
}
