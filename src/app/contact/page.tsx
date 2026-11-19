import Reveal from "@/components/Reveal";
import InkFill from "@/components/InkFill";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact",
  description: "Book a site visit or ask us anything about Fourcrest Mansions, Mankhal, Hyderabad.",
};

// Heron's Contact page: title + three info cells on top, form on the left,
// a building drawing on the right (here it fills with colour as you hover the form side).
const INFO = [
  { label: "Sales", value: "+91 00000 00000", href: "tel:+910000000000" },
  { label: "General enquiries", value: "hello@example.com", href: "mailto:hello@example.com" },
  { label: "Site address", value: "Mankhal, Hyderabad, Telangana", href: "https://maps.google.com/?q=Mankhal%2C+Hyderabad" },
];

export default function ContactPage() {
  return (
    <>
      <section className="grid border-b border-line pt-68 lg:grid-cols-12">
        <Reveal start="top bottom" className="px-16 pt-24 pb-16 lg:col-span-6 lg:border-r lg:border-line">
          <h1 data-reveal="lines" className="heading text-40 lg:text-48">
            Get in touch
          </h1>
          <p data-reveal="lines" className="mt-12 text-14 font-normal">
            Come and see the plots, the show home and the clubhouse for yourself.
            <br />
            Tell us when suits you and we&apos;ll set it up.
          </p>
        </Reveal>
        <div className="grid grid-cols-3 lg:col-span-6">
          {INFO.map((item) => (
            <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex flex-col justify-between gap-24 border-line p-16 not-last:border-r max-lg:border-t hover:text-brand">
              <span className="mono text-10 text-ink-2">{item.label}</span>
              <span className="text-14 text-ink">{item.value}</span>
            </a>
          ))}
        </div>
      </section>

      <section data-fill-hover className="grid border-b border-line lg:grid-cols-2">
        <div className="border-line lg:border-r">
          <h2 className="heading border-b border-line px-16 py-20 text-28 lg:text-32">Please fill out this form</h2>
          <ContactForm />
        </div>
        <div className="flex items-center justify-center overflow-hidden p-24 max-lg:border-t max-lg:border-line">
          <InkFill
            hover
            sketch="/images/crest-02-ink-v2.webp"
            colour="/images/crest-02-fill.webp"
            width={1391}
            height={1131}
            alt="Fourcrest mansion, illustration"
            sizes="(min-width: 992px) 50vw, 100vw"
            className="w-full"
          />
        </div>
      </section>
    </>
  );
}
