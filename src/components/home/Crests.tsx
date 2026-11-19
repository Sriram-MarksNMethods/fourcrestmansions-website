import Image from "next/image";
import Reveal from "@/components/Reveal";

// Heron's "Problems" cards, used to show the four elevations (copy from the landing page).
// Renders: Crest-01..03 = EF OP 1/2/3, Crest-04 = WF OP 1 (stand-in until the client confirms it).
const CRESTS = [
  {
    id: "01",
    style: "Contemporary",
    title: ["Clean lines,", "quiet", "luxury"],
    text: "Clean architectural lines and contemporary aesthetics, bringing modern design and understated sophistication together.",
  },
  {
    id: "02",
    style: "Classic",
    title: ["Classic", "proportions,", "refined detail"],
    text: "Inspired by classic architectural beauty, with graceful proportions, refined detailing and enduring elegance.",
  },
  {
    id: "03",
    style: "Timeless",
    title: ["Timeless", "and", "grand"],
    text: "Timeless architecture with graceful proportions and elegant detailing, for an enduring sense of grandeur.",
  },
  {
    id: "04",
    style: "Bold",
    title: ["Bold and", "distinctive", "by design"],
    text: "Bold architectural elements and refined detailing create a distinctive expression of elegance and individuality.",
  },
];

// Little "+" marks that pop into the corners of the picture on hover.
const corners = ["top-12 left-12", "top-12 right-12", "bottom-12 left-12", "right-12 bottom-12"];

export default function Crests() {
  return (
    <section id="crests" className="border-b border-line">
      <Reveal start="top+=65% bottom" className="flex flex-col gap-24 px-16 pt-32 pb-48 lg:flex-row lg:justify-between lg:px-32 lg:pb-66">
        <div className="lg:w-834">
          <p data-reveal="lines" className="mono mb-16 text-14">
            The four crests
          </p>
          <h2 data-reveal="lines" className="heading text-32 lg:text-48">
            One address, four faces to choose from
          </h2>
        </div>
        <p data-reveal="lines" className="text-16 lg:mt-32 lg:w-396">
          Every mansion is a triplex on its own 500 sq. yd. plot. Choose from four elevations, each with a character of
          its own.
        </p>
      </Reveal>

      <Reveal start="top+=30% bottom" className="grid border-t border-dashed border-line md:grid-cols-2 lg:grid-cols-4">
        {CRESTS.map((crest) => (
          <article key={crest.id} className="group relative flex flex-col border-dashed border-line not-first:border-l max-lg:border-b">
            <div className="relative flex items-center justify-between border-b border-dashed border-line px-32 py-16 text-ink">
              <span className="absolute top-1/2 left-32 size-8 -translate-y-1/2 bg-brand opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100" />
              <span className="mono text-14 transition-transform duration-[400ms] group-hover:translate-x-20">Crest-{crest.id}</span>
              <span className="mono text-14 text-mute">[{crest.style}]</span>
            </div>

            {/* The elevation: ink drawing on the paper, the colour render fades in on hover */}
            <div className="relative h-360 p-24">
              <div data-reveal="img" className="relative size-full overflow-hidden">
                <Image
                  src={`/images/crest-${crest.id}-ink-v2.webp`}
                  alt={`Crest-${crest.id} elevation, illustration`}
                  fill
                  sizes="(min-width: 992px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-contain transition-opacity duration-500 group-hover:opacity-0"
                />
                <Image
                  src={`/images/crest-${crest.id}.webp`}
                  alt=""
                  fill
                  sizes="(min-width: 992px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="scale-105 object-cover opacity-0 transition-[opacity,scale] duration-700 ease-out-quint group-hover:scale-100 group-hover:opacity-100"
                />
              </div>
              {corners.map((pos) => (
                <svg key={pos} viewBox="0 0 12 12" className={`absolute size-12 scale-0 text-ink/60 transition-transform duration-[400ms] group-hover:scale-100 ${pos}`}>
                  <path d="M6 0v12M0 6h12" stroke="currentColor" />
                </svg>
              ))}
            </div>

            <div className="relative flex h-250 flex-col justify-between border-t border-dashed border-line p-32">
              <h3 className="heading text-28">
                {crest.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
              <p className="pt-16 text-16 font-normal">{crest.text}</p>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  );
}
