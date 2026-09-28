// Photos originate from ames coffee's public Google Maps listing (owner +
// customer uploads); swap `src` for owner-supplied originals when available.

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Tiny base64 preview shown via next/image's blur placeholder while the real file loads. */
  blurDataURL: string;
};

export const heroImage: GalleryImage = {
  src: "/images/hero-storefront.jpg",
  alt: "ames coffee's black walk-up coffee window on McLennan Street, Albion, with the hand-painted rose sign overhead and Rooky the border collie sitting out front",
  width: 1200,
  height: 1600,
  blurDataURL:
    "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAABgABAgMF/8QAJBAAAgIBAgcAAwAAAAAAAAAAAQIAAxEEMQUSIUFRkdETksH/xAAVAQEBAAAAAAAAAAAAAAAAAAACAP/EABYRAQEBAAAAAAAAAAAAAAAAAAASEf/aAAwDAQACEQMRAD8AQm6hlDBjg+UPyc2eo7Mf1PyEbNfxTTmlTe4V0DIowenbtOT8Z4lWcNqXQ56cwHyKsGNMVCtkgn0RKFquMaply1tjHyGx/JRWMvGNtgbKF8AdszN51FblLA/MNwRneKuVWzlR6mqorBWYAkiAx+rDJlAAM+JRGKa9/wAa9d+koZT/2Q==",
};

export const storyImage: GalleryImage = {
  src: "/images/interior-counter.jpg",
  alt: "Inside the ames coffee hatch, with plywood-lined shelving, an espresso machine and a barista pulling a shot",
  width: 1600,
  height: 1200,
  blurDataURL:
    "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAMEAQL/xAAiEAACAgIBAwUAAAAAAAAAAAABAgADESESBBNRFDFBYXH/xAAUAQEAAAAAAAAAAAAAAAAAAAAC/8QAFxEAAwEAAAAAAAAAAAAAAAAAAAERMf/aAAwDAQACEQMRAD8Ahsrra9lxxUH7nJoqFmFZmB8HYP5Hqi33d1uRDMWZM6Jzrcbb0tVyMBSqOTkOuiIXbo6phIayMAch5BEJqV+nXtg+3yYRqwD0/9k=",
};

