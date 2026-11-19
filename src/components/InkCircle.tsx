"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Heron's "ink" circle: as the section scrolls past, a brand-coloured disc spreads
 * like ink soaking into paper (ragged edge), then settles into a clean circle.
 * Fills its positioned parent and is tied to the scrollbar: it starts spreading as
 * the section comes into view and is a full circle by the time the section's top
 * reaches the middle of the screen (so it is always complete while you can see it).
 */
export default function InkCircle({ cx = 68, cy = 30, r = 20 }) {
  const ref = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    const svg = ref.current!;
    const circle = svg.querySelector("circle")!;
    const displace = svg.querySelector("feDisplacementMap")!;
    const state = { p: 0 };
    const render = () => {
      circle.setAttribute("r", String(r * state.p));
      // ragged while it spreads, smooth once it has settled
      displace.setAttribute("scale", String(12 * (1 - state.p)));
    };
    render();
    const tween = gsap.to(state, {
      p: 1,
      ease: "none",
      onUpdate: render,
      scrollTrigger: {
        trigger: svg.parentElement,
        start: "top 90%",
        end: "top 50%",
        scrub: 0.6,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [r]);

  return (
    <svg ref={ref} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden>
      <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" seed="4" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <circle cx={cx} cy={cy} r="0" fill="#8a574c" filter={`url(#${id})`} />
    </svg>
  );
}
