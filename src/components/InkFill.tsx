"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Heron's scroll "ink fill" (their ink-mask, path variant): a pencil sketch sits
 * underneath and the colour picture pours down over it as you scroll, with a
 * soft curved, inky edge. The edge is an SVG mask path roughed up by Heron's
 * displacement filter. Tied to the scrollbar:
 *   starts when the picture's top reaches `start`% down the screen,
 *   done when its top reaches `end`% down the screen (so it is full colour
 *   by the time you are looking at it).
 * Or, with `hover`, the colour pours in when the pointer enters the nearest
 * [data-fill-hover] parent (or the picture itself) and drains back out on leave.
 * The sketch and the colour picture must be the same size so they line up.
 */
export default function InkFill({
  sketch,
  colour,
  width,
  height,
  alt,
  start = 0,
  end = 0,
  hover = false,
  sizes,
  className = "",
  imageClassName = "object-cover",
}: {
  sketch: string;
  colour: string;
  width: number;
  height: number;
  alt: string;
  start?: number;
  end?: number;
  hover?: boolean;
  sizes: string;
  className?: string;
  imageClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");
  // viewBox is 1000 wide and as tall as the picture's shape
  const vh = Math.round((1000 * height) / width);

  useEffect(() => {
    const box = ref.current!;
    const path = box.querySelector<SVGPathElement>("[data-fill]")!;
    const state = { p: 0 };
    // the fill's bottom edge: a shallow downward curve (Heron: Q 500 1250 over 1000)
    const render = () => {
      const y = 1 + state.p * (vh + 300);
      const dip = y + state.p * 250;
      path.setAttribute("d", `M 0 ${y} Q 500 ${dip} 1000 ${y} L 1000 0 L 0 0 Z`);
    };
    render();

    if (hover) {
      const target = box.closest<HTMLElement>("[data-fill-hover]") ?? box;
      const fill = () => gsap.to(state, { p: 1, duration: 1.1, ease: "power2.out", onUpdate: render, overwrite: true });
      const drain = () => gsap.to(state, { p: 0, duration: 0.7, ease: "power2.inOut", onUpdate: render, overwrite: true });
      target.addEventListener("pointerenter", fill);
      target.addEventListener("pointerleave", drain);
      return () => {
        gsap.killTweensOf(state);
        target.removeEventListener("pointerenter", fill);
        target.removeEventListener("pointerleave", drain);
      };
    }

    const tween = gsap.to(state, {
      p: 1,
      ease: "none",
      onUpdate: render,
      scrollTrigger: { trigger: box, start: `top ${start}%`, end: `top ${end}%`, scrub: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [start, end, hover, vh]);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <Image src={sketch} alt={alt} fill sizes={sizes} className={imageClassName} />
      <svg viewBox={`0 0 1000 ${vh}`} className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <filter id={`fill-ink-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.045 0.055" numOctaves="4" seed="5" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="100" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="1.8" result="blurred" />
            <feComponentTransfer in="blurred">
              <feFuncA type="linear" slope="2.2" intercept="-0.6" />
            </feComponentTransfer>
          </filter>
          <mask id={`fill-mask-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height={vh}>
            <path data-fill fill="white" filter={`url(#fill-ink-${id})`} d="M 0 1 Q 500 2 1000 1 L 1000 0 L 0 0 Z" />
          </mask>
        </defs>
        <image href={colour} x="0" y="0" width="1000" height={vh} preserveAspectRatio="xMidYMid slice" mask={`url(#fill-mask-${id})`} />
      </svg>
    </div>
  );
}
