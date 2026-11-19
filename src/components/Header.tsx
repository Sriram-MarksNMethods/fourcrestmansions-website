"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import FourcrestLogo from "@/components/FourcrestLogo";
import PixelFill from "@/components/PixelFill";
import { RollArrow, RollText } from "@/components/Roll";
import { CONTACT_HREF, NAV } from "@/lib/site";
import { whenIntroDone } from "@/lib/intro";

const INK = "#231f20";
const BRAND = "#8a574c";

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Fade in once the loader has opened onto the page: right to left, Contact us first (as on Heron).
  useEffect(() => {
    const items = ref.current!.querySelectorAll("[data-header-item]");
    gsap.set(items, { autoAlpha: 0 });
    return whenIntroDone(() =>
      gsap.to(items, { autoAlpha: 1, duration: 0.5, delay: 0.35, stagger: { each: 0.08, from: "end" }, ease: "power1.out" }),
    );
  }, []);

  return (
    <header ref={ref} className="paper fixed inset-x-8 top-8 z-[9500] h-68 border-b border-line">
      <div className="grid h-full grid-cols-12 gap-x-20">
        <Link
          href="/"
          data-header-item
          className="col-span-6 flex items-center py-12 pl-16 text-ink lg:pl-32"
          aria-label="Fourcrest Mansions, home"
        >
          <FourcrestLogo className="h-40 w-auto" />
        </Link>

        {/* Desktop menu */}
        <nav className="col-span-6 -ml-10 hidden justify-end lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              data-header-item
              className="group relative flex w-164 items-start overflow-hidden border-l border-line p-12 text-ink/72 transition-colors duration-[400ms] data-filled:text-white"
            >
              <PixelFill color={INK} />
              <span className="mono relative text-14">
                <RollText>{item.label}</RollText>
              </span>
            </Link>
          ))}

          <Link
            href={CONTACT_HREF}
            data-header-item
            className="group relative flex w-200 flex-col justify-between overflow-hidden border-l border-line pt-12 pr-4 pb-4 pl-12 text-brand transition-colors duration-[400ms] data-filled:text-white"
          >
            <PixelFill color={BRAND} />
            <span className="mono relative text-14">
              <RollText>Contact us</RollText>
            </span>
            <RollArrow className="relative size-20 self-end" />
          </Link>
        </nav>

        {/* Phones and tablets: Menu button + drop-down panel */}
        <button
          type="button"
          data-header-item
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          className="mono col-span-6 flex items-center justify-end gap-12 border-l border-line pr-16 text-14 text-ink lg:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
          <span className="flex w-16 flex-col gap-3" aria-hidden>
            <span className="h-px bg-ink" />
            <span className="h-px bg-ink" />
            <span className="h-px bg-ink" />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav className="paper absolute inset-x-0 top-full border border-t-0 border-line lg:hidden">
          {[...NAV, { label: "Contact us", href: CONTACT_HREF }].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="mono block border-b border-line px-16 py-16 text-14 text-ink last:border-b-0 last:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
