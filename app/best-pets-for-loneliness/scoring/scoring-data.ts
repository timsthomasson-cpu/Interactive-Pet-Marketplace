// AUTO-GENERATED — do not edit by hand.
// Run: python Documentation/generate_ranked_list.py "Best Pets for Loneliness"
// Generated: 2026-07-15

export const GENERATED_DATE = '2026-07-15';

export const WEIGHTS = [
  { key: 'autonomous', label: 'Autonomous Interaction', weight: "20%", reversed: false },
  { key: 'emotional', label: 'Emotional Comfort Potential', weight: "30%", reversed: false },
  { key: 'realism', label: 'Realism Level', weight: "10%", reversed: false },
  { key: 'sound', label: 'Sound Quality', weight: "10%", reversed: false },
  { key: 'tactile', label: 'Tactile Comfort', weight: "15%", reversed: false },
  { key: 'touch', label: 'Touch Responsiveness', weight: "15%", reversed: false },
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
    rating: '4.6', reviews: '456', overall: '4.4',
    scores: { autonomous: 3, emotional: 5, realism: 4, sound: 4, tactile: 5, touch: 5 },
  },
  {
    rank: 2, manufacturer: 'Chongker', product: 'Percy 1.1 Robotic Companion Dog',
    priceCategory: 'Budget Friendly', animal: 'Dog', price: '$89.00',
    rating: '5.0', reviews: '5', overall: '4.25',
    scores: { autonomous: 3, emotional: 5, realism: 4, sound: 4, tactile: 4, touch: 5 },
  },
  {
    rank: 3, manufacturer: 'Chongker', product: 'Percy Robot Cat',
    priceCategory: 'Budget Friendly', animal: 'Cat', price: '$89.00',
    rating: '5.0', reviews: '16', overall: '4.1',
    scores: { autonomous: 3, emotional: 5, realism: 4, sound: 4, tactile: 4, touch: 4 },
  },
  {
    rank: 4, manufacturer: 'Joy for All', product: 'Companion Pet Cat Orange Tabby',
    priceCategory: 'Best Value', animal: 'Cat', price: '$159.99',
    rating: '4.5', reviews: '11,640', overall: '3.7',
    scores: { autonomous: 2, emotional: 5, realism: 3, sound: 3, tactile: 3, touch: 5 },
  },
  {
    rank: 5, manufacturer: 'Joy for All', product: 'Companion Pet Pup Golden',
    priceCategory: 'Best Value', animal: 'Dog', price: '$179.00',
    rating: '4.3', reviews: '5,164', overall: '3.7',
    scores: { autonomous: 2, emotional: 5, realism: 3, sound: 3, tactile: 3, touch: 5 },
  },
];
