// Transcribed verbatim from ames coffee's own printed menu artwork.
// Prices and descriptions follow what is printed. Do not round, rename, or invent items.

export type MenuPrice = { size?: string; price: string };

export type MenuItem = {
  name: string;
  description?: string;
  prices: MenuPrice[];
  tags?: string[];
};

export type MenuGroup = {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
};

export const menuGroups: MenuGroup[] = [
  {
    id: "coffee",
    title: "Coffee",
    items: [
      {
        name: "Single espresso",
        prices: [{ price: "$3.50" }],
      },
      {
        name: "Double espresso",
        prices: [{ price: "$4.00" }],
      },
      {
        name: "Piccolo",
        prices: [{ price: "$4.50" }],
      },
      {
        name: "Small",
        description: "1 shot",
        prices: [{ price: "$5.00" }],
      },
      {
        name: "Medium",
        description: "2 shot",
        prices: [{ price: "$5.50" }],
      },
      {
        name: "Large",
        description: "2 shot",
        prices: [{ price: "$6.00" }],
      },
    ],
  },
  {
    id: "iced",
    title: "Iced drinks",
    items: [
      {
        name: "Iced latte / mocha",
        prices: [
          { size: "reg", price: "$6.50" },
          { size: "lrg", price: "$7.00" },
        ],
      },
      {
        name: "Iced long black",
        prices: [
          { size: "reg", price: "$6.00" },
          { size: "lrg", price: "$6.50" },
        ],
      },
    ],
  },
  {
    id: "signature",
    title: "Signature drinks",
    items: [
      {
        name: "Iced matcha",
        description:
          "Highest quality Japanese OUS Miyabi first harvest matcha, with your choice of milk + sweetener. Small is 5 grams of matcha, large is 6 grams.",
        prices: [
          { size: "sm", price: "$8.00" },
          { size: "lrg", price: "$8.50" },
        ],
      },
      {
        name: "Lil angel",
        description: "Iced matcha with strawberry purée & strawberry cold foam.",
        prices: [
          { size: "sm", price: "$8.50" },
          { size: "lrg", price: "$9.00" },
        ],
      },
      {
        name: "PWC",
        description: "Dark roast cold brew with pistachio white choc cold foam.",
        prices: [
          { size: "sm", price: "$8.50" },
          { size: "lrg", price: "$9.00" },
        ],
      },
    ],
  },
  {
    id: "juices",
    title: "Seasonal juices",
    note: "$7 each",
    items: [
      { name: "Pineapple", prices: [{ price: "$7" }] },
      { name: "Watermelon, chilli, mint", prices: [{ price: "$7" }] },
      { name: "Apple", prices: [{ price: "$7" }] },
      { name: "Orange", prices: [{ price: "$7" }] },
    ],
  },
];

export const winterAddOns = {
  price: "$2.00",
  items: [
    "Gingerbread syrup",
    "Butterscotch syrup",
    "Pistachio white choc cold foam (VG)",
    "Butterscotch cold foam (VG)",
    "Strawberry cold foam (VG)",
  ],
};

export const menuFootnotes = [
  "Extra shot +50c",
  "No charge for alt milk or standard syrups",
];
