import { Nav } from "@/components/spinq/Nav";
import { Hero } from "@/components/spinq/Hero";
import { Marquee } from "@/components/spinq/Marquee";
import { Problem } from "@/components/spinq/Problem";
import { Pipeline } from "@/components/spinq/Pipeline";
import { Machines } from "@/components/spinq/Machines";
import { Enterprise } from "@/components/spinq/Enterprise";
import { Insights } from "@/components/spinq/Insights";
import { Resolution } from "@/components/spinq/Resolution";
import { Outcomes } from "@/components/spinq/Outcomes";
import { Features } from "@/components/spinq/Features";
import { Screens } from "@/components/spinq/Screens";
import { Journey } from "@/components/spinq/Journey";
import { FinalCTA } from "@/components/spinq/FinalCTA";
import { Footer } from "@/components/spinq/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Pipeline />
        <Machines />
        <Enterprise />
        <Insights />
        <Resolution />
        <Outcomes />
        <Features />
        <Screens />
        <Journey />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
