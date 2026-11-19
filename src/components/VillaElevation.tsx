import { VILLA_LINES, VILLA_VIEWBOX } from "@/lib/villa-lines";

// Line drawing of the hero villa. Same framing as public/images/villa-stipple.webp,
// so the loader's drawing turns straight into the hero image.
// Each <path> is one band of lines (ground first); the loader draws them in order.
export default function VillaElevation({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={VILLA_VIEWBOX}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      {VILLA_LINES.map((d, i) => (
        <path key={i} data-draw d={d} pathLength={1} />
      ))}
    </svg>
  );
}
