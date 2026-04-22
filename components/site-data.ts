export type Product = {
  slug: string;
  name: string;
  type: "Interactive" | "AI & Robotic";
  bestFor: string;
  blurb: string;
  price: string;
  features: string[];
  highlight: string;
};

export const products: Product[] = [
  { slug:"joy-companion-cat", name:"Companion Cat", type:"Interactive", bestFor:"Seniors", blurb:"A gentle companion-style pet focused on comfort, light touch response, and calming presence.", price:"$$", features:["Soft fur feel","Touch response","Easy setup"], highlight:"Best calming choice" },
  { slug:"comfort-pup", name:"Comfort Pup", type:"Interactive", bestFor:"Gift buyers", blurb:"A warm, friendly dog-style companion that is easy to understand and simple to enjoy.", price:"$$", features:["Friendly sounds","Low learning curve","Portable"], highlight:"Best gift option" },
  { slug:"smart-whiskers", name:"Smart Whiskers", type:"AI & Robotic", bestFor:"Tech-forward buyers", blurb:"A more advanced robotic cat with motion, sensor-based responses, and premium presentation.", price:"$$$", features:["Motion sensors","Lifelike movement","Premium build"], highlight:"Best premium cat" },
  { slug:"nova-pet", name:"Nova Pet", type:"AI & Robotic", bestFor:"Families", blurb:"A playful smart pet designed for entertainment, novelty, and day-to-day interaction.", price:"$$$", features:["Interactive modes","Rechargeable","Responsive behavior"], highlight:"Best for families" },
  { slug:"calm-companion", name:"Calm Companion", type:"Interactive", bestFor:"Senior loved ones", blurb:"A comfort-first interactive pet for shoppers prioritizing ease of use and emotional reassurance.", price:"$$", features:["Simple controls","Quiet operation","Comforting interaction"], highlight:"Best senior-friendly choice" },
  { slug:"orbit-robo-dog", name:"Orbit Robo Dog", type:"AI & Robotic", bestFor:"Premium shoppers", blurb:"A sleek robotic dog with movement-focused interaction for buyers who want a more modern feel.", price:"$$$$", features:["Smart sensors","Movement patterns","Higher-end design"], highlight:"Best advanced dog" }
];

export const faqs = [
  { q:"What is the difference between interactive pets and AI & robotic pets?", a:"Interactive pets usually focus on comfort, touch response, and simple engagement. AI & robotic pets generally add movement, sensors, or more advanced behavior." },
  { q:"Are smart pets good for seniors?", a:"Many buyers choose them for companionship and low maintenance. The best fit depends on comfort needs, ease of use, and how much technology the user wants." },
  { q:"Do these products need Wi-Fi?", a:"Some advanced models may use apps or connectivity, but many simpler interactive companion products do not." },
  { q:"Are these a good gift?", a:"Yes. Buyers often choose them for holidays, birthdays, or thoughtful gifts for parents and grandparents." }
];
