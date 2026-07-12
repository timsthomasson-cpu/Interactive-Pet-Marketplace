// AUTO-GENERATED — do not edit by hand.
// Run: python Documentation/generate_ranked_list.py "Best Premium Robotic Pets"
// Generated: 2026-07-07

export const GENERATED_DATE = '2026-07-07';

export const WEIGHTS = [
  { key: 'ai', label: 'Ai / Advanced Interaction Level', weight: "20%", reversed: false },
  { key: 'autonomous', label: 'Autonomous Interaction', weight: "15%", reversed: false },
  { key: 'brand', label: 'Brand / Seller Reliability', weight: "5%", reversed: false },
  { key: 'charging', label: 'Charging Convenience', weight: "5%", reversed: false },
  { key: 'customizatio', label: 'Customization Options', weight: "10%", reversed: false },
  { key: 'movement', label: 'Movement Level', weight: "15%", reversed: false },
  { key: 'privacy', label: 'Privacy Risk', weight: "5%", reversed: true },
  { key: 'realism', label: 'Realism Level', weight: "10%", reversed: false },
  { key: 'touch', label: 'Touch Responsiveness', weight: "10%", reversed: false },
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
    rank: 1, manufacturer: 'Loona', product: 'Robot Pet Dog',
    priceCategory: 'Premium', animal: 'Dog', price: '$499.00',
    rating: '4.2', reviews: '1,199', overall: '4.1',
    scores: { ai: 5, autonomous: 4, brand: 4, charging: 5, customizatio: 5, movement: 5, privacy: 1, realism: 2, touch: 4, value: 3 },
  },
  {
    rank: 2, manufacturer: 'Enabot', product: 'EBO Air 2 Plus FamilyBot',
    priceCategory: 'Premium', animal: 'Robot', price: '$359.00',
    rating: '5.0', reviews: '42', overall: '3.2',
    scores: { ai: 4, autonomous: 3, brand: 4, charging: 5, customizatio: 4, movement: 4, privacy: 1, realism: 1, touch: 2, value: 3 },
  },
  {
    rank: 3, manufacturer: 'Ropet', product: 'KAMOMO',
    priceCategory: 'Premium', animal: 'Robot', price: '$349.00',
    rating: '4.3', reviews: '17', overall: '3.0',
    scores: { ai: 4, autonomous: 3, brand: 3, charging: 3, customizatio: 4, movement: 1, privacy: 3, realism: 2, touch: 4, value: 3 },
  },
];
