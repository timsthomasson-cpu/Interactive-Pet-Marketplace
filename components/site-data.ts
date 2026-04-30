// AUTO-GENERATED FILE — DO NOT EDIT BY HAND.
// Run `npm run generate:products` to regenerate.
// Source: Documentation/Product Matrix.xlsx + Documentation/product-details.json
//
// Generated: 2026-04-30T22:50:56.986Z

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
    "slug": "ebo-max-familybot",
    "name": "EBO Max FamilyBot",
    "manufacturer": "Enabot",
    "type": "AI & Robotic",
    "bestFor": [
      "Families",
      "Children"
    ],
    "blurb": "Enabot's most advanced family robot. Multimodal AI brain processes vision, voice, and context, learns household routines, recognizes faces, and detects falls. 4K camera with two-way video, smart patrol, and V-SLAM autonomous navigation.",
    "price": "$549.99",
    "rating": 4.5,
    "features": [
      "4K camera + AI",
      "Fall detection alerts",
      "V-SLAM navigation"
    ],
    "highlight": "Top-tier family AI robot",
    "productUrl": "https://www.enabot.com/home-robot/ebo-max",
    "imageUrl": "/images/products/interactive_pet_toys.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "ebo-air-2-plus",
    "name": "EBO Air 2 Plus",
    "manufacturer": "Enabot",
    "type": "AI & Robotic",
    "bestFor": [
      "Families",
      "Children"
    ],
    "blurb": "Premium mobile AI robot with 3K camera, two-way video calls, ChatGPT-powered chat mode, AI tracking, and smart patrol routes. Auto-recharges and patrols your home autonomously.",
    "price": "$349.00",
    "rating": 4.3,
    "features": [
      "3K camera + night vision",
      "AI chat (ChatGPT)",
      "Auto-recharge dock"
    ],
    "highlight": "Smartest mid-tier robot",
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
    "slug": "ebo-x",
    "name": "EBO X",
    "manufacturer": "Enabot",
    "type": "AI & Robotic",
    "bestFor": [
      "Families",
      "Children"
    ],
    "blurb": "Self-balancing 4K guardian robot with V-SLAM mapping, Harman audio, Alexa built-in, and elderly fall alerts. Designed as a three-in-one home device for security, companionship, and entertainment.",
    "price": "$999.00",
    "rating": 4.4,
    "features": [
      "4K stabilized camera",
      "V-SLAM home mapping",
      "Harman speakers + Alexa"
    ],
    "highlight": "Flagship guardian robot",
    "productUrl": "EBO X AI FamilyBot– 4K, GPT Assist & Smart Home",
    "imageUrl": "/images/products/interactive_pet_toys.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "ebo-air",
    "name": "EBO Air",
    "manufacturer": "Enabot",
    "type": "AI & Robotic",
    "bestFor": [
      "Families",
      "Children"
    ],
    "blurb": "Mobile home robot with 1080p camera, brushless silent motor, and pet entertainment features including a built-in laser and DIY feather stick. Treads handle carpets and small obstacles smoothly.",
    "price": "$229.00",
    "rating": 4,
    "features": [
      "1080p + night vision",
      "Silent brushless motor",
      "Pet laser + feather toy"
    ],
    "highlight": "Original Air model",
    "productUrl": "https://www.enabot.com/home-robot/ebo-air",
    "imageUrl": "/images/products/interactive_pet_toys.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "ebo-air-2",
    "name": "EBO Air 2",
    "manufacturer": "Enabot",
    "type": "AI & Robotic",
    "bestFor": [
      "Families",
      "Children"
    ],
    "blurb": "Mobile companion robot with 2K camera, IR-cut night vision, customizable LED expressions, and 10 interactive pet actions. Ships in three colors and acts as both a security camera and a pet playmate.",
    "price": "$199.00",
    "rating": 4.2,
    "features": [
      "2K camera + 137° view",
      "Custom LED expressions",
      "10 pet interactions"
    ],
    "highlight": "Best value robot",
    "productUrl": "EBO Air 2 FamilyBot – 2K Video, App Control & Home Monitoring",
    "imageUrl": "/images/products/interactive_pet_toys.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "ebo-air-2s",
    "name": "EBO Air 2S",
    "manufacturer": "Enabot",
    "type": "AI & Robotic",
    "bestFor": [
      "Families",
      "Children"
    ],
    "blurb": "Upgraded 2.5K-camera version of the EBO Air 2 with scheduled patrol, autonomous return-to-dock charging, and reliable home security monitoring.",
    "price": "$249.00",
    "rating": 4.3,
    "features": [
      "2.5K camera",
      "Scheduled patrol",
      "Auto-recharge"
    ],
    "highlight": "Security-focused upgrade",
    "productUrl": "EBO Air 2S FamilyBot – AI Patrol, Video Calls & App Control",
    "imageUrl": "/images/products/interactive_pet_toys.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "ebo-se",
    "name": "EBO SE",
    "manufacturer": "Enabot",
    "type": "AI & Robotic",
    "bestFor": [
      "Families",
      "Children"
    ],
    "blurb": "Entry-level mobile camera robot with 1080p video, two-way audio, and night vision. The friendliest way to get started with a movable home and pet camera.",
    "price": "$119.00",
    "rating": 4,
    "features": [
      "1080p + night vision",
      "Two-way audio",
      "Compact pet-level view"
    ],
    "highlight": "Most affordable Enabot",
    "productUrl": "enabot.com/home-robot/ebo-se",
    "imageUrl": "/images/products/interactive_pet_toys.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "rola-mini",
    "name": "ROLA Mini",
    "manufacturer": "Enabot",
    "type": "AI & Robotic",
    "bestFor": [
      "Families",
      "Children"
    ],
    "blurb": "Compact mobile pet camera with 2K resolution, one-touch call, two-way talk, and night vision. Lightweight and ideal for small spaces or first-time buyers.",
    "price": "$129.00",
    "rating": 4.1,
    "features": [
      "2K camera",
      "One-touch call",
      "Local SD storage"
    ],
    "highlight": "Most compact pick",
    "productUrl": "ROLA Mini FamilyBot – 2K, Night Vision & App Control",
    "imageUrl": "/images/products/interactive_pet_toys.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "marscat",
    "name": "MarsCat",
    "manufacturer": "Elephant Robotics",
    "type": "Interactive",
    "bestFor": [
      "Families",
      "Children"
    ],
    "blurb": "The world's first fully autonomous robot cat. Walks, sits up, plays, and develops its own personality based on interactions. Powered by a quad-core Raspberry Pi with optional open-source development.",
    "price": "$1,199.00",
    "rating": 4.4,
    "features": [
      "Fully autonomous walk",
      "Adaptive personality",
      "Raspberry Pi powered"
    ],
    "highlight": "Most autonomous robot cat",
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
    "slug": "metacat",
    "name": "metaCat",
    "manufacturer": "Elephant Robotics",
    "type": "Interactive",
    "bestFor": [
      "Seniors",
      "Children"
    ],
    "blurb": "Interactive companion robotic cat with LED expressive eyes, 29 voice commands, soft handcrafted fur, and USB-C charging. Up to 10 hours of playtime per charge. Available in Persian, Ragdoll, and Bicolor.",
    "price": "$159.00",
    "rating": 4.3,
    "features": [
      "29 voice commands",
      "LED expressive eyes",
      "USB-C rechargeable"
    ],
    "highlight": "Best rechargeable cat",
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
    "slug": "metadog",
    "name": "metaDog",
    "manufacturer": "Elephant Robotics",
    "type": "Interactive",
    "bestFor": [
      "Seniors",
      "Children"
    ],
    "blurb": "Interactive companion robot dog with voice recognition and game app support. Available in Husky and Shiba Inu styles. A clean, mess-free alternative for those who can't have a real dog.",
    "price": "$189.00",
    "rating": 4.4,
    "features": [
      "Voice recognition",
      "App-driven games",
      "Lifelike Husky/Shiba"
    ],
    "highlight": "Best low-maintenance dog",
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
    "slug": "metapanda",
    "name": "metaPanda",
    "manufacturer": "Elephant Robotics",
    "type": "Interactive",
    "bestFor": [
      "Seniors",
      "Children"
    ],
    "blurb": "Lifelike interactive panda with 6 degrees of freedom, 8 touch sensors, and 30+ voice commands. Plays a 'feeding' animation when given its bamboo toy. Plush hypoallergenic fur.",
    "price": "$199.00",
    "rating": 4.5,
    "features": [
      "8 touch sensors",
      "30+ voice commands",
      "Bamboo feeding mode"
    ],
    "highlight": "Most novel companion",
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
    "slug": "companion-pet-pup-golden",
    "name": "Companion Pet Pup Golden",
    "manufacturer": "Joy for All",
    "type": "Interactive",
    "bestFor": [
      "Seniors",
      "Children"
    ],
    "blurb": "Lifelike animatronic Golden Retriever puppy with BarkBack voice response, soothing heartbeat, and soft hypoallergenic fur. Designed with caregivers to bring comfort to older adults living with Alzheimer's and dementia.",
    "price": "$179.99",
    "rating": 4.5,
    "features": [
      "BarkBack voice response",
      "Heartbeat sensation",
      "Soft golden fur"
    ],
    "highlight": "Award-winning senior companion",
    "productUrl": "https://joyforall.com/products/companion-pet-pup?variant=37624426070199",
    "imageUrl": "/images/products/Mr-Dog.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "companion-pet-pup-freckled",
    "name": "Companion Pet Pup Freckled",
    "manufacturer": "Joy for All",
    "type": "Interactive",
    "bestFor": [
      "Seniors",
      "Children"
    ],
    "blurb": "Lifelike animatronic puppy with brown-and-white freckled coat, floppy ears, BarkBack voice response, and soothing heartbeat. The newest member of the Joy for All family.",
    "price": "$179.99",
    "rating": 4.5,
    "features": [
      "BarkBack voice response",
      "Heartbeat sensation",
      "Freckled brown coat"
    ],
    "highlight": "Newest Joy for All pup",
    "productUrl": "https://joyforall.com/products/companion-pet-pup?variant=37624426102967",
    "imageUrl": "/images/products/Mr-Dog.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "companion-pet-cat-silver",
    "name": "Companion Pet Cat Silver",
    "manufacturer": "Joy for All",
    "type": "Interactive",
    "bestFor": [
      "Seniors",
      "Children"
    ],
    "blurb": "Animatronic silver-and-white cat that purrs, meows, and rolls over for tummy scratches. Studies show it reduces feelings of loneliness and dementia-related agitation. VibraPurr technology.",
    "price": "$159.99",
    "rating": 4.5,
    "features": [
      "VibraPurr technology",
      "Motion sensors",
      "Silver/white fur"
    ],
    "highlight": "Best for dementia comfort",
    "productUrl": "https://joyforall.com/products/companion-cats?variant=10404273487915",
    "imageUrl": "/images/products/Joy-for-All-Companion-Cat-Silver",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "companion-pet-cat-orange-tabby",
    "name": "Companion Pet Cat Orange Tabby",
    "manufacturer": "Joy for All",
    "type": "Interactive",
    "bestFor": [
      "Seniors",
      "Children"
    ],
    "blurb": "Animatronic orange tabby cat with realistic purring, soft fur, and lifelike interactions. Meows, grooms, and rolls over at your touch. Award-winning therapy companion.",
    "price": "$159.99",
    "rating": 4.5,
    "features": [
      "VibraPurr technology",
      "Motion sensors",
      "Orange tabby fur"
    ],
    "highlight": "Most popular cat color",
    "productUrl": "https://joyforall.com/products/companion-cats?variant=10404273455147",
    "imageUrl": "/images/products/Joy-for-All-Companion-Cat-Orange-Tabby",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "companion-pet-cat-tuxedo",
    "name": "Companion Pet Cat Tuxedo",
    "manufacturer": "Joy for All",
    "type": "Interactive",
    "bestFor": [
      "Seniors",
      "Children"
    ],
    "blurb": "Animatronic black-and-white tuxedo cat with realistic purring, motion-responsive interactions, and soft hypoallergenic fur. A calming, low-maintenance companion for any age.",
    "price": "$159.99",
    "rating": 4.4,
    "features": [
      "VibraPurr technology",
      "Motion sensors",
      "Black/white tuxedo fur"
    ],
    "highlight": "Classic tuxedo look",
    "productUrl": "https://joyforall.com/products/companion-cats?variant=12931092676651",
    "imageUrl": "/images/products/Joy-for-All-Companion-Cat-Tuxedo.jpg",
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
    "blurb": "Hyper-realistic robotic cat with voice wake-up, blinking, purring, and tail movement. Responds to custom voice commands like \"Love U\" or \"Good night\". Handcrafted fur for a premium feel.",
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
