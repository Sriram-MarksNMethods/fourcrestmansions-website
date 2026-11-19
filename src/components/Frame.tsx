// Heron frames the whole site: an 8px paper margin around the screen with a hairline
// just inside it. Content scrolls underneath, so it disappears at the frame edge.
export default function Frame() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9000]">
      <div className="paper absolute inset-x-0 top-0 h-8" />
      <div className="paper absolute inset-x-0 bottom-0 h-8" />
      <div className="paper absolute inset-y-0 left-0 w-8" />
      <div className="paper absolute inset-y-0 right-0 w-8" />
      <div className="absolute inset-8 border border-line" />
    </div>
  );
}
