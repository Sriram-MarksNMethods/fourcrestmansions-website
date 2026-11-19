"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Heron's manifesto text: every letter starts grey and turns dark one after
 * another as you scroll the heading through the screen (tied to the scrollbar).
 */
export default function ScrubText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current!;
    let split: SplitText | undefined;
    let tween: gsap.core.Tween | undefined;
    document.fonts.ready.then(() => {
      split = SplitText.create(el, { type: "words,chars" });
      tween = gsap.fromTo(
        split.chars,
        { color: "#bcaca6" },
        {
          color: "#231f20",
          duration: 0.5,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "center bottom+=10%", end: "center top+=40%", scrub: true },
        },
      );
    });
    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
    };
  }, []);

  return (
    <h2 ref={ref} className={className}>
      {children}
    </h2>
  );
}
