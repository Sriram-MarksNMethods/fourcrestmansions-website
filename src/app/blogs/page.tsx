import Reveal from "@/components/Reveal";
import Cta from "@/components/Cta";
import BlogGrid from "./BlogGrid";

export const metadata = {
  title: "Blogs",
  description: "Stories, guides and site updates from Fourcrest Mansions.",
};

// Heron's Resources page: big centred title, category filter, card grid, CTA.
export default function BlogsPage() {
  return (
    <>
      <Reveal start="top bottom" className="flex h-240 items-center justify-center border-b border-line pt-68 lg:h-320">
        <h1 data-reveal="lines" className="heading text-48 lg:text-56">
          Blogs
        </h1>
      </Reveal>
      <section className="border-b border-line">
        <BlogGrid />
      </section>
      <Cta />
    </>
  );
}
