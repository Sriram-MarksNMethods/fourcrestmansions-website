"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, POSTS } from "@/lib/blogs";

// Heron's Resources grid: category filter with counts, then 4 cards a row.
// Hover: the card frames up dark with "+" marks in the corners (as on Heron).
export default function BlogGrid() {
  const [filter, setFilter] = useState<string>("All");
  const posts = filter === "All" ? POSTS : POSTS.filter((post) => post.category === filter);
  const tabs = ["All", ...CATEGORIES];

  return (
    <>
      <div className="flex justify-center gap-32 border-b border-line py-12">
        {tabs.map((tab) => {
          const count = tab === "All" ? POSTS.length : POSTS.filter((post) => post.category === tab).length;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`mono text-10 transition-colors ${filter === tab ? "text-brand" : "text-ink hover:text-brand"}`}
            >
              {tab} <sup>[{count}]</sup>
            </button>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blogs/${post.slug}`} className="group relative flex flex-col border-line max-lg:border-b lg:border-r lg:border-b lg:nth-[4n]:border-r-0">
            <div className="relative aspect-[4/3] p-12 transition-colors duration-500 group-hover:bg-ink">
              <div className="relative size-full overflow-hidden">
                <Image src={post.image} alt="" fill sizes="(min-width: 992px) 25vw, 50vw" className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-105" />
              </div>
              {["top-4 left-4", "top-4 right-4"].map((pos) => (
                <svg key={pos} viewBox="0 0 12 12" className={`absolute size-10 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${pos}`}>
                  <path d="M6 0v12M0 6h12" stroke="currentColor" />
                </svg>
              ))}
            </div>
            <div className="flex flex-1 flex-col p-12">
              <p className="mono text-10 text-ink-2">
                {post.category} | {post.date}
              </p>
              <h2 className="heading mt-8 line-clamp-2 text-20">{post.title}</h2>
              <p className="mt-6 line-clamp-2 text-12 font-normal">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
