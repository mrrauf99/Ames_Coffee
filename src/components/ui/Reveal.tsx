"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/useInView";

type RevealVariant = "rise" | "curtain";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** rise (default): lifts into place. curtain: wipes upward, reserved for photography. */
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

const TRANSITION: Record<RevealVariant, string> = {
  rise: "transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
  // Shorter than `rise`: at 900ms the already-loaded photo read as slow to
  // appear even though it had nothing left to load.
  curtain: "transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "rise",
}: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  // IntersectionObserver measures the target *after* clipping, so an element
  // that clips itself never trips its own observer. Clip an inner layer instead
  // and leave the observed box unclipped.
  if (variant === "curtain") {
    return (
      <div ref={ref} className={`relative ${className}`}>
        <div
          className={`absolute inset-0 ${TRANSITION.curtain} ${
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
      className={`${TRANSITION[variant]} ${
        isInView ? shown[variant] : hidden[variant]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
