// Set-aside model for the hero: a single filer in Colorado, 2026.
// Self-employment tax is 15.3% on 92.35% of net earnings (≈14.1%).
// Federal income tax: 12% bracket until $4,400 more income, then 22%.
export const RATES = { se: 0.141, fedLow: 0.12, fedHigh: 0.22, state: 0.044, bracketRoom: 4400 };

// Q4 before this payment arrived.
const Q4_BASE_ESTIMATE = 2131;
const Q4_BASE_SAVED = 1499;

export interface Split {
  payment: number;
  se: number;
  fed: number;
  state: number;
  tax: number;
  keep: number;
  pct: number;
  crosses: boolean;
  q4Estimate: number;
  q4SavedBefore: number;
  q4Saved: number;
  q4Left: number;
}

export function split(payment: number): Split {
  const se = Math.round(payment * RATES.se);
  const low = Math.min(payment, RATES.bracketRoom);
  const high = Math.max(0, payment - RATES.bracketRoom);
  const fed = Math.round(low * RATES.fedLow + high * RATES.fedHigh);
  const state = Math.round(payment * RATES.state);
  const tax = se + fed + state;
  return {
    payment,
    se,
    fed,
    state,
    tax,
    keep: payment - tax,
    pct: Math.round((tax / payment) * 1000) / 10,
    crosses: high > 0,
    q4Estimate: Q4_BASE_ESTIMATE + tax,
    q4SavedBefore: Q4_BASE_SAVED,
    q4Saved: Q4_BASE_SAVED + tax,
    q4Left: Q4_BASE_ESTIMATE - Q4_BASE_SAVED,
  };
}

export const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const PAYMENTS = [
  { amount: 850, payer: "Okoro Bakehouse", ref: "Invoice #0139" },
  { amount: 4200, payer: "Harbor & Pine Studio", ref: "Invoice #0142" },
  { amount: 12000, payer: "Lumen Orthodontics Group", ref: "Invoice #0147, rebrand" },
];
