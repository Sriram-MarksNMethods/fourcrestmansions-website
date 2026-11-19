"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Heron's scroll reveal. When the block scrolls into view (once), every child
 * marked with data-reveal animates in, 0.1s apart in page order:
 *   data-reveal="lines"  text rises line by line from behind a mask (0.8s, power2.out)
 *   data-reveal="up"     fades up 2.7rem (1s, power3.out)
 *   data-reveal="img"    the image settles from a slight zoom while fading in (1.6s, expo.out)
 *   data-reveal="line"   a hairline draws from left to right (1s)
 */
export default function Reveal({
  children,
  className = "",
  start = "top+=40% bottom",
}: {
  children: React.ReactNode;
  className?: string;
  /** ScrollTrigger start, e.g. "top+=40% bottom" = when 40% of the block is on screen */
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current!;
    const splits: SplitText[] = [];
    let trigger: ScrollTrigger | undefined;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      const tl = gsap.timeline({ paused: true });
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el, i) => {
        const at = 0.1 * (i + 1);
        const kind = el.dataset.reveal;
        if (kind === "lines") {
          const split = SplitText.create(el, { type: "lines", mask: "lines" });
          splits.push(split);
          tl.fromTo(split.lines, { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out", stagger: 0.02 }, at);
        } else if (kind === "up") {
          tl.fromTo(el, { opacity: 0, y: "2.7rem" }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", clearProps: "all" }, at);
        } else if (kind === "img") {
          tl.fromTo(el, { scale: 1.15, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.6, ease: "expo.out", clearProps: "all" }, at);
        } else if (kind === "line") {
          tl.fromTo(el, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 1, ease: "power3.inOut" }, at);
        }
        // Start states are set now, so the element can stop hiding (see globals.css).
        el.dataset.ready = "";
      });
      trigger = ScrollTrigger.create({ trigger: root, start, once: true, onEnter: () => tl.play() });
    });

    return () => {
      cancelled = true;
      trigger?.kill();
      splits.forEach((split) => split.revert());
    };
  }, [start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
