export type Period = "annual" | "monthly";
export type PlanId = "starter" | "pro" | "business";

export interface Plan {
  id: PlanId;
  name: string;
  price: Record<Period, number>;
  included: number;
  taxes: boolean;
}

export const EXTRA = 4.99;
export const CPA = 20;
export const MIN_ACCOUNTS = 1;
export const MAX_ACCOUNTS = 12;
export const DEFAULT_ACCOUNTS = 3;

export const PLANS: Plan[] = [
  { id: "starter", name: "Starter", price: { annual: 12, monthly: 15 }, included: 1, taxes: false },
  { id: "pro", name: "Pro", price: { annual: 28, monthly: 35 }, included: 3, taxes: true },
  { id: "business", name: "Business", price: { annual: 56, monthly: 70 }, included: Infinity, taxes: true },
];

export interface Quote {
  plan: Plan;
  base: number;
  extras: number;
  extraCost: number;
  cpa: number;
  total: number;
  yearly: number;
}

export function quote(plan: Plan, accounts: number, cpa: boolean, period: Period): Quote {
  const base = plan.price[period];
  const extras = Math.max(0, accounts - plan.included);
  const extraCost = round(extras * EXTRA);
  const cpaCost = cpa ? CPA : 0;
  const total = round(base + extraCost + cpaCost);
  return { plan, base, extras, extraCost, cpa: cpaCost, total, yearly: round(total * 12) };
}

// Cheapest plan that includes quarterly tax estimates; ties go to the plan with room to grow.
export function bestFit(accounts: number, period: Period): PlanId {
  const pro = quote(PLANS[1], accounts, false, period).total;
  const biz = quote(PLANS[2], accounts, false, period).total;
  return pro < biz ? "pro" : "business";
}

export function crossover(period: Period): number {
  for (let n = MIN_ACCOUNTS; n <= MAX_ACCOUNTS; n++) if (bestFit(n, period) === "business") return n;
  return MAX_ACCOUNTS + 1;
}

const round = (n: number) => Math.round(n * 100) / 100;

export const money = (n: number) =>
  Number.isInteger(n) ? `$${n.toLocaleString("en-US")}` : `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// Chart geometry shared by the server render and the client marker.
export const CHART = { w: 360, h: 168, left: 34, right: 14, top: 14, bottom: 30, max: 90 };
export const cx = (n: number) => CHART.left + ((n - MIN_ACCOUNTS) / (MAX_ACCOUNTS - MIN_ACCOUNTS)) * (CHART.w - CHART.left - CHART.right);
export const cy = (v: number) => CHART.top + (1 - Math.min(v, CHART.max) / CHART.max) * (CHART.h - CHART.top - CHART.bottom);
