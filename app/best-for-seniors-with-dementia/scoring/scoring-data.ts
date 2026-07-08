// AUTO-GENERATED — do not edit by hand.
// Run: python Documentation/generate_ranked_list.py "Best for Seniors with Dementia"
// Generated: 2026-07-08

export const GENERATED_DATE = '2026-07-08';

export const WEIGHTS = [
  { key: 'caregiver', label: 'Caregiver Burden', weight: "10%", reversed: true },
  { key: 'dementia', label: 'Dementia Suitability', weight: "25%", reversed: false },
  { key: 'emotional', label: 'Emotional Comfort Potential', weight: "15%", reversed: false },
  { key: 'sound', label: 'Sound Quality', weight: "10%", reversed: false },
  { key: 'recognizable', label: 'Recognizable Pet Appearance', weight: "10%", reversed: false },
  { key: 'safety', label: 'Safety Risk', weight: "10%", reversed: true },
  { key: 'simplicity', label: 'Simplicity Of Use', weight: "20%", reversed: false },
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
    rank: 1, manufacturer: 'Joy for All', product: 'Companion Pet Cat Orange Tabby',
    priceCategory: 'Best Value', animal: 'Cat', price: '$159.99',
    rating: '4.5', reviews: '11,640', overall: '4.7',
    scores: { caregiver: 4, dementia: 5, emotional: 5, sound: 3, recognizable: 5, safety: 5, simplicity: 5 },
  },
  {
    rank: 2, manufacturer: 'Joy for All', product: 'Companion Pet Pup Golden',
    priceCategory: 'Best Value', animal: 'Dog', price: '$179.00',
    rating: '4.3', reviews: '5,164', overall: '4.7',
    scores: { caregiver: 4, dementia: 5, emotional: 5, sound: 3, recognizable: 5, safety: 5, simplicity: 5 },
  },
  {
    rank: 3, manufacturer: 'Chongker', product: 'Percy Robot Cat',
    priceCategory: 'Budget Friendly', animal: 'Cat', price: '$89.00',
    rating: '5.0', reviews: '16', overall: '4.35',
    scores: { caregiver: 4, dementia: 4, emotional: 5, sound: 4, recognizable: 5, safety: 5, simplicity: 4 },
  },
  {
    rank: 4, manufacturer: 'Chongker', product: 'Breathing Calico Percy 2.0',
    priceCategory: 'Best Value', animal: 'Cat', price: '$109.00',
    rating: '5.0', reviews: '10', overall: '4.35',
    scores: { caregiver: 4, dementia: 4, emotional: 5, sound: 4, recognizable: 5, safety: 5, simplicity: 4 },
  },
  {
    rank: 5, manufacturer: 'Chongker', product: 'Percy 1.1 Robotic Companion Dog',
    priceCategory: 'Budget Friendly', animal: 'Dog', price: '$89.00',
    rating: '5.0', reviews: '5', overall: '4.35',
    scores: { caregiver: 4, dementia: 4, emotional: 5, sound: 4, recognizable: 5, safety: 5, simplicity: 4 },
  },
];
