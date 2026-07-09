import type { Metadata } from "next";
import Link from "next/link";
import { Downloads } from "@/components/Downloads";
import { company } from "@/lib/data";
import { Icons } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Downloads & Resources",
  description:
    "Download the Nachi Tekneka company profile, SpinLyfeX™ retrofit specifications and top-roller compatibility charts.",
};

export default function DownloadsPage() {
  return (
    <main className="pt-16">
      <Downloads />
      <section className="pb-24">
        <div className="container-x">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-8 md:flex-row">
            <div>
              <h2 className="font-display text-xl font-semibold text-fg">
                Need a specific datasheet or drawing?
              </h2>
              <p className="mt-2 text-muted">
                Tell us the part or machine and we&apos;ll send the exact document.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              <Icons.arrow className="h-4 w-4" />
              Request a document
            </Link>
          </div>
          <p className="mt-6 text-center text-sm text-faint">
            Or email us directly at{" "}
            <a href={`mailto:${company.email}`} className="text-brand hover:underline">
              {company.email}
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
