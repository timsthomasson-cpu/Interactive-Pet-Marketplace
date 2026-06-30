// All 29 products evaluated for "Best for Seniors in Memory Care Facilities."
// 15 ranked + 14 eliminated (same Manufacturer × Price Category × Animal
// Category dedup rule) — see Documentation/Best For Lists/Best for Seniors
// in Memory Care Facilities List.xlsx.
//
// score             — composite weighted score (1–5) for THIS Best For list,
//                      from the "Overall Score" / "Score" column. Ranked and
//                      eliminated entries use the identical weighting, so
//                      scores are directly comparable across all 29.
// price              — Documentation/Product Matrix.xlsx, numeric.
// priceCategory       — "Budget Friendly" | "Best Value" | "Premium"
// animalCategory      — "Cat" | "Dog" | "Panda" | "Robot"
// type                — "Fluffy Companion" | "Ai & Robotic Pets" (verbatim
//                        from Product Matrix.xlsx Type column)
// movementLevel       — locked rubric, 1–5. 5 = highest movement (walking,
//                        complex locomotion). 1 = lowest (breathing only or
//                        no movement). NOT reversed.
// noiseSensitivityFit — locked rubric, 1–5, REVERSED. 5 = fully silent /
//                        near-silent. 1 = loud/unpredictable, no mute option.
// visualContrast       — "Visual contrast / visibility" rubric score, 1–5.
//                        Used as a tiebreaker per our published rule:
//                        Score → Rating → Visual Contrast → Review Count.
//
// Source: Documentation/Product Features Scores/Product_Feature_Scores.xlsx
// Generated: 2026-06-27. Re-run extraction if the rubric or rankings change.

export type MemoryCareScoreRow = {
  slug: string;
  score: number;
  price: number;
  priceCategory: "Budget Friendly" | "Best Value" | "Premium";
  animalCategory: "Cat" | "Dog" | "Panda" | "Robot";
  type: "Fluffy Companion" | "Ai & Robotic Pets";
  movementLevel: number;
  noiseSensitivityFit: number;
  visualContrast: number;
};

