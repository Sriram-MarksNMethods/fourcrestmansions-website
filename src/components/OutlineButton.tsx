import Link from "next/link";
import PixelFill from "@/components/PixelFill";
import { RollArrow, RollText } from "@/components/Roll";

/** Heron's outline button ("Learn more  →"): label cell + arrow cell, fills dark on hover. */
export default function OutlineButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-stretch overflow-hidden border border-line text-ink transition-colors duration-[400ms] data-filled:text-white"
    >
      <PixelFill color="#231f20" />
      <span className="mono relative px-16 py-14 text-14">
        <RollText>{children}</RollText>
      </span>
      <span className="relative flex w-44 items-center justify-center border-l border-line">
        <RollArrow className="size-16" />
      </span>
    </Link>
  );
}
