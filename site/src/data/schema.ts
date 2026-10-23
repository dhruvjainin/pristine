export type Mode = "Persuade" | "Operate" | "Read" | "Experience";
export type Priority = "P0" | "P1" | "P2";

export interface Example {
  slug: string;
  order: number;
  title: string;            // "SaaS landing page"
  product: string;          // fictional product name used in the demo, e.g. "Ledgerline"
  blurb: string;            // one sentence for the card
  mode: Mode;
  persona: { name: string; role: string; goal: string };
  command: string;          // e.g. "/pristine polish src/pages/index.astro"
  hasDark: boolean;         // does the AFTER support dark mode
  before: { score: number; level: 2 | 6 | 8 | 10; verdict: string };
  after: { score: number; level: 2 | 6 | 8 | 10; verdict: string };
  dimensions: { name: string; before: number; after: number }[]; // all 11, in critique order
  critique: { priority: Priority; title: string; detail: string; lens: string }[]; // 4-6 items from the before critique
  changes: { lens: string; before: string; after: string; why: string }[];        // 6-10 rows, real CSS/markup values
  tells: string[];          // vibe-code tells present in BEFORE
}

export const DIMENSIONS = [
  "Persona fit", "Hierarchy & clarity", "Layout & spacing", "Typography", "Color & theming",
  "Consistency", "Responsiveness", "Motion & interaction", "Accessibility", "Copy", "Robustness & performance",
] as const;
