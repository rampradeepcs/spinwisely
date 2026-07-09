import type { Metadata } from "next";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact — Get a Quote",
  description:
    "Request a quote, book a technical audit or enquire about SpinLyfeX™ retrofits. Nachi Tekneka — offices in India, USA and Mexico.",
};

export default function ContactPage() {
  return (
    <main className="pt-16">
      <Contact />
    </main>
  );
}
