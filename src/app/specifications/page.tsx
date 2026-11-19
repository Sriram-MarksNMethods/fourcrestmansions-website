import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Cta from "@/components/Cta";
import PixelFill from "@/components/PixelFill";
import { RollArrow, RollText } from "@/components/Roll";
import SpecTabs, { type Spec } from "./SpecTabs";
import Faq from "./Faq";

export const metadata = {
  title: "Specifications",
  description: "What goes into every Fourcrest mansion: structure, finishes, kitchens, bathrooms and more.",
};

// Heron's Dashboard page, rebuilt as the Fourcrest specification. Copy is lorem where the brochure facts are pending.
const SPECS: Spec[] = [
  {
    title: "Structure",
    heading: "Built to stand for generations",
    text: "RCC framed structure. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    image: "/images/crest-01.webp",
    alt: "Fourcrest mansion exterior, artistic impression",
  },
  {
    title: "Living spaces",
    heading: "Rooms with room to breathe",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud.",
    image: "/images/r-formal-living-hd.webp",
    alt: "Formal living room, artistic impression",
  },
  {
    title: "Bedrooms",
    heading: "Five bedrooms over three floors",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    image: "/images/r-master-bedroom-hd.webp",
    alt: "Master bedroom, artistic impression",
  },
  {
    title: "Family lounge",
    heading: "A floor that brings everyone together",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit.",
    image: "/images/r-family-lounge-hd.webp",
    alt: "Family lounge, artistic impression",
  },
  {
    title: "Library",
    heading: "Quiet corners, built in",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat.",
    image: "/images/r-library-lounge-hd.webp",
    alt: "Library lounge, artistic impression",
  },
  {
    title: "Clubhouse",
    heading: "13,000 to 18,000 sq. ft. of amenities",
    text: "Swimming pool, gym, yoga deck, games lounge and multipurpose hall, a short walk from every home.",
    image: "/images/r-pool-deck-hd.webp",
    alt: "Clubhouse pool deck, artistic impression",
  },
];

const STEPS = [
  { title: ["Visit", "the site"], text: "Book a site visit and walk the plots, the show home and the clubhouse." },
  { title: ["Choose", "your crest"], text: "Pick your plot and one of the four elevations. Lorem ipsum dolor sit amet." },
  { title: ["Move in", "with confidence"], text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod." },
];

const FAQS = [
  { q: "How big is each plot?", a: "Each mansion sits on its own plot of about 500 sq. yd." },
  { q: "Can I choose the elevation of my mansion?", a: "Yes. Every mansion comes in one of four crests. Lorem ipsum dolor sit amet." },
  { q: "What does the clubhouse include?", a: "A swimming pool, gym, yoga deck, games lounge and multipurpose hall." },
  { q: "Where exactly is Fourcrest?", a: "Mankhal, south Hyderabad, minutes from Rajiv Gandhi International Airport." },
  { q: "When is handover?", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
];

const CHIPS = ["5 BHK triplex", "500 sq. yd. plots", "28 mansions", "6.14 acres", "Four elevations", "Gated community", "Clubhouse", "Mankhal, Hyderabad"];

export default function SpecificationsPage() {
  return (
    <>
      {/* Hero: title + text on the left, picture on the right */}
      <section className="grid border-b border-line pt-68 lg:h-[calc(100dvh-1.6rem)] lg:grid-cols-2">
        <div className="flex flex-col justify-between border-line lg:border-r">
          <Reveal start="top bottom" className="px-16 pt-40 lg:px-16 lg:pt-32">
            <p data-reveal="lines" className="mono mb-12 text-10">
              Every detail of every mansion
            </p>
            <h1 data-reveal="lines" className="heading text-40 lg:w-480 lg:text-56">
              See what goes into every Fourcrest home
            </h1>
          </Reveal>
          <div className="mt-40 flex border-t border-line">
            <p className="flex-1 p-16 text-16">
              Structure, finishes, rooms and amenities: the full specification of a Fourcrest mansion, in one place.
            </p>
            <Link
              href="#features"
              className="group relative flex w-171 flex-col justify-between overflow-hidden border-l border-line pt-12 pr-4 pb-4 pl-12 text-brand transition-colors duration-[400ms] data-filled:text-white"
            >
              <PixelFill color="#8a574c" />
              <span className="mono relative text-14">
                <RollText>Discover more</RollText>
              </span>
              <RollArrow className="relative size-20 self-end" />
            </Link>
          </div>
        </div>
        <Reveal start="top bottom" className="relative min-h-360 overflow-hidden">
          <div data-reveal="img" className="absolute inset-0">
            <Image src="/images/crest-04.webp" alt="Fourcrest mansion, artistic impression" fill priority sizes="50vw" className="object-cover" />
          </div>
        </Reveal>
      </section>

      {/* Fact strip (Heron shows client logos here) */}
      <div className="flex overflow-hidden border-b border-line">
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 animate-[marquee-left_40s_linear_infinite]">
            {CHIPS.map((chip) => (
              <span key={chip} className="mono flex h-80 items-center border-r border-line px-48 text-12 whitespace-nowrap text-ink">
                {chip}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Key features: centred title, then the sticky tabs */}
      <Reveal start="top+=50% bottom" className="px-16 pt-120 pb-80 text-center">
        <p data-reveal="lines" className="mono mb-16 text-10">
          Key features
        </p>
        <h2 data-reveal="lines" className="heading mx-auto text-32 lg:w-560 lg:text-40">
          The full specification, no guesswork
        </h2>
      </Reveal>
      <div id="features">
        <SpecTabs specs={SPECS} />
      </div>

      {/* 3 steps */}
      <Reveal start="top+=50% bottom" className="flex flex-col gap-24 border-b border-line px-16 pt-80 pb-32 lg:flex-row lg:items-end lg:justify-between">
        <h2 data-reveal="lines" className="heading text-32 lg:text-40">
          From first visit to your keys, in 3 steps
        </h2>
        <div className="lg:w-396">
          <p data-reveal="lines" className="text-14 font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </p>
          <p data-reveal="lines" className="mono mt-24 text-10 text-mute">
            [Scroll to continue]
          </p>
        </div>
      </Reveal>
      <Reveal start="top+=40% bottom" className="grid border-b border-line lg:grid-cols-3">
        {STEPS.map((step, i) => (
          <article key={step.text} className="flex min-h-260 flex-col border-line p-16 not-last:lg:border-r max-lg:border-b">
            <div className="mono flex justify-between text-10">
              <span>Step</span>
              <span>[{String(i + 1).padStart(2, "0")}]</span>
            </div>
            <h3 data-reveal="lines" className="heading mt-32 text-24">
              {step.title[0]}
              <br />
              {step.title[1]}
            </h3>
            <p data-reveal="lines" className="mt-auto pt-32 text-14 font-normal">
              {step.text}
            </p>
          </article>
        ))}
      </Reveal>

      {/* FAQ */}
      <section className="grid border-b border-line lg:grid-cols-3">
        <Reveal start="top+=40% bottom" className="border-line p-16 lg:border-r">
          <h2 data-reveal="lines" className="heading text-32 lg:text-40">
            Questions,
            <br />
            answers
          </h2>
        </Reveal>
        <div className="lg:col-span-2">
          <Faq items={FAQS} />
        </div>
      </section>

      <Cta />
    </>
  );
}