export const MEMORY_CARE_SCORES: MemoryCareScoreRow[] = [
  { slug: "percy-robot-cat", score: 3.95, price: 89.00, priceCategory: "Budget Friendly", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 3, noiseSensitivityFit: 3, visualContrast: 3 },
  { slug: "breathing-calico-percy-2-0", score: 3.95, price: 109.00, priceCategory: "Best Value", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 2, noiseSensitivityFit: 3, visualContrast: 3 },
  { slug: "percy-1-1-robotic-companion-dog", score: 3.95, price: 89.00, priceCategory: "Budget Friendly", animalCategory: "Dog", type: "Fluffy Companion", movementLevel: 3, noiseSensitivityFit: 3, visualContrast: 3 },
  { slug: "original-black-and-white-shorthair-cat", score: 3.90, price: 44.45, priceCategory: "Budget Friendly", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 1, noiseSensitivityFit: 5, visualContrast: 4 },
  { slug: "original-beagle", score: 3.90, price: 44.45, priceCategory: "Budget Friendly", animalCategory: "Dog", type: "Fluffy Companion", movementLevel: 1, noiseSensitivityFit: 5, visualContrast: 3 },
  { slug: "companion-pet-cat-orange-tabby", score: 3.75, price: 159.99, priceCategory: "Best Value", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 2, noiseSensitivityFit: 1, visualContrast: 4 },
  { slug: "companion-pet-pup-golden", score: 3.75, price: 179.00, priceCategory: "Best Value", animalCategory: "Dog", type: "Fluffy Companion", movementLevel: 2, noiseSensitivityFit: 1, visualContrast: 4 },
  { slug: "dj-furby", score: 3.65, price: 50.11, priceCategory: "Budget Friendly", animalCategory: "Robot", type: "Ai & Robotic Pets", movementLevel: 2, noiseSensitivityFit: 2, visualContrast: 5 },
  { slug: "breathing-red-panda-plush", score: 3.50, price: 119.00, priceCategory: "Best Value", animalCategory: "Panda", type: "Fluffy Companion", movementLevel: 1, noiseSensitivityFit: 5, visualContrast: 4 },
  { slug: "18011-smart-robot-dog", score: 3.35, price: 69.99, priceCategory: "Budget Friendly", animalCategory: "Dog", type: "Ai & Robotic Pets", movementLevel: 4, noiseSensitivityFit: 2, visualContrast: 3 },
  { slug: "kamomo", score: 3.30, price: 349.00, priceCategory: "Premium", animalCategory: "Robot", type: "Ai & Robotic Pets", movementLevel: 1, noiseSensitivityFit: 3, visualContrast: 2 },
  { slug: "wuffy-robot-puppy", score: 3.20, price: 25.99, priceCategory: "Budget Friendly", animalCategory: "Dog", type: "Fluffy Companion", movementLevel: 3, noiseSensitivityFit: 2, visualContrast: 3 },
  { slug: "ebo-air-2-plus-familybot", score: 2.95, price: 359.00, priceCategory: "Premium", animalCategory: "Robot", type: "Ai & Robotic Pets", movementLevel: 4, noiseSensitivityFit: 4, visualContrast: 3 },
  { slug: "ebo-air-2-familybot", score: 2.95, price: 179.00, priceCategory: "Best Value", animalCategory: "Robot", type: "Ai & Robotic Pets", movementLevel: 4, noiseSensitivityFit: 4, visualContrast: 3 },
  { slug: "robot-pet-dog", score: 2.75, price: 499.00, priceCategory: "Premium", animalCategory: "Dog", type: "Ai & Robotic Pets", movementLevel: 5, noiseSensitivityFit: 2, visualContrast: 3 },
  { slug: "matecat-pro", score: 3.95, price: 178.00, priceCategory: "Best Value", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 3, noiseSensitivityFit: 3, visualContrast: 3 },
  { slug: "grey-tabby-cat", score: 3.90, price: 44.45, priceCategory: "Budget Friendly", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 1, noiseSensitivityFit: 5, visualContrast: 3 },
  { slug: "original-siamese-cat", score: 3.90, price: 53.90, priceCategory: "Budget Friendly", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 1, noiseSensitivityFit: 5, visualContrast: 3 },
  { slug: "original-plush-white-cat", score: 3.90, price: 53.90, priceCategory: "Budget Friendly", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 1, noiseSensitivityFit: 5, visualContrast: 4 },
  { slug: "original-chocolate-lab", score: 3.90, price: 44.45, priceCategory: "Budget Friendly", animalCategory: "Dog", type: "Fluffy Companion", movementLevel: 1, noiseSensitivityFit: 5, visualContrast: 3 },
  { slug: "original-border-collie", score: 3.90, price: 44.45, priceCategory: "Budget Friendly", animalCategory: "Dog", type: "Fluffy Companion", movementLevel: 1, noiseSensitivityFit: 5, visualContrast: 3 },
  { slug: "original-shih-tzu", score: 3.90, price: 44.45, priceCategory: "Budget Friendly", animalCategory: "Dog", type: "Fluffy Companion", movementLevel: 1, noiseSensitivityFit: 5, visualContrast: 3 },
  { slug: "matecat-1-1", score: 3.85, price: 149.00, priceCategory: "Best Value", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 2, noiseSensitivityFit: 3, visualContrast: 3 },
  { slug: "companion-pet-cat-tuxedo", score: 3.75, price: 159.99, priceCategory: "Best Value", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 2, noiseSensitivityFit: 1, visualContrast: 4 },
  { slug: "companion-pet-cat-silver", score: 3.75, price: 159.99, priceCategory: "Best Value", animalCategory: "Cat", type: "Fluffy Companion", movementLevel: 2, noiseSensitivityFit: 1, visualContrast: 3 },
  { slug: "companion-pet-pup-freckled", score: 3.75, price: 179.00, priceCategory: "Best Value", animalCategory: "Dog", type: "Fluffy Companion", movementLevel: 2, noiseSensitivityFit: 1, visualContrast: 3 },
  { slug: "ebo-air-2s-familybot", score: 2.95, price: 279.00, priceCategory: "Premium", animalCategory: "Robot", type: "Ai & Robotic Pets", movementLevel: 4, noiseSensitivityFit: 4, visualContrast: 3 },
  { slug: "ebo-x-familybot", score: 2.95, price: 789.00, priceCategory: "Premium", animalCategory: "Robot", type: "Ai & Robotic Pets", movementLevel: 4, noiseSensitivityFit: 4, visualContrast: 3 },
  { slug: "rola-mini-pet-monitor", score: 2.85, price: 139.00, priceCategory: "Best Value", animalCategory: "Robot", type: "Ai & Robotic Pets", movementLevel: 3, noiseSensitivityFit: 4, visualContrast: 3 },
];
