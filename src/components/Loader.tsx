"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import VillaElevation from "@/components/VillaElevation";
import { finishIntro } from "@/lib/intro";

const INFO = [
  { label: "Type", value: "Luxury triplex villa community" },
  { label: "Developer", value: "Globus South" },
  { label: "Scale", value: "28 mansions on 6.14 acres, 500 sq. yd. plot each", tall: true },
  { label: "Location", value: "Mankhal, Maheshwaram, Hyderabad" },
];

const STEPS = [
  "001 Survey the 6.14 acre site",
  "002 Set out 28 plots",
  "003 Pour the foundations",
  "004 Raise the frame",
  "005 Fit the jaali screens",
  "006 Lay the stone cladding",
  "007 Light the canopy",
  "008 Plant the gardens",
  "009 Open the clubhouse",
  "010 Hand over the keys",
];

/**
 * Heron's loading screen: a red progress line across the middle of the screen,
 * the villa's elevation drawing itself line by line, the project details and a
 * numbered build list ticking in. At 100% the red line splits in two and the gap
 * between the halves opens up to show the page underneath.
 * The drawing is placed over the hero image (marked data-hero-reveal) so they line up.
 */
export default function Loader() {
  const ref = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const root = ref.current!;
    const q = (selector: string) => root.querySelectorAll<HTMLElement | SVGElement>(selector);
    const percent = root.querySelector("[data-percent]")!;
    const shapes = q("[data-draw]");
    const infoRows = q("[data-info-row]");
    const steps = q("[data-step]");
    const lineTop = root.querySelector("[data-line-top]")!;
    const lineBot = root.querySelector("[data-line-bot]")!;
    const art = root.querySelector<HTMLElement>("[data-art]")!;

    // Put the drawing exactly where the hero image sits, so one turns into the other.
    const hero = document.querySelector<HTMLElement>("[data-hero-reveal]");
    const frame = root.getBoundingClientRect();
    if (hero) {
      const box = hero.getBoundingClientRect();
      Object.assign(art.style, {
        left: `${box.left - frame.left}px`,
        top: `${box.top - frame.top}px`,
        width: `${box.width}px`,
        height: `${box.height}px`,
      });
    }

    gsap.set(shapes, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set([infoRows, steps], { autoAlpha: 0 });
    gsap.set([lineTop, lineBot], { scaleX: 0, transformOrigin: "left center" });

    const loading = { p: 0 };
    const render = () => {
      const p = loading.p;
      percent.textContent = String(Math.round(p));
      gsap.set([lineTop, lineBot], { scaleX: p / 100 });
      // Each shape draws in its own slice of the progress, bottom of the house first.
      shapes.forEach((shape, i) => {
        const start = (i / shapes.length) * 85;
        const drawn = gsap.utils.clamp(0, 1, (p - start) / 15);
        shape.style.strokeDashoffset = String(1 - drawn);
      });
      infoRows.forEach((row, i) => gsap.set(row, { autoAlpha: p > 4 + i * 12 ? 1 : 0 }));
      steps.forEach((step, i) => gsap.set(step, { autoAlpha: p > 30 + i * 7 ? 1 : 0 }));
    };

    // The ending: the red line splits in two and the gap between the halves cuts
    // through the loading screen, showing the real page underneath. Above and below
    // the gap the loader stays put. `gap` is half the gap's height in px.
    const middle = frame.height / 2;
    const split = { gap: 0 };
    const renderSplit = () => {
      const top = ((middle - split.gap) / frame.height) * 100;
      const bottom = ((middle + split.gap) / frame.height) * 100;
      // evenodd: the outer box minus the band = loader with a hole across it
      root.style.clipPath = `polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, 0 ${top}%, 100% ${top}%, 100% ${bottom}%, 0 ${bottom}%, 0 ${top}%)`;
      gsap.set(lineTop, { y: -split.gap - 2 });
      gsap.set(lineBot, { y: split.gap + 2 });
    };

    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(q("[data-fade]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.05 })
      // One continuous run from 0 to 100% (no mid-way pause), about 3s.
      .to(loading, { p: 100, duration: 3, ease: "power1.inOut", onUpdate: render }, "<")
      // Brief hold on 100%, then split (Heron: about 0.45s, speeding up as it opens).
      .add("split", "+=0.35")
      .to([q("[data-fade]"), q("[data-info-row]"), q("[data-step]"), percent.parentElement], { autoAlpha: 0, duration: 0.3 }, "split")
      .to(split, { gap: middle + 2, duration: 0.45, ease: "power2.in", onUpdate: renderSplit }, "split")
      .add(finishIntro)
      .add(() => setGone(true));

    return () => {
      tl.kill();
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={ref} className="paper fixed inset-8 z-[9800] overflow-hidden" aria-hidden>
      {/* Elevation drawing (placed over the hero image by the effect above) */}
      <div data-art className="absolute inset-x-32 top-96 bottom-200 text-ink/80">
        <VillaElevation className="size-full" />
      </div>

      {/* Progress line: two copies, they split apart at the end */}
      <div className="absolute inset-x-0 top-1/2">
        <div data-line-top className="absolute inset-x-0 top-0 h-[3px] -translate-y-1/2 bg-brand" />
        <div data-line-bot className="absolute inset-x-0 top-0 h-[3px] -translate-y-1/2 bg-brand" />
        <div className="mono absolute -top-22 left-16 text-12 text-brand lg:left-32">
          <span data-percent>0</span>%
        </div>
      </div>

      {/* Bottom: statement on the left, project details and build list on the right */}
      <div className="absolute inset-x-16 bottom-16 flex flex-col gap-24 lg:inset-x-32 lg:flex-row lg:items-end lg:justify-between">
        <p data-fade className="heading text-24 leading-none lg:text-32">
          Four expressions,
          <br />
          one signature
          <br />
          legacy by
          <br />
          Globus South
        </p>

        <div className="mono flex items-end gap-x-70 text-10 text-ink/72">
          <div className="flex w-274 flex-col gap-4">
            <div data-fade className="mb-4 flex flex-col gap-6">
              Welcome to Fourcrest Mansions
              <span className="block h-px w-full bg-[repeating-linear-gradient(to_right,currentColor_0_3px,transparent_3px_6px)] opacity-60" />
            </div>
            {INFO.map((row) => (
              <div key={row.label} data-info-row className="flex gap-8 transition-opacity duration-300">
                <span className="w-72 shrink-0">{row.label}</span>
                <span>:</span>
                <span className="w-180">{row.value}</span>
              </div>
            ))}
          </div>
          <ol className="hidden w-186 lg:block">
            {STEPS.map((step) => (
              <li key={step} data-step className="transition-opacity duration-300">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
