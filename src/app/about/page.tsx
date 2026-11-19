import Reveal from "@/components/Reveal";
import InkFill from "@/components/InkFill";
import FourcrestLogo from "@/components/FourcrestLogo";
import Cta from "@/components/Cta";

export const metadata = {
  title: "About",
  description: "The people and the thinking behind Fourcrest Mansions, a Globus Developers project at Mankhal, Hyderabad.",
};

// Heron's About page, section by section, in Fourcrest's words (lorem where the facts are still to come).
const MISSION = [
  "Give every family a whole plot of its own",
  "Design four faces, so no two streets look the same",
  "Build with materials meant to last generations",
  "Hand over homes, not handover snag lists",
];

// Team grid: placeholders until the client sends real names, roles and portraits.
const TEAM = [
  { name: "Lorem Ipsum", role: "Founder & MD" },
  { name: "Dolor Sit", role: "Principal architect" },
  { name: "Amet Consectetur", role: "Head of projects" },
  { name: "Adipiscing Elit", role: "Structural consultant" },
  { name: "Sed Eiusmod", role: "Landscape architect" },
  { name: "Tempor Incididunt", role: "Customer relations" },
];

const PARTNERS = ["Partner 01", "Partner 02", "Partner 03", "Partner 04", "Partner 05", "Partner 06", "Partner 07", "Partner 08"];

