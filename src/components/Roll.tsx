// Hover "roll" used on every Heron button: the label slides up and an identical
// copy slides in from below; the arrow slides out right and a copy comes in from the left.
// The parent element needs the `group` class.

const roll = "transition-transform duration-[480ms] ease-heron";

export function RollText({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className={`block ${roll} group-hover:-translate-y-full`}>{children}</span>
      <span aria-hidden className={`absolute inset-0 block translate-y-full ${roll} group-hover:translate-y-0`}>
        {children}
      </span>
    </span>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function RollArrow({ className = "size-20" }: { className?: string }) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <ArrowIcon className={`size-full ${roll} group-hover:translate-x-full`} />
      <ArrowIcon className={`absolute inset-0 size-full -translate-x-full ${roll} group-hover:translate-x-0`} />
    </span>
  );
}
