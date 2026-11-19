// The loader plays once, on the first page load. Things that animate in after it
// (header, hero) call `whenIntroDone` instead of starting straight away.

let done = false;
const waiting = new Set<() => void>();

export function isIntroDone() {
  return done;
}

export function finishIntro() {
  done = true;
  waiting.forEach((run) => run());
  waiting.clear();
}

/** Runs `run` once the loader has finished (or at once if it already has). Returns a cancel function. */
export function whenIntroDone(run: () => void) {
  if (done) {
    run();
    return () => {};
  }
  waiting.add(run);
  return () => waiting.delete(run);
}
