// AUTO-GENERATED — do not edit by hand.
// Run: python Documentation/generate_ranked_list.py "Best Budget Friendly Pets"
// Generated: 2026-07-16

export const GENERATED_DATE = '2026-07-16';

export const WEIGHTS = [
  { key: 'durability', label: 'Durability', weight: "10%", reversed: false },
  { key: 'emotional', label: 'Emotional Comfort Potential', weight: "15%", reversed: false },
  { key: 'maintenance', label: 'Maintenance Requirements', weight: "10%", reversed: true },
  { key: 'return', label: 'Return / Gift Suitability', weight: "5%", reversed: false },
  { key: 'review', label: 'Review Strength', weight: "10%", reversed: false },
  { key: 'simplicity', label: 'Simplicity Of Use', weight: "10%", reversed: false },
  { key: 'tactile', label: 'Tactile Comfort', weight: "10%", reversed: false },
  { key: 'value', label: 'Value For Money', weight: "30%", reversed: false },
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
    scores: { durability: 4, emotional: 5, maintenance: 4, return: 4, review: 2, simplicity: 4, tactile: 4, value: 4 },
  },
  {
    rank: 2, manufacturer: 'Furby', product: 'DJ Furby',
    priceCategory: 'Budget Friendly', animal: 'Other', price: '$50.11',
    rating: '4.8', reviews: '772', overall: '3.9',
    scores: { durability: 4, emotional: 3, maintenance: 4, return: 5, review: 4, simplicity: 4, tactile: 4, value: 4 },
  },
  {
    rank: 3, manufacturer: 'Chongker', product: 'Percy 1.1 Robotic Companion Dog',
    priceCategory: 'Budget Friendly', animal: 'Dog', price: '$89.00',
    rating: '5.0', reviews: '5', overall: '3.85',
    scores: { durability: 4, emotional: 5, maintenance: 4, return: 4, review: 1, simplicity: 4, tactile: 4, value: 4 },
  },
  {
    rank: 4, manufacturer: 'Perfect Petzzz', product: 'Grey Tabby Cat',
    priceCategory: 'Budget Friendly', animal: 'Cat', price: '$44.45',
    rating: '4.3', reviews: '848', overall: '3.8',
    scores: { durability: 4, emotional: 3, maintenance: 5, return: 3, review: 4, simplicity: 5, tactile: 5, value: 3 },
  },
  {
    rank: 5, manufacturer: 'Perfect Petzzz', product: 'Original Chocolate Lab',
    priceCategory: 'Budget Friendly', animal: 'Dog', price: '$44.45',
    rating: '4.3', reviews: '553', overall: '3.8',
    scores: { durability: 4, emotional: 3, maintenance: 5, return: 3, review: 4, simplicity: 5, tactile: 5, value: 3 },
  },
];
