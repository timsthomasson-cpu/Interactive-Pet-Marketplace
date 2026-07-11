// AUTO-GENERATED — do not edit by hand.
// Run: python Documentation/generate_ranked_list.py "Best for Privacy Conscious Families"
// Generated: 2026-07-11

export const GENERATED_DATE = '2026-07-11';

export const WEIGHTS = [
  { key: 'ai', label: 'Ai / Advanced Interaction Level', weight: "10%", reversed: false },
  { key: 'autonomous', label: 'Autonomous Interaction', weight: "20%", reversed: false },
  { key: 'brand', label: 'Brand / Seller Reliability', weight: "10%", reversed: false },
  { key: 'maintenance', label: 'Maintenance Requirements', weight: "5%", reversed: true },
  { key: 'privacy', label: 'Privacy Risk', weight: "35%", reversed: true },
  { key: 'safety', label: 'Safety Risk', weight: "5%", reversed: true },
  { key: 'simplicity', label: 'Simplicity Of Use', weight: "10%", reversed: false },
  { key: 'value', label: 'Value For Money', weight: "5%", reversed: false },
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
    rating: '5.0', reviews: '16', overall: '4.1',
    scores: { ai: 3, autonomous: 3, brand: 4, maintenance: 4, privacy: 5, safety: 5, simplicity: 4, value: 4 },
  },
  {
    rank: 2, manufacturer: 'Chongker', product: 'Breathing Calico Percy 2.0',
    priceCategory: 'Best Value', animal: 'Cat', price: '$109.00',
    rating: '5.0', reviews: '10', overall: '4.1',
    scores: { ai: 3, autonomous: 3, brand: 4, maintenance: 4, privacy: 5, safety: 5, simplicity: 4, value: 4 },
  },
  {
    rank: 3, manufacturer: 'Chongker', product: 'Percy 1.1 Robotic Companion Dog',
    priceCategory: 'Budget Friendly', animal: 'Dog', price: '$89.00',
    rating: '5.0', reviews: '5', overall: '4.1',
    scores: { ai: 3, autonomous: 3, brand: 4, maintenance: 4, privacy: 5, safety: 5, simplicity: 4, value: 4 },
  },
  {
    rank: 4, manufacturer: 'Furby', product: 'DJ Furby',
    priceCategory: 'Budget Friendly', animal: 'Other', price: '$50.11',
    rating: '4.8', reviews: '772', overall: '3.9',
    scores: { ai: 2, autonomous: 2, brand: 5, maintenance: 4, privacy: 5, safety: 5, simplicity: 4, value: 4 },
  },
  {
    rank: 5, manufacturer: 'Perfect Petzzz', product: 'Grey Tabby Cat',
    priceCategory: 'Budget Friendly', animal: 'Cat', price: '$44.45',
    rating: '4.3', reviews: '848', overall: '3.9',
    scores: { ai: 1, autonomous: 3, brand: 3, maintenance: 5, privacy: 5, safety: 5, simplicity: 5, value: 3 },
  },
];
