import { company } from "@/lib/data";

const PHONE = company.mobile.replace(/[^\d]/g, ""); // +91 96003 09378 -> 919600309378
const MESSAGE = encodeURIComponent(
  "Hello Nachi Tekneka, I'd like to enquire about your products and services.",
);

/** Floating WhatsApp chat button, shown on every page (bottom right). */
export function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.65)] transition-transform duration-300 hover:scale-110 md:bottom-8 md:right-8"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25d366]/50 [animation:pulse-ring_2.4s_ease-out_infinite] group-hover:[animation:none]" />
      <svg viewBox="0 0 32 32" className="relative h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M16.04 4c-6.6 0-11.96 5.33-11.96 11.9 0 2.1.55 4.14 1.6 5.95L4 28l6.32-1.65a12 12 0 0 0 5.71 1.45h.01c6.6 0 11.96-5.33 11.96-11.9C28 9.33 22.64 4 16.04 4Zm0 21.78h-.01a9.9 9.9 0 0 1-5.04-1.37l-.36-.21-3.75.98 1-3.64-.23-.37a9.82 9.82 0 0 1-1.52-5.27c0-5.45 4.46-9.88 9.92-9.88 2.65 0 5.14 1.03 7.01 2.9a9.8 9.8 0 0 1 2.9 6.99c0 5.45-4.45 9.87-9.92 9.87Zm5.44-7.4c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a9 9 0 0 1-1.66-2.06c-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      </svg>
      <span className="sr-only">WhatsApp: {company.mobile}</span>
    </a>
  );
}
