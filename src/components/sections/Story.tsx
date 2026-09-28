import { business } from "@/data/business";
import { storyImage } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FadeImage } from "@/components/ui/FadeImage";

export function Story() {
  return (
    <section id="story" className="bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:px-8 md:py-32 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:px-10">
        <Reveal
          variant="curtain"
          className="relative aspect-4/3 overflow-hidden rounded-4xl shadow-[0_30px_60px_-35px_rgba(34,30,26,0.5)] ring-1 ring-ink/6 sm:rounded-[2.5rem] lg:aspect-5/4"
        >
          <FadeImage
            src={storyImage.src}
            alt={storyImage.alt}
            fill
            placeholder="blur"
            blurDataURL={storyImage.blurDataURL}
            sizes="(min-width: 1024px) 55vw, 92vw"
            className="object-cover"
          />
        </Reveal>

        <div>
          <SectionHeading title="One window, a few hours a day." />
          <Reveal
            delay={100}
            className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-text-secondary"
          >
            <p>
              ames coffee isn&apos;t a café you sit down in. It&apos;s one black
              serving hatch on the corner of McLennan Street, open from 6am
              until early afternoon. A plywood counter, a couple of stools on
              the footpath, and a queue of regulars who already know what
              they&apos;re ordering.
            </p>
            <p>
              The drinks skip the syrupy shortcuts. First-harvest Japanese
              matcha whisked to order, dark roast cold brew, real fruit purée.
              {" "}
              {business.dog.name} the border collie runs the footpath out front.
            </p>
            <p>
              {business.rating.displayCount} reviews on Google, and every one of them
              is five stars.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
