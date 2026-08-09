import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { business } from "@/data/business";
import "./globals.css";

// Loaded as a variable font so the SOFT and WONK axes stay adjustable in CSS —
// see .font-display in globals.css for why those axes matter here.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// TODO: replace with the confirmed production domain once purchased.
// This is a working placeholder, not a live URL.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amescoffee.com.au";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: business.name,
    template: `%s | ${business.name}`,
  },
  description:
    "ames coffee is a walk-up coffee window on McLennan St, Albion. Rated 5.0★ from 45 reviews. Espresso, Japanese matcha and seasonal juice, open every day from 6am.",
  keywords: [
    "coffee Albion",
    "coffee shop Albion Brisbane",
    "specialty coffee McLennan Street",
    "matcha Albion Brisbane",
    "best coffee Albion QLD",
  ],
  openGraph: {
    title: `${business.name} | Specialty Coffee & Matcha in Albion, Brisbane`,
    description:
      "A walk-up coffee window on McLennan St, Albion. Rated 5.0★ from 45 reviews. Espresso, Japanese matcha and seasonal juice, open every day from 6am.",
    url: SITE_URL,
    siteName: business.name,
    images: [{ url: "/images/hero-storefront.jpg", width: 1200, height: 1600 }],
    locale: "en_AU",
    type: "website",
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: business.name,
  image: `${SITE_URL}/images/hero-storefront.jpg`,
  telephone: business.phone.tel,
  priceRange: business.priceRange,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.suburb,
    addressRegion: business.address.state,
    postalCode: business.address.postcode,
    addressCountry: business.address.countryCode,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: business.geo.lat,
    longitude: business.geo.lng,
  },
  url: SITE_URL,
  hasMap: business.googleMapsUrl,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: business.rating.value,
    reviewCount: business.rating.count,
  },
  openingHoursSpecification: business.hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: `https://schema.org/${h.day}`,
    opens: h.opens,
    closes: h.closes,
  })),
  servesCuisine: ["Coffee", "Matcha"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <script
          type="application/ld+json"
          // Static, developer-authored schema data only (never user input).
          // The "<" escape below guards against "</script>" breaking out of the tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
