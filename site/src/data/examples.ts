import type { Example } from "./schema";
const mods = import.meta.glob<{ default: Example }>("./examples/*.json", { eager: true });
export const examples: Example[] = Object.values(mods).map((m) => m.default).sort((a, b) => a.order - b.order);
export const getExample = (slug: string) => examples.find((e) => e.slug === slug);
