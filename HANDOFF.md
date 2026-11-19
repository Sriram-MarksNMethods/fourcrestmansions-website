# Fourcrest website: handover

A 1:1 rebuild of **https://heronaiapp.com** (layout + motion) for Fourcrest Mansions, in the
Fourcrest landing-page colours. 5 pages like the Southfield site: Home, About, Specifications,
Blogs, Contact. Next 16 + TypeScript + Tailwind v4, `src/`. Nothing committed yet.

- Dev server: `npx next dev -p 3010` → http://localhost:3010
- Research (Heron source, measurements, scripts): `~/Office_work/fourcrest-heron-research/`
- Original illustrations (from ChatGPT): `~/Office_work/fourcrest-art-source/`
- Landing page (source of facts, renders, logo): `~/Office_work/four-crest-mansions/`

## How the user wants this built
- **Exact 1:1 with Heron**: measure Heron, don't invent. Animations must behave the same.
- **Simple code** that a new dev can read: Tailwind classes in JSX, no clever abstractions.
- Colours: blush paper `#f1e9e6`, ink `#231f20`, brand brown `#8a574c` (Heron's red), deep `#512f28`, gold `#f4cd95`.
- Fonts: Inter Tight (stands in for Heron's paid BT Grotesk) + Geist Mono.
- Copy the "tech pieces" too (loader % counter, X/Y readouts, numbered lists).
- **No dropdowns** in the header.
- Illustrations: Heron's art is their own (copyright), so we make Fourcrest versions in the
  user's ChatGPT (chat "Redraw Villa Illustration", account is now Plus) by driving their Chrome.
  Downloads: one `<a download>` click per JS call on the image's blob src
  (Chrome blocks bursts; the user has allowed automatic downloads for chatgpt.com).

## Sizing
Like Heron: `html { font-size: 0.5787vw }` (10px at 1728px), 1.199vw under 992px, 2.5445vw under 768px.
Tailwind `--spacing: 0.1rem`, so `p-32` = 32px at 1728px, the same numbers you read off Heron.
Text tokens `text-10 … text-56` = Heron's sizes.

## Done (Home page so far)
| Piece | File | Notes |
|---|---|---|
| Loader | `components/Loader.tsx` | 3px red bar, smooth 0→100% in 3s, line-art draws in (`lib/villa-lines.ts`), info + 001–010 list, then the bar **splits** and an evenodd clip-path hole opens onto the page (Heron-exact, 0.45s power2.in) |
| Header | `components/Header.tsx` | pixel-dissolve hover (`PixelFill.tsx`), label roll (`Roll.tsx`), fades in right→left after loader |
| Page transitions | `components/PageTransition.tsx` | centre window opens to full screen with 4 guide lines, 1.5s |
| Frame, cursor | `Frame.tsx`, `Cursor.tsx`, `CursorReadout.tsx` | |
| Hero | `components/home/Hero.tsx` | stipple villa, drag-select opens detail cards, marquee |
| Intro | `components/home/Intro.tsx` | ink circle (`InkCircle.tsx`, completes by mid-screen), scrubbed manifesto (`ScrubText.tsx`), "Close to" Swiper |
| Four crests | `components/home/Crests.tsx` | ink drawings, colour render fades in on hover |
| Floor plan | `components/home/FloorPlan.tsx` | real CAD ground floor split into layers (`public/images/plan/*`, `lib/floor-plan.ts`) |
| Scroll reveals | `components/Reveal.tsx` | `data-reveal="lines|up|img|line"` |

## Floor plan: wheel scrubs the build (DONE 2026-11-19)
The page stops when the section's top reaches the top of the screen (`getLenis().stop()`).
Wheel and swipe movement then drives a private scroll position (`target` in `FloorPlan.tsx`),
and the timeline glides after it (0.9s power3.out). Pieces fly in and slow down, and stopping
holds the in-between state, as on Heron. Stage positions are Heron's measured px (`AT`, about
5,600px total). Overscrolling either end by 150px lets the page go. The side panel is
toggled with a CSS width transition (Heron does it that way too).

## Also done 2026-11-19 (user feedback)
- Cursor: Heron-measured easing. The square closes 11% of the gap to the pointer per frame;
  the tail closes 5% of the gap to the square; 9px square, 1px line (`Cursor.tsx`).
- Hero detail cards stay open until their × close button is pressed; a new drag doesn't close them.
- No horizontal scrollbar: `body { overflow-x: clip }` (the page was 4px too wide).
- Loader and hero crosshair lines darkened (ink/25) so the "big plus" shows on the blush paper.
  ASK the user if "big plus" meant something else (e.g. the hero's corner + marks and tick ruler).

## Still to build
- Home: platform cards ([01]/[02] after the plan), "Why us" 4 sticky steps, "Made for" 8 tiles,
  CTA, footer (measure each on Heron first; `m/home-st.json` has all their ScrollTriggers).
- Pages: About (Heron /about-us), Specifications (Heron /heron-dashboard), Blogs (Heron
  /resources + detail page), Contact (Heron /contact-us), privacy, thank-you, 404.
- Phone/tablet pass, then a final check against Heron at 1440 / 1728 / 390.

## Open questions for the client
- "Close to" place list in Intro; Crest-04 render is a stand-in (WF OP 1).
- Copy is new (written from the landing page and CAD labels): manifesto, crest titles,
  floor-plan notes/highlights (lift to all floors? 3 parking bays?).

## Gotchas
- `gsap.from()` breaks under React StrictMode double effects → use `fromTo`.
- Heron's own site scrolls `.main-inner` (Lenis wrapper), not the window. To measure it headless,
  set `.main-inner.scrollTop` and dispatch `scroll`.
- The headless Playwright browser is `~/.cache/ms-playwright/chromium-1148/chrome-linux/chrome` (global npm playwright).
- `plan.py` in the research folder points at the old scratchpad paths; change `CAT` to
  `~/Office_work/fourcrest-heron-research/fp/cat/` before re-running.
