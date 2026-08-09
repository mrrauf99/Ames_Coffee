type ArrowProps = {
  direction: "left" | "right";
  className?: string;
};

export function Arrow({ direction, className = "h-4 w-4" }: ArrowProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
      style={direction === "left" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
