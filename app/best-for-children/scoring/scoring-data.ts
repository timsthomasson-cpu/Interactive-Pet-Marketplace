// AUTO-GENERATED — do not edit by hand.
// Run: python Documentation/generate_ranked_list.py "Best for Children"
// Generated: 2026-07-08

export const GENERATED_DATE = '2026-07-08';

export const WEIGHTS = [
  { key: 'durability', label: 'Durability', weight: "20%", reversed: false },
  { key: 'emotional', label: 'Emotional Comfort Potential', weight: "15%", reversed: false },
  { key: 'movement', label: 'Movement Level', weight: "10%", reversed: false },
  { key: 'safety', label: 'Safety Risk', weight: "20%", reversed: true },
  { key: 'sound', label: 'Sound Quality', weight: "10%", reversed: false },
  { key: 'touch', label: 'Touch Responsiveness', weight: "15%", reversed: false },
  { key: 'value', label: 'Value For Money', weight: "10%", reversed: false },
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
    rank: 1, manufacturer: 'Chongker', product: 'Percy 1.1 Robotic Companion Dog',
    priceCategory: 'Budget Friendly', animal: 'Dog', price: '$89.00',
    rating: '5.0', reviews: '5', overall: '4.4',
    scores: { durability: 4, emotional: 5, movement: 3, safety: 5, sound: 4, touch: 5, value: 4 },
  },
  {
    rank: 2, manufacturer: 'Chongker', product: 'MateCat Pro',
    priceCategory: 'Best Value', animal: 'Cat', price: '$178.00',
    rating: '4.6', reviews: '456', overall: '4.4',
    scores: { durability: 4, emotional: 5, movement: 3, safety: 5, sound: 4, touch: 5, value: 4 },
  },
  {
    rank: 3, manufacturer: 'Chongker', product: 'Percy Robot Cat',
    priceCategory: 'Budget Friendly', animal: 'Cat', price: '$89.00',
    rating: '5.0', reviews: '16', overall: '4.25',
    scores: { durability: 4, emotional: 5, movement: 3, safety: 5, sound: 4, touch: 4, value: 4 },
  },
  {
    rank: 4, manufacturer: 'Joy for All', product: 'Companion Pet Cat Orange Tabby',
    priceCategory: 'Best Value', animal: 'Cat', price: '$159.99',
    rating: '4.5', reviews: '11,640', overall: '4.1',
    scores: { durability: 3, emotional: 5, movement: 2, safety: 5, sound: 3, touch: 5, value: 5 },
  },
  {
    rank: 5, manufacturer: 'Joy for All', product: 'Companion Pet Pup Golden',
    priceCategory: 'Best Value', animal: 'Dog', price: '$179.00',
    rating: '4.3', reviews: '5,164', overall: '4.1',
    scores: { durability: 3, emotional: 5, movement: 2, safety: 5, sound: 3, touch: 5, value: 5 },
  },
];
