// AUTO-GENERATED — do not edit by hand.
// Run: python Documentation/generate_ranked_list.py "Best for Remote Monitoring"
// Generated: 2026-07-11

export const GENERATED_DATE = '2026-07-11';

export const WEIGHTS = [
  { key: 'ai', label: 'Ai / Advanced Interaction Level', weight: "15%", reversed: false },
  { key: 'brand', label: 'Brand / Seller Reliability', weight: "10%", reversed: false },
  { key: 'charging', label: 'Charging Convenience', weight: "10%", reversed: false },
  { key: 'customizatio', label: 'Customization Options', weight: "10%", reversed: false },
  { key: 'movement', label: 'Movement Level', weight: "5%", reversed: false },
  { key: 'privacy', label: 'Privacy Risk', weight: "10%", reversed: true },
  { key: 'cleanability', label: 'Cleanability', weight: "5%", reversed: false },
  { key: 'durability', label: 'Durability', weight: "10%", reversed: false },
  { key: 'fallrisk', label: 'Fall-Risk Profile', weight: "10%", reversed: false },
  { key: 'maintenance', label: 'Maintenance Requirements', weight: "5%", reversed: true },
  { key: 'simplicity', label: 'Simplicity Of Use', weight: "10%", reversed: false },
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
    rating: '5.0', reviews: '16', overall: '3.75',
    scores: { ai: 3, brand: 4, charging: 3, customizatio: 3, movement: 3, privacy: 5, cleanability: 3, durability: 4, fallrisk: 5, maintenance: 4, simplicity: 4 },
  },
  {
    rank: 2, manufacturer: 'Chongker', product: 'Percy 1.1 Robotic Companion Dog',
    priceCategory: 'Budget Friendly', animal: 'Dog', price: '$89.00',
    rating: '5.0', reviews: '5', overall: '3.75',
    scores: { ai: 3, brand: 4, charging: 3, customizatio: 3, movement: 3, privacy: 5, cleanability: 3, durability: 4, fallrisk: 5, maintenance: 4, simplicity: 4 },
  },
  {
    rank: 3, manufacturer: 'Chongker', product: 'MateCat Pro',
    priceCategory: 'Best Value', animal: 'Cat', price: '$178.00',
    rating: '4.6', reviews: '456', overall: '3.75',
    scores: { ai: 3, brand: 4, charging: 3, customizatio: 3, movement: 3, privacy: 5, cleanability: 3, durability: 4, fallrisk: 5, maintenance: 4, simplicity: 4 },
  },
  {
    rank: 4, manufacturer: 'Loona', product: 'Robot Pet Dog',
    priceCategory: 'Premium', animal: 'Dog', price: '$499.00',
    rating: '4.2', reviews: '1,199', overall: '3.5',
    scores: { ai: 5, brand: 4, charging: 5, customizatio: 5, movement: 5, privacy: 1, cleanability: 4, durability: 4, fallrisk: 2, maintenance: 2, simplicity: 1 },
  },
  {
    rank: 5, manufacturer: 'Ropet', product: 'KAMOMO',
    priceCategory: 'Premium', animal: 'Robot', price: '$349.00',
    rating: '4.3', reviews: '17', overall: '3.4',
    scores: { ai: 4, brand: 3, charging: 3, customizatio: 4, movement: 1, privacy: 3, cleanability: 3, durability: 3, fallrisk: 5, maintenance: 4, simplicity: 3 },
  },
];
