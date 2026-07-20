"use client";

import { useState } from "react";
import { company } from "@/lib/data";
import { Eyebrow } from "./Section";
import { Icons } from "./Icons";

const interests = [
  "SpinLyfeX Retrofit",
  "Spare Parts",
  "Technical Audit",
  "General Enquiry",
];

/** Enquiries are delivered via FormSubmit (no backend on this static site).
 *  The second address gets its own copy — equivalent to a BCC. */
const ENQUIRY_TO = "sales03@nachitekneka.com";
const ENQUIRY_BCC = "rampradeepux@gmail.com";

async function deliverEnquiry(data: Record<string, string>) {
  const payload = {
    ...data,
    _subject: `New enquiry from nachitekneka.com — ${data.name}`,
    _template: "table",
    _captcha: "false",
  };
  const post = async (to: string) => {
    const res = await fetch(`https://formsubmit.co/ajax/${to}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => ({}));
    // FormSubmit answers 200 even when it did not accept (e.g. pending activation).
    if (!res.ok || String(body.success) !== "true") throw new Error("delivery failed");
  };
  // BCC copy is fired in parallel; only the primary delivery gates success.
  const [primary] = await Promise.allSettled([post(ENQUIRY_TO), post(ENQUIRY_BCC)]);
  if (primary.status === "rejected") throw new Error("delivery failed");
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [interest, setInterest] = useState(interests[0]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    setError(false);
    try {
      await deliverEnquiry({
        name: String(fd.get("name") ?? ""),
        company: String(fd.get("company") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        interest,
        message: String(fd.get("message") ?? ""),
      });
      form.reset();
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-radial-brand opacity-40" />
      <div className="container-x">
        <div className="grid overflow-hidden rounded-[1.75rem] border border-line lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left — info */}
          <div className="relative flex flex-col justify-between gap-10 bg-gradient-to-b from-surface2 to-surface p-8 md:p-12">
            <div>
              <Eyebrow>Let&apos;s talk</Eyebrow>
              <h2 className="h-display mt-5 text-4xl text-gradient md:text-5xl">
                Get a quote or
                <br />
                book an audit
              </h2>
              <p className="mt-5 max-w-sm text-muted">
                Tell us your machine and department — our engineering team will respond
                with a tailored solution and pricing.
              </p>
            </div>

            <ul className="space-y-4 text-sm">
              <ContactRow icon={<Icons.arrow className="h-4 w-4" />} label="Phone" value={company.phone} href={`tel:${company.phone.replace(/\s/g, "")}`} />
              <ContactRow icon={<Icons.arrow className="h-4 w-4" />} label="Mobile" value={company.mobile} href={`tel:${company.mobile.replace(/\s/g, "")}`} />
              <ContactRow icon={<Icons.arrow className="h-4 w-4" />} label="Email" value={company.email} href={`mailto:${company.email}`} />
              <ContactRow icon={<Icons.globe className="h-4 w-4" />} label="Web" value={company.website} href="#top" />
            </ul>

            <p className="text-xs text-faint">
              Coimbatore, India · Wyoming, USA · Mexico City, Mexico
            </p>
          </div>

          {/* Right — form */}
          <div className="bg-surface/40 p-8 backdrop-blur md:p-12">
            {sent ? (
              <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-brand/15 text-brand ring-1 ring-brand/30">
                  <Icons.tested className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-fg">
                  Enquiry received
                </h3>
                <p className="mt-2 max-w-sm text-muted">
                  Thank you. Our team will get back to you shortly with a tailored
                  response.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-semibold text-brand hover:text-brand-glow"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" name="name" required placeholder="Your name" />
                  <Field label="Company" name="company" placeholder="Mill / organization" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email" name="email" type="email" required placeholder="you@company.com" />
                  <Field label="Phone" name="phone" placeholder="+91 …" />
                </div>

                <div>
                  <label className="mb-2.5 block text-sm font-medium text-muted">
                    I&apos;m interested in
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setInterest(t)}
                        className={`rounded-full border px-4 py-2 text-sm transition-all ${
                          interest === t
                            ? "border-transparent bg-brand text-white"
                            : "border-line text-muted hover:border-fg/25"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="msg" className="mb-2.5 block text-sm font-medium text-muted">
                    Message
                  </label>
                  <textarea
                    id="msg"
                    name="message"
                    rows={4}
                    placeholder="Machine model, department, and what you need…"
                    className="w-full resize-none rounded-xl border border-line bg-surface2 px-4 py-3 text-sm text-fg placeholder:text-faint transition-colors focus:border-brand/50 focus:bg-surface2 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="shine inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {sending ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send enquiry
                      <Icons.arrow className="h-4 w-4" />
                    </>
                  )}
                </button>
                {error && (
                  <p className="text-center text-sm text-brand" role="alert">
                    Something went wrong sending your enquiry. Please try again, or
                    email us directly at{" "}
                    <a href={`mailto:${ENQUIRY_TO}`} className="font-semibold underline">
                      {ENQUIRY_TO}
                    </a>
                    .
                  </p>
                )}
                <p className="text-center text-xs text-faint">
                  We typically respond within one business day.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <li>
      <a href={href} className="group flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-surface2 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
          {icon}
        </span>
        <span className="flex flex-col">
          <span className="text-xs uppercase tracking-wide text-faint">{label}</span>
          <span className="font-medium text-fg group-hover:text-fg">{value}</span>
        </span>
      </a>
    </li>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2.5 block text-sm font-medium text-muted">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-surface2 px-4 py-3 text-sm text-fg placeholder:text-faint transition-colors focus:border-brand/50 focus:bg-surface2 focus:outline-none"
      />
    </div>
  );
}
