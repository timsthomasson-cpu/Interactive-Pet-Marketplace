// AUTO-GENERATED — do not edit by hand.
// Run: python Documentation/generate_ranked_list.py "Best Pets for Tech Savvy Seniors"
// Generated: 2026-07-16

export const GENERATED_DATE = '2026-07-16';

export const WEIGHTS = [
  { key: 'ai', label: 'Ai / Advanced Interaction Level', weight: "25%", reversed: false },
  { key: 'autonomous', label: 'Autonomous Interaction', weight: "10%", reversed: false },
  { key: 'brand', label: 'Brand / Seller Reliability', weight: "10%", reversed: false },
  { key: 'charging', label: 'Charging Convenience', weight: "10%", reversed: false },
  { key: 'customizatio', label: 'Customization Options', weight: "15%", reversed: false },
  { key: 'movement', label: 'Movement Level', weight: "5%", reversed: false },
  { key: 'privacy', label: 'Privacy Risk', weight: "10%", reversed: true },
  { key: 'touch', label: 'Touch Responsiveness', weight: "5%", reversed: false },
  { key: 'voice', label: 'Voice Response', weight: "10%", reversed: false },
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
    rank: 1, manufacturer: 'Loona', product: 'Robot Pet Dog',
    priceCategory: 'Premium', animal: 'Dog', price: '$499.00',
    rating: '4.2', reviews: '1,199', overall: '4.25',
    scores: { ai: 5, autonomous: 4, brand: 4, charging: 5, customizatio: 5, movement: 5, privacy: 1, touch: 4, voice: 4 },
  },
  {
    rank: 2, manufacturer: 'Enabot', product: 'EBO Air 2 Plus FamilyBot',
    priceCategory: 'Premium', animal: 'Robot', price: '$359.00',
    rating: '5.0', reviews: '42', overall: '3.5',
    scores: { ai: 4, autonomous: 3, brand: 4, charging: 5, customizatio: 4, movement: 4, privacy: 1, touch: 2, voice: 3 },
  },
  {
    rank: 3, manufacturer: 'Chongker', product: 'Percy 1.1 Robotic Companion Dog',
    priceCategory: 'Budget Friendly', animal: 'Dog', price: '$89.00',
    rating: '5.0', reviews: '5', overall: '3.5',
    scores: { ai: 3, autonomous: 3, brand: 4, charging: 3, customizatio: 3, movement: 3, privacy: 5, touch: 5, voice: 4 },
  },
  {
    rank: 4, manufacturer: 'Chongker', product: 'MateCat Pro',
    priceCategory: 'Best Value', animal: 'Cat', price: '$178.00',
    rating: '4.6', reviews: '456', overall: '3.5',
    scores: { ai: 3, autonomous: 3, brand: 4, charging: 3, customizatio: 3, movement: 3, privacy: 5, touch: 5, voice: 4 },
  },
  {
    rank: 5, manufacturer: 'Chongker', product: 'Percy Robot Cat',
    priceCategory: 'Budget Friendly', animal: 'Cat', price: '$89.00',
    rating: '5.0', reviews: '16', overall: '3.45',
    scores: { ai: 3, autonomous: 3, brand: 4, charging: 3, customizatio: 3, movement: 3, privacy: 5, touch: 4, voice: 4 },
  },
];
