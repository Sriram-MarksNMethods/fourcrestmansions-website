// Temporary page body until each page is built.
export default function PagePlaceholder({ title }: { title: string }) {
  return (
    <section className="flex h-[calc(100dvh-1.6rem)] items-end px-16 pt-64 pb-32 lg:px-32">
      <h1 className="heading text-40 lg:text-56">{title}</h1>
    </section>
  );
}
