import Link from "next/link";
import Reveal from "@/components/Reveal";
import OutlineButton from "@/components/OutlineButton";

export const metadata = { title: "Thank you", robots: { index: false } };

export default function ThankYouPage() {
  return (
    <section className="flex h-[calc(100dvh-1.6rem)] flex-col items-center justify-center gap-24 px-16 pt-68 text-center">
      <Reveal start="top bottom" className="flex flex-col items-center gap-16">
        <p data-reveal="lines" className="mono text-12 text-brand">
          [Enquiry received]
        </p>
        <h1 data-reveal="lines" className="heading text-40 lg:text-56">
          Thank you
        </h1>
        <p data-reveal="lines" className="max-w-420 text-16">
          We&apos;ve got your details and will call you shortly to set up your visit.
        </p>
        <div data-reveal="up" className="mt-16 flex gap-12">
          <OutlineButton href="/">Back to home</OutlineButton>
          <a href="/fourcrest-brochure.pdf" download className="mono self-center px-8 text-14 text-ink underline underline-offset-4 hover:text-brand">
            Download brochure
          </a>
        </div>
      </Reveal>
      <Link href="/blogs" className="mono text-10 text-ink-2 hover:text-brand">
        Meanwhile, read our blogs →
      </Link>
    </section>
  );
}
