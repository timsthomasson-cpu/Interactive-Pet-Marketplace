// AUTO-GENERATED — do not edit by hand.
// Run: python Documentation/generate_ranked_list.py "Best for Autism"
// Generated: 2026-07-08

export const GENERATED_DATE = '2026-07-08';

export const WEIGHTS = [
  { key: 'durability', label: 'Durability', weight: "5%", reversed: false },
  { key: 'emotional', label: 'Emotional Comfort Potential', weight: "10%", reversed: false },
  { key: 'sound', label: 'Sound Quality', weight: "20%", reversed: false },
  { key: 'safety', label: 'Safety Risk', weight: "15%", reversed: true },
  { key: 'simplicity', label: 'Simplicity Of Use', weight: "15%", reversed: false },
  { key: 'soundlevelcont', label: 'Sound Level Control', weight: "10%", reversed: false },
  { key: 'tactile', label: 'Tactile Comfort', weight: "25%", reversed: false },
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
    rank: 1, manufacturer: 'Chongker', product: 'MateCat Pro',
    priceCategory: 'Best Value', animal: 'Cat', price: '$178.00',
    rating: '4.6', reviews: '456', overall: '4.6',
    scores: { durability: 4, emotional: 5, sound: 4, safety: 5, simplicity: 4, soundlevelcont: 5, tactile: 5 },
  },
  {
    rank: 2, manufacturer: 'Chongker', product: 'Percy Robot Cat',
    priceCategory: 'Budget Friendly', animal: 'Cat', price: '$89.00',
    rating: '5.0', reviews: '16', overall: '4.35',
    scores: { durability: 4, emotional: 5, sound: 4, safety: 5, simplicity: 4, soundlevelcont: 5, tactile: 4 },
  },
  {
    rank: 3, manufacturer: 'Chongker', product: 'Percy 1.1 Robotic Companion Dog',
    priceCategory: 'Budget Friendly', animal: 'Dog', price: '$89.00',
    rating: '5.0', reviews: '5', overall: '4.35',
    scores: { durability: 4, emotional: 5, sound: 4, safety: 5, simplicity: 4, soundlevelcont: 5, tactile: 4 },
  },
  {
    rank: 4, manufacturer: 'Chongker', product: 'Breathing Red Panda Plush',
    priceCategory: 'Best Value', animal: 'Panda', price: '$119.00',
    rating: '5.0', reviews: '2', overall: '4.3',
    scores: { durability: 3, emotional: 4, sound: 4, safety: 4, simplicity: 4, soundlevelcont: 5, tactile: 5 },
  },
  {
    rank: 5, manufacturer: 'Joy for All', product: 'Companion Pet Cat Orange Tabby',
    priceCategory: 'Best Value', animal: 'Cat', price: '$159.99',
    rating: '4.5', reviews: '11,640', overall: '4.0',
    scores: { durability: 3, emotional: 5, sound: 3, safety: 5, simplicity: 5, soundlevelcont: 5, tactile: 3 },
  },
];
