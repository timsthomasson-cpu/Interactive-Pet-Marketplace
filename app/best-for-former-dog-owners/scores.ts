// AUTO-GENERATED — do not edit by hand.
// Run: python Documentation/generate_ranked_list.py "Best For Former Dog Owners"
// Generated: 2026-07-07

export const TOP_SCORE_IN_GROUP = 4.5;

export type BestForScoreRow = {
  slug: string; score: number; scorePercent: number; price: number;
  priceCategory: "Best Value" | "Budget Friendly" | "Premium"; animalCategory: "Dog"; type: "Ai & Robotic Pets" | "Fluffy Companion";
  movementLevel: number; soundQuality: number; visualContrast: number;
};

// Alias used by CustomizeRankings
// Legacy alias
export type MemoryCareScoreRow = BestForScoreRow;
export const SCORES: BestForScoreRow[] = [
  { slug: 'percy-1-1-robotic-companion-dog', score: 4.50, scorePercent: 100, price: 89.00, priceCategory: 'Budget Friendly', animalCategory: 'Dog', type: 'Fluffy Companion', movementLevel: 3, soundQuality: 4, visualContrast: 3 },
  { slug: 'companion-pet-pup-freckled', score: 4.10, scorePercent: 91, price: 179.00, priceCategory: 'Best Value', animalCategory: 'Dog', type: 'Fluffy Companion', movementLevel: 2, soundQuality: 3, visualContrast: 3 },
  { slug: 'companion-pet-pup-golden', score: 4.10, scorePercent: 91, price: 179.00, priceCategory: 'Best Value', animalCategory: 'Dog', type: 'Fluffy Companion', movementLevel: 2, soundQuality: 3, visualContrast: 4 },
  { slug: 'wuffy-robot-puppy', score: 2.70, scorePercent: 60, price: 25.99, priceCategory: 'Budget Friendly', animalCategory: 'Dog', type: 'Fluffy Companion', movementLevel: 3, soundQuality: 2, visualContrast: 3 },
  { slug: 'robot-pet-dog', score: 2.50, scorePercent: 56, price: 499.00, priceCategory: 'Premium', animalCategory: 'Dog', type: 'Ai & Robotic Pets', movementLevel: 5, soundQuality: 3, visualContrast: 3 },
  { slug: 'original-border-collie', score: 2.80, scorePercent: 62, price: 44.45, priceCategory: 'Budget Friendly', animalCategory: 'Dog', type: 'Fluffy Companion', movementLevel: 1, soundQuality: 2, visualContrast: 3 },
  { slug: 'original-chocolate-lab', score: 2.80, scorePercent: 62, price: 44.45, priceCategory: 'Budget Friendly', animalCategory: 'Dog', type: 'Fluffy Companion', movementLevel: 1, soundQuality: 2, visualContrast: 3 },
  { slug: '18011-smart-robot-dog', score: 2.40, scorePercent: 53, price: 69.99, priceCategory: 'Budget Friendly', animalCategory: 'Dog', type: 'Ai & Robotic Pets', movementLevel: 4, soundQuality: 2, visualContrast: 3 },
];
// Legacy alias for existing imports
export const MEMORY_CARE_SCORES = SCORES;
