"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

// "Made for": picture on the left, a list of 8 rows on the right.
// The open row moves on by itself every 2 seconds; a timer and a progress bar
// under its name show how long is left. Clicking a row jumps to it.
// The new picture wipes in from the top over the previous one.
const ROWS = [
  { title: "Large families", text: "Five bedrooms over three floors, with room for everyone.", image: "/images/r-family-lounge-hd.webp" },
  { title: "Three generations", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: "/images/r-formal-living-hd.webp" },
  { title: "Entrepreneurs", text: "Minutes from Rajiv Gandhi International Airport.", image: "/images/r-aerial-south-hyderabad-hd.webp" },
  { title: "NRI buyers", text: "Sed do eiusmod tempor incididunt ut labore et dolore.", image: "/images/r-window-morning-hd.webp" },
  { title: "Hosts", text: "Ut enim ad minim veniam, quis nostrud exercitation.", image: "/images/r-library-lounge-hd.webp" },
  { title: "Wellness seekers", text: "Pool, gym and yoga deck in the clubhouse.", image: "/images/r-pool-deck-hd.webp" },
  { title: "Garden lovers", text: "Landscaped gardens and a jogging and walking track.", image: "/images/r-garden-path-wide.webp" },
  { title: "Quiet living", text: "Just 28 mansions on 6.14 acres, gated and private.", image: "/images/r-wicker-terrace.webp" },
];

const DURATION = 2000; // ms each row stays open

export default function UseCases() {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // refs mirror the state so the animation loop always sees the latest values
  const activeRef = useRef(0);
  const elapsedRef = useRef(0);

  function open(i: number) {
    setPrevious(activeRef.current);
    activeRef.current = i;
    elapsedRef.current = 0;
    setActive(i);
    setElapsed(0);
  }

  // The timer: only runs while the section is on screen.
  useEffect(() => {
    let visible = false;
    let last = performance.now();
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = performance.now();
    });
    observer.observe(sectionRef.current!);

    const tick = (now: number) => {
      if (visible) {
        elapsedRef.current += now - last;
        // time is up: open the next row
        if (elapsedRef.current >= DURATION) open((activeRef.current + 1) % ROWS.length);
        else setElapsed(elapsedRef.current);
      }
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const progress = Math.min(elapsed / DURATION, 1);

  return (
    <section ref={sectionRef} className="grid grid-cols-1 border-b border-line lg:h-820 lg:grid-cols-2">
      {/* pictures: the previous one stays underneath while the new one wipes in */}
      <div className="relative aspect-[4/3] overflow-hidden border-line lg:aspect-auto lg:border-r">
        {ROWS.map((row, i) => (
          <div
            key={i === active ? `${row.title}-${active}-${previous}` : row.title}
            className={`absolute inset-0 ${
              i === active ? "z-10 animate-[wipe-down_1s_var(--ease-heron)_both]" : i === previous ? "z-0" : "invisible"
            }`}
          >
            <Image src={row.image} alt="" fill sizes="(min-width: 992px) 50vw, 100vw" className="object-cover" />
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-between">
        <Reveal start="top+=65% bottom" className="px-16 pt-40 pb-40 lg:pl-154">
          <p data-reveal="lines" className="mono mb-20 text-14">
            Made for
          </p>
          <h2 data-reveal="lines" className="heading text-40 lg:text-48">
            Made for
            <br />
            the people who
            <br />
            live in them
          </h2>
        </Reveal>

        <ul>
          {ROWS.map((row, i) => {
            const isOpen = i === active;
            return (
              <li key={row.title} className="relative">
                <span className="line-dash absolute inset-x-0 top-0 h-px" />
                <button
                  type="button"
                  onClick={() => open(i)}
                  aria-expanded={isOpen}
                  className="block w-full py-16 pr-32 pl-16 text-left lg:pl-154"
                >
                  <span className="flex items-center justify-between">
                    <span className="heading text-20">{row.title}</span>
                    <span className={`mono text-12 tabular-nums transition-opacity duration-300 ${isOpen ? "text-brand" : "opacity-0"}`}>
                      {isOpen ? `${((DURATION - progress * DURATION) / 1000).toFixed(1)}s` : "0.0s"}
                    </span>
                  </span>
                  <span
                    className={`grid transition-[grid-template-rows] duration-500 ease-heron ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <span className="overflow-hidden">
                      {/* progress bar */}
                      <span className="mt-10 block h-2 bg-line/50">
                        <span
                          className="block h-full origin-left bg-brand"
                          style={{ transform: `scaleX(${isOpen ? progress : 0})` }}
                        />
                      </span>
                      <span className="block pt-10 text-16 font-normal">{row.text}</span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
