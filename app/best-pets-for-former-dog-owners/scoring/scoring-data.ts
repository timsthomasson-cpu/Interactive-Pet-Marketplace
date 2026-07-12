// AUTO-GENERATED — do not edit by hand.
// Run: python Documentation/generate_ranked_list.py "Best Pets for Former Dog Owners"
// Generated: 2026-07-12

export const GENERATED_DATE = '2026-07-12';

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
    rank: 1, manufacturer: 'Chongker', product: 'Percy 1.1 Robotic Companion Dog',
    priceCategory: 'Budget Friendly', animal: 'Dog', price: '$89.00',
    rating: '5.0', reviews: '5', overall: '4.5',
    scores: { emotional: 5, realism: 4, recognizable: 5, simplicity: 4, sound: 4, tactile: 4, touch: 5 },
  },
  {
    rank: 2, manufacturer: 'Joy for All', product: 'Companion Pet Pup Golden',
    priceCategory: 'Best Value', animal: 'Dog', price: '$179.00',
    rating: '4.3', reviews: '5,164', overall: '4.1',
    scores: { emotional: 5, realism: 3, recognizable: 5, simplicity: 5, sound: 3, tactile: 3, touch: 5 },
  },
  {
    rank: 3, manufacturer: 'Perfect Petzzz', product: 'Original Chocolate Lab',
    priceCategory: 'Budget Friendly', animal: 'Dog', price: '$44.45',
    rating: '4.3', reviews: '553', overall: '2.8',
    scores: { emotional: 3, realism: 1, recognizable: 4, simplicity: 5, sound: 2, tactile: 5, touch: 1 },
  },
  {
    rank: 4, manufacturer: 'Wuffy', product: 'Wuffy Robot Puppy',
    priceCategory: 'Budget Friendly', animal: 'Dog', price: '$25.99',
    rating: '3.0', reviews: '80', overall: '2.7',
    scores: { emotional: 3, realism: 2, recognizable: 3, simplicity: 3, sound: 2, tactile: 3, touch: 3 },
  },
  {
    rank: 5, manufacturer: 'Loona', product: 'Robot Pet Dog',
    priceCategory: 'Premium', animal: 'Dog', price: '$499.00',
    rating: '4.2', reviews: '1,199', overall: '2.5',
    scores: { emotional: 3, realism: 2, recognizable: 2, simplicity: 1, sound: 3, tactile: 2, touch: 4 },
  },
];
