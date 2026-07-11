// AUTO-GENERATED — do not edit by hand.
// Run: python Documentation/generate_ranked_list.py "Best for Former Cat Owners"
// Generated: 2026-07-07

export const GENERATED_DATE = '2026-07-07';

export const WEIGHTS = [
  { key: 'emotional', label: 'Emotional Comfort Potential', weight: "15%", reversed: false },
  { key: 'realism', label: 'Realism Level', weight: "20%", reversed: false },
  { key: 'recognizable', label: 'Recognizable Pet Appearance', weight: "20%", reversed: false },
  { key: 'simplicity', label: 'Simplicity Of Use', weight: "5%", reversed: false },
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
    rating: '4.6', reviews: '456', overall: '4.65',
    scores: { emotional: 5, realism: 4, recognizable: 5, simplicity: 4, sound: 4, tactile: 5, touch: 5 },
  },
  {
    rank: 2, manufacturer: 'Chongker', product: 'Percy Robot Cat',
    priceCategory: 'Budget Friendly', animal: 'Cat', price: '$89.00',
    rating: '5.0', reviews: '16', overall: '4.35',
    scores: { emotional: 5, realism: 4, recognizable: 5, simplicity: 4, sound: 4, tactile: 4, touch: 4 },
  },
  {
    rank: 3, manufacturer: 'Joy for All', product: 'Companion Pet Cat Orange Tabby',
    priceCategory: 'Best Value', animal: 'Cat', price: '$159.99',
    rating: '4.5', reviews: '11,640', overall: '4.1',
    scores: { emotional: 5, realism: 3, recognizable: 5, simplicity: 5, sound: 3, tactile: 3, touch: 5 },
  },
  {
    rank: 4, manufacturer: 'Perfect Petzzz', product: 'Grey Tabby Cat',
    priceCategory: 'Budget Friendly', animal: 'Cat', price: '$44.45',
    rating: '4.3', reviews: '848', overall: '2.8',
    scores: { emotional: 3, realism: 1, recognizable: 4, simplicity: 5, sound: 2, tactile: 5, touch: 1 },
  },
];
