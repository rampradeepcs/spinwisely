import type { Metadata } from "next";
import Link from "next/link";
import { Solutions } from "@/components/Solutions";
import { Icons } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Industry Solutions",
  description:
    "Complete electrical conversions, drive modernization and mechanical retrofits across every stage of yarn manufacturing — from blowroom to ring frame.",
};

export default function SolutionsPage() {
  return (
    <main className="pt-16">
      <Solutions />
      <section className="border-t border-line py-16 md:py-24">
        <div className="container-x flex flex-col items-center justify-between gap-6 rounded-2xl border border-brand/20 bg-gradient-to-r from-brand/[0.08] to-transparent p-8 text-center md:flex-row md:p-10 md:text-left">
          <div>
            <h2 className="font-display text-2xl font-semibold text-fg">
              Modernize your line, department by department
            </h2>
            <p className="mt-2 text-muted">
              Book a technical audit and we&apos;ll map the right retrofit path for your mill.
            </p>
          </div>
          <Link
            href="/contact"
            className="shine inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Get started
            <Icons.arrow className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
