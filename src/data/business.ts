// Single source of truth for verified business facts.
// Everything here is taken directly from the live Google Maps listing for
// "ames coffee" (checked 2026-08-10).
// Do not add anything here that hasn't been verified against that listing or supplied by the owner.

export const business = {
  name: "ames coffee",
  legalDisplayName: "ames coffee",
  tagline: "A little coffee window on McLennan Street",
  category: "Coffee shop",

  address: {
    street: "63 McLennan St",
    suburb: "Albion",
    state: "QLD",
    postcode: "4010",
    country: "Australia",
    countryCode: "AU",
    full: "63 McLennan St, Albion QLD 4010, Australia",
    plusCode: "H2FQ+M4 Albion, Queensland, Australia",
  },

  geo: {
    lat: -27.4258202,
    lng: 153.0378614,
  },

  phone: {
    display: "+61 401 663 924",
    tel: "+61401663924",
  },

  googleMapsUrl:
    "https://www.google.com/maps/place/ames+coffee/@-27.4258202,153.0378614,17z/data=!4m6!3m5!1s0x6b9159dd5fb68f85:0xae2609d04e772b0e!8m2!3d-27.4258202!4d153.0378614",

  rating: {
    value: 5.0,
    count: 45,
  },

  priceRange: "$1–20",

  // Per-day hours, verified directly from the Maps "Hours" table.
  hours: [
    { day: "Monday", opens: "06:00", closes: "12:00" },
    { day: "Tuesday", opens: "06:00", closes: "13:00" },
    { day: "Wednesday", opens: "06:00", closes: "13:00" },
    { day: "Thursday", opens: "06:00", closes: "13:00" },
    { day: "Friday", opens: "06:00", closes: "13:00" },
    { day: "Saturday", opens: "07:00", closes: "12:00" },
    { day: "Sunday", opens: "07:00", closes: "12:00" },
  ] as const,

  hoursSummary: [
    { label: "Mon", value: "6:00am – 12:00pm" },
    { label: "Tue – Fri", value: "6:00am – 1:00pm" },
    { label: "Sat – Sun", value: "7:00am – 12:00pm" },
  ],

  amenities: {
    serviceOptions: ["Takeaway", "Walk-up window"],
    seating: "A handful of stools right outside the window, and no indoor seating",
    accessibility: ["Wheelchair accessible entrance", "Wheelchair accessible parking lot"],
    payments: ["Credit card", "Debit card", "Tap to pay"],
    parking: ["Free parking lot", "Free street parking", "Usually plenty of parking"],
    dogFriendly: true,
    kidFriendly: true,
  },

  dog: {
    name: "Rooky",
    description: "the black-and-white border collie who unofficially runs the front of house",
  },
} as const;

export type Business = typeof business;
