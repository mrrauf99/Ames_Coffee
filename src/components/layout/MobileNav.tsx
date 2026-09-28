"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { business } from "@/data/business";
import { OpenStatusBadge } from "@/components/ui/OpenStatusBadge";

type NavLink = { id: string; label: string };

// The drawer is portalled to <body>, so it can only render client-side.
// useSyncExternalStore tracks that without a setState-in-effect render cascade.
const subscribeToNothing = () => () => {};

export function MobileNav({ links, activeId }: { links: NavLink[]; activeId: string }) {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const focusable = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button") ?? []);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      // Page behind the drawer stays in the tab order, so trap Tab manually.
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Resizing to desktop hides the drawer via md:hidden; close it explicitly
    // or it stays "open" with body scroll locked and nothing on screen to close.
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpointChange = () => {
      if (desktop.matches) setOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpointChange);
    focusable()[0]?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpointChange);
    };
  }, [open, close]);

  // Contents stagger in behind the panel's slide for a softer entrance; closing
  // skips the delays so dismissal feels immediate. Uses [transform:...] instead
  // of Tailwind's translate-x-* utilities because those animate via a
  // --tw-translate-x custom property, which swaps instantly instead of
  // interpolating.
  const reveal = `transition-[opacity,transform,background-color,color] ease-[cubic-bezier(0.22,1,0.36,1)] ${
    open
      ? "transform-[translateX(0)] opacity-100 duration-500"
      : "transform-[translateX(20px)] opacity-0 duration-200"
  }`;
  const revealDelay = (index: number) => ({
    transitionDelay: open ? `${130 + index * 55}ms` : "0ms",
  });

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label="Open menu"
        className="-mr-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral md:hidden"
      >
        <span aria-hidden className="flex w-5 flex-col gap-1.25">
          <span className="h-[1.5px] w-full rounded-full bg-current" />
          <span className="h-[1.5px] w-full rounded-full bg-current" />
          <span className="h-[1.5px] w-3.5 rounded-full bg-current" />
        </span>
      </button>

      {mounted &&
        createPortal(
          <>
            <div
              aria-hidden
              onClick={close}
              className={`fixed inset-0 z-55 bg-ink/45 backdrop-blur-[2px] transition-opacity ease-out md:hidden ${
                open ? "opacity-100 duration-550" : "pointer-events-none opacity-0 duration-300"
              }`}
            />

            <div
              id="mobile-nav-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              // Not tabbable or read by screen readers while off-screen.
              inert={!open ? true : undefined}
              // Decelerates hard at the tail so the panel settles rather than stops dead.
              className={`fixed top-0 right-0 z-60 flex h-dvh w-[min(82vw,320px)] flex-col bg-paper shadow-[-18px_0_50px_-24px_rgba(34,30,26,0.6)] transition-transform ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
                open
                  ? "transform-[translateX(0)] duration-550"
                  : "transform-[translateX(100%)] duration-300"
              }`}
            >
              <div
                className={`flex items-center justify-end border-b border-border/60 px-6 py-3 ${reveal}`}
                style={revealDelay(0)}
              >
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className="h-4.5 w-4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  >
                    <path d="M5 5l10 10M15 5L5 15" />
                  </svg>
                </button>
              </div>

              <nav aria-label="Sections" className="flex flex-col px-3 py-4">
                {links.map((link, index) => (
                  <Link
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={close}
                    aria-current={activeId === link.id ? "page" : undefined}
                    style={revealDelay(index + 1)}
                    className={`rounded-xl px-3 py-3 font-display text-2xl ${reveal} ${
                      activeId === link.id
                        ? "text-coral-text"
                        : "text-ink hover:bg-ink/4"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div
                className={`mt-auto flex flex-col gap-4 border-t border-border/60 px-6 py-6 ${reveal}`}
                style={revealDelay(links.length + 1)}
              >
                <OpenStatusBadge className="inline-flex text-sm" />
                <a
                  href={business.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="inline-flex items-center justify-center rounded-full bg-coral px-6 py-3 text-sm font-semibold text-ink transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                >
                  Get directions
                </a>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {business.address.street}
                  <br />
                  {business.address.suburb} {business.address.state}{" "}
                  {business.address.postcode}
                </p>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
