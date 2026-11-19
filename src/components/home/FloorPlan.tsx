"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { getLenis } from "@/components/SmoothScroll";
import { PLAN_OUTLINE, PLAN_VIEWBOX } from "@/lib/floor-plan";

gsap.registerPlugin(ScrollTrigger, Observer);

// Heron's "Right there with you / For the whole design" section, built from the real
// ground floor plan. When it reaches the top of the screen the page stops scrolling and
// the wheel (or a swipe) scrubs through the build instead, smoothly, like scrolling:
// two headlines → wall outline flies in → solid walls → furniture → room labels →
// dimensions → clickable highlights → the plan narrows and a feature panel slides in.

const HEADLINES = ["Room for everyone", "On every floor"];

// The note in the bottom-left corner changes with each step (Heron's "Introduction" box).
const STEPS = [
  "Every Fourcrest mansion starts from a plan drawn around family life, not a template.",
  "Walls first: generous rooms around a central lobby, with a lift that serves every floor.",
  "Then the life inside: an entertainment room, a formal drawing room and a bedroom on the ground floor.",
  "Every room is measured and named, so you know exactly how your furniture will fit.",
];

// Highlights on the plan (x/y = % of the plan box).
const HIGHLIGHTS = [
  { x: 36.5, y: 77.5, title: "Lift to every floor", text: "A private lift beside the main stair links all three floors." },
  { x: 29.5, y: 45, title: "Entertainment room", text: "A 26 ft room for films, games and long evenings with family." },
  { x: 71, y: 51.5, title: "Foyer and parking", text: "A covered foyer opens straight onto three parking bays." },
];

const FEATURES = [
  "Lift to all three floors.",
  "Entertainment room and formal drawing room.",
  "Ground-floor bedroom with its own toilet.",
  "Covered parking for three cars.",
];

// Where each wall piece flies in from (Heron's offsets, in viewport units / rem).
const FLY_FROM: [string, string][] = [
  ["-100vw", "-16rem"],
  ["100vw", "-26rem"],
  ["100vw", "26rem"],
  ["-20rem", "-100vh"],
  ["-22rem", "-100vh"],
  ["-100vw", "28rem"],
  ["-100vw", "48rem"],
  ["-48rem", "100vh"],
  ["42rem", "100vh"],
];

// Where each stage happens, in pixels of wheel scrolling (measured on Heron, 1000px-tall screen).
const AT = {
  head1Out: 600,
  head2In: 1100,
  head2Out: 1900,
  outline: 1900,
  walls: 2500,
  furniture: 3100,
  labels: 3550,
  dims: 4150,
  highlights: 4750,
  expand: 5400,
  end: 5600,
};
// How far past either end you have to keep scrolling before the page lets go.
const RELEASE = 150;

function Ticks() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-12">
      <div className="ticks-x absolute inset-x-20 top-0 h-8 opacity-70" />
      <div className="ticks-x absolute inset-x-20 bottom-0 h-8 opacity-70" />
      <div className="ticks-y absolute inset-y-20 left-0 w-8 opacity-70" />
      <div className="ticks-y absolute inset-y-20 right-0 w-8 opacity-70" />
      {["-top-2 -left-2", "-top-2 -right-2", "-bottom-2 -left-2", "-right-2 -bottom-2"].map((pos) => (
        <svg key={pos} viewBox="0 0 12 12" className={`absolute size-12 text-ink ${pos}`}>
          <path d="M6 0v12M0 6h12" stroke="currentColor" />
        </svg>
      ))}
    </div>
  );
}

