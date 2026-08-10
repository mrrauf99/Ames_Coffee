import Image from "next/image";
import { business } from "@/data/business";
import { visitImage } from "@/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { OpenStatusBadge } from "@/components/ui/OpenStatusBadge";

const mapEmbedSrc = `https://www.google.com/maps?q=${business.geo.lat},${business.geo.lng}&z=17&output=embed`;

const goodToKnow = [
  business.amenities.seating,
  "Free street parking and a free lot, usually with room to spare",
  "Wheelchair accessible entrance and parking",
  "Dogs and kids welcome",
];

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-paper p-6">
      <p className="text-xs font-semibold tracking-[0.18em] text-denim uppercase">
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function Visit() {
  return (
    <section id="visit" className="bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 md:py-32 lg:px-10">
        <SectionHeading
          eyebrow="Visit us"
          title="Find the window."
          description="On the corner of McLennan Street in Albion. Look for the black hatch with the roses painted above it."
        />

        {/* items-stretch + h-full lets the storefront photo run the full height of
            the card stack beside it, so the column doesn't end 200px short. */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-stretch">
          <Reveal
            variant="curtain"
            className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-35px_rgba(34,30,26,0.5)] ring-1 ring-ink/[0.06] sm:rounded-[2.5rem] lg:aspect-auto lg:h-full"
          >
            <Image
              src={visitImage.src}
              alt={visitImage.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 92vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={120} className="flex flex-col gap-6">
            <Card title="Address">
              <p className="text-ink">{business.address.full}</p>
              <Button
                href={business.googleMapsUrl}
                external
                withArrow
                className="mt-5"
              >
                Get directions
              </Button>
            </Card>

            <Card title="Hours">
              <ul className="space-y-1.5 text-text-secondary">
                {business.hoursSummary.map((row) => (
                  <li key={row.label} className="flex justify-between gap-4">
                    <span className="text-ink">{row.label}</span>
                    <span className="tabular-nums">{row.value}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-border/70 pt-3 text-sm">
                <OpenStatusBadge />
              </div>
            </Card>

            <Card title="Good to know">
              <ul className="space-y-2 text-sm text-text-secondary">
                {goodToKnow.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-coral" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>

            <div className="overflow-hidden rounded-2xl border border-border/70">
              <iframe
                title={`Map showing ${business.name} at ${business.address.full}`}
                src={mapEmbedSrc}
                className="h-64 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
