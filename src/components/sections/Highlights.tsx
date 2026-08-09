import { business } from "@/data/business";
import { Rose } from "@/components/ui/Rose";

// Short, checkable facts about the shop. They run as a ticker because they are
// a loop of equal-weight details, not a ranked list — nothing here is the
// headline, so nothing gets to sit still and claim to be one.
const facts = [
  `${business.rating.count} reviews on Google, all five stars`,
  "First-harvest Japanese matcha, whisked to order",
  `${business.dog.name} is usually out front`,
  "Open every day from 6am",
  "Free parking, street and lot",
  "No charge for alt milk",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {facts.map((fact) => (
        <span key={fact} className="flex shrink-0 items-center gap-6 pr-6">
          <span className="whitespace-nowrap text-sm text-ink/80">{fact}</span>
          <Rose variant="bloom" className="h-3.5 w-3.5 shrink-0" />
        </span>
      ))}
    </div>
  );
}

export function Highlights() {
  return (
    <section
      aria-label="What to know about ames coffee"
      className="marquee overflow-hidden border-y border-border/70 bg-sand/60 py-3.5"
    >
      <div className="marquee-track flex w-max">
        <Row />
        {/* Duplicate copy so the translateX(-50%) loop has no visible seam. */}
        <Row hidden />
      </div>
    </section>
  );
}
