// Shared layout for the Privacy and Terms pages (text is a placeholder until legal sends the final copy).
export default function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { heading: string; text: string }[] }) {
  return (
    <>
      <section className="border-b border-line px-16 pt-140 pb-32 lg:px-32">
        <p className="mono mb-12 text-10 text-ink-2">Last updated {updated}</p>
        <h1 className="heading text-40 lg:text-56">{title}</h1>
      </section>
      <div className="grid lg:grid-cols-12">
        <div className="hidden border-r border-line lg:col-span-3 lg:block" />
        <div className="flex flex-col gap-32 px-16 py-48 lg:col-span-6 lg:px-48">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="heading mb-8 text-20">{s.heading}</h2>
              <p className="text-16 font-normal">{s.text}</p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
