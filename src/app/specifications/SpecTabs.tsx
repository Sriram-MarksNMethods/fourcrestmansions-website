"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getLenis } from "@/components/SmoothScroll";

// Heron's "Key features" block: a row of numbered tabs sticks under the header while
// the panels scroll by underneath. The tab for the panel on screen turns dark;
// clicking a tab scrolls to its panel.
export type Spec = { title: string; heading: string; text: string; image: string; alt: string };

export default function SpecTabs({ specs }: { specs: Spec[] }) {
  const [active, setActive] = useState(0);
  const panels = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }, // the panel crossing the middle of the screen
    );
    panels.current.forEach((panel) => panel && observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  const go = (i: number) => {
    const panel = panels.current[i];
    if (!panel) return;
    const y = panel.getBoundingClientRect().top + window.scrollY - 120;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* sticky tab row */}
      <div className="paper sticky top-68 z-10 grid grid-cols-2 border-y border-line sm:grid-cols-3 lg:grid-cols-6">
        {specs.map((spec, i) => (
          <button
            key={spec.title}
            type="button"
            onClick={() => go(i)}
            className={`flex flex-col gap-8 border-line px-16 py-10 text-left transition-colors duration-300 not-last:border-r ${
              i === active ? "bg-ink text-white" : "text-ink hover:bg-ink/5"
            }`}
          >
            <span className="mono text-10">[{String(i + 1).padStart(2, "0")}]</span>
            <span className="mono text-12">{spec.title}</span>
          </button>
        ))}
      </div>

      {specs.map((spec, i) => (
        <section
          key={spec.title}
          ref={(el) => {
            panels.current[i] = el;
          }}
          data-index={i}
          className="relative grid min-h-[90vh] border-b border-line lg:grid-cols-12"
        >
          {/* side marker on the left edge, like Heron's [02] */}
          <p className="mono absolute top-1/2 left-8 hidden text-10 text-ink-2 lg:block">[{String(i + 1).padStart(2, "0")}]</p>
          <div className="relative min-h-320 lg:col-span-7 lg:col-start-5 lg:my-60">
            <Image src={spec.image} alt={spec.alt} fill sizes="(min-width: 992px) 66vw, 100vw" className="object-cover" />
          </div>
          <div className="px-16 py-32 lg:absolute lg:bottom-48 lg:left-32 lg:w-[calc(33.333%-6.4rem)] lg:px-0 lg:py-0">
            <p className="mono mb-8 text-10 text-ink-2">{spec.title}</p>
            <h3 className="heading text-28 lg:text-32">{spec.heading}</h3>
            <p className="mt-12 text-14 font-normal">{spec.text}</p>
          </div>
        </section>
      ))}
    </div>
  );
}
