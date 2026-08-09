import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "@/components/ui/Arrow";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
  /** Adds a trailing arrow that slides forward on hover. */
  withArrow?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "solid",
  external = false,
  withArrow = false,
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral";

  const variantStyles = {
    solid:
      "bg-coral text-cream shadow-[0_1px_2px_rgba(34,30,26,0.16)] hover:bg-coral-dark hover:shadow-[0_8px_20px_-6px_rgba(200,86,58,0.55)]",
    outline:
      "border border-ink/20 text-ink hover:border-ink/45 hover:bg-ink/[0.04] hover:shadow-[0_8px_20px_-10px_rgba(34,30,26,0.4)]",
  } as const;

  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link href={href} className={`${base} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
      {withArrow && (
        <Arrow
          direction="right"
          className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}
