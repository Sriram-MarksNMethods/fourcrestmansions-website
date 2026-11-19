"use client";

import { useEffect, useRef } from "react";

const CELL_REM = 1.2; // pixel size, 12px at 1728px wide
const DURATION = 300; // ms to fill (or clear) the whole button

/**
 * Heron's button hover: the background fills in as a grid of square "pixels"
 * that fade in at random, then dissolve again when the mouse leaves.
 * Put it inside a `relative overflow-hidden` element that has the `group` class.
 */
export default function PixelFill({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const host = canvas.parentElement!;
    const ctx = canvas.getContext("2d")!;
    let cells: { x: number; y: number; at: number }[] = [];
    let cell = 0;
    let progress = 0; // 0 = empty, 1 = filled
    let target = 0;
    let last = 0;
    let frame = 0;

    const layout = () => {
      const ratio = window.devicePixelRatio || 1;
      const { width, height } = host.getBoundingClientRect();
      canvas.width = Math.ceil(width * ratio);
      canvas.height = Math.ceil(height * ratio);
      cell = parseFloat(getComputedStyle(document.documentElement).fontSize) * CELL_REM * ratio;
      cells = [];
      for (let y = 0; y < canvas.height; y += cell) {
        for (let x = 0; x < canvas.width; x += cell) cells.push({ x, y, at: Math.random() * 0.7 });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      for (const c of cells) {
        // each pixel fades in over the last 30% of its own window
        const alpha = Math.min(1, Math.max(0, (progress - c.at) / 0.3));
        if (alpha === 0) continue;
        ctx.globalAlpha = alpha;
        ctx.fillRect(c.x, c.y, cell + 0.5, cell + 0.5);
      }
    };

    const step = (now: number) => {
      const delta = (now - last) / DURATION;
      last = now;
      progress = target > progress ? Math.min(target, progress + delta) : Math.max(target, progress - delta);
      draw();
      if (progress !== target) frame = requestAnimationFrame(step);
    };

    const animateTo = (value: number) => {
      if (!cells.length) layout();
      target = value;
      cancelAnimationFrame(frame);
      last = performance.now();
      frame = requestAnimationFrame(step);
    };

    const enter = () => {
      layout();
      animateTo(1);
    };
    const leave = () => animateTo(0);

    host.addEventListener("mouseenter", enter);
    host.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      host.removeEventListener("mouseenter", enter);
      host.removeEventListener("mouseleave", leave);
    };
  }, [color]);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 size-full" />;
}
