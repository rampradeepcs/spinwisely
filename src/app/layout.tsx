import type { Metadata, Viewport } from "next";
import { Inter_Tight, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CursorGlow } from "@/components/spinq/CursorGlow";

const display = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE = "https://www.spinwisely.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Spinwisely — Quality Intelligence, Powered by AI",
    template: "%s · Spinwisely",
  },
  description:
    "Spin-Q Quality Hub connects every testing instrument, automates quality analysis, detects deviations instantly and gives every spinning mill real-time quality intelligence.",
  keywords: [
    "Spinwisely",
    "Spin-Q Quality Hub",
    "quality intelligence platform",
    "spinning mill quality control",
    "textile quality analytics",
    "SPC analytics",
    "evenness tester integration",
    "cross-plant analytics",
    "process capability Cpk",
    "quality management software",
  ],
  authors: [{ name: "Spinwisely LLC" }],
  openGraph: {
    type: "website",
    url: SITE,
    title: "Spinwisely — Quality Intelligence, Powered by AI",
    description:
      "Collect. Analyse. Notify. Act. Spin-Q Quality Hub turns every testing instrument into real-time quality intelligence for spinning mills.",
    siteName: "Spinwisely",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spinwisely — Quality Intelligence, Powered by AI",
    description:
      "Spin-Q Quality Hub — real-time quality intelligence for spinning mills.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbfbfd",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Spin-Q Quality Hub",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  description:
    "AI-powered quality intelligence platform for spinning mills: instrument integration, SPC analytics, real-time alerts and cross-plant visibility.",
  author: {
    "@type": "Organization",
    name: "Spinwisely LLC",
    url: SITE,
    email: "info@spinwisely.com",
  },
  provider: {
    "@type": "Organization",
    name: "Nachi Tekneka",
    email: "info@nachitekneka.com",
    telephone: "+91 422 267 0091",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Coimbatore",
      addressCountry: "IN",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SmoothScroll />
        <CursorGlow />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <div id="main-content">{children}</div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
