"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { business } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { OpenStatusBadge } from "@/components/ui/OpenStatusBadge";
import { useActiveSection } from "@/lib/useActiveSection";
import { useHeaderState } from "@/lib/useHeaderState";
import { MobileNav } from "@/components/layout/MobileNav";

const NAV_LINKS = [
  { id: "menu", label: "Menu" },
  { id: "story", label: "Story" },
  { id: "gallery", label: "Gallery" },
  { id: "visit", label: "Visit" },
];

const NAV_IDS = NAV_LINKS.map((link) => link.id);

// Sections with their own directions button; hide the header's copy while one is on screen.
const CTA_SECTION_IDS = ["visit"];

export function Header() {
  const activeId = useActiveSection(NAV_IDS);
  const { condensed, showCta } = useHeaderState("top", CTA_SECTION_IDS);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const nav = navRef.current;
    const activeLink = linkRefs.current[activeId];
    if (!nav || !activeLink) {
      setIndicator(null);
      return;
    }
    const navRect = nav.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    setIndicator({ left: linkRect.left - navRect.left, width: linkRect.width });
  }, [activeId]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-cream/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        condensed
          ? "border-border/70 shadow-[0_1px_20px_-12px_rgba(34,30,26,0.55)]"
          : "border-transparent"
      }`}
    >
      <div
        // Full-bleed rather than the max-w-6xl the page sections use, so the
        // wordmark sits in the corner of the bar. Padding swaps instantly
        // (not transitioned) to avoid animating a layout-reflow property.
        className={`flex w-full items-center justify-between gap-8 px-5 sm:px-8 lg:gap-12 lg:px-10 ${
          condensed ? "py-3" : "py-5"
        }`}
      >
        <Link
          href="#top"
          className="font-display text-2xl italic leading-none text-ink transition-colors hover:text-coral-text"
        >
          {business.name}
        </Link>

        <nav ref={navRef} aria-label="Sections" className="relative hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              href={`#${link.id}`}
              ref={(el) => {
                linkRefs.current[link.id] = el;
              }}
              aria-current={activeId === link.id ? "page" : undefined}
              className={`rounded-sm py-1 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral ${
                activeId === link.id ? "text-coral-text" : "text-ink/75 hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <span
            aria-hidden
            className="absolute -bottom-[1px] h-[2px] rounded-full bg-coral transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              left: indicator?.left ?? 0,
              width: indicator?.width ?? 0,
              opacity: indicator ? 1 : 0,
            }}
          />
        </nav>

        <div
          // aria-hidden and inert while collapsed so the hidden CTA is not
          // reachable by keyboard or read out while it is invisible.
          aria-hidden={!showCta}
          inert={!showCta ? true : undefined}
          className={`hidden items-center gap-7 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:flex ${
            showCta
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
        >
          <OpenStatusBadge className="hidden text-sm lg:inline-flex" />
          <Button href={business.googleMapsUrl} external>
            Get directions
          </Button>
        </div>

        {/* The condensed-header CTA above is md:flex only, so scrolled mobile
            visitors would otherwise lose one-tap directions until they open
            the drawer — this stays visible next to the hamburger instead. */}
        <a
          href={business.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get directions"
          className="-mr-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral md:hidden"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M20 10c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="2.75" />
          </svg>
        </a>

        {/* No room for the inline nav or CTA on small screens; both move into this drawer. */}
        <MobileNav links={NAV_LINKS} activeId={activeId} />
      </div>
    </header>
  );
}
