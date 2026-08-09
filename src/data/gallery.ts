// Image manifest. All photos originate from ames coffee's public Google Maps listing
// (owner + customer uploads), so they carry a licensing caveat: swap `src` for
// owner-supplied originals when those become available.

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const heroImage: GalleryImage = {
  src: "/images/hero-storefront.jpg",
  alt: "ames coffee's black walk-up coffee window on McLennan Street, Albion, with the hand-painted rose sign overhead and Rooky the border collie sitting out front",
  width: 1200,
  height: 1600,
};

export const storyImage: GalleryImage = {
  src: "/images/interior-counter.jpg",
  alt: "Inside the ames coffee hatch, with plywood-lined shelving, an espresso machine and a barista pulling a shot",
  width: 1600,
  height: 1200,
};

export const visitImage: GalleryImage = {
  src: "/images/street-context.jpg",
  alt: "ames coffee viewed from across McLennan Street, with customers on stools out front and the Queenslander house next door",
  width: 900,
  height: 1600,
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/matcha-held.jpg",
    alt: "Iced matcha drink with strawberry cold foam, held up in front of the ames coffee window",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/latte-art.jpg",
    alt: "\"ames\" stencilled in cocoa on the foam of a flat white",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/outdoor-seating.jpg",
    alt: "Two ames coffee cups on the footpath table with the residential street behind",
    width: 1171,
    height: 1560,
  },
  {
    src: "/images/side-angle.jpg",
    alt: "Angled view of the ames coffee awning with warm string lights along the eave",
    width: 1600,
    height: 1200,
  },
  {
    src: "/images/closed-shutter.jpg",
    alt: "ames coffee's black shutter closed, with the rose-and-script sign above",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/latte-sticker.jpg",
    alt: "Iced coffee cup with the ames coffee circular dog-and-floral sticker",
    width: 1200,
    height: 1600,
  },
  {
    src: "/images/matcha-walk.jpg",
    alt: "Walking away from ames coffee with an iced matcha and a bamboo straw",
    width: 900,
    height: 1600,
  },
];
