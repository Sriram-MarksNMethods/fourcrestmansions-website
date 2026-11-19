"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import InkFill from "@/components/InkFill";
import OutlineButton from "@/components/OutlineButton";
import PixelFill from "@/components/PixelFill";
import Reveal from "@/components/Reveal";
import ScrubText from "@/components/ScrubText";
import { ArrowIcon } from "@/components/Roll";
import "swiper/css";

// Heron shows client logos here; Fourcrest lists what the site is close to.
// TODO: client to confirm the list.
const NEARBY = ["Outer Ring Road", "RGIA Airport", "Tukkuguda", "Fab City", "Pharma City", "Shamshabad", "Srisailam Highway", "Maheshwaram"];

function ArrowButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className="group relative flex size-45 items-center justify-center overflow-hidden border-l border-line text-ink transition-colors duration-[400ms] data-filled:text-white"
    >
      <PixelFill color="#8a574c" />
      <ArrowIcon className={`relative size-16 ${direction === "prev" ? "rotate-180" : ""}`} />
    </button>
  );
}

export default function Intro() {
  const swiperRef = useRef<{ slidePrev: () => void; slideNext: () => void } | null>(null);

  return (
    <section id="intro" className="relative grid grid-cols-1 border-b border-line lg:grid-cols-12 lg:gap-x-20">
      {/* Left: sketch that fills with colour as you scroll */}
      <div className="paper relative aspect-square lg:col-span-6 lg:-mr-10 lg:aspect-auto lg:h-867">
        {/* the sketch fills with colour as you scroll  */}
        <InkFill
          sketch="/images/intro-sketch.webp"
          colour="/images/intro-colour.webp"
          width={1254}
          height={1254}
          alt="Fourcrest villa, looking up at the jaali facade"
          start={60}
          end={0}
          sizes="(min-width: 992px) 50vw, 100vw"
          className="mx-auto h-full max-w-full"
        />
      </div>

      {/* Right: manifesto, then the "close to" strip */}
      <div className="flex flex-col border-line lg:col-span-6 lg:-ml-10 lg:border-l">
        <Reveal className="flex flex-1 flex-col px-16 py-48 lg:px-150 lg:pt-64 lg:pb-32">
          <ScrubText className="heading mb-32 text-28 lg:text-40">
            The parts of life that matter deserve room. Fourcrest gives every family a whole plot, three floors and a
            face of its own, so coming home feels like nowhere else.
          </ScrubText>
          <div data-reveal="up" className="mt-auto lg:mt-0">
            <OutlineButton href="/about">Learn more</OutlineButton>
          </div>
        </Reveal>

        <Reveal className="border-t border-line">
          <div className="flex items-center justify-between border-b border-line pl-16 lg:pl-32">
            <span data-reveal="lines" className="mono text-12 text-ink lg:text-14">
              Close to
            </span>
            <div className="flex">
              <ArrowButton direction="prev" onClick={() => swiperRef.current?.slidePrev()} />
              <ArrowButton direction="next" onClick={() => swiperRef.current?.slideNext()} />
            </div>
          </div>
          <Swiper
            modules={[Autoplay, Navigation]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={2.5}
            breakpoints={{ 992: { slidesPerView: 5 } }}
            loop
            speed={600}
            autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            className="-ml-px"
          >
            {NEARBY.map((place) => (
              <SwiperSlide key={place}>
                <div className="flex h-114 items-center justify-center border-l border-dashed border-line px-16 text-center">
                  <span className="mono text-12 text-ink/72">{place}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <p data-reveal="lines" className="mono border-t border-line px-16 py-8 text-12 lg:px-32">
            Mankhal sits on the Srisailam Highway corridor in south Hyderabad, a short drive from the Outer Ring Road.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
