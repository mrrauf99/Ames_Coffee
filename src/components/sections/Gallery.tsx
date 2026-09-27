"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { galleryImages } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Arrow } from "@/components/ui/Arrow";

// The arrows sit over the rail itself, centred on the slides, so the control is
// where the photo is rather than parked underneath it.
const arrowButton =
  "absolute top-1/2 z-10 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/80 text-cream shadow-[0_12px_28px_-10px_rgba(34,30,26,0.85)] backdrop-blur-sm transition-all duration-200 ease-out hover:scale-105 hover:bg-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral sm:h-14 sm:w-14";

export function Gallery() {
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 2500,
      // false so a click/drag/hover only pauses the loop, not kills it for good.
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      rootNode: (emblaRoot) => emblaRoot.parentElement,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [autoplay]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      autoplay.stop();
    }

    // emblaApi isn't available during render, so sync selectedIndex here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowLeft") scrollPrev();
    if (event.key === "ArrowRight") scrollNext();
  }

  const progress = ((selectedIndex + 1) / galleryImages.length) * 100;

  return (
    <section id="gallery" className="bg-sand/50">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 md:py-32 lg:px-10">
        <SectionHeading title="A few frames from the window" align="center" />

        <Reveal delay={100} className="mt-12">
          <div
            className="rounded-3xl outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
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
                        className={`relative aspect-[4/5] overflow-hidden rounded-[1.5rem] ring-1 ring-ink/[0.06] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:rounded-[2rem] ${
                          index === selectedIndex
                            ? "scale-100 opacity-100 shadow-[0_30px_60px_-32px_rgba(34,30,26,0.55)]"
                            : "scale-[0.94] opacity-45"
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          loading={index === 0 ? "eager" : "lazy"}
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
