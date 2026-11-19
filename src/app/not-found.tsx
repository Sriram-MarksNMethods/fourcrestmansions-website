import OutlineButton from "@/components/OutlineButton";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="flex h-[calc(100dvh-1.6rem)] flex-col items-center justify-center gap-20 px-16 pt-68 text-center">
      <p className="mono text-12 text-brand">[404]</p>
      <h1 className="heading text-40 lg:text-56">This page isn&apos;t on the plan</h1>
      <p className="max-w-420 text-16">The page you were looking for has moved or never existed.</p>
      <div className="mt-8">
        <OutlineButton href="/">Back to home</OutlineButton>
      </div>
    </section>
  );
}
