// AUTO-GENERATED — do not edit by hand.
// Run: python Documentation/generate_ranked_list.py "Best Pets for Remote Monitoring"
// Generated: 2026-07-16

export const TOP_SCORE_IN_GROUP = 3.5;

export type BestForScoreRow = {
  slug: string; score: number; scorePercent: number; price: number;
  priceCategory: "Best Value" | "Budget Friendly" | "Premium"; animalCategory: "Dog" | "Other" | "Robot"; type: "Ai & Robotic Pets";
  movementLevel: number; soundQuality: number; visualContrast: number;
};

// Alias used by CustomizeRankings
// Legacy alias
export type MemoryCareScoreRow = BestForScoreRow;
export const SCORES: BestForScoreRow[] = [
  { slug: 'ebo-air-2-familybot', score: 3.10, scorePercent: 89, price: 179.00, priceCategory: 'Best Value', animalCategory: 'Robot', type: 'Ai & Robotic Pets', movementLevel: 4, soundQuality: 3, visualContrast: 3 },
  { slug: 'ebo-air-2-plus-familybot', score: 3.25, scorePercent: 93, price: 359.00, priceCategory: 'Premium', animalCategory: 'Robot', type: 'Ai & Robotic Pets', movementLevel: 4, soundQuality: 3, visualContrast: 3 },
  { slug: 'ebo-air-2s-familybot', score: 3.10, scorePercent: 89, price: 279.00, priceCategory: 'Premium', animalCategory: 'Robot', type: 'Ai & Robotic Pets', movementLevel: 4, soundQuality: 3, visualContrast: 3 },
  { slug: 'ebo-x-familybot', score: 3.10, scorePercent: 89, price: 789.00, priceCategory: 'Premium', animalCategory: 'Robot', type: 'Ai & Robotic Pets', movementLevel: 4, soundQuality: 3, visualContrast: 3 },
  { slug: 'rola-mini-pet-monitor', score: 2.70, scorePercent: 77, price: 139.00, priceCategory: 'Best Value', animalCategory: 'Robot', type: 'Ai & Robotic Pets', movementLevel: 3, soundQuality: 3, visualContrast: 3 },
  { slug: 'dj-furby', score: 3.35, scorePercent: 96, price: 50.11, priceCategory: 'Budget Friendly', animalCategory: 'Other', type: 'Ai & Robotic Pets', movementLevel: 2, soundQuality: 3, visualContrast: 5 },
  { slug: 'robot-pet-dog', score: 3.50, scorePercent: 100, price: 499.00, priceCategory: 'Premium', animalCategory: 'Dog', type: 'Ai & Robotic Pets', movementLevel: 5, soundQuality: 3, visualContrast: 3 },
  { slug: 'kamomo', score: 3.40, scorePercent: 97, price: 349.00, priceCategory: 'Premium', animalCategory: 'Robot', type: 'Ai & Robotic Pets', movementLevel: 1, soundQuality: 3, visualContrast: 2 },
  { slug: '18011-smart-robot-dog', score: 3.20, scorePercent: 91, price: 69.99, priceCategory: 'Budget Friendly', animalCategory: 'Dog', type: 'Ai & Robotic Pets', movementLevel: 4, soundQuality: 2, visualContrast: 3 },
];
// Legacy alias for existing imports
export const MEMORY_CARE_SCORES = SCORES;
