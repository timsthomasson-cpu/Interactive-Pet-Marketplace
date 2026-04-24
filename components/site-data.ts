export type Product = {
  slug: string;
  name: string;
  manufacturer: string;
  type: "Interactive" | "AI & Robotic";
  bestFor: string[];
  blurb: string;
  price: string;
  rating?: number;
  features: string[];
  highlight: string;
  productUrl: string;
  imageUrl?: string;
};

export const products: Product[] = [
  {
    slug: "joy-for-all-pup",
    name: "Companion Pet Pup",
    manufacturer: "Joy for All",
    type: "Interactive",
    bestFor: ["Seniors", "Children"],
    blurb: "A lifelike animatronic puppy with soft fur, BarkBack technology, and a soothing heartbeat. Designed with feedback from caregivers to bring comfort to older adults.",
    price: "$179.99",
    rating: 4.5,
    features: ["BarkBack voice response", "Heartbeat sensation", "Soft hypoallergenic fur"],
    highlight: "Award-winning senior companion",
    productUrl: "https://joyforall.com/products/companion-pet-pup",
    imageUrl: "/images/products/Mr-Dog.png"
  },
  {
    slug: "joy-for-all-cat",
    name: "Companion Pet Cat",
    manufacturer: "Joy for All",
    type: "Interactive",
    bestFor: ["Seniors", "Children"],
    blurb: "An animatronic cat that purrs, meows, and rolls over for tummy scratches. Studies show it reduces feelings of loneliness and dementia-related agitation.",
    price: "$159.99",
    rating: 4.5,
    features: ["VibraPurr technology", "Motion sensors", "Multiple colors"],
    highlight: "Best for dementia comfort",
    productUrl: "https://joyforall.com/products/companion-cats",
    imageUrl: "/images/products/Sweetie-Cat.png"
  },
  {
    slug: "chongker-matecat-pro",
    name: "MateCat Pro",
    manufacturer: "Chongker",
    type: "Interactive",
    bestFor: ["Seniors", "Children"],
    blurb: "A hyper-realistic robotic cat with voice wake-up, blinking, purring, and tail movement. Responds to custom voice commands like \"Love U\" or \"Good night\".",
    price: "$119.00",
    rating: 4.4,
    features: ["Voice wake-up", "Blinking & ear movement", "Handcrafted fur"],
    highlight: "Most lifelike under $150",
    productUrl: "https://chongker.com/products/matecat-pro-hyper-realistic-bionic-cat",
    imageUrl: "/images/products/Sweetie-Cat.png"
  },
  {
    slug: "elephant-metacat",
    name: "metaCat",
    manufacturer: "Elephant Robotics",
    type: "Interactive",
    bestFor: ["Seniors", "Children"],
    blurb: "An AI-powered companion cat with LED-screen eyes, 29 voice commands, and Type-C charging. Up to 10 hours of playtime per charge.",
    price: "$159.00",
    rating: 4.3,
    features: ["29 voice commands", "LED expressive eyes", "USB-C rechargeable"],
    highlight: "Best rechargeable option",
    productUrl: "https://www.amazon.com/ELEPHANT-ROBOTICS-Companion-Animation-Interaction/dp/B0BY2H7W1C",
    imageUrl: "/images/products/Sweetie-Cat.png"
  },
  {
    slug: "enabot-ebo-air-2-plus",
    name: "EBO Air 2 Plus",
    manufacturer: "Enabot",
    type: "AI & Robotic",
    bestFor: ["Families", "Children"],
    blurb: "A mobile AI robot companion with a 3K camera, two-way video, ChatGPT-powered chat mode, and auto-recharge. Patrols your home and engages with family.",
    price: "$349.00",
    rating: 4.2,
    features: ["3K camera + night vision", "AI chat (ChatGPT)", "Auto-recharge dock"],
    highlight: "Smartest family robot",
    productUrl: "https://www.enabot.com/products/ebo-air-2-plus-familybot"
  }
];

export const faqs = [
  { q: "What is the difference between interactive pets and AI & robotic pets?", a: "Interactive pets usually focus on comfort, touch response, and simple engagement. AI & robotic pets generally add movement, sensors, or more advanced behavior." },
  { q: "Are smart pets good for seniors?", a: "Many buyers choose them for companionship and low maintenance. The best fit depends on comfort needs, ease of use, and how much technology the user wants." },
  { q: "Do these products need Wi-Fi?", a: "Some advanced models may use apps or connectivity, but many simpler interactive companion products do not." },
  { q: "Are these a good gift?", a: "Yes. Buyers often choose them for holidays, birthdays, or thoughtful gifts for parents and grandparents." }
];
