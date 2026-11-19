"use client";

import { useEffect, useRef } from "react";

/**
 * Heron's "ruler" readout: faint crosshair lines through the mouse, a small
 * brand-coloured plus and the X/Y position in pixels. Fills its positioned parent.
 */
export default function CursorReadout({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current!;
    const area = root.parentElement!;
    const [lineX, lineY, plus, readout] = Array.from(root.children) as HTMLElement[];
    const x = root.querySelector("[data-x]")!;
    const y = root.querySelector("[data-y]")!;

    const move = (event: PointerEvent) => {
      const box = area.getBoundingClientRect();
      const px = event.clientX - box.left;
      const py = event.clientY - box.top;
      root.style.opacity = "1";
      lineX.style.transform = `translateY(${py}px)`;
      lineY.style.transform = `translateX(${px}px)`;
      plus.style.transform = `translate(${px - 5}px, ${py - 5}px)`;
      readout.style.transform = `translate(${px - 24}px, ${py - 13}px)`;
      x.textContent = String(Math.round(event.clientX));
      y.textContent = String(Math.round(event.clientY));
    };
    const leave = () => (root.style.opacity = "0");

    area.addEventListener("pointermove", move);
    area.addEventListener("pointerleave", leave);
    return () => {
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 z-[4] opacity-0 transition-opacity duration-300 ${className}`}>
      <div className="absolute inset-x-0 top-0 h-px bg-ink/25" />
      <div className="absolute inset-y-0 left-0 w-px bg-ink/25" />
      <div className="absolute top-0 left-0 size-10">
        <span className="absolute top-0 left-4 h-10 w-2 bg-brand" />
        <span className="absolute top-4 left-0 h-2 w-10 bg-brand" />
      </div>
      <div className="mono absolute top-0 left-0 -translate-x-[110%] text-10 leading-[1.3] whitespace-nowrap text-ink/72">
        <div>
          X:<span data-x>0</span>PX
        </div>
        <div>
          Y:<span data-y>0</span>PX
        </div>
      </div>
    </div>
  );
}
