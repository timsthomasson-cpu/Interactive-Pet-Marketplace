// AUTO-GENERATED — do not edit by hand.
// Run: python Documentation/generate_ranked_list.py "Best Pets for Seniors with Vision Challenges"
// Generated: 2026-07-12

export const GENERATED_DATE = '2026-07-12';

export const WEIGHTS = [
  { key: 'control', label: 'Control Accessibility', weight: "15%", reversed: false },
  { key: 'fallrisk', label: 'Fall-Risk Profile', weight: "5%", reversed: false },
  { key: 'safety', label: 'Safety Risk', weight: "10%", reversed: true },
  { key: 'size', label: 'Size And Portability', weight: "15%", reversed: false },
  { key: 'sound', label: 'Sound Level Control', weight: "10%", reversed: false },
  { key: 'soundquality', label: 'Sound Quality', weight: "10%", reversed: false },
  { key: 'tactile', label: 'Tactile Comfort', weight: "10%", reversed: false },
  { key: 'visual', label: 'Visual Contrast / Visibility', weight: "25%", reversed: false },
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
    rank: 1, manufacturer: 'Furby', product: 'DJ Furby',
    priceCategory: 'Budget Friendly', animal: 'Other', price: '$50.11',
    rating: '4.8', reviews: '772', overall: '4.2',
    scores: { control: 4, fallrisk: 4, safety: 5, size: 5, sound: 2, soundquality: 3, tactile: 4, visual: 5 },
  },
  {
    rank: 2, manufacturer: 'Joy for All', product: 'Companion Pet Cat Orange Tabby',
    priceCategory: 'Best Value', animal: 'Cat', price: '$159.99',
    rating: '4.5', reviews: '11,640', overall: '4.2',
    scores: { control: 5, fallrisk: 5, safety: 5, size: 4, sound: 5, soundquality: 3, tactile: 3, visual: 4 },
  },
  {
    rank: 3, manufacturer: 'Joy for All', product: 'Companion Pet Pup Golden',
    priceCategory: 'Best Value', animal: 'Dog', price: '$179.00',
    rating: '4.3', reviews: '5,164', overall: '4.2',
    scores: { control: 5, fallrisk: 5, safety: 5, size: 4, sound: 5, soundquality: 3, tactile: 3, visual: 4 },
  },
  {
    rank: 4, manufacturer: 'Chongker', product: 'Breathing Red Panda Plush',
    priceCategory: 'Best Value', animal: 'Panda', price: '$119.00',
    rating: '5.0', reviews: '2', overall: '4.1',
    scores: { control: 3, fallrisk: 5, safety: 4, size: 4, sound: 5, soundquality: 4, tactile: 5, visual: 4 },
  },
  {
    rank: 5, manufacturer: 'Chongker', product: 'MateCat Pro',
    priceCategory: 'Best Value', animal: 'Cat', price: '$178.00',
    rating: '4.6', reviews: '456', overall: '4.1',
    scores: { control: 4, fallrisk: 5, safety: 5, size: 4, sound: 5, soundquality: 4, tactile: 5, visual: 3 },
  },
];
