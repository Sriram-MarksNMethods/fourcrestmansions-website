"use client";

import { useState } from "react";

// Heron's FAQ list: one question open at a time, the "+" turns into "×".
export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <ul>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.q} className="relative">
            <span className="line-dash absolute inset-x-0 bottom-0 h-px" />
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="block w-full px-16 py-20 text-left lg:pl-16"
            >
              <span className="flex items-center justify-between gap-16">
                <span className="heading text-16 lg:text-20">{item.q}</span>
                <svg viewBox="0 0 16 16" className={`size-16 shrink-0 text-ink transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>
                  <path d="M8 0v16M0 8h16" stroke="currentColor" />
                </svg>
              </span>
              <span className={`grid transition-[grid-template-rows] duration-500 ease-heron ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <span className="overflow-hidden">
                  <span className="block pt-12 text-16 font-normal">{item.a}</span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
