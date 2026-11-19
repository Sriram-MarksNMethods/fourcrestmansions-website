import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Cta from "@/components/Cta";
import { POSTS } from "@/lib/blogs";

// One blog post: title block, cover picture, article, then "more to read".
export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function BlogPostPage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 4);

  return (
    <>
      <section className="grid border-b border-line pt-68 lg:grid-cols-12">
        <Reveal start="top bottom" className="flex flex-col justify-end px-16 pt-60 pb-32 lg:col-span-7 lg:border-r lg:border-line">
          <p data-reveal="lines" className="mono mb-16 text-10 text-ink-2">
            <Link href="/blogs" className="hover:text-brand">
              Blogs
            </Link>{" "}
            / {post.category} | {post.date}
          </p>
          <h1 data-reveal="lines" className="heading text-40 lg:text-56">
            {post.title}
          </h1>
        </Reveal>
        <Reveal start="top bottom" className="flex items-end px-16 pb-32 lg:col-span-5">
          <p data-reveal="lines" className="text-16">
            {post.excerpt}
          </p>
        </Reveal>
      </section>

      <Reveal start="top bottom" className="relative aspect-[16/7] overflow-hidden border-b border-line">
        <div data-reveal="img" className="absolute inset-0">
          <Image src={post.image} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
      </Reveal>

      <article className="grid border-b border-line lg:grid-cols-12">
        <aside className="mono hidden p-16 text-10 text-ink-2 lg:col-span-3 lg:block lg:border-r lg:border-line">
          [{post.category}]
        </aside>
        <Reveal start="top+=20% bottom" className="flex flex-col gap-20 px-16 py-48 lg:col-span-6 lg:px-48 lg:py-80">
          {post.body.map((paragraph, i) => (
            <p key={i} data-reveal="lines" className={i === 0 ? "text-20 leading-[1.3] text-ink" : "text-16 font-normal"}>
              {paragraph}
            </p>
          ))}
        </Reveal>
      </article>

      <section className="border-b border-line">
        <p className="mono border-b border-line px-16 py-12 text-10">More to read</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {more.map((p) => (
            <Link key={p.slug} href={`/blogs/${p.slug}`} className="group border-line p-12 not-last:lg:border-r max-lg:border-b">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={p.image} alt="" fill sizes="25vw" className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-105" />
              </div>
              <p className="mono mt-12 text-10 text-ink-2">
                {p.category} | {p.date}
              </p>
              <h2 className="heading mt-8 text-20">{p.title}</h2>
            </Link>
          ))}
        </div>
      </section>

      <Cta />
    </>
  );
}
