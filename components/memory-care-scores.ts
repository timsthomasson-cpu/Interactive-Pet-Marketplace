// All 29 products evaluated for "Best for Seniors in Memory Care Facilities."
// Source: Documentation/Best For Lists/Best for Seniors in Memory Care Facilities.xlsx
// Regenerated after Sound Quality replaced Noise Sensitivity Fit in the scores file.
//
// score         — composite weighted score (1–5) for THIS list.
// scorePercent  — score / TOP_SCORE_IN_GROUP × 100. Represents how close this
//                  product is to the best available in this category, NOT how
//                  close to a theoretical perfect 5.0. Top scorer = 100%.
//                  Math is always traceable: see /best-for-memory-care/scoring.
// TOP_SCORE_IN_GROUP = 3.95 (five-way tie; tiebreaker order in Product_Data_Rules.md §4).
//
// soundQuality  — locked rubric, 1–5. Replaced Noise Sensitivity Fit.
//                  5 = highly realistic, pleasant. 1 = poor/tinny/startling.
// movementLevel — locked rubric, 1–5. 5 = full locomotion. 1 = breathing only.
// visualContrast — locked rubric, 1–5. Tiebreaker per Product_Data_Rules.md §4.
//
// Generated: 2026-07-02. Re-run extraction if rubric or scores change.

export const TOP_SCORE_IN_GROUP = 3.95;

export type MemoryCareScoreRow = {
  slug: string;
  score: number;
  scorePercent: number;
  price: number;
  priceCategory: "Budget Friendly" | "Best Value" | "Premium";
  animalCategory: "Cat" | "Dog" | "Panda" | "Robot";
  type: "Fluffy Companion" | "Ai & Robotic Pets";
  movementLevel: number;
  soundQuality: number;
  visualContrast: number;
};

