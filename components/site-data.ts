// AUTO-GENERATED FILE — DO NOT EDIT BY HAND.
// Run `npm run generate:products` to regenerate.
// Source: Documentation/Product Matrix.xlsx + Documentation/product-details.json
//
// Generated: 2026-04-30T21:39:12.642Z

export type ProductFlags = {
  gifts: boolean;
  premium: boolean;
  camera: boolean;
  internetAccess: boolean;
  affiliateAgreement: boolean;
};

export type Product = {
  slug: string;
  name: string;
  manufacturer: string;
  type: "Interactive" | "AI & Robotic" | string;
  bestFor: string[];
  blurb: string;
  price: string;
  rating?: number;
  features: string[];
  highlight: string;
  productUrl: string;
  imageUrl?: string;
  flags: ProductFlags;
};

export const products: Product[] = [
  {
    "slug": "ebo-air-2-plus",
    "name": "EBO Air 2 Plus",
    "manufacturer": "Enabot",
    "type": "AI & Robotic",
    "bestFor": [
      "Families",
      "Children"
    ],
    "blurb": "A mobile AI robot companion with a 3K camera, two-way video, ChatGPT-powered chat mode, and auto-recharge. Patrols your home and engages with family.",
    "price": "$349.00",
    "rating": 4.2,
    "features": [
      "3K camera + night vision",
      "AI chat (ChatGPT)",
      "Auto-recharge dock"
    ],
    "highlight": "Smartest family robot",
    "productUrl": "EBO Air 2 Plus FamilyBot – Live Video & App Control",
    "imageUrl": "/images/products/interactive_pet_toys.png",
    "flags": {
      "gifts": true,
      "premium": true,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "metacat",
    "name": "metaCat",
    "manufacturer": "Elephant Robotics",
    "type": "Interactive",
    "bestFor": [
      "Seniors",
      "Children"
    ],
    "blurb": "An AI-powered companion cat with LED-screen eyes, 29 voice commands, and Type-C charging. Up to 10 hours of playtime per charge.",
    "price": "$159.00",
    "rating": 4.3,
    "features": [
      "29 voice commands",
      "LED expressive eyes",
      "USB-C rechargeable"
    ],
    "highlight": "Best rechargeable option",
    "productUrl": "Not Currently Available in the US",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "matecat-pro",
    "name": "MateCat Pro",
    "manufacturer": "Chongker",
    "type": "Interactive",
    "bestFor": [
      "Seniors",
      "Children"
    ],
    "blurb": "A hyper-realistic robotic cat with voice wake-up, blinking, purring, and tail movement. Responds to custom voice commands like \"Love U\" or \"Good night\".",
    "price": "$119.00",
    "rating": 4.4,
    "features": [
      "Voice wake-up",
      "Blinking & ear movement",
      "Handcrafted fur"
    ],
    "highlight": "Most lifelike under $150",
    "productUrl": "https://chongker.com/products/matecat-pro-hyper-realistic-bionic-cat",
    "imageUrl": "/images/products/Sweetie-Cat.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  }
];

export const faqs = [
  { q: "What is the difference between interactive pets and AI & robotic pets?", a: "Interactive pets usually focus on comfort, touch response, and simple engagement. AI & robotic pets generally add movement, sensors, or more advanced behavior." },
  { q: "Are smart pets good for seniors?", a: "Many buyers choose them for companionship and low maintenance. The best fit depends on comfort needs, ease of use, and how much technology the user wants." },
  { q: "Do these products need Wi-Fi?", a: "Some advanced models may use apps or connectivity, but many simpler interactive companion products do not." },
  { q: "Are these a good gift?", a: "Yes. Buyers often choose them for holidays, birthdays, or thoughtful gifts for parents and grandparents." }
];
