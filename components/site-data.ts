// AUTO-GENERATED FILE — DO NOT EDIT BY HAND.
// Run `npm run generate:products` to regenerate.
// Source: Documentation/Product Matrix.xlsx + Documentation/product-details.json
//
// Generated: 2026-05-02T15:23:37.115Z

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
    "blurb": "Self-balancing 4K guardian robot with V-SLAM mapping, Harman audio, Alexa built-in, and elderly fall alerts. A three-in-one home device for security, companionship, and entertainment.",
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
    "blurb": "Mobile companion robot with 2K camera, IR-cut night vision, customizable LED expressions, and 10 interactive pet actions. Ships in three colors and acts as both security camera and pet playmate.",
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
    "imageUrl": "/images/products/Joy-for-All-Companion-Cat-Silver.png",
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
    "imageUrl": "/images/products/Joy-for-All-Companion-Cat-Orange-Tabby.png",
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
  },
  {
    "slug": "matecat-1-1",
    "name": "MateCat 1.1",
    "manufacturer": "Chongker",
    "type": "Interactive",
    "bestFor": [
      "Seniors",
      "Children"
    ],
    "blurb": "Companion robot cat designed for sensory comfort. Touch-responsive sensors trigger purrs, meows, and gentle movements. Studied through 200+ hours of real cat behavior simulation. Heartbeat feature provides a calming, realistic experience.",
    "price": "$179.00",
    "rating": 4.4,
    "features": [
      "Touch-sensitive zones",
      "Realistic heartbeat",
      "Sensory comfort design"
    ],
    "highlight": "Best for sensory needs",
    "productUrl": "MateCat1.1 Robot Cat – Companion Toy for Sensory Comfort – Chongker",
    "imageUrl": "/images/products/Chongker-Percy-Robot-Cat.jpg",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "percy-1-1-robotic-dog",
    "name": "Percy 1.1 Robotic Dog",
    "manufacturer": "Chongker",
    "type": "Interactive",
    "bestFor": [
      "Seniors",
      "Children"
    ],
    "blurb": "Handmade realistic robotic dog with weighted body for sensory comfort, touch sensors, and a calming heartbeat simulation. Crafted through 30+ steps for exceptional detail. Charges via USB-C with 8+ hours of battery.",
    "price": "$129.00",
    "rating": 4.3,
    "features": [
      "Weighted comfort design",
      "Touch & heartbeat sensors",
      "USB-C rechargeable"
    ],
    "highlight": "Best weighted comfort",
    "productUrl": "Percy 1.1 Robotic Dog Companion Designed for Comfort – Chongker",
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
    "slug": "percy-robot-cat",
    "name": "Percy Robot Cat",
    "manufacturer": "Chongker",
    "type": "Interactive",
    "bestFor": [
      "Seniors",
      "Children"
    ],
    "blurb": "Affordable handmade robotic cat with five touch-sensitive zones, purring, meowing, and a realistic heartbeat. Weighted plush body designed for emotional support and stress relief.",
    "price": "$99.00",
    "rating": 4.3,
    "features": [
      "5 touch zones",
      "Heartbeat + purring",
      "Weighted plush body"
    ],
    "highlight": "Most affordable robot cat",
    "productUrl": "Percy Robot Cat – Voice,Purring & Heartbeat for Comfort – Chongker",
    "imageUrl": "/images/products/Chongker-Percy-Robot-Cat.jpg",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "breathing-red-panda-plush",
    "name": "Breathing Red Panda Plush",
    "manufacturer": "Chongker",
    "type": "Interactive",
    "bestFor": [
      "Seniors",
      "Children"
    ],
    "blurb": "Lifelike red panda plush with realistic breathing simulation. A weighted, calming companion designed for stress relief, anxiety support, and quiet comfort. Hand-crafted for exceptional detail.",
    "price": "$89.00",
    "rating": 4.5,
    "features": [
      "Realistic breathing motion",
      "Weighted plush body",
      "Calming companion"
    ],
    "highlight": "Best for anxiety relief",
    "productUrl": "Breathing Red Panda Plush – Lifelike Calming Toy Gift – Chongker",
    "imageUrl": "/images/products/red_panda.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "wuffy-robot-puppy",
    "name": "Wuffy Robot Puppy",
    "manufacturer": "Wuffy",
    "type": "Interactive",
    "bestFor": [
      "Children",
      "Families"
    ],
    "blurb": "Affordable interactive robot puppy with touch sensors, simple voice command response, walking, barking, and tail wagging. Runs on AA batteries with no app or Wi-Fi setup needed — instant out-of-box play. A kid-friendly starter pet alternative.",
    "price": "$19.99",
    "rating": 3.8,
    "features": [
      "Touch & motion sensors",
      "Walks, barks, wags",
      "AA batteries — no app"
    ],
    "highlight": "Most affordable starter robot",
    "productUrl": "Amazon.com: chinatera 2026 Wuffy Robot Dog Lifelike Toy Dog, Interactive Robot with Touch Sensing Voice Mimic Licking Motion Leash Remote Soft Fur for Kids Battery Powered (Style-G) : Toys & Games",
    "imageUrl": "/images/products/wuffy.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "kamomo",
    "name": "KAMOMO",
    "manufacturer": "Ropet",
    "type": "Interactive",
    "bestFor": [
      "Families"
    ],
    "blurb": "AI desk companion with a personality that grows through interaction. Multimodal AI processes face recognition, emotion detection, and gesture tracking. Constant 39°C body temperature delivers the warmth of a real pet. Customizable fur and accessories.",
    "price": "$199.00",
    "rating": 4.4,
    "features": [
      "AI-driven personality",
      "Bionic body warmth",
      "Customizable accessories"
    ],
    "highlight": "Most personal AI pet",
    "productUrl": "https://ropetai.com/pages/about-ropet",
    "imageUrl": "/images/products/interactive_pet_toys.png",
    "flags": {
      "gifts": true,
      "premium": true,
      "camera": true,
      "internetAccess": true,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "border-collie",
    "name": "Border Collie",
    "manufacturer": "Perfect Petzzz",
    "type": "Interactive",
    "bestFor": [
      "Children",
      "Seniors"
    ],
    "blurb": "Handmade realistic Border Collie plush with movable internal joints for adjustable poses. Crafted through 30+ steps by 5 artisans. A quiet companion for those unable to keep a real pet.",
    "price": "$89.00",
    "rating": 4.6,
    "features": [
      "Adjustable internal joints",
      "Lifelike Border Collie look",
      "Handmade by artisans"
    ],
    "highlight": "Posable plush companion",
    "productUrl": "Amazon.com: Perfect Petzzz Border Collie, Toys for Kids and Elderly, Realistic Dog Stuffed Animals, Battery-Operated Stuffed Dog, Companion Interactive Pets with Synthetic Fur : Toys & Games",
    "imageUrl": "/images/products/Mr-Border-Collie.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "chocolate-lab",
    "name": "Chocolate Lab",
    "manufacturer": "Perfect Petzzz",
    "type": "Interactive",
    "bestFor": [
      "Children",
      "Seniors"
    ],
    "blurb": "Handmade realistic Chocolate Labrador plush with movable joints and lifelike fur. A quiet companion for dog lovers, perfect for those who've lost a pet or cannot have a real dog.",
    "price": "$89.00",
    "rating": 4.6,
    "features": [
      "Adjustable internal joints",
      "Realistic Lab fur",
      "Handmade by artisans"
    ],
    "highlight": "For Lab lovers",
    "productUrl": "Amazon.com: Perfect Petzzz Original Petzzz Chocolate Lab, Realistic, Life-Like Stuffed Interactive Plush Toy, Electronic Pets, Companion Pet Dog with 100% Handcrafted Synthetic Fur : Toys & Games",
    "imageUrl": "/images/products/Mr-Chocolate-Lab.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "shih-tzu",
    "name": "Shih Tzu",
    "manufacturer": "Perfect Petzzz",
    "type": "Interactive",
    "bestFor": [
      "Children",
      "Seniors"
    ],
    "blurb": "Handmade realistic Shih Tzu plush with soft fur and adjustable joints. A gentle, quiet companion that doesn't run around — perfect for seniors in care communities or anyone unable to keep a real dog.",
    "price": "$89.00",
    "rating": 4.5,
    "features": [
      "Adjustable internal joints",
      "Soft Shih Tzu fur",
      "Handmade by artisans"
    ],
    "highlight": "For Shih Tzu lovers",
    "productUrl": "Amazon.com: Perfect Petzzz - Original Shih Tzu, Realistic, Lifelike Stuffed Interactive Pet Toy, Companion Dog with 100% Handcrafted Synthetic Fur : Pet Supplies",
    "imageUrl": "/images/products/Mr-Shih-Tzu.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "beagle",
    "name": "Beagle",
    "manufacturer": "Perfect Petzzz",
    "type": "Interactive",
    "bestFor": [
      "Children",
      "Seniors"
    ],
    "blurb": "Handmade realistic Beagle plush with classic tri-color markings, adjustable joints, and lifelike fur. A quiet, sit-by-your-side companion designed by Chongker's artisans.",
    "price": "$89.00",
    "rating": 4.5,
    "features": [
      "Adjustable internal joints",
      "Classic Beagle markings",
      "Handmade by artisans"
    ],
    "highlight": "For Beagle lovers",
    "productUrl": "Amazon.com: Perfect Petzzz Original Petzzz Beagle, Realistic, Lifelike Stuffed Interactive Pet Toy, Companion Pet Dog with 100% Handcrafted Synthetic Fur : Toys & Games",
    "imageUrl": "/images/products/Mr-Beagle.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "calico-cat",
    "name": "Calico Cat",
    "manufacturer": "Perfect Petzzz",
    "type": "Interactive",
    "bestFor": [
      "Children",
      "Seniors"
    ],
    "blurb": "Handmade realistic calico cat plush with classic black, orange, and white patches. Soft synthetic fur and a weighted body for a lifelike feel. A quiet, low-maintenance companion.",
    "price": "$79.00",
    "rating": 4.5,
    "features": [
      "Calico patch pattern",
      "Weighted body",
      "Handmade by artisans"
    ],
    "highlight": "Classic calico look",
    "productUrl": "https://www.amazon.com/dp/B004M42ER2/ref=sspa_dk_detail_0?psc=1&pd_rd_i=B004M42ER2&pd_rd_w=AjABt&content-id=amzn1.sym.386c274b-4bfe-4421-9052-a1a56db557ab&pf_rd_p=386c274b-4bfe-4421-9052-a1a56db557ab&pf_rd_r=7VNR97CX8AWABRX62554&pd_rd_wg=zOSGV&pd_rd_r=20ddc17d-c84f-4870-9b91-0bc9f9332ef1&s=toys-and-games&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM",
    "imageUrl": "/images/products/Sweetie-Calico-Cat.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "plush-white-cat",
    "name": "Plush White Cat",
    "manufacturer": "Perfect Petzzz",
    "type": "Interactive",
    "bestFor": [
      "Children",
      "Seniors"
    ],
    "blurb": "Handmade realistic white cat plush with soft fur and a lifelike weighted body. A calming, quiet companion crafted from molds based on real cats.",
    "price": "$79.00",
    "rating": 4.5,
    "features": [
      "Soft white fur",
      "Weighted lifelike body",
      "Handmade by artisans"
    ],
    "highlight": "Pure white companion",
    "productUrl": "https://www.amazon.com/Perfect-Petzzz-4934-Peluche-Blanc/dp/B00CZC87Y2/ref=sr_1_6?crid=2DSSQ9S1E17NT&dib=eyJ2IjoiMSJ9._xaIiZ3a8J-2z_JxV4X0R1nw7RT5-CCIJzohURKRauFh_1RApvGWEwFyxaTPIRG0fd7JLrjcVFTscPNGqZPcCHaT3y_Gjbz2NESJ1A5vooYH9_NY5d5S3HCLV8e5X2cnjrlKwhEeBEl7YMYEpQpLISegcsFM1M2ERHH5rtaX5Ar8LIk5u-ZNupL7J6nKsknSkgg6PL09UNdCy6kOqBj_PGAQdMw9DYc5-lTxiudpdaLjCbSIKtjflEL9Ps7HVqUoTYgae4nqiuP7LDa_KVVQroDijVCYDcu-ZgVXOKtI2lA.V0rWULiC_BM4S_mny5HR3o4lGLc9nu_QZU0sazj6Toc&dib_tag=se&keywords=perfect+petzzz&qid=1777734273&s=toys-and-games&sprefix=per%2Ctoys-and-games%2C185&sr=1-6",
    "imageUrl": "/images/products/Sweetie-White-Cat.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "orange-tabby-cat",
    "name": "Orange Tabby Cat",
    "manufacturer": "Perfect Petzzz",
    "type": "Interactive",
    "bestFor": [
      "Children",
      "Seniors"
    ],
    "blurb": "Handmade realistic orange tabby cat plush with classic stripes, soft fur, and a lifelike weighted body. The most popular cat coloring in plush companion form.",
    "price": "$79.00",
    "rating": 4.6,
    "features": [
      "Orange tabby stripes",
      "Weighted lifelike body",
      "Handmade by artisans"
    ],
    "highlight": "Most popular cat color",
    "productUrl": "https://www.amazon.com/dp/B0039Y3YOI/ref=sspa_dk_detail_2?psc=1&pd_rd_i=B0039Y3YOI&pd_rd_w=jV6FN&content-id=amzn1.sym.7dc70186-c171-4ad3-b982-b0b7c53e2f49&pf_rd_p=7dc70186-c171-4ad3-b982-b0b7c53e2f49&pf_rd_r=3DRP3XZZ66P886VD0ZFC&pd_rd_wg=uugqL&pd_rd_r=8a18b43f-7351-4cbb-b6ef-1a274737daec&s=toys-and-games&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw",
    "imageUrl": "/images/products/Sweetie-Cat.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "black-and-white-shorthair-cat",
    "name": "Black and White Shorthair Cat",
    "manufacturer": "Perfect Petzzz",
    "type": "Interactive",
    "bestFor": [
      "Children",
      "Seniors"
    ],
    "blurb": "Handmade realistic black-and-white shorthair cat plush with classic two-tone markings and soft fur. Modeled on real cat proportions for a lifelike look.",
    "price": "$79.00",
    "rating": 4.5,
    "features": [
      "Two-tone markings",
      "Realistic proportions",
      "Handmade by artisans"
    ],
    "highlight": "Classic two-tone look",
    "productUrl": "https://www.amazon.com/dp/B003XSJ4YE/ref=sspa_dk_hqp_detail_aax_0?psc=1&sp_csd=d2lkZ2V0TmFtZT1zcF9ocXBfc2hhcmVk",
    "imageUrl": "/images/products/Sweetie-Calico-Cat.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "siamese-cat",
    "name": "Siamese Cat",
    "manufacturer": "Perfect Petzzz",
    "type": "Interactive",
    "bestFor": [
      "Children",
      "Seniors"
    ],
    "blurb": "Handmade realistic Siamese cat plush with classic point coloring, blue eyes, and soft fur. A quiet, elegant companion crafted to mirror real Siamese proportions.",
    "price": "$79.00",
    "rating": 4.5,
    "features": [
      "Siamese point coloring",
      "Blue glass-style eyes",
      "Handmade by artisans"
    ],
    "highlight": "Elegant Siamese style",
    "productUrl": "Amazon.com: Perfect Petzzz Siamese Cat The Breathing Puppy : Toys & Games",
    "imageUrl": "/images/products/Sweetie-Siamese-Cat.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "my-realistic-robot-puppy",
    "name": "My Realistic Robot Puppy",
    "manufacturer": "Milow",
    "type": "Interactive",
    "bestFor": [
      "Children",
      "Families"
    ],
    "blurb": "Plush realistic robot puppy with motion sensors, barking sounds, and tail wagging. Walks and responds to voice commands. A budget-friendly interactive pet for kids.",
    "price": "$39.99",
    "rating": 3.9,
    "features": [
      "Walks & wags tail",
      "Voice response",
      "Soft plush body"
    ],
    "highlight": "Budget interactive puppy",
    "productUrl": "Amazon.com: CU-MATE Electronic Walking Dog Toy, Interactive Plush Pomeranian Puppy, Realistic Interactive Pet Toy Dog, Walking, Barking, Wagging Tail & Talking, Present Gifts for 3+ Year : Toys & Games",
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
    "slug": "18011-smart-robot-dog",
    "name": "18011 Smart Robot Dog",
    "manufacturer": "Ruko",
    "type": "AI & Robotic",
    "bestFor": [
      "Children",
      "Families"
    ],
    "blurb": "Programmable smart robot dog with remote control, gesture recognition, dance moves, and singing. Suitable for kids age 6+ as an entry into robotics and interactive play.",
    "price": "$59.99",
    "rating": 4,
    "features": [
      "Gesture recognition",
      "Remote control",
      "Dance & sing modes"
    ],
    "highlight": "Tech-forward kids' robot",
    "productUrl": "Amazon.com: Ruko 18011 Smart Robot Dog, Interactive Puppy with 30 LED Expressions, Programmable Play, 2.4 GHz Remote & Gesture Control, Toy for Kids Age 3+ : Toys & Games",
    "imageUrl": "/images/products/futuristic_ai_pets.png",
    "flags": {
      "gifts": true,
      "premium": false,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "robot-pet-dog",
    "name": "Robot Pet Dog",
    "manufacturer": "Loona",
    "type": "AI & Robotic",
    "bestFor": [
      "Children",
      "Families"
    ],
    "blurb": "Interactive robot dog with walking, barking, sitting, and tail-wagging behaviors. Touch and voice responsive with multiple play modes. A simple, affordable pet companion for children.",
    "price": "$49.99",
    "rating": 3.9,
    "features": [
      "Walks & sits",
      "Voice response",
      "Multiple play modes"
    ],
    "highlight": "Versatile play modes",
    "productUrl": "Amazon.com: Loona Robot Pet Dog ChatGPT-4o Smart AI-Powered Companion Voice & Gesture Control, Real-Time Interaction Robotics Toys for Kids, Home Monitoring - Includes Charging Dock : Toys & Games",
    "imageUrl": "/images/products/futuristic_ai_pets.png",
    "flags": {
      "gifts": true,
      "premium": true,
      "camera": false,
      "internetAccess": false,
      "affiliateAgreement": false
    }
  },
  {
    "slug": "furby",
    "name": "Furby",
    "manufacturer": "",
    "type": "AI & Robotic",
    "bestFor": [
      "Children",
      "Families"
    ],
    "blurb": "The 2023 Hasbro reboot of the iconic '90s interactive toy. Speak to Furby to activate 600+ responses across Dance Party, Copy Cat, Tell My Fortune, Let's Chill, and Lightshow modes. Brightly colored fur, light-up ears, and an off switch.",
    "price": "$69.99",
    "rating": 4.2,
    "features": [
      "600+ voice responses",
      "5 interactive modes",
      "Light-up ears"
    ],
    "highlight": "Iconic '90s favorite returns",
    "productUrl": "https://www.amazon.com/s?k=furby&i=toys-and-games&crid=30VFFMN70W1XS&sprefix=furby%2Ctoys-and-games%2C158&ref=nb_sb_ss_p13n-expert-pd-ops-ranker_ci_hl-bn-left_1_5",
    "imageUrl": "/images/products/interactive_pet_toys.png",
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
