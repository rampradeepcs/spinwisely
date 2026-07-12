const NT_PATH =
  "M0 1.95307H30.1261V6.02342H23.1027H19.3741V27.2428L23.0065 27.1491L23.0858 9.5797L30.1261 9.60911V31.3104H0V11.4893L17.9465 27.2428V6.02342H14.2178V18.5844L0 5.89843V1.95307Z";

/**
 * Animated Nachi Tekneka loader — the red NT mark draws in, fills, and breathes
 * inside a rotating brand ring. Pure CSS (no JS), respects reduced-motion.
 */
export function Loader({
  size = 80,
  label = "Loading",
}: {
  size?: number;
  label?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
    >
      {/* rotating ring */}
      <svg
        viewBox="0 0 100 100"
        className="nt-loader-ring absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-line)" strokeWidth="3" />
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="70 220"
        />
      </svg>

      {/* NT mark */}
      <svg
        viewBox="0 0 31 32"
        className="nt-loader relative"
        style={{ width: size * 0.5, height: size * 0.5 }}
        aria-hidden="true"
      >
        <path className="nt-loader-ghost" d={NT_PATH} fill="var(--color-brand)" />
        <path
          className="nt-loader-fill"
          d={NT_PATH}
          fill="var(--color-brand)"
          fillRule="evenodd"
          clipRule="evenodd"
        />
        <path className="nt-loader-draw" d={NT_PATH} pathLength={1} />
      </svg>

      <span className="sr-only">{label}…</span>
    </div>
  );
}

/** Full-screen centered loader on the app background. */
export function FullPageLoader({ label }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-bg">
      <div className="flex flex-col items-center gap-6">
        <Loader size={88} label={label} />
        <span className="text-xs uppercase tracking-[0.32em] text-faint">Loading</span>
      </div>
    </div>
  );
}
