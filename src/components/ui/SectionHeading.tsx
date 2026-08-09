import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "ink" | "cream";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "ink",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  const titleColor = tone === "cream" ? "text-cream" : "text-ink";
  const descriptionColor = tone === "cream" ? "text-cream/75" : "text-text-secondary";

  return (
    <Reveal className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 font-display text-lg italic leading-none ${
            tone === "cream" ? "text-periwinkle" : "text-coral"
          }`}
        >
          <span
            aria-hidden
            className={`h-px w-6 ${tone === "cream" ? "bg-periwinkle/50" : "bg-coral/40"}`}
          />
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-display text-[clamp(1.85rem,3.6vw,2.75rem)] font-medium leading-[1.12] ${titleColor}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`max-w-xl text-base leading-relaxed ${descriptionColor}`}>{description}</p>
      )}
    </Reveal>
  );
}
