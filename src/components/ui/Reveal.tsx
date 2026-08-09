"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/useInView";

type RevealVariant = "rise" | "curtain";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /**
   * rise    — the default: content lifts into place.
   * curtain — wipes upward from the bottom edge; reserved for photography, so an
   *           image resolves like a print coming up in a tray rather than sliding.
   */
  variant?: RevealVariant;
};

const hidden: Record<RevealVariant, string> = {
  rise: "translate-y-5 opacity-0",
  curtain: "opacity-0 [clip-path:inset(0_0_100%_0)]",
};

const shown: Record<RevealVariant, string> = {
  rise: "translate-y-0 opacity-100",
  curtain: "opacity-100 [clip-path:inset(0_0_0_0)]",
};

const TRANSITION =
  "transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]";

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "rise",
}: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  // IntersectionObserver measures the target *after* clipping, so an element
  // that hides itself with clip-path reports a zero-area intersection and never
  // trips its own observer. The curtain therefore clips an inner layer and
  // leaves the observed box unclipped. Callers pass a positioned frame
  // (relative + aspect + overflow-hidden), so inset-0 fills it exactly and
  // next/image's `fill` still resolves against a positioned ancestor.
  if (variant === "curtain") {
    return (
      <div ref={ref} className={`relative ${className}`}>
        <div
          className={`absolute inset-0 ${TRANSITION} ${
            isInView ? shown.curtain : hidden.curtain
          }`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`${TRANSITION} ${
        isInView ? shown[variant] : hidden[variant]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
