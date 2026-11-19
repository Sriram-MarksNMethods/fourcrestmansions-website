"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";

/**
 * The big outlined "FOURCREST" at the bottom of the footer.
 * - Hover (Heron's footer ink mask, measured on heronaiapp.com): an inky blob
 *   grows under the pointer (~0.4s), trails after it and fills the letters in
 *   solid. A second, bigger and slower blob at 25% strength leaves the grey halo
 *   around it. Both are circles in an SVG mask, roughed up with Heron's
 *   turbulence filter. Leaving shrinks them away (~0.6s).
 */
export default function FooterWordmark() {
  const id = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const blobRef = useRef<SVGCircleElement>(null);
  const haloRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const svg = svgRef.current!;
    const blob = blobRef.current!;
    const halo = haloRef.current!;

    // the blob trails the pointer; the halo trails further behind
    const moveX = gsap.quickTo(blob, "attr.cx", { duration: 0.8, ease: "power3.out" });
    const moveY = gsap.quickTo(blob, "attr.cy", { duration: 0.8, ease: "power3.out" });
    const haloX = gsap.quickTo(halo, "attr.cx", { duration: 1.4, ease: "power3.out" });
    const haloY = gsap.quickTo(halo, "attr.cy", { duration: 1.4, ease: "power3.out" });

    // pointer position in the SVG's own units (viewBox 1200 x 200)
    const toSvg = (event: PointerEvent) => {
      const box = svg.getBoundingClientRect();
      return { x: ((event.clientX - box.left) / box.width) * 1200, y: ((event.clientY - box.top) / box.height) * 200 };
    };
    const onEnter = (event: PointerEvent) => {
      const p = toSvg(event);
      gsap.set([blob, halo], { attr: { cx: p.x, cy: p.y } });
      gsap.to(blob, { attr: { r: 150 }, duration: 0.45, ease: "power2.out", overwrite: "auto" });
      gsap.to(halo, { attr: { r: 185 }, duration: 0.7, ease: "power2.out", overwrite: "auto" });
    };
    const onMove = (event: PointerEvent) => {
      const p = toSvg(event);
      moveX(p.x);
      moveY(p.y);
      haloX(p.x);
      haloY(p.y);
    };
    const onLeave = () => {
      gsap.to(blob, { attr: { r: 0 }, duration: 0.6, ease: "power2.inOut", overwrite: "auto" });
      gsap.to(halo, { attr: { r: 0 }, duration: 0.9, ease: "power2.inOut", overwrite: "auto" });
    };

    svg.addEventListener("pointerenter", onEnter);
    svg.addEventListener("pointermove", onMove);
    svg.addEventListener("pointerleave", onLeave);
    return () => {
      svg.removeEventListener("pointerenter", onEnter);
      svg.removeEventListener("pointermove", onMove);
      svg.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const textProps = {
    x: 600,
    y: 170,
    textAnchor: "middle" as const,
    textLength: 1140,
    lengthAdjust: "spacingAndGlyphs" as const,
    className: "font-sans text-[200px] font-semibold uppercase",
  };

  return (
    <svg ref={svgRef} viewBox="0 0 1200 200" className="block w-full px-32 py-24" role="img" aria-label="Fourcrest">
      <defs>
        <filter id={`ink-${id}`} x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.028 0.04" numOctaves="3" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="83" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="0.55" result="blurred" />
          <feComponentTransfer in="blurred">
            <feFuncA type="linear" slope="5" intercept="-2.15" />
          </feComponentTransfer>
        </filter>
        <mask id={`mask-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="200">
          <circle ref={haloRef} cx="600" cy="100" r="0" fill="white" opacity="0.25" filter={`url(#ink-${id})`} />
          <circle ref={blobRef} cx="600" cy="100" r="0" fill="white" filter={`url(#ink-${id})`} />
        </mask>
      </defs>

      {/* outline */}
      <text {...textProps} fill="none" stroke="#231f20" strokeWidth="0.8">
        Fourcrest
      </text>
      {/* solid letters, only visible inside the ink blob */}
      <text {...textProps} fill="#231f20" mask={`url(#mask-${id})`} aria-hidden>
        Fourcrest
      </text>
    </svg>
  );
}
