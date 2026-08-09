"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { business } from "@/data/business";
import { heroImage } from "@/data/gallery";
import { Button } from "@/components/ui/Button";
import { OpenStatusBadge } from "@/components/ui/OpenStatusBadge";

export function Hero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = frameRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const progress = Math.min(Math.max(1 - rect.top / window.innerHeight, 0), 1);
        setOffset((progress - 0.5) * 28);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden bg-cream">
      {/* Ambient wash lifted from the pastel shapes on ames' printed menu. Kept
          well below the photography so it reads as warmth, not as a gradient. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-blush opacity-50 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-0 h-[24rem] w-[24rem] rounded-full bg-butter opacity-60 blur-[110px]"
      />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pt-12 pb-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-10 lg:pt-16 lg:pb-24">
        <div className="flex flex-col items-start gap-6">
          <p
            className="hero-in font-display text-lg italic text-coral"
            style={{ animationDelay: "60ms" }}
          >
            Albion, Brisbane
          </p>

          <h1
            className="hero-in max-w-xl font-display text-[clamp(2.4rem,5.4vw,4rem)] font-medium leading-[1.02] text-ink"
            style={{ animationDelay: "140ms" }}
          >
            Coffee from a little window on McLennan Street.
          </h1>

          <p
            className="hero-in max-w-md text-base leading-relaxed text-text-secondary sm:text-lg"
            style={{ animationDelay: "220ms" }}
          >
            Espresso, Japanese matcha and seasonal juice, handed out through a
            hatch. No dining room, no table service. Just a queue on the
            footpath and {business.dog.name}, who is usually there before you
            are.
          </p>

          <div
            className="hero-in flex flex-wrap items-center gap-3 pt-1"
            style={{ animationDelay: "300ms" }}
          >
            <Button href={business.googleMapsUrl} external withArrow>
              Get directions
            </Button>
            <Button href="#menu" variant="outline">
              View menu
            </Button>
          </div>

          <div
            className="hero-in flex flex-col items-start gap-y-1.5 pt-2 text-sm text-text-secondary sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3"
            style={{ animationDelay: "380ms" }}
          >
            <OpenStatusBadge />
            {/* Only a separator when the two facts actually sit on one line. */}
            <span aria-hidden className="hidden text-border sm:inline">
              |
            </span>
            <span>
              {business.rating.value.toFixed(1)}★ from {business.rating.count} Google
              reviews
            </span>
          </div>
        </div>

        {/* The photo keeps its native 3:4 crop at every breakpoint so the full
            frame — sign, hatch and Rooky on the footpath — always fits. The
            parallax moves the frame itself rather than the image inside it,
            which means nothing is ever trimmed to make room for the motion. */}
        <div
          ref={frameRef}
          className="hero-frame relative"
          style={{ animationDelay: "180ms" }}
        >
          <div
            className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-sand shadow-[0_30px_60px_-30px_rgba(34,30,26,0.45)] ring-1 ring-ink/[0.06] transition-transform duration-300 ease-out sm:rounded-[2.5rem]"
            style={{ transform: `translateY(${offset}px)` }}
          >
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
