"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

/**
 * Heron's page transition. Clicking a link to another page:
 *   1. hides the header and fades the current page out,
 *   2. loads the new page inside a small window in the centre of the screen,
 *   3. opens that window out to the screen edges (1.5s), with four guide lines
 *      riding along its edges, then brings the header back.
 * It wraps <main>; the header is found by its <header> tag.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const mainRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const leaving = useRef(false);
  const firstLoad = useRef(true);

  // 1. Leave: catch clicks on links to other pages of this site.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as HTMLElement).closest("a");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      if (/\.[a-z0-9]+$/i.test(url.pathname)) return; // files such as the brochure PDF
      event.preventDefault();
      event.stopPropagation();
      if (leaving.current) return;
      leaving.current = true;

      gsap
        .timeline({ onComplete: () => router.push(url.pathname + url.search + url.hash) })
        .to("header", { autoAlpha: 0, duration: 0.25 }, 0)
        .to(mainRef.current, { autoAlpha: 0, duration: 0.3, ease: "power1.out" }, 0);
    };
    // Capture phase, so this runs before Next's own link handling.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // 2–3. Enter: the new page opens out from the centre.
  useLayoutEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false; // the loader handles the very first page
      return;
    }
    leaving.current = false;
    const main = mainRef.current!;
    const [top, bottom, left, right] = Array.from(linesRef.current!.children) as HTMLElement[];
    const mask = { p: 50 };
    const render = () => {
      const p = mask.p;
      // The window is measured on the screen, not on the (taller) page.
      const x = (window.innerWidth * p) / 100;
      const y = (window.innerHeight * p) / 100;
      const below = main.offsetHeight - window.innerHeight + y;
      main.style.clipPath = `inset(${y}px ${x}px ${below}px ${x}px)`;
      top.style.top = `${p}%`;
      bottom.style.top = `${100 - p}%`;
      left.style.left = `${p}%`;
      right.style.left = `${100 - p}%`;
    };

    gsap.set(main, { autoAlpha: 1 });
    gsap.set(linesRef.current, { autoAlpha: 1 });
    render();
    const tl = gsap
      .timeline()
      .to(mask, { p: 0, duration: 1.5, ease: "power3.out", onUpdate: render })
      .to("header", { autoAlpha: 1, duration: 0.4 }, 1.1)
      .to(linesRef.current, { autoAlpha: 0, duration: 0.3 }, 1.2)
      .add(() => (main.style.clipPath = ""));
    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <>
      <main ref={mainRef}>{children}</main>
      <div ref={linesRef} aria-hidden className="pointer-events-none invisible fixed inset-0 z-[9600]">
        <div className="absolute inset-x-0 h-px bg-line" />
        <div className="absolute inset-x-0 h-px bg-line" />
        <div className="absolute inset-y-0 w-px bg-line" />
        <div className="absolute inset-y-0 w-px bg-line" />
      </div>
    </>
  );
}
