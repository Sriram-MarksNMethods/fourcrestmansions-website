import Image from "next/image";
import Reveal from "@/components/Reveal";
import OutlineButton from "@/components/OutlineButton";

// Heron's "Platform" section ([01] Chat Widget / [02] Dashboard).
// Desktop: 12-column grid. The middle column holds two stacked pictures; the
// left (number + title) and right (text + button) cells of each item stay
// pinned in the middle of the screen while its picture scrolls past.
const ITEMS = [
  {
    id: "01",
    title: "The mansions",
    text: "28 triplex mansions, each a 5 BHK on its own plot of about 500 sq. yd. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    href: "/specifications",
    image: "/images/crest-01.webp",
    alt: "Fourcrest mansion, artistic impression",
  },
  {
    id: "02",
    title: "The clubhouse",
    text: "A clubhouse of around 13,000 to 18,000 sq. ft. with a swimming pool, gym, yoga deck, games lounge and multipurpose hall.",
    href: "/about",
    image: "/images/r-clubhouse-hd.webp",
    alt: "Fourcrest clubhouse, artistic impression",
  },
];

export default function Platform() {
  return (
    <section className="relative border-y border-line lg:grid lg:grid-cols-12">
      {/* Left + right cells, one sticky row per item */}
      <div className="lg:col-span-12 lg:col-start-1 lg:row-start-1 lg:grid lg:grid-rows-2">
        {ITEMS.map((item) => (
          <div key={item.id} className="lg:h-426">
            <Reveal
              start="top+=40% bottom"
              className="grid border-b border-line max-lg:border-t lg:pointer-events-none lg:sticky lg:top-[calc(50vh-8.7rem)] lg:h-174 lg:grid-cols-12 lg:border-0"
            >
              {/* number + title */}
              <div className="paper flex flex-col justify-between gap-40 border-line p-32 pb-20 lg:pointer-events-auto lg:col-span-3 lg:border-y">
                <p data-reveal="up" className="mono text-14 text-mute">
                  [{item.id}]
                </p>
                <h3 data-reveal="lines" className="heading text-32 lg:text-32">
                  {item.title}
                </h3>
              </div>

              {/* picture (phones only; desktop shows it in the middle column) */}
              <div className="relative aspect-[601/355] border-y border-line lg:hidden">
                <Image src={item.image} alt={item.alt} fill sizes="100vw" className="object-cover" />
              </div>

              {/* text + button */}
              <div className="paper flex flex-col justify-between border-line lg:pointer-events-auto lg:col-span-4 lg:col-start-9 lg:border-y">
                <p data-reveal="lines" className="p-32 pb-24 text-16 font-normal">
                  {item.text}
                </p>
                <div className="border-t border-line [&>a]:flex [&>a]:justify-between [&>a]:border-0">
                  <OutlineButton href={item.href}>Learn more</OutlineButton>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>

      {/* Middle column: the two pictures, one under the other */}
      <div className="max-lg:hidden lg:col-span-5 lg:col-start-4 lg:row-start-1 lg:border-x lg:border-line">
        {ITEMS.map((item) => (
          <Reveal key={item.id} start="top+=45% bottom" className="paper relative h-426 overflow-hidden border-line not-last:border-b">
            <div data-reveal="img" className="absolute inset-24">
              <Image src={item.image} alt={item.alt} fill sizes="35vw" className="object-cover" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
