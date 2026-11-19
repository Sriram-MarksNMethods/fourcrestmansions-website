"use client";

import { useEffect, useRef } from "react";

const CELL_REM = 1.2; // pixel size, 12px at 1728px wide
const FILL_SWEEP = 150; // ms for the fill wave to cross the button
const FILL_FADE = 120; // ms each pixel takes to fade in
const CLEAR_SWEEP = 350; // ms for the clearing wave to cross the button
const CLEAR_FADE = 420; // ms each pixel takes to fade out (slower than the fill, so it lingers)

/**
 * Heron's button hover: the background fills in as a grid of square "pixels".
 * A ragged wave flows in from the side the mouse came in. Even a quick swipe across the
 * button lets the fill finish; then the pixels fade away slowly in the direction the mouse went.
 * While it's dark the host gets `data-filled`, so style the text with `data-filled:text-white`.
 * Put it inside a `relative overflow-hidden` element that has the `group` class.
 */
type Cell = { x: number; y: number; jitter: number; fillFrom: number; fillStart: number; clearStart: number };

const ease = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c); // smoothstep
};

export default function PixelFill({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const host = canvas.parentElement!;
    const ctx = canvas.getContext("2d")!;
    let cells: Cell[] = [];
    let cell = 0;
    let frame = 0;
    let textTimer = 0;

    const alphaAt = (c: Cell, now: number) =>
      (c.fillFrom + (1 - c.fillFrom) * ease((now - c.fillStart) / FILL_FADE)) * (1 - ease((now - c.clearStart) / CLEAR_FADE));

    const layout = () => {
      const ratio = window.devicePixelRatio || 1;
      const { width, height } = host.getBoundingClientRect();
      if (cells.length && canvas.width === Math.ceil(width * ratio)) return; // keep the current shades
      canvas.width = Math.ceil(width * ratio);
      canvas.height = Math.ceil(height * ratio);
      cell = parseFloat(getComputedStyle(document.documentElement).fontSize) * CELL_REM * ratio;
      cells = [];
      for (let y = 0; y < canvas.height; y += cell) {
        for (let x = 0; x < canvas.width; x += cell) {
          cells.push({ x, y, jitter: Math.random(), fillFrom: 0, fillStart: Infinity, clearStart: Infinity });
        }
      }
    };

    const tick = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      let moving = false;
      for (const c of cells) {
        if (now < c.fillStart + FILL_FADE || (c.clearStart !== Infinity && now < c.clearStart + CLEAR_FADE)) moving = true;
        const alpha = alphaAt(c, now);
        if (alpha <= 0.01) continue;
        ctx.globalAlpha = alpha;
        ctx.fillRect(c.x, c.y, cell + 0.5, cell + 0.5);
      }
      if (moving) frame = requestAnimationFrame(tick);
    };

    const run = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tick);
    };

    // where a pixel sits along the wave: 0 = first to move, 1 = last
    const order = (c: Cell, fromLeft: boolean) => {
      const along = c.x / canvas.width;
      return (fromLeft ? along : 1 - along) * 0.75 + c.jitter * 0.25;
    };

    const enter = (e: MouseEvent) => {
      layout();
      const box = host.getBoundingClientRect();
      const fromLeft = e.clientX - box.left < box.width / 2;
      const now = performance.now();
      for (const c of cells) {
        c.fillFrom = alphaAt(c, now);
        c.fillStart = now + order(c, fromLeft) * FILL_SWEEP;
        c.clearStart = Infinity;
      }
      clearTimeout(textTimer);
      host.dataset.filled = "";
      run();
    };

    const leave = (e: MouseEvent) => {
      const box = host.getBoundingClientRect();
      const fromLeft = e.clientX - box.left > box.width / 2; // left via the right → clear from the left, following the mouse
      const now = performance.now();
      let latest = now;
      for (const c of cells) {
        // let this pixel finish filling first, then start its slow fade
        c.clearStart = Math.max(now, c.fillStart + FILL_FADE) + order(c, fromLeft) * CLEAR_SWEEP;
        latest = Math.max(latest, c.fillStart + FILL_FADE);
      }
      clearTimeout(textTimer);
      textTimer = window.setTimeout(() => delete host.dataset.filled, latest - now + CLEAR_SWEEP * 0.3);
      run();
    };

    host.addEventListener("mouseenter", enter);
    host.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(textTimer);
      host.removeEventListener("mouseenter", enter);
      host.removeEventListener("mouseleave", leave);
    };
  }, [color]);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 size-full" />;
}
