"use client";

import { useEffect, useState } from "react";

type HeaderState = {
  /** True once the page has scrolled far enough for the bar to condense. */
  condensed: boolean;
  /** True only while neither the hero nor Visit (which have their own CTA) is on screen. */
  showCta: boolean;
};

export function useHeaderState(
  heroId: string,
  ctaSectionIds: string[]
): HeaderState {
  const [condensed, setCondensed] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [ctaSectionVisible, setCtaSectionVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setCondensed(window.scrollY > 32);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroId]);

  useEffect(() => {
    const elements = ctaSectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setCtaSectionVisible(visible.size > 0);
      },
      // Raising the root's bottom edge means a CTA section counts as "on screen"
      // only once it reaches the upper half of the viewport.
      { threshold: 0, rootMargin: "0px 0px -45% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ctaSectionIds]);

  return { condensed, showCta: !heroVisible && !ctaSectionVisible };
}
