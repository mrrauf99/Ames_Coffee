// The rose-and-stem motif traced from the hand-painted sign above the hatch and
// the header of the shop's own printed menu artwork.
// It is the one piece of ames' own drawing the site reuses, so it earns its
// place as a marker rather than as decoration: it appears where the page is
// standing in for something physical (the board, the sign, the footer plate).

type RoseProps = {
  className?: string;
  /** Mirrors the stem so a pair can flank a heading the way the sign does. */
  flipped?: boolean;
  /**
   * "bloom" drops the stem and leaves and draws the flower head alone. Below
   * roughly 20px the full drawing collapses into an indistinct coral smudge,
   * so anywhere small (the ticker separators) gets the rosette instead.
   */
  variant?: "full" | "bloom";
};

export function Rose({
  className = "h-8 w-8",
  flipped = false,
  variant = "full",
}: RoseProps) {
  if (variant === "bloom") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx="12"
            cy="6.4"
            rx="4.4"
            ry="5.2"
            fill="var(--color-coral)"
            transform={`rotate(${angle} 12 12)`}
          />
        ))}
        <circle cx="12" cy="12" r="3.1" fill="var(--color-coral-dark)" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 48 64"
      fill="none"
      aria-hidden
      className={className}
      style={flipped ? { transform: "scaleX(-1)" } : undefined}
    >
      {/* stem */}
      <path
        d="M24 20c0 12-1.5 24-5 40"
        stroke="var(--color-sage)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* leaves */}
      <path
        d="M22.5 34c-6-1.5-10.5-5-12-10.5 6-1 11 1.5 13.5 6.5"
        fill="var(--color-sage)"
        opacity="0.85"
      />
      <path
        d="M22 47c5-2 8.5-6 9.5-11.5-5.5.5-9.5 3.5-11 8.5"
        fill="var(--color-sage)"
        opacity="0.85"
      />
      {/* bloom */}
      <path
        d="M24 3c7.2 0 12 4.6 12 10.4C36 19.6 30.7 24 24 24s-12-4.4-12-10.6C12 7.6 16.8 3 24 3Z"
        fill="var(--color-coral)"
      />
      <path
        d="M18.5 12.5c1.4-3 3.4-4.6 6-4.6 2.4 0 4.3 1.4 5.6 4.1-1.3 2.6-3.2 3.9-5.6 3.9-2.6 0-4.6-1.3-6-3.4Z"
        fill="var(--color-coral-dark)"
        opacity="0.55"
      />
      <path
        d="M21 19.5c1.6-1.4 3.8-1.4 5.8 0"
        stroke="var(--color-coral-dark)"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