// Small round icon used on the mission rows (Heron uses little line icons here).
function MissionIcon({ i }: { i: number }) {
  return (
    <span className="flex size-28 items-center justify-center rounded-full border border-ink/40 text-ink">
      <span className="mono text-10">{String(i + 1).padStart(2, "0")}</span>
    </span>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero: the mark, big, on its own screen */}
      <section className="flex h-[calc(100dvh-1.6rem)] items-center justify-center border-b border-line pt-68">
        <Reveal start="top bottom" className="w-[70vw] text-ink lg:w-560">
          <div data-reveal="img">
            <FourcrestLogo className="h-auto w-full" />
          </div>
        </Reveal>
      </section>

      {/* Intro: side labels + centred statement */}
      <Reveal start="top+=40% bottom" className="grid border-b border-line lg:grid-cols-12">
        <p data-reveal="lines" className="mono hidden self-center border-line p-8 text-10 text-ink-2 lg:col-span-3 lg:block lg:border-r">
          Tired of compromise?
        </p>
        <div className="px-16 py-48 text-center lg:col-span-6 lg:px-48 lg:py-40">
          <h1 data-reveal="lines" className="heading text-32 lg:text-40">
            We&apos;re builders making the homes we always wanted
          </h1>
          <p data-reveal="lines" className="mx-auto mt-20 max-w-480 text-16">
            Fourcrest takes the things that usually get traded away in a villa community, like plot size, privacy and
            build quality, and refuses to trade them. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <p data-reveal="lines" className="mono hidden self-center border-line p-8 text-right text-10 text-ink-2 lg:col-span-3 lg:block lg:border-l">
          We built the fix
        </p>
      </Reveal>

      {/* Our story: sketch that fills with colour on scroll + text */}
      <section className="grid border-b border-line lg:grid-cols-2">
        <div className="relative flex justify-center overflow-hidden border-line p-24 max-lg:border-b lg:h-720 lg:border-r">
          <InkFill
            sketch="/images/about-story-sketch.webp"
            colour="/images/about-story-colour.webp"
            width={1200}
            height={1500}
            alt="Fourcrest mansion, front elevation"
            start={60}
            end={0}
            sizes="(min-width: 992px) 40vw, 100vw"
            className="h-full max-w-full max-lg:h-480"
          />
        </div>
        <Reveal start="top+=40% bottom" className="flex flex-col px-16 py-40 lg:px-96 lg:pt-24 lg:pb-40">
          <p data-reveal="lines" className="mono mb-16 text-12">
            Our story
          </p>
          <h2 data-reveal="lines" className="heading text-32 lg:text-40">
            Why Fourcrest?
          </h2>
          <p data-reveal="lines" className="mt-48 text-20 leading-[1.2] text-ink lg:mt-auto">
            A crest is the mark a family carries. Four of them, one address: every mansion here wears one of four
            elevations, so each home has a face of its own on a street that still belongs together.
          </p>
          <p data-reveal="lines" className="mt-24 text-14 font-normal">
            Fourcrest is a Globus Developers project: 28 triplex mansions on 6.14 acres at Mankhal, south Hyderabad,
            each on a plot of about 500 sq. yd. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
          </p>
        </Reveal>
      </section>

      {/* Our mission: picture + list */}
      <section className="grid border-b border-line lg:grid-cols-2">
        <div className="relative overflow-hidden border-line max-lg:border-b lg:border-r">
          <InkFill
            sketch="/images/about-mission-sketch.webp"
            colour="/images/about-mission-colour.webp"
            width={1600}
            height={822}
            alt="Fourcrest clubhouse, artistic impression"
            start={70}
            end={15}
            sizes="(min-width: 992px) 50vw, 100vw"
            className="w-full"
          />
        </div>
        <Reveal start="top+=40% bottom" className="flex flex-col">
          <h2 data-reveal="lines" className="heading px-16 pt-24 pb-24 text-24 lg:px-72">
            Our mission:
          </h2>
          <ul>
            {MISSION.map((item, i) => (
              <li key={item} className="flex items-center justify-between border-t border-line px-16 py-16 lg:pl-72 lg:pr-32">
                <span data-reveal="lines" className="mono text-12 text-ink">
                  {item}
                </span>
                <MissionIcon i={i} />
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Our team */}
      <Reveal start="top+=60% bottom" className="flex flex-col gap-24 border-b border-line px-16 pt-80 pb-32 lg:flex-row lg:items-end lg:justify-between lg:px-16 lg:pt-120">
        <div>
          <p data-reveal="lines" className="mono mb-16 text-12">
            Our team
          </p>
          <h2 data-reveal="lines" className="heading text-32 lg:text-40">
            Built by builders,
            <br />
            shaped by families
          </h2>
        </div>
        <p data-reveal="lines" className="text-16 lg:w-396">
          Architects, engineers and craftspeople who have spent years building homes in Hyderabad. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit.
        </p>
      </Reveal>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.map((person) => (
          <article key={person.name} className="group border-line not-nth-[3n]:lg:border-r border-b">
            {/* portrait placeholder; on hover it frames up like Heron's dark card */}
            <div className="relative aspect-[4/3] p-16 transition-colors duration-500 group-hover:bg-ink">
              <div className="flex size-full items-center justify-center bg-[repeating-linear-gradient(45deg,rgb(35_31_32/0.06)_0_1px,transparent_1px_8px)] transition-colors duration-500 group-hover:bg-paper">
                <span className="mono text-12 text-mute">[Portrait]</span>
              </div>
            </div>
            <div className="border-t border-line py-16 text-center">
              <h3 className="heading text-20">{person.name}</h3>
              <p className="mono mt-6 text-10 text-ink-2">{person.role}</p>
            </div>
          </article>
        ))}
      </section>

      {/* Consultants & partners */}
      <section className="border-b border-line">
        <div className="grid lg:grid-cols-12">
          <div className="hidden bg-[radial-gradient(rgb(35_31_32/0.12)_1px,transparent_1px)] bg-[size:0.8rem_0.8rem] lg:col-span-3 lg:block lg:border-r lg:border-line" />
          <Reveal start="top+=50% bottom" className="px-16 pt-80 pb-60 lg:col-span-9 lg:px-64">
            <p data-reveal="lines" className="mono mb-16 text-12">
              Consultants &amp; partners
            </p>
            <h2 data-reveal="lines" className="heading text-32 lg:text-40">
              The people building
              <br />
              Fourcrest with us
            </h2>
          </Reveal>
        </div>
        <p className="mono border-t border-line px-16 py-12 text-10 lg:px-[calc(25%+6.4rem)]">Working with:</p>
        <div className="grid grid-cols-2 border-t border-line sm:grid-cols-4 lg:grid-cols-8">
          {PARTNERS.map((name) => (
            <div key={name} className="flex h-80 items-center justify-center border-line not-last:border-r max-lg:border-b">
              <span className="mono text-12 text-mute">{name}</span>
            </div>
          ))}
        </div>
      </section>

      <Cta />
    </>
  );
}
