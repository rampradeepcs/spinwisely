import { Hero } from "@/components/hero/Hero";
import { Stats } from "@/components/Stats";
import { SpinLyfeX } from "@/components/SpinLyfeX";
import { Quality } from "@/components/Quality";
import { Catalog } from "@/components/Catalog";
import { Solutions } from "@/components/Solutions";
import { Services } from "@/components/Services";
import { Company } from "@/components/Company";
import { Testimonials } from "@/components/Testimonials";
import { GlobalPresence } from "@/components/GlobalPresence";
import { Downloads } from "@/components/Downloads";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <SpinLyfeX />
      <Quality />
      <Catalog />
      <Solutions />
      <Services />
      <Company />
      <Testimonials />
      <GlobalPresence />
      <Downloads />
      <Contact />
    </main>
  );
}
