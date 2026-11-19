import Link from "next/link";
import Reveal from "@/components/Reveal";
import InkFill from "@/components/InkFill";
import PixelFill from "@/components/PixelFill";
import { RollArrow, RollText } from "@/components/Roll";

// Heron's closing call to action: a dashed grid with coordinate labels in the
// corners, a centred heading + button, and a line drawing below.
export default function Cta() {
  return (
    <section className="relative border-b border-line">
      <Reveal start="top+=40% bottom" className="relative">
        {/* dashed guides */}
        <span className="absolute inset-y-0 left-1/4 w-px border-l border-dashed border-line max-lg:hidden" />
        <span className="absolute inset-y-0 right-1/4 w-px border-l border-dashed border-line max-lg:hidden" />

        <div className="grid h-96 grid-cols-4 border-b border-dashed border-line max-lg:hidden">
          <p data-reveal="up" className="mono self-end p-8 text-12 text-ink-2">[0,246]</p>
          <p data-reveal="up" className="mono col-start-2 p-8 text-12 text-ink-2">[831,0]</p>
          <p data-reveal="up" className="mono col-start-4 p-8 text-12 text-ink-2">[2303,0]</p>
        </div>

        <div className="relative flex flex-col items-center px-16 py-60 text-center lg:h-276 lg:justify-center lg:py-0">
          <p data-reveal="up" className="mono absolute bottom-8 left-8 text-12 text-ink-2 max-lg:hidden">
            [0,544]
          </p>
          <h2 data-reveal="lines" className="heading text-40 lg:w-640 lg:text-56">
            See Fourcrest for yourself
          </h2>
          <p data-reveal="lines" className="mt-16 text-16 font-normal">
            Book a site visit and we&apos;ll walk you through the mansions and the clubhouse.
          </p>
          <div data-reveal="up" className="mt-36">
            <Link href="/contact" className="group relative inline-flex items-stretch overflow-hidden bg-brand text-white">
              <PixelFill color="#231f20" />
              <span className="mono relative px-16 py-14 text-14">
                <RollText>Contact us</RollText>
              </span>
              <span className="relative flex w-44 items-center justify-center border-l border-dashed border-white/50">
                <RollArrow className="size-16" />
              </span>
            </Link>
          </div>
        </div>
      </Reveal>

      {/* the sketch fills with colour as you scroll */}
      <div className="relative flex h-280 justify-center overflow-hidden border-t border-dashed border-line lg:h-466">
        <InkFill
          sketch="/images/cta-fill-sketch.webp"
          colour="/images/cta-fill-colour.webp"
          width={1600}
          height={893}
          alt="Fourcrest mansion, front elevation"
          start={60}
          end={15}
          sizes="(min-width: 992px) 50vw, 100vw"
          className="h-full"
        />
      </div>
    </section>
  );
}
