import Link from "next/link";
import Reveal from "@/components/Reveal";
import FourcrestLogo from "@/components/FourcrestLogo";
import { ArrowIcon } from "@/components/Roll";
import FooterWordmark from "@/components/FooterWordmark";

// Heron's footer: title + link columns + big logo, a contact row, then the
// name drawn as outlined letters (the outline draws itself in when it scrolls into view).
const MENUS = [
  { label: "Company", links: [["Home", "/"], ["About", "/about"], ["Contact", "/contact"]] },
  { label: "Mansions", links: [["Specifications", "/specifications"], ["Brochure", "/fourcrest-brochure.pdf"]] },
  { label: "Resources", links: [["Blogs", "/blogs"], ["Lorem ipsum", "/blogs"], ["Dolor sit", "/blogs"]] },
];

const SOCIAL = ["Instagram", "Facebook", "YouTube", "LinkedIn"];

export default function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="grid lg:grid-cols-12">
        {/* title + brochure */}
        <div className="flex flex-col justify-between border-line max-lg:border-b lg:col-span-3 lg:border-r">
          <Reveal start="top+=55% bottom" className="p-16 pb-60 lg:pb-16">
            <h2 data-reveal="lines" className="heading text-32">
              28 triplex mansions at Mankhal, Hyderabad
            </h2>
          </Reveal>
          <Reveal start="top+=55% bottom" className="border-t border-line">
            <p data-reveal="lines" className="mono px-16 pt-24 text-14">
              Brochure
            </p>
            <p data-reveal="lines" className="px-16 pt-24 pb-40 text-16 font-normal">
              Floor plans, specifications and elevations, all in one PDF.
            </p>
            <a
              data-reveal="up"
              href="/fourcrest-brochure.pdf"
              download
              className="group flex items-stretch justify-between border-t border-line text-16 font-normal transition-colors hover:text-ink"
            >
              <span className="px-16 py-14">Download the brochure</span>
              <span className="flex w-48 items-center justify-center border-l border-line">
                <ArrowIcon className="size-16 rotate-90" />
              </span>
            </a>
          </Reveal>
        </div>

        {/* link columns + contact row */}
        <div className="lg:col-span-6">
          <Reveal start="top+=55% bottom" className="grid grid-cols-3 border-b border-line lg:h-242">
            {MENUS.map((menu) => (
              <div key={menu.label} className="border-line p-16 not-first:border-l">
                <p data-reveal="lines" className="mono pb-24 text-14">
                  {menu.label}
                </p>
                <ul className="flex flex-col gap-12">
                  {menu.links.map(([label, href]) => (
                    <li key={label} data-reveal="lines">
                      {href.endsWith(".pdf") ? (
                        <a href={href} download className="text-16 text-ink transition-colors hover:text-brand">
                          {label}
                        </a>
                      ) : (
                        <Link href={href} className="text-16 text-ink transition-colors hover:text-brand">
                          {label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Reveal>

          <Reveal start="top+=55% bottom" className="grid md:grid-cols-3 lg:h-184 [&>*]:max-md:border-l-0 [&>*]:max-md:border-t [&>*]:max-md:border-line">
            <div className="flex flex-col justify-between p-16">
              <p data-reveal="lines" className="mono pb-24 text-14">
                Address
              </p>
              <p data-reveal="lines" className="text-16 text-ink">
                Mankhal, Hyderabad, Telangana
              </p>
              <a data-reveal="lines" href="https://maps.google.com/?q=Mankhal%2C+Hyderabad" target="_blank" rel="noreferrer" className="pt-24 text-16 text-ink hover:text-brand">
                Direction
              </a>
            </div>
            <div className="flex flex-col border-l border-line">
              <div className="flex-1 p-16">
                <p data-reveal="lines" className="mono pb-24 text-14">
                  Sales
                </p>
                <a data-reveal="lines" href="tel:+910000000000" className="text-16 text-ink hover:text-brand">
                  +91 00000 00000
                </a>
              </div>
              <div className="flex-1 border-t border-line p-16">
                <p data-reveal="lines" className="mono pb-24 text-14">
                  General enquiries
                </p>
                <a data-reveal="lines" href="mailto:hello@example.com" className="text-16 text-ink hover:text-brand">
                  hello@example.com
                </a>
              </div>
            </div>
            <div className="border-l border-line p-16">
              <p data-reveal="lines" className="mono pb-24 text-14">
                Social
              </p>
              <ul className="grid grid-cols-2 gap-12">
                {SOCIAL.map((name) => (
                  <li key={name} data-reveal="lines" className="text-16 text-ink">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* big logo */}
        <Reveal start="top+=55% bottom" className="flex items-center justify-center border-line p-40 max-lg:hidden lg:col-span-3 lg:border-l">
          <div data-reveal="img" className="w-240 text-ink">
            <FourcrestLogo className="h-auto w-full" />
          </div>
        </Reveal>
      </div>

      {/* outlined name between two tick rulers */}
      <div className="relative border-t border-line">
        <div className="ticks-x mx-32 h-8 opacity-70" />
        <FooterWordmark />
        <div className="ticks-x mx-32 h-8 opacity-70" />
      </div>

      <Reveal start="top+=35% bottom" className="flex flex-col border-t border-line lg:flex-row lg:items-stretch lg:justify-between">
        <p data-reveal="lines" className="mono px-32 py-16 text-12 text-ink-2">
          © 2026 Globus Developers. All rights reserved. All images are artistic impressions.
        </p>
        <div className="flex border-line max-lg:border-t">
          {[
            ["Privacy policy", "/privacy-policy"],
            ["Terms & conditions", "/terms"],
          ].map(([label, href]) => (
            <Link key={label} href={href} data-reveal="lines" className="border-line px-24 py-16 text-16 text-ink not-first:border-l hover:text-brand lg:border-l">
              {label}
            </Link>
          ))}
        </div>
      </Reveal>
    </footer>
  );
}
