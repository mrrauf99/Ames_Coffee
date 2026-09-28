"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/useInView";

type RevealVariant = "rise" | "curtain";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Overrides the variant's default transition length; photography call sites pass a shorter one. */
  duration?: number;
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

// Inline, not a Tailwind duration-[...] class, so call sites can override per instance.
const DEFAULT_DURATION: Record<RevealVariant, number> = {
  rise: 900,
  // Shorter than `rise`: at 900ms the already-loaded photo read as slow to
  // appear even though it had nothing left to load.
  curtain: 500,
};

const TRANSITION: Record<RevealVariant, string> = {
  rise: "transition-all ease-[cubic-bezier(0.22,1,0.36,1)]",
  curtain: "transition-all ease-[cubic-bezier(0.22,1,0.36,1)]",
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  duration,
  variant = "rise",
}: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const resolvedDuration = duration ?? DEFAULT_DURATION[variant];

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
          style={{ transitionDelay: `${delay}ms`, transitionDuration: `${resolvedDuration}ms` }}
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
      style={{ transitionDelay: `${delay}ms`, transitionDuration: `${resolvedDuration}ms` }}
    >
      {children}
    </div>
  );
}
