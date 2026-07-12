// AUTO-GENERATED — do not edit by hand.
// Run: python Documentation/generate_ranked_list.py "Best Pets for Seniors in Memory Care Facilities"
// Generated: 2026-07-12

export const GENERATED_DATE = '2026-07-12';

export const WEIGHTS = [
  { key: 'charging', label: 'Charging Convenience', weight: "10%", reversed: false },
  { key: 'caregiver', label: 'Caregiver Burden', weight: "15%", reversed: true },
  { key: 'cleanability', label: 'Cleanability', weight: "20%", reversed: false },
  { key: 'dementia', label: 'Dementia Suitability', weight: "10%", reversed: false },
  { key: 'durability', label: 'Durability', weight: "20%", reversed: false },
  { key: 'privacy', label: 'Privacy Risk', weight: "10%", reversed: true },
  { key: 'safety', label: 'Safety Risk', weight: "15%", reversed: true },
] as const;

export type ScoreKey = typeof WEIGHTS[number]["key"];

export type RankedRow = {
  rank: number; manufacturer: string; product: string;
  priceCategory: string; animal: string; price: string;
  rating: string; reviews: string; overall: string;
  scores: Record<ScoreKey, number>;
};

export const ROWS: RankedRow[] = [
  {
    rank: 1, manufacturer: 'Chongker', product: 'Percy Robot Cat',
    priceCategory: 'Budget Friendly', animal: 'Cat', price: '$89.00',
    rating: '5.0', reviews: '16', overall: '3.95',
    scores: { charging: 3, caregiver: 4, cleanability: 3, dementia: 4, durability: 4, privacy: 5, safety: 5 },
  },
  {
    rank: 2, manufacturer: 'Chongker', product: 'Breathing Calico Percy 2.0',
    priceCategory: 'Best Value', animal: 'Cat', price: '$109.00',
    rating: '5.0', reviews: '10', overall: '3.95',
    scores: { charging: 3, caregiver: 4, cleanability: 3, dementia: 4, durability: 4, privacy: 5, safety: 5 },
  },
  {
    rank: 3, manufacturer: 'Chongker', product: 'Percy 1.1 Robotic Companion Dog',
    priceCategory: 'Budget Friendly', animal: 'Dog', price: '$89.00',
    rating: '5.0', reviews: '5', overall: '3.95',
    scores: { charging: 3, caregiver: 4, cleanability: 3, dementia: 4, durability: 4, privacy: 5, safety: 5 },
  },
  {
    rank: 4, manufacturer: 'Perfect Petzzz', product: 'Grey Tabby Cat',
    priceCategory: 'Budget Friendly', animal: 'Cat', price: '$44.45',
    rating: '4.3', reviews: '848', overall: '3.9',
    scores: { charging: 2, caregiver: 5, cleanability: 3, dementia: 3, durability: 4, privacy: 5, safety: 5 },
  },
  {
    rank: 5, manufacturer: 'Perfect Petzzz', product: 'Original Chocolate Lab',
    priceCategory: 'Budget Friendly', animal: 'Dog', price: '$44.45',
    rating: '4.3', reviews: '553', overall: '3.9',
    scores: { charging: 2, caregiver: 5, cleanability: 3, dementia: 3, durability: 4, privacy: 5, safety: 5 },
  },
];
