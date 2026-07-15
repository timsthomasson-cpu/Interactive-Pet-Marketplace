// AUTO-GENERATED — do not edit by hand.
// Run: python Documentation/generate_ranked_list.py "Best Pets for Seniors Living Alone"
// Generated: 2026-07-15

export const GENERATED_DATE = '2026-07-15';

export const WEIGHTS = [
  { key: 'charging', label: 'Charging Convenience', weight: "5%", reversed: false },
  { key: 'emotional', label: 'Emotional Comfort Potential', weight: "25%", reversed: false },
  { key: 'maintenance', label: 'Maintenance Requirements', weight: "10%", reversed: true },
  { key: 'realism', label: 'Realism Level', weight: "10%", reversed: false },
  { key: 'safety', label: 'Safety Risk', weight: "10%", reversed: true },
  { key: 'simplicity', label: 'Simplicity Of Use', weight: "15%", reversed: false },
  { key: 'tactile', label: 'Tactile Comfort', weight: "15%", reversed: false },
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
    rank: 1, manufacturer: 'Chongker', product: 'MateCat Pro',
    priceCategory: 'Best Value', animal: 'Cat', price: '$178.00',
    rating: '4.6', reviews: '456', overall: '4.45',
    scores: { charging: 3, emotional: 5, maintenance: 4, realism: 4, safety: 5, simplicity: 4, tactile: 5, value: 4 },
  },
  {
    rank: 2, manufacturer: 'Chongker', product: 'Percy Robot Cat',
    priceCategory: 'Budget Friendly', animal: 'Cat', price: '$89.00',
    rating: '5.0', reviews: '16', overall: '4.3',
    scores: { charging: 3, emotional: 5, maintenance: 4, realism: 4, safety: 5, simplicity: 4, tactile: 4, value: 4 },
  },
  {
    rank: 3, manufacturer: 'Chongker', product: 'Percy 1.1 Robotic Companion Dog',
    priceCategory: 'Budget Friendly', animal: 'Dog', price: '$89.00',
    rating: '5.0', reviews: '5', overall: '4.3',
    scores: { charging: 3, emotional: 5, maintenance: 4, realism: 4, safety: 5, simplicity: 4, tactile: 4, value: 4 },
  },
  {
    rank: 4, manufacturer: 'Joy for All', product: 'Companion Pet Cat Orange Tabby',
    priceCategory: 'Best Value', animal: 'Cat', price: '$159.99',
    rating: '4.5', reviews: '11,640', overall: '4.25',
    scores: { charging: 2, emotional: 5, maintenance: 4, realism: 3, safety: 5, simplicity: 5, tactile: 3, value: 5 },
  },
  {
    rank: 5, manufacturer: 'Joy for All', product: 'Companion Pet Pup Golden',
    priceCategory: 'Best Value', animal: 'Dog', price: '$179.00',
    rating: '4.3', reviews: '5,164', overall: '4.25',
    scores: { charging: 2, emotional: 5, maintenance: 4, realism: 3, safety: 5, simplicity: 5, tactile: 3, value: 5 },
  },
];
