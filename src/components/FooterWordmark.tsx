"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FILL, OUTLINE, VIEWBOX } from "@/lib/footer-wordmark";

/**
 * The big "FOURCREST" at the bottom of the footer, as on Heron: drafting line art
 * (lines overshoot the corners, ticks, a "+" in the O) on a faint grid.
 *
 * Hover (Heron's footer ink mask, measured on heronaiapp.com): an inky blob grows
 * under the pointer (~0.4s), trails after it and fills the letters in solid.
 * A second, bigger and slower blob at 25% strength leaves the grey halo around it.
 * Leaving shrinks them away (~0.6s).
 *
 * Speed: Heron runs an SVG noise filter on every frame, which lags on a wordmark
 * this wide. Here the same ragged blob is rendered once (/images/ink-blob.png,
 * made by fourcrest-heron-research/blob.cjs with Heron's filter values) and used
 * as a CSS mask that just moves and grows, which is cheap for the browser.
 */
const BLOB = 0.125; // blob radius as a share of the wordmark width (Heron's)
const HALO = 0.155;
const MASK_SCALE = 3; // ink-blob.png is 3x the blob's radius wide

const plus = "absolute size-12 text-ink/60";

type Layer = { el: HTMLDivElement; x: number; y: number; r: number };

export default function FooterWordmark() {
  const stageRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current!;
    const blob: Layer = { el: blobRef.current!, x: 0, y: 0, r: 0 };
    const halo: Layer = { el: haloRef.current!, x: 0, y: 0, r: 0 };

    // write a layer's mask position/size (only while it is visible)
    const paint = (layer: Layer) => {
      const size = layer.r * MASK_SCALE;
      layer.el.style.maskSize = `${size}px ${size}px`;
      layer.el.style.maskPosition = `${layer.x - size / 2}px ${layer.y - size / 2}px`;
    };
    const tick = () => {
      if (blob.r > 0.5) paint(blob);
      if (halo.r > 0.5) paint(halo);
      blob.el.style.visibility = blob.r > 0.5 ? "visible" : "hidden";
      halo.el.style.visibility = halo.r > 0.5 ? "visible" : "hidden";
    };
    gsap.ticker.add(tick);

    // the blob trails the pointer; the halo trails further behind
    const blobX = gsap.quickTo(blob, "x", { duration: 0.8, ease: "power3.out" });
    const blobY = gsap.quickTo(blob, "y", { duration: 0.8, ease: "power3.out" });
    const haloX = gsap.quickTo(halo, "x", { duration: 1.4, ease: "power3.out" });
    const haloY = gsap.quickTo(halo, "y", { duration: 1.4, ease: "power3.out" });

    const local = (event: PointerEvent) => {
      const box = stage.getBoundingClientRect();
      return { x: event.clientX - box.left, y: event.clientY - box.top, w: box.width };
    };
    const onEnter = (event: PointerEvent) => {
      const p = local(event);
      gsap.set([blob, halo], { x: p.x, y: p.y });
      gsap.to(blob, { r: p.w * BLOB, duration: 0.45, ease: "power2.out", overwrite: "auto" });
      gsap.to(halo, { r: p.w * HALO, duration: 0.7, ease: "power2.out", overwrite: "auto" });
    };
    const onMove = (event: PointerEvent) => {
      const p = local(event);
      blobX(p.x);
      blobY(p.y);
      haloX(p.x);
      haloY(p.y);
    };
    const onLeave = () => {
      gsap.to(blob, { r: 0, duration: 0.6, ease: "power2.inOut", overwrite: "auto" });
      gsap.to(halo, { r: 0, duration: 0.9, ease: "power2.inOut", overwrite: "auto" });
    };

    stage.addEventListener("pointerenter", onEnter);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      gsap.ticker.remove(tick);
      gsap.killTweensOf([blob, halo]);
      stage.removeEventListener("pointerenter", onEnter);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // solid letters, shown only through the moving ink mask
  const filled = (ref: React.RefObject<HTMLDivElement | null>, extra: string) => (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none invisible absolute inset-0 [mask-image:url(/images/ink-blob.png)] [mask-repeat:no-repeat] ${extra}`}
    >
      <svg viewBox={VIEWBOX} className="block w-full">
        <path d={FILL} fill="#231f20" />
      </svg>
    </div>
  );

  return (
    <div className="relative border-t border-line bg-[linear-gradient(to_right,rgb(199_182_176/0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgb(199_182_176/0.35)_1px,transparent_1px)] bg-[size:6.4rem_6.4rem] px-32 py-64 lg:px-120">
      {/* tick rulers + corner plus marks, like Heron's frame */}
      <div className="ticks-x absolute inset-x-32 top-0 h-8 opacity-70" />
      <div className="ticks-x absolute inset-x-32 bottom-0 h-8 opacity-70" />
      {["top-10 left-10", "top-10 right-10", "bottom-10 left-10", "bottom-10 right-10"].map((pos) => (
        <svg key={pos} viewBox="0 0 12 12" className={`${plus} ${pos}`} aria-hidden>
          <path d="M6 0v12M0 6h12" stroke="currentColor" />
        </svg>
      ))}

      <div ref={stageRef} className="relative">
        {filled(haloRef, "opacity-25")}
        {filled(blobRef, "")}
        {/* drafting line art */}
        <svg viewBox={VIEWBOX} className="relative block w-full" role="img" aria-label="Fourcrest">
          <path d={OUTLINE} fill="none" stroke="#231f20" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
}
