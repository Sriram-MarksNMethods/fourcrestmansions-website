"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { whenIntroDone } from "@/lib/intro";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** The page's Lenis instance (null before it starts). */
export function getLenis() {
  return lenis;
}

/** Smooth wheel scrolling (Lenis, as on Heron), driven by GSAP's ticker so ScrollTrigger stays in sync. */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    lenis = new Lenis({ autoRaf: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // No scrolling while the loading screen plays (lenis.stop() also clips the page).
    lenis.stop();
    const cancelUnlock = whenIntroDone(() => lenis?.start());
    return () => {
      cancelUnlock();
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // Every page opens at the top.
  useLayoutEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return children;
}
