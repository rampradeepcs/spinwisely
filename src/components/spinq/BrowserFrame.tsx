import Image from "next/image";
import { cx } from "./primitives";

/** Minimal dark browser chrome around a product screenshot. */
export function BrowserFrame({
  src,
  alt,
  url = "app.spinwisely.com",
  priority = false,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  url?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure
      className={cx(
        "overflow-hidden rounded-2xl border border-line2 bg-surface2 shadow-[0_60px_120px_-40px_rgba(15,18,30,0.3)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-black/[0.03] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto flex items-center gap-1.5 rounded-md bg-black/30 px-3 py-1 text-[10px] font-medium tracking-wide text-faint">
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" aria-hidden>
            <rect x="2" y="5" width="8" height="5.5" rx="1" stroke="currentColor" />
            <path d="M4 5V3.5a2 2 0 1 1 4 0V5" stroke="currentColor" />
          </svg>
          {url}
        </span>
      </div>
      <Image
        src={src}
        alt={alt}
        width={1680}
        height={1050}
        priority={priority}
        className={cx("w-full", imgClassName)}
        sizes="(max-width: 768px) 100vw, 1000px"
      />
    </figure>
  );
}
