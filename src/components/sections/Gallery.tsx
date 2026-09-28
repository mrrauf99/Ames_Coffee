"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { galleryImages } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FadeImage } from "@/components/ui/FadeImage";
import { Arrow } from "@/components/ui/Arrow";

// The arrows sit over the rail itself, centred on the slides, so the control is
// where the photo is rather than parked underneath it.
const arrowButton =
  "absolute top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-cream shadow-[0_12px_28px_-10px_rgba(34,30,26,0.85)] backdrop-blur-sm transition-all duration-200 ease-out hover:scale-105 hover:bg-coral focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral sm:h-14 sm:w-14";

export function Gallery() {
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 2500,
      // false so a click/drag/hover only pauses the loop, not kills it for good.
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [autoplay],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      autoplay.stop();
      // oxlint-disable-next-line react/set-state-in-effect
      setIsPlaying(false);
    }

    // emblaApi isn't available during render, so sync selectedIndex here.
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect, autoplay]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // stopOnMouseEnter only reaches mouse users; this gives keyboard and touch
  // visitors an explicit, persistent way to stop the auto-advance (WCAG 2.2.2).
  const toggleAutoplay = useCallback(() => {
    if (autoplay.isPlaying()) {
      autoplay.stop();
      setIsPlaying(false);
    } else {
      autoplay.play();
      setIsPlaying(true);
    }
  }, [autoplay]);

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowLeft") scrollPrev();
    if (event.key === "ArrowRight") scrollNext();
  }

  const progress = ((selectedIndex + 1) / galleryImages.length) * 100;

  return (
    <section id="gallery" className="bg-sand/50">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 md:py-32 lg:px-10">
        <SectionHeading title="A few frames from the window" align="center" />

        {/* Shorter than the 900ms default — these photos are usually already loaded by the time this scrolls into view. */}
        <Reveal delay={100} duration={400} className="mt-12">
          <div
            className="rounded-3xl outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="ames coffee photo gallery"
            onKeyDown={handleKeyDown}
          >
            <div className="relative">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous photo"
                className={`${arrowButton} left-1 sm:left-3`}
              >
                <Arrow direction="left" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next photo"
                className={`${arrowButton} right-1 sm:right-3`}
              >
                <Arrow direction="right" className="h-5 w-5" />
              </button>

              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex cursor-grab touch-pan-y active:cursor-grabbing">
                  {galleryImages.map((image, index) => (
                    <div
                      key={image.src}
                      className="min-w-0 shrink-0 grow-0 basis-[78%] px-2 sm:basis-[55%] lg:basis-[42%]"
                    >
                      <div
                        className={`relative aspect-4/5 overflow-hidden rounded-3xl ring-1 ring-ink/6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:rounded-4xl ${
                          index === selectedIndex
                            ? "scale-100 opacity-100 shadow-[0_30px_60px_-32px_rgba(34,30,26,0.55)]"
                            : "scale-[0.94] opacity-45"
                        }`}
                      >
                        <FadeImage
                          src={image.src}
                          alt={image.alt}
                          fill
                          loading="lazy"
                          placeholder="blur"
                          blurDataURL={image.blurDataURL}
                          sizes="(min-width: 1024px) 42vw, (min-width: 640px) 55vw, 78vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={toggleAutoplay}
                aria-pressed={isPlaying}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
              >
                {isPlaying ? (
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                  >
                    <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
                    <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
                  </svg>
                ) : (
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                  >
                    <path d="M4 2.5v11l10-5.5-10-5.5Z" />
                  </svg>
                )}
              </button>
              <div className="h-px w-24 bg-border sm:w-32">
                <div
                  className="h-px bg-coral transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm tabular-nums text-text-secondary">
                {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                {String(galleryImages.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
