import { business } from "@/data/business";
import { Rose } from "@/components/ui/Rose";

// Short, checkable facts, run as a ticker since they're equal-weight, not a ranked list.
const facts = [
  `${business.rating.displayCount} reviews on Google, all five stars`,
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
      tabIndex={0}
      aria-label="What to know about ames coffee, auto-scrolling — focus to pause"
      className="marquee overflow-hidden border-y border-border/70 bg-sand/60 py-3.5 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-coral"
    >
      <div className="marquee-track flex w-max">
        <Row />
        {/* Duplicate copy so the translateX(-50%) loop has no visible seam. */}
        <Row hidden />
      </div>
    </section>
  );
}
