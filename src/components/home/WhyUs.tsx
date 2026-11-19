import Image from "next/image";
import Reveal from "@/components/Reveal";

// Heron's "Why us": four steps. Each step is a square picture on one half of the
// screen and a dark title bar on the other half. The bar sticks at the middle of
// the screen while its picture scrolls by, with a brand line running across to it.
const STEPS = [
  { title: "Choose", text: "Pick one of four elevations for your mansion", image: "/images/crest-02.webp" },
  { title: "Plan", text: "Lorem ipsum dolor sit amet, consectetur adipiscing", image: "/images/r-family-lounge-hd.webp" },
  { title: "Build", text: "Sed do eiusmod tempor incididunt ut labore", image: "/images/r-garden-path-wide.webp" },
  { title: "Live", text: "28 families, 6.14 acres, one gated community", image: "/images/r-pool-deck-hd.webp" },
];

export default function WhyUs() {
  return (
    <section className="border-b border-line">
      <Reveal start="top+=65% bottom" className="grid border-b border-line lg:h-302 lg:grid-cols-12">
        <div className="flex flex-col justify-end p-32 lg:col-span-8">
          <p data-reveal="lines" className="mono mb-16 text-14">
            Why Fourcrest
          </p>
          <h2 data-reveal="lines" className="heading text-40 lg:text-56">
            Built to live
            <br />
            the way you do
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-32 border-line p-32 max-lg:border-t lg:col-span-4 lg:border-l">
          <p data-reveal="lines" className="text-16">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Every mansion is a 5 BHK triplex on its own plot of
            about 500 sq. yd., in a gated community of just 28 homes.
          </p>
          <p data-reveal="lines" className="mono text-14 text-mute">
            [Scroll to continue]
          </p>
        </div>
      </Reveal>

      <div className="relative py-120">
        {/* centre divider */}
        <div className="absolute inset-y-0 left-1/2 w-px bg-line max-lg:hidden" />

        <div className="flex flex-col gap-120">
          {STEPS.map((step, i) => {
            const pictureLeft = i % 2 === 0;
            return (
              <div key={step.title} className="relative grid lg:grid-cols-2">
                <Reveal
                  start="top+=45% bottom"
                  className={`relative z-10 mx-16 aspect-square overflow-hidden lg:mx-0 lg:w-557 ${
                    pictureLeft ? "lg:col-start-1 lg:ml-144" : "lg:col-start-2 lg:mr-144 lg:justify-self-end"
                  } lg:row-start-1`}
                >
                  <div data-reveal="img" className="absolute inset-0">
                    <Image src={step.image} alt="" fill sizes="(min-width: 992px) 33vw, 100vw" className="object-cover" />
                  </div>
                </Reveal>

                {/* sticky bar on the other half */}
                <div className={`max-lg:mx-16 max-lg:mt-16 lg:row-start-1 ${pictureLeft ? "lg:col-start-2" : "lg:col-start-1"}`}>
                  <div className="relative lg:sticky lg:top-[calc(50vh-2.9rem)] lg:mt-280">
                    {/* brand line running across to the picture */}
                    <span
                      className={`absolute top-1/2 h-px w-[50vw] bg-brand max-lg:hidden ${pictureLeft ? "right-full" : "left-full"}`}
                    />
                    <div
                      className={`flex items-center gap-48 bg-ink px-24 py-16 text-white ${pictureLeft ? "lg:mr-30" : "lg:ml-30"}`}
                    >
                      <h3 className="heading text-24 text-white lg:w-200">{step.title}</h3>
                      <p className="flex-1 text-16 font-normal text-white/80">{step.text}</p>
                      <span className="size-8 animate-[pulse-soft_1.5s_infinite] bg-brand" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
