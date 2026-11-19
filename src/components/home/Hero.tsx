"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import PixelFill from "@/components/PixelFill";
import CursorReadout from "@/components/CursorReadout";
import { RollArrow, RollText } from "@/components/Roll";
import { whenIntroDone } from "@/lib/intro";

gsap.registerPlugin(SplitText);

// Details pinned on the elevation. x/y are % of the image box (where the marker sits).
const DETAILS = [
  { x: 40, y: 28, code: "Detail 01", text: "Jaali screens for light and privacy" },
  { x: 66, y: 71, code: "Detail 02", text: "Deep canopy over covered parking" },
];

const TAGS = ["Four elevations", "500 sq. yd. plots", "28 triplex mansions"];

/** Marquee strip under the hero text (Heron: 30s per loop). */
function Marquee() {
  const set = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 animate-[marquee-left_30s_linear_infinite] gap-16 pr-16">
      {TAGS.map((tag) => (
        <span key={tag} className="flex items-center gap-6 whitespace-nowrap">
          <svg viewBox="0 0 16 16" className="size-16 text-line" aria-hidden>
            <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" />
            <circle cx="8" cy="8" r="2" fill="currentColor" />
          </svg>
          <span className="mono text-14 text-ink/72">{tag}</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="flex overflow-hidden py-12 pl-16">
      {set(false)}
      {set(true)}
      {set(true)}
      {set(true)}
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<null | { x1: number; y1: number; x2: number; y2: number }>(null);
  const [open, setOpen] = useState<boolean[]>(DETAILS.map(() => false));
  const [dragging, setDragging] = useState(false);

  // Intro (after the loader has opened onto the hero, as on Heron): the title rises
  // line by line, then the paragraph lines follow and the button and tags fade in.
  useEffect(() => {
    const root = ref.current!;
    const title = SplitText.create(root.querySelector("h1")!, { type: "lines", mask: "lines" });
    const text = SplitText.create(root.querySelector("[data-hero-text]")!, { type: "lines", mask: "lines" });
    const fades = root.querySelectorAll("[data-hero-fade]");
    gsap.set([title.lines, text.lines], { yPercent: 100 });
    gsap.set(fades, { autoAlpha: 0 });

    const cancel = whenIntroDone(() => {
      gsap
        .timeline({ delay: 0.8 })
        .to(title.lines, { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 })
        .to(text.lines, { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.06 }, 0.35)
        .to(fades, { autoAlpha: 1, duration: 0.6, ease: "power1.out", stagger: 0.1 }, 0.5);
    });
    return () => {
      cancel();
      title.revert();
      text.revert();
    };
  }, []);

  // Click and drag on the drawing: draw a selection box; details inside it open up.
  // The box stays after you let go (as on Heron) until the next click.
  const pointFromEvent = (event: React.PointerEvent) => {
    const box = stageRef.current!.getBoundingClientRect();
    return { x: ((event.clientX - box.left) / box.width) * 100, y: ((event.clientY - box.top) / box.height) * 100 };
  };
  const onDown = (event: React.PointerEvent) => {
    const p = pointFromEvent(event);
    setSelection({ x1: p.x, y1: p.y, x2: p.x, y2: p.y });
    setDragging(true);
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  };
  const onMove = (event: React.PointerEvent) => {
    if (!dragging || !selection) return;
    const p = pointFromEvent(event);
    const next = { ...selection, x2: p.x, y2: p.y };
    setSelection(next);
    const [left, right] = [Math.min(next.x1, next.x2), Math.max(next.x1, next.x2)];
    const [top, bottom] = [Math.min(next.y1, next.y2), Math.max(next.y1, next.y2)];
    // Cards inside the box open; cards already open stay open until their close button is pressed.
    setOpen((list) => list.map((isOpen, i) => isOpen || (DETAILS[i].x >= left && DETAILS[i].x <= right && DETAILS[i].y >= top && DETAILS[i].y <= bottom)));
  };
  const onUp = () => setDragging(false);

  const box = selection && {
    left: `${Math.min(selection.x1, selection.x2)}%`,
    top: `${Math.min(selection.y1, selection.y2)}%`,
    width: `${Math.abs(selection.x2 - selection.x1)}%`,
    height: `${Math.abs(selection.y2 - selection.y1)}%`,
    // fill fades towards the corner you are dragging to
    background: `linear-gradient(to ${selection.y2 >= selection.y1 ? "bottom" : "top"} ${selection.x2 >= selection.x1 ? "right" : "left"}, transparent, rgb(138 87 76 / 0.75))`,
  };

  return (
    <section ref={ref} className="flex h-[calc(100dvh-1.6rem)] flex-col pt-64">
      {/* Drawing area */}
      <div className="group/hero relative flex-1 p-32 select-none">
        {/* Ruler frame: ticks along each edge and a plus in every corner */}
        <div aria-hidden className="absolute inset-12">
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

        <div
          ref={stageRef}
          data-hero-reveal
          className="relative size-full cursor-crosshair touch-none"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <Image
            src="/images/villa-stipple.webp"
            alt="Fourcrest Mansions villa, front elevation illustration"
            fill
            priority
            sizes="100vw"
            className="pointer-events-none object-contain"
          />

          {/* Guides that appear on hover: dashed level lines and brand dimension lines */}
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[400ms] group-hover/hero:opacity-100">
            {[9, 15, 43, 67, 71, 95].map((top) => (
              <div key={top} className="line-dash absolute inset-x-0 h-px opacity-60" style={{ top: `${top}%` }} />
            ))}
            <div className="absolute top-[9%] bottom-[5%] left-0 w-px bg-brand/70" />
            <div className="absolute right-[27%] bottom-[3%] left-[24%] h-px bg-brand/70" />
          </div>

          {/* Selection box while dragging */}
          {box && <div className="pointer-events-none absolute border border-brand" style={box} />}

          {/* Detail markers: a pulsing square that opens into a card when selected */}
          {DETAILS.map((detail, i) => (
            <div
              key={detail.code}
              className="pointer-events-none absolute w-215 -translate-x-[calc(100%-1.4rem)] -translate-y-8 pt-48 pr-32 pb-16 pl-16"
              style={{ left: `${detail.x}%`, top: `${detail.y}%` }}
            >
              <div
                className={`absolute bg-brand transition-all duration-[400ms] ${
                  open[i] ? "top-0 right-0 size-full opacity-100" : "top-8 right-8 size-13 animate-pulse opacity-80"
                }`}
              />
              <div
                className={`relative flex flex-col gap-4 text-white transition-opacity duration-[400ms] ${open[i] ? "opacity-100" : "opacity-0"}`}
              >
                <span className="mono text-12 opacity-80">{detail.code}</span>
                <span className="mono text-14">{detail.text}</span>
              </div>
              {/* Close button: an open card stays until this is pressed */}
              <button
                type="button"
                aria-label={`Close ${detail.code}`}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={() => setOpen((list) => list.map((value, j) => (j === i ? false : value)))}
                className={`absolute top-8 right-8 flex size-13 items-center justify-center bg-white text-brand transition-opacity duration-[400ms] ${
                  open[i] ? "pointer-events-auto cursor-pointer opacity-100" : "opacity-0"
                }`}
              >
                <svg viewBox="0 0 6 6" className="size-6" aria-hidden>
                  <path d="M0.5 0.5l5 5M5.5 0.5l-5 5" stroke="currentColor" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Crosshair, X/Y readout and the drag hint */}
        <CursorReadout className="hidden lg:block" />
      </div>

      {/* Bottom bar */}
      <div className="relative grid lg:h-160 lg:grid-cols-12 lg:gap-x-20">
        <div className="absolute inset-x-0 top-0 h-px bg-line" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-line" />

        <div className="flex items-center px-16 py-24 lg:col-span-7 lg:px-32">
          <h1 className="heading text-40 font-bold lg:text-56">Luxury triplex mansions in south Hyderabad</h1>
        </div>

        <div className="relative flex flex-col border-line lg:col-span-5 lg:-ml-20 lg:border-l">
          <div className="flex flex-1 border-y border-line lg:border-t-0">
            <p data-hero-text className="flex-1 p-16 text-16 font-normal text-ink">
              28 triplex mansions on 500 sq. yd. plots across 6.14 acres at Mankhal, each in one of four elevations. A
              project by{" "}
              <Link href="/about" className="font-semibold underline underline-offset-2 transition-colors hover:text-brand">
                Globus South
              </Link>
              .
            </p>
            <Link
              data-hero-fade
              href="#intro"
              className="group relative flex w-171 flex-col justify-between overflow-hidden border-l border-line pt-12 pr-4 pb-4 pl-12 text-brand transition-colors duration-[400ms] data-filled:text-white"
            >
              <PixelFill color="#8a574c" />
              <span className="mono relative text-14">
                <RollText>Discover more</RollText>
              </span>
              <RollArrow className="relative size-20 self-end" />
            </Link>
          </div>
          <div data-hero-fade>
            <Marquee />
          </div>
        </div>
      </div>
    </section>
  );
}