export const visitImage: GalleryImage = {
  src: "/images/street-context.jpg",
  alt: "ames coffee viewed from across McLennan Street, with customers on stools out front and the Queenslander house next door",
  width: 900,
  height: 1600,
  blurDataURL:
    "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAkABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAEDBAUC/8QAKBAAAgIABQIFBQAAAAAAAAAAAQIAAwQFERIxIVEGExUiYUGBkaHh/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAEFAwT/xAAaEQEBAAIDAAAAAAAAAAAAAAAAARESAhNR/9oADAMBAAIRAxEAPwC5lngr8Ta1JlZqlSconMu0xNPlHsYjyMudiszfA2LTXuZWXcT09o+CZVhs7vsuShNwazoGt2kD8Ca/SVZXF191ocaHUcj6CQcooNgsdnZgANTqOOOOwk3eu7SIHiCqsslorLKdNRr1/USp8hwjuWZ7QT2P8iPel1zx1JERM2ifvERAn//Z",
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/matcha-held.jpg",
    alt: "Iced matcha drink with strawberry cold foam, held up in front of the ames coffee window",
    width: 1200,
    height: 1600,
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUCBAYD/8QALhAAAgEDAgMFCAMAAAAAAAAAAQIDAAQRBSESMUETIlFSYQYUIzJCcYGRobHB/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAIDBP/EABsRAAIDAQEBAAAAAAAAAAAAAAABAhESIQNS/9oADAMBAAIRAxEAPwDPRQT3U3ZQIXbn4YHrU7iwu7QBriFlTzDcfsU19n7dlvZbgZCL8Nd+ZO/9D+aZa1cOlosEaIzXJ4OLnhfHHWk2kNXBJDq93HGFDqQOWUFFdPd4Ye5JJDGw+lz3vzjlRUNL5EHkaW1lpqAzdkqnPGTvxf79qz1xd3WpaskUJaLGVDH5gOp25bDpTHUycQDoznORUdLANtKxA4u0xnrjaj0lhOil2kizDp1pHGFWFXHmcZLetFXIlHANqKyqM5K9E2+n/9k=",
  },
  {
    src: "/images/latte-art.jpg",
    alt: "\"ames\" stencilled in cocoa on the foam of a flat white",
    width: 1200,
    height: 1600,
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAMEBQb/xAAkEAACAgICAgAHAAAAAAAAAAABAgADBBESMQUhEzJBQlFxgf/EABcBAQEBAQAAAAAAAAAAAAAAAAEDAgT/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQIRIf/aAAwDAQACEQMRAD8Ax6/GWWME5AsfooJlLeEtors+JyCuui3Dqa/janFDW1sFt3oEjepZVmHYry6zW59b1tW3+JGNc62VrE8SOfqK46CtfajrcIzMpFWVagBIVvUJzuFvS6rnCrGzDiMdryQ9iPbzNVi8a6mJ39w6Mz7+v7FV/MP3NxblYFQm9KyrWEuwJJOzCUVe0EI4J//Z",
  },
  {
    src: "/images/outdoor-seating.jpg",
    alt: "Two ames coffee cups on the footpath table with the residential street behind",
    width: 1171,
    height: 1560,
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbABQDASIAAhEBAxEB/8QAGQAAAwADAAAAAAAAAAAAAAAAAAEFAgME/8QAJxAAAgEDAgUEAwAAAAAAAAAAAQIDABEhBBIFFCIxsRNBQmFxguH/xAAWAQEBAQAAAAAAAAAAAAAAAAACAQT/xAAdEQACAgEFAAAAAAAAAAAAAAAAAQIRIQMSE1Gh/9oADAMBAAIRAxEAPwCeZLRdMfUCpFlwDinLq9fIV2QWFshb5/NUJQOVIMY3EhSL5wf5TkiSEKXhhEbG3bdf6qRk6asMoXmibzPGAAEjVR7CwPk0VVSaELmFf1jNvFFJSaxfoONdCc7iiOGkAYm8YIJxVHSxrDGfW3ktmwBFq2aCaR1YM2B2sAK6zQUUaHqNx2kHXztFqmWKRglgQCfqisuNKOcXHwHk0VaQLP/Z",
  },
  {
    src: "/images/latte-sticker.jpg",
    alt: "Iced coffee cup with the ames coffee circular dog-and-floral sticker",
    width: 1200,
    height: 1600,
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAIDBQYE/8QAJRAAAgIBAwMEAwAAAAAAAAAAAQIAAxEEBSESEzEUMkFxQlGR/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgEA/8QAGBEBAQEBAQAAAAAAAAAAAAAAAAERAhL/2gAMAwEAAhEDEQA/AKynaNXcQOlayfhzg/yPdsuo0+lstsZMr+IOePuX9uoPfUaepR1HDWNyZHvOjb0bpW5ayxxkvxwP1B6O8yMcSc+YTsfa7lbDFQYS7AartRrAbMdZyB4kkU+5oC0gRccgH7EI6niEyP/Z",
  },
  {
    src: "/images/matcha-walk.jpg",
    alt: "Walking away from ames coffee with an iced matcha and a bamboo straw",
    width: 900,
    height: 1600,
    blurDataURL:
      "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAkABQDASIAAhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAAAAIDAQQF/8QAIhAAAgIABgMBAQAAAAAAAAAAAQIAAwUREiExUQQTQSLR/8QAFwEBAQEBAAAAAAAAAAAAAAAAAQACA//EABkRAQEBAAMAAAAAAAAAAAAAAAABESExQf/aAAwDAQACEQMRAD8A5lHpbEKNa6g7AFTx1JhxsKxofjIHYzrPhFSOtdQy9ZUl9ObEjfn+SN2HJShuFg52DbHect5FnjPiVVLQBYupu4k6wAgiONZFfj4w2IXAUqEUr+sxvn1LMRLEprIzJ+DLgdTS8etfHCBBsvybFlhuZSQFC8CHd07amjIFH6iFUZfImipIHHUyvMRJLwchwIiJJ//Z",
  },
];
