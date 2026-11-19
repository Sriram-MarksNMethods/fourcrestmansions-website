// Blog posts (placeholder copy until the client sends real articles).
// Each post: slug (its URL), category, date, title, excerpt, cover image and body paragraphs.
export type Post = {
  slug: string;
  category: "Lifestyle" | "Updates" | "Guides";
  date: string;
  title: string;
  excerpt: string;
  image: string;
  body: string[];
};

const LOREM = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
];

export const POSTS: Post[] = [
  { slug: "why-plot-size-matters", category: "Guides", date: "18 Nov 2026", title: "Why plot size matters more than square feet", excerpt: "A 500 sq. yd. plot changes how a home lives. Lorem ipsum dolor sit amet.", image: "/images/crest-01.webp", body: LOREM },
  { slug: "four-crests-explained", category: "Lifestyle", date: "12 Nov 2026", title: "The four crests, explained", excerpt: "Contemporary, classic, timeless and bold: what sets each elevation apart.", image: "/images/crest-02.webp", body: LOREM },
  { slug: "life-at-the-clubhouse", category: "Lifestyle", date: "05 Nov 2026", title: "A day at the clubhouse", excerpt: "Pool, gym, yoga deck and games lounge, a short walk from home.", image: "/images/r-pool-deck-hd.webp", body: LOREM },
  { slug: "south-hyderabad-growth", category: "Updates", date: "29 Oct 2026", title: "Why south Hyderabad, why now", excerpt: "Mankhal sits minutes from the airport. Lorem ipsum dolor sit amet.", image: "/images/r-aerial-south-hyderabad-hd.webp", body: LOREM },
  { slug: "planning-a-triplex", category: "Guides", date: "21 Oct 2026", title: "Planning life across three floors", excerpt: "How to think about a triplex: who lives where, and why it works.", image: "/images/r-family-lounge-hd.webp", body: LOREM },
  { slug: "site-progress-october", category: "Updates", date: "14 Oct 2026", title: "Site progress: October", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", image: "/images/crest-03.webp", body: LOREM },
  { slug: "designing-the-library", category: "Lifestyle", date: "07 Oct 2026", title: "Designing a room for reading", excerpt: "Quiet corners, built in. Lorem ipsum dolor sit amet.", image: "/images/r-library-lounge-hd.webp", body: LOREM },
  { slug: "buying-as-an-nri", category: "Guides", date: "30 Sep 2026", title: "Buying a home in Hyderabad from abroad", excerpt: "What NRI buyers should know before they book. Lorem ipsum.", image: "/images/r-window-morning-hd.webp", body: LOREM },
];

export const CATEGORIES = ["Lifestyle", "Updates", "Guides"] as const;