export default function FloorPlan() {
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const q = (s: string) => section.querySelectorAll(s);
    const heads = q("[data-headline]");
    const pieces = q("[data-piece]");
    const layer = (name: string) => section.querySelector(`[data-layer="${name}"]`);

    // Start state: first headline showing, wall pieces waiting off-screen, layers hidden.
    gsap.set(pieces, { x: (i) => FLY_FROM[i % FLY_FROM.length][0], y: (i) => FLY_FROM[i % FLY_FROM.length][1], scale: 1.1, autoAlpha: 0 });
    gsap.set([heads[1], q("[data-layer]"), q("[data-note]")], { autoAlpha: 0 });

    // The build, laid out in "pixels of scroll" (1 timeline second = 1px).
    const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });
    tl.to(heads[0], { autoAlpha: 0, scale: 0.96, y: -3, color: "#bcaca6", duration: 400 }, AT.head1Out)
      .fromTo(heads[1], { autoAlpha: 0, scale: 1.03, color: "#bcaca6" }, { autoAlpha: 1, scale: 1, color: "#231f20", duration: 500 }, AT.head2In)
      .to(heads[1], { autoAlpha: 0, scale: 0.96, y: -3, duration: 400 }, AT.head2Out)
      .to(pieces, { autoAlpha: 1, duration: 100, stagger: 15 }, AT.outline)
      .to(pieces, { x: 0, y: 0, scale: 1, duration: 700, ease: "power2.out", stagger: 15 }, AT.outline)
      .to(q("[data-note]"), { autoAlpha: 1, duration: 150 }, AT.outline + 150)
      .to(layer("walls"), { autoAlpha: 1, duration: 450 }, AT.walls)
      .to(layer("furniture"), { autoAlpha: 1, duration: 450 }, AT.furniture)
      .to(layer("labels"), { autoAlpha: 1, duration: 450 }, AT.labels)
      .to(layer("dims"), { autoAlpha: 1, duration: 450 }, AT.dims)
      .to(layer("highlights"), { autoAlpha: 1, duration: 450 }, AT.highlights)
      .set({}, {}, AT.end);

    // Where you are in the build. The wheel moves `target`; the timeline glides after it
    // (like Lenis does for the page), so the build moves smoothly and stops when you stop.
    let target = 0;
    let overshoot = 0;
    const show = () => {
      const p = tl.time();
      setStep(p < AT.furniture ? 0 : p < AT.labels ? 1 : p < AT.dims ? 2 : p < AT.highlights ? 3 : 4);
      setExpanded(p >= AT.expand);
    };
    const glide = () => gsap.to(tl, { time: target, duration: 0.9, ease: "power3.out", overwrite: true, onUpdate: show });

    const observer = Observer.create({
      target: window,
      type: "wheel,touch",
      preventDefault: true,
      onChangeY: (self) => {
        // wheel: down = forward; touch: swiping up = forward (and a bit faster)
        const delta = self.event.type.startsWith("touch") ? -self.deltaY * 1.5 : self.deltaY;
        const next = target + delta;
        if (next > AT.end || next < 0) {
          overshoot += delta;
          if (overshoot > RELEASE) release(1);
          else if (overshoot < -RELEASE) release(-1);
          target = gsap.utils.clamp(0, AT.end, next);
          return;
        }
        overshoot = 0;
        target = next;
        glide();
      },
    });
    observer.disable();

    const lockY = () => section.getBoundingClientRect().top + window.scrollY - 8;
    let releasedAt = 0;

    // Hold the page still and hand the wheel to the build.
    const lock = () => {
      if (Date.now() - releasedAt < 800) return; // just let go: don't catch again straight away
      overshoot = 0;
      const lenis = getLenis();
      lenis?.stop();
      lenis?.scrollTo(lockY(), { immediate: true, force: true });
      observer.enable();
    };
    // Give the wheel back to the page and nudge past the catch point.
    const release = (direction: 1 | -1) => {
      releasedAt = Date.now();
      observer.disable();
      const lenis = getLenis();
      lenis?.start();
      lenis?.scrollTo(lockY() + direction * 4, { immediate: true, force: true });
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 8px",
      end: "top 8px",
      onEnter: lock,
      onEnterBack: lock,
    });

    return () => {
      trigger.kill();
      observer.kill();
      tl.kill();
      getLenis()?.start();
    };
  }, []);

  const note = step;

  return (
    // One screen. When it reaches the top, the page stops and the wheel steps through it.
    <div className="border-b border-line">
      <section ref={sectionRef} className="relative flex h-[calc(100dvh-1.6rem)] overflow-hidden pt-68">
        {/* Plan stage */}
        <div className="relative min-w-0 flex-1">
          <Ticks />

          {/* Two big headlines, one after the other */}
          {HEADLINES.map((text) => (
            <h2 key={text} data-headline className="heading absolute inset-0 flex items-center justify-center text-center text-40 font-bold lg:text-56">
              {text}
            </h2>
          ))}

          {/* The plan, built up layer by layer */}
          <div className="absolute inset-x-32 top-48 bottom-48 flex items-center justify-center">
            <div className="relative aspect-[1480/1048] max-h-full w-full max-w-[100rem]">
              <svg viewBox={PLAN_VIEWBOX} className="absolute inset-0 size-full overflow-visible" fill="none" stroke="#231f20" strokeWidth="1.2" aria-hidden>
                {PLAN_OUTLINE.map((d, i) => (
                  <path key={i} data-piece d={d} />
                ))}
              </svg>
              {/* eslint-disable-next-line @next/next/no-img-element -- static SVG layers */}
              <img data-layer="walls" src="/images/plan/walls.svg" alt="" className="absolute inset-0 size-full" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-layer="furniture" src="/images/plan/furniture.svg" alt="" className="absolute inset-0 size-full" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-layer="labels" src="/images/plan/labels.svg" alt="" className="absolute inset-0 size-full" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-layer="dims" src="/images/plan/dimensions.svg" alt="" className="absolute inset-0 size-full" />

              <div data-layer="highlights" className="absolute inset-0">
                {HIGHLIGHTS.map((h, i) => (
                  <div key={h.title} className="absolute" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
                    <button
                      type="button"
                      onClick={() => setActive(active === i ? null : i)}
                      onMouseEnter={() => setActive(i)}
                      onMouseLeave={() => setActive(null)}
                      aria-label={h.title}
                      className="mono relative flex size-24 -translate-1/2 animate-[pulse-soft_1.5s_ease-out_infinite] items-center justify-center bg-brand text-10 text-white"
                    >
                      0{i + 1}
                    </button>
                    <div
                      className={`paper absolute top-20 left-20 z-10 w-260 border border-line transition-opacity duration-[400ms] ${
                        active === i ? "opacity-100" : "pointer-events-none opacity-0"
                      }`}
                    >
                      <p className="mono bg-ink px-10 py-6 text-10 text-white">Highlight 0{i + 1}</p>
                      <p className="heading px-10 pt-10 text-16">{h.title}</p>
                      <p className="px-10 pt-4 pb-10 text-12 font-normal">{h.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom-left note that follows the steps */}
          <div data-note className="paper absolute bottom-32 left-16 w-280 border border-line lg:left-32">
            <p className="mono bg-ink px-10 py-6 text-12 text-white">The ground floor</p>
            <div className="border-b-4 border-ink px-10 pt-8 pb-10">
              {note < STEPS.length && <p className="text-14 font-normal text-ink">{STEPS[note]}</p>}
              <p className="mono pt-12 text-12 text-mute">{note < STEPS.length ? "[Scroll to continue]" : "[Click on a highlight]"}</p>
            </div>
          </div>
        </div>

        {/* Feature panel that slides in at the end */}
        {/* Heron toggles this with a CSS transition rather than scrubbing it */}
        <aside
          className={`shrink-0 overflow-hidden border-line transition-[width] duration-700 ease-heron ${
            expanded ? "w-full border-l md:w-557" : "w-0"
          }`}
        >
          <div className="flex h-full w-[100vw] flex-col md:w-557">
            <p className="mono border-b border-line px-32 py-16 text-14 text-ink">Ground floor, east facing</p>
            <div className="border-b border-line px-32 py-32">
              <h2 className="heading text-32 lg:text-48">A ground floor made for gathering</h2>
              <p className="mt-24 text-16">
                Entertaining and everyday living share the ground floor, with bedrooms and private spaces on the floors
                above.
              </p>
            </div>
            <ul>
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-center justify-between border-b border-line px-32 py-16 text-16 text-ink">
                  {feature}
                  <span className="flex size-24 items-center justify-center rounded-full border border-line">
                    <span className="size-6 bg-brand" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