export const MEMORY_CARE_SCORES: MemoryCareScoreRow[] = [
  { slug: "breathing-red-panda-plush", score: 3.50, scorePercent: 89, price: 119.00, priceCategory: "Best Value", animalCategory: "Panda", type: "Fluffy Companion", movementLevel: 1, soundQuality: 4, visualContrast: 4 },
  { slug: "matecat-1-1", score: 3.95, scorePercent: 100, price: 149.00, priceCategory: "Best Value", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 2, soundQuality: 4, visualContrast: 3 },
  { slug: "matecat-pro", score: 3.95, scorePercent: 100, price: 178.00, priceCategory: "Best Value", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 3, soundQuality: 4, visualContrast: 3 },
  { slug: "percy-1-1-robotic-companion-dog", score: 3.95, scorePercent: 100, price: 89.00, priceCategory: "Budget Friendly", animalCategory: "Dog", type: "Fluffy Companion", movementLevel: 3, soundQuality: 4, visualContrast: 3 },
  { slug: "percy-robot-cat", score: 3.95, scorePercent: 100, price: 89.00, priceCategory: "Budget Friendly", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 3, soundQuality: 4, visualContrast: 3 },
  { slug: "breathing-calico-percy-2-0", score: 3.95, scorePercent: 100, price: 109.00, priceCategory: "Best Value", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 2, soundQuality: 4, visualContrast: 3 },
  { slug: "ebo-air-2-familybot", score: 3.05, scorePercent: 77, price: 179.00, priceCategory: "Best Value", animalCategory: "Robot", type: "Ai & Robotic Pets", movementLevel: 4, soundQuality: 3, visualContrast: 3 },
  { slug: "ebo-air-2-plus-familybot", score: 3.05, scorePercent: 77, price: 359.00, priceCategory: "Premium", animalCategory: "Robot", type: "Ai & Robotic Pets", movementLevel: 4, soundQuality: 3, visualContrast: 3 },
  { slug: "ebo-air-2s-familybot", score: 3.05, scorePercent: 77, price: 279.00, priceCategory: "Premium", animalCategory: "Robot", type: "Ai & Robotic Pets", movementLevel: 4, soundQuality: 3, visualContrast: 3 },
  { slug: "ebo-x-familybot", score: 3.05, scorePercent: 77, price: 789.00, priceCategory: "Premium", animalCategory: "Robot", type: "Ai & Robotic Pets", movementLevel: 4, soundQuality: 3, visualContrast: 3 },
  { slug: "rola-mini-pet-monitor", score: 2.95, scorePercent: 75, price: 139.00, priceCategory: "Best Value", animalCategory: "Robot", type: "Ai & Robotic Pets", movementLevel: 3, soundQuality: 3, visualContrast: 3 },
  { slug: "companion-pet-cat-orange-tabby", score: 3.75, scorePercent: 95, price: 159.99, priceCategory: "Best Value", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 2, soundQuality: 3, visualContrast: 4 },
  { slug: "companion-pet-cat-silver", score: 3.75, scorePercent: 95, price: 159.99, priceCategory: "Best Value", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 2, soundQuality: 3, visualContrast: 3 },
  { slug: "companion-pet-cat-tuxedo", score: 3.75, scorePercent: 95, price: 159.99, priceCategory: "Best Value", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 2, soundQuality: 3, visualContrast: 4 },
  { slug: "companion-pet-pup-freckled", score: 3.75, scorePercent: 95, price: 179.00, priceCategory: "Best Value", animalCategory: "Dog", type: "Fluffy Companion", movementLevel: 2, soundQuality: 3, visualContrast: 3 },
  { slug: "companion-pet-pup-golden", score: 3.75, scorePercent: 95, price: 179.00, priceCategory: "Best Value", animalCategory: "Dog", type: "Fluffy Companion", movementLevel: 2, soundQuality: 3, visualContrast: 4 },
  { slug: "wuffy-robot-puppy", score: 3.30, scorePercent: 84, price: 25.99, priceCategory: "Budget Friendly", animalCategory: "Dog", type: "Fluffy Companion", movementLevel: 3, soundQuality: 2, visualContrast: 3 },
  { slug: "dj-furby", score: 3.75, scorePercent: 95, price: 50.11, priceCategory: "Budget Friendly", animalCategory: "Robot", type: "Ai & Robotic Pets", movementLevel: 2, soundQuality: 3, visualContrast: 5 },
  { slug: "robot-pet-dog", score: 2.85, scorePercent: 72, price: 499.00, priceCategory: "Premium", animalCategory: "Dog", type: "Ai & Robotic Pets", movementLevel: 5, soundQuality: 3, visualContrast: 3 },
  { slug: "grey-tabby-cat", score: 3.90, scorePercent: 99, price: 44.45, priceCategory: "Budget Friendly", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 1, soundQuality: 2, visualContrast: 3 },
  { slug: "original-beagle", score: 3.90, scorePercent: 99, price: 44.45, priceCategory: "Budget Friendly", animalCategory: "Dog", type: "Fluffy Companion", movementLevel: 1, soundQuality: 2, visualContrast: 3 },
  { slug: "original-black-and-white-shorthair-cat", score: 3.90, scorePercent: 99, price: 44.45, priceCategory: "Budget Friendly", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 1, soundQuality: 2, visualContrast: 4 },
  { slug: "original-border-collie", score: 3.90, scorePercent: 99, price: 44.45, priceCategory: "Budget Friendly", animalCategory: "Dog", type: "Fluffy Companion", movementLevel: 1, soundQuality: 2, visualContrast: 3 },
  { slug: "original-chocolate-lab", score: 3.90, scorePercent: 99, price: 44.45, priceCategory: "Budget Friendly", animalCategory: "Dog", type: "Fluffy Companion", movementLevel: 1, soundQuality: 2, visualContrast: 3 },
  { slug: "original-plush-white-cat", score: 3.90, scorePercent: 99, price: 53.90, priceCategory: "Budget Friendly", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 1, soundQuality: 2, visualContrast: 4 },
  { slug: "original-shih-tzu", score: 3.90, scorePercent: 99, price: 44.45, priceCategory: "Budget Friendly", animalCategory: "Dog", type: "Fluffy Companion", movementLevel: 1, soundQuality: 2, visualContrast: 3 },
  { slug: "original-siamese-cat", score: 3.90, scorePercent: 99, price: 53.90, priceCategory: "Budget Friendly", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 1, soundQuality: 2, visualContrast: 3 },
  { slug: "kamomo", score: 3.30, scorePercent: 84, price: 349.00, priceCategory: "Premium", animalCategory: "Robot", type: "Ai & Robotic Pets", movementLevel: 1, soundQuality: 3, visualContrast: 2 },
  { slug: "18011-smart-robot-dog", score: 3.55, scorePercent: 90, price: 69.99, priceCategory: "Budget Friendly", animalCategory: "Dog", type: "Ai & Robotic Pets", movementLevel: 4, soundQuality: 2, visualContrast: 3 },
];
