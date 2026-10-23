export const commands = [
  {
    name: "init",
    usage: "/pristine init",
    does: "Learns what your product does, who it's for, and the design system already in your code, then writes DESIGN.md.",
    when: "Once per project, before anything else. Every later command judges against it.",
    out: ["DESIGN.md: Product, Personas, Brand, Design System, Do / Don't", "The default standard applied: WCAG 2.2 AA, evergreen browsers, LCP < 2.5s on mobile"],
    edits: true,
  },
  {
    name: "critique",
    usage: "/pristine critique localhost:3000/pricing",
    does: "Screenshots the target, walks it as each Persona, and scores it out of 10 on 11 Dimensions with brutal honesty and the exact fixes to reach 10/10.",
    when: "Before a launch, in review, or when something feels off and you can't say why.",
    out: ["Overall score, Level, and per-Dimension scores", "Priority fixes ranked P0 to P2, each with its Lens", "Never edits a file"],
    edits: false,
  },
  {
    name: "design",
    usage: '/pristine design "a pricing page for teams"',
    does: "Builds new UI from scratch, or redesigns existing UI in a new direction. Offers 2 to 3 Directions, builds the one you pick, keeps every feature on a redesign.",
    when: "Nothing exists yet, or the current look can't be polished to a 10.",
    out: ["2 to 3 written Directions to choose from", "Production code to the craft floor, in light and dark, desktop and mobile", "A preserved-features checklist on redesigns"],
    edits: true,
  },
  {
    name: "polish",
    usage: "/pristine polish src/app/settings/page.tsx",
    does: "Diagnoses the target, then applies only the Lenses that raise its score, keeping the current look. Verifies with an after-capture.",
    when: "The UI exists and works, but isn't finished. This is what a bare /pristine does by default.",
    out: ["A Before / After / Why table with real values", "Dimension scores before and after", "What's still short of 10, honestly"],
    edits: true,
  },
] as const;

export const routes = [
  { ask: "\u201cBuild a pricing page\u201d", to: "design" },
  { ask: "\u201cRedesign the dashboard, it looks dated\u201d", to: "design" },
  { ask: "\u201cClean up the settings page\u201d", to: "polish" },
  { ask: "\u201cIs this signup any good?\u201d", to: "critique" },
];

export const lenses = [
  "bolder", "quieter", "colorize", "decolorize", "typeset", "layout", "consistency", "adapt",
  "animate", "delight", "overdrive", "clarify", "distill", "harden", "optimize", "polish-details",
];

export const targets = [
  { kind: "URL", eg: "localhost:3000/pricing" },
  { kind: "Screenshot", eg: "a pasted image" },
  { kind: "File path", eg: "src/components/Hero.tsx" },
  { kind: "Feature name", eg: "\u201cthe checkout flow\u201d" },
];

export const levels = [
  { n: 2, name: "Template", d: "Could be any product. Default fonts, stock gradients, emoji icons." },
  { n: 6, name: "Clean", d: "Nothing broken, nothing memorable. Where most agent output stops." },
  { n: 8, name: "Considered", d: "Real hierarchy, real states, designed dark mode, motion that explains." },
  { n: 10, name: "Memorable", d: "One idea only this product could have, finished to the last focus ring." },
];
