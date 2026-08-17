import { business } from "@/data/business";
import { Rose } from "@/components/ui/Rose";

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-kiosk text-cream">
      <div className="relative mx-auto max-w-6xl px-6 pt-16 sm:px-8 lg:px-10">
        <div className="grid gap-10 pb-14 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="max-w-xs text-sm leading-relaxed text-cream/80">
              {business.tagline}. Open every day, from 6am until early
              afternoon.
            </p>
            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-2 text-xs font-semibold tracking-wide transition-colors hover:border-coral hover:text-coral"
            >
              ★ {business.rating.value.toFixed(1)} · {business.rating.count} reviews on
              Google
            </a>
          </div>

          <div className="text-sm text-cream/85">
            <p className="text-xs font-semibold tracking-[0.18em] text-periwinkle uppercase">
              Find us
            </p>
            <p className="mt-3">{business.address.street}</p>
            <p>
              {business.address.suburb} {business.address.state}{" "}
              {business.address.postcode}
            </p>
          </div>

          <div className="text-sm text-cream/85">
            <p className="text-xs font-semibold tracking-[0.18em] text-periwinkle uppercase">
              Hours
            </p>
            <ul className="mt-3 space-y-1.5">
              {business.hoursSummary.map((row) => (
                <li key={row.label} className="flex justify-between gap-4">
                  <span>{row.label}</span>
                  <span className="tabular-nums">{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The wordmark plays the part of the painted sign board: the last thing
            you see, at the size it is on the street. */}
        <div className="flex items-end justify-center gap-3 border-t border-cream/10 pt-10">
          <Rose className="mb-3 h-12 w-9 sm:h-20 sm:w-14" flipped />
          <span className="font-display text-[clamp(3rem,13vw,9rem)] leading-[0.85] font-normal italic">
            ames
          </span>
          <Rose className="mb-3 h-12 w-9 sm:h-20 sm:w-14" />
        </div>
      </div>

      <div className="relative mt-8 border-t border-cream/10 px-6 py-4 text-center text-xs text-cream/60 sm:px-8 lg:px-10">
        <p>
          © {new Date().getFullYear()} {business.name}. Made on McLennan
          Street, Albion.
        </p>
        <p className="mt-1.5 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1">
          <span>Site by Abdul Rauf</span>
          <span aria-hidden className="text-cream/30">
            ·
          </span>
          <a
            href="mailto:itxrauf99@gmail.com"
            className="underline decoration-cream/25 underline-offset-2 transition-colors hover:text-coral hover:decoration-coral"
          >
            Email
          </a>
          <span aria-hidden className="text-cream/30">
            ·
          </span>
          <a
            href="https://wa.me/923276428640"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-cream/25 underline-offset-2 transition-colors hover:text-coral hover:decoration-coral"
          >
            WhatsApp
          </a>
        </p>
      </div>
    </footer>
  );
}
