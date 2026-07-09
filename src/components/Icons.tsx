/** Line-icon set (stroke = currentColor) for quality pillars & categories. */
type P = { className?: string };
const base = "none";

function S({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={base}
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const Icons: Record<string, (p: P) => React.ReactElement> = {
  materials: (p) => (
    <S {...p}>
      <path d="M12 3 3 8v8l9 5 9-5V8l-9-5Z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </S>
  ),
  precision: (p) => (
    <S {...p}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3M12 12l4-4" />
      <circle cx="12" cy="12" r="1.5" />
    </S>
  ),
  tested: (p) => (
    <S {...p}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="m8.5 12 2.4 2.4L16 9" />
    </S>
  ),
  prototype: (p) => (
    <S {...p}>
      <path d="M9 3h6l-1 5h3l-7 13 1-8H7l2-10Z" />
    </S>
  ),
  engineered: (p) => (
    <S {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
    </S>
  ),
  function: (p) => (
    <S {...p}>
      <path d="M9 21V9a3 3 0 0 1 6 0M6 21h12M12 12v9M8.5 6.5 12 3l3.5 3.5" />
    </S>
  ),
  electronics: (p) => (
    <S {...p}>
      <rect x="4" y="7" width="16" height="10" rx="2" />
      <path d="M8 7V4M12 7V4M16 7V4M8 20v-3M12 20v-3M16 20v-3" />
      <circle cx="10" cy="12" r="1" />
      <path d="M13 12h3" />
    </S>
  ),
  pneumatics: (p) => (
    <S {...p}>
      <rect x="3" y="9" width="13" height="6" rx="3" />
      <path d="M16 12h5M19 9l3 3-3 3M6 12h3" />
    </S>
  ),
  carding: (p) => (
    <S {...p}>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 5v3M12 16v3M5 12h3M16 12h3M7 7l2 2M15 15l2 2M17 7l-2 2M9 15l-2 2" />
    </S>
  ),
  comber: (p) => (
    <S {...p}>
      <path d="M4 8h16M6 8v8M9 8v8M12 8v8M15 8v8M18 8v8M4 16h16" />
    </S>
  ),
  drawframe: (p) => (
    <S {...p}>
      <circle cx="7" cy="12" r="3.5" />
      <circle cx="17" cy="12" r="3.5" />
      <path d="M10.5 12h3" />
    </S>
  ),
  ringframe: (p) => (
    <S {...p}>
      <path d="M12 3v18M8 6l4-3 4 3M8 18l4 3 4-3" />
      <ellipse cx="12" cy="12" rx="5" ry="2.5" />
    </S>
  ),
  bolt: (p) => (
    <S {...p}>
      <path d="m13 2-9 12h7l-2 8 9-12h-7l2-8Z" />
    </S>
  ),
  shield: (p) => (
    <S {...p}>
      <path d="M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </S>
  ),
  clock: (p) => (
    <S {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3.5 2" />
    </S>
  ),
  globe: (p) => (
    <S {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.5 2.5 14.5 0 17M12 3.5c-2.5 2.5-2.5 14.5 0 17" />
    </S>
  ),
  arrow: (p) => (
    <S {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </S>
  ),
  download: (p) => (
    <S {...p}>
      <path d="M12 3v12M7 11l5 4 5-4M5 20h14" />
    </S>
  ),
  play: (p) => (
    <S {...p}>
      <path d="M8 5v14l11-7L8 5Z" />
    </S>
  ),
};
