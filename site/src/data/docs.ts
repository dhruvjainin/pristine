export type Prompt = { cmd: string; note: string };
export type Step = { t: string; d: string };

export type CommandDoc = {
  slug: string;
  name: string;
  line: string;
  intro: string;
  edits: boolean;
  tryIt: Prompt[];
  steps: Step[];
  youGet: string[];
  check: string[];
  followUp: Prompt;
  related: string[];
};

export type LensDoc = {
  slug: string;
  name: string;
  group: LensGroup;
  line: string;
  intro: string;
  raises: string;
  skip: string;
  tryIt: Prompt;
  examples: { before: string; after: string }[];
  laws: string[];
};

export type LensGroup = "louder" | "calmer" | "structure" | "motion" | "sturdier";

export const lensGroups: { id: LensGroup; name: string; d: string }[] = [
  { id: "louder", name: "Make it stronger", d: "The page is flat, timid or anonymous." },
  { id: "calmer", name: "Make it calmer", d: "The page is loud, busy or crowded." },
  { id: "structure", name: "Fix the structure", d: "The eye goes to the wrong place, or the page breaks on one screen." },
  { id: "motion", name: "Make it feel alive", d: "Nothing answers, or one moment deserves more." },
  { id: "sturdier", name: "Make it hold up", d: "Real data, slow networks, keyboards, and the last 5%." },
];

export const commandDocs: CommandDoc[] = [
  {
    slug: "init",
    name: "init",
    line: "Teach Pristine your product, your users and your design system.",
    intro:
      "Run init once per project. Pristine reads your code first: the routes, the components, the tokens, the copy. Then it asks only what the code can't tell it. The answers go into one DESIGN.md that every later command reads before it judges or builds.",
    edits: true,
    tryIt: [
      { cmd: "/pristine init", note: "The usual start. It explores the repo, then asks a few short questions, one at a time." },
      { cmd: "/pristine init this is a budgeting app for freelancers who get paid irregularly", note: "Say what the product is up front and it skips that question." },
      { cmd: "/pristine init update the personas, we now sell to agencies too", note: "Run it again any time. It edits the existing DESIGN.md instead of starting over." },
    ],
    steps: [
      { t: "Reads what already exists", d: "An existing DESIGN.md, README, package.json, the routes and the shared components." },
      { t: "Explores before asking", d: "Pulls colors, fonts, spacing and radii from your CSS and components, so the Design System section describes what you actually ship." },
      { t: "Asks what code can't show", d: "What the product does, who uses it, what they must feel in five seconds, and their deal-breakers. One question at a time, with a recommended answer first." },
      { t: "Writes DESIGN.md", d: "Product, Personas, Brand, Design System and Do / Don't. The default standard is filled in for you: WCAG 2.2 AA, evergreen browsers, readable with JS off, reduced motion, LCP under 2.5s on mobile." },
    ],
    youGet: ["DESIGN.md at the project root", "Two or three named Personas with a job, context and deal-breakers", "Your real tokens, written down"],
    check: [
      "Read the Personas. If one doesn't sound like a real customer, say so; every score is judged through them.",
      "Check the token table against your CSS. Wrong tokens mean every later fix uses the wrong values.",
      "Add exceptions you need, such as \"must support Safari 15\" or \"no dark mode\".",
    ],
    followUp: { cmd: "Maya isn't a designer, she's a finance lead who checks numbers on her phone between meetings. Update her.", note: "Correct a Persona in plain words; it rewrites that section only." },
    related: ["critique", "design", "polish"],
  },
  {
    slug: "critique",
    name: "critique",
    line: "Score a page out of 10, through your users' eyes, with the fixes to reach 10.",
    intro:
      "Critique is honest review without edits. It screenshots the target in light and dark, on desktop and mobile, walks it as each Persona, and scores 11 Dimensions. Every finding names the element, the value and the fix. It never touches a file.",
    edits: false,
    tryIt: [
      { cmd: "/pristine critique localhost:3000/pricing", note: "A URL is the most accurate target: it captures the real rendered page." },
      { cmd: "/pristine critique src/app/onboarding/page.tsx", note: "A file path works too. It finds the route that renders it and captures that." },
      { cmd: "/pristine critique  [pasted screenshot]", note: "Paste a screenshot of anything, including a competitor. It finds the matching code if it's yours." },
      { cmd: "/pristine is the checkout flow any good?", note: "Plain questions about quality route to critique automatically." },
    ],
    steps: [
      { t: "Loads context", d: "Reads DESIGN.md for Personas and tokens. Without one, it uses the code as the system and sensible fallback Personas." },
      { t: "Captures before judging", d: "Desktop 1440 and mobile 390, light and dark, full page. Waits for fonts, hydration and hover delays so it doesn't call a loading state a bug." },
      { t: "Walks it as each Persona", d: "Can Maya on a laptop do her job? Can Arjun on a phone? Where do they hesitate, and where do they leave?" },
      { t: "Places it on a Level, then scores", d: "Level 2 template, 6 clean, 8 considered, 10 memorable. Then 11 Dimensions, each with evidence and the fix to reach 10." },
      { t: "Runs the detector", d: "A static scan for things like tiny text, missing labels and ignored reduced motion. Findings are checked by eye, not trusted blindly." },
    ],
    youGet: [
      "Overall score, Level and a two-line verdict",
      "A Dimension table: score, evidence, and what 10 needs",
      "Priority fixes P0 to P2, each with its Lens",
      "What already works, so polish doesn't break it",
    ],
    check: [
      "Look at the Captured line. If a cell is missing (say, no dark mode), the score for it is a guess.",
      "Push back on any finding you disagree with. It will either show evidence or withdraw it.",
      "A 9 is rare and a 10 is rarer. A 6 is normal for working software.",
    ],
    followUp: { cmd: "/pristine polish the P0 and P1 fixes from that critique", note: "Polish picks up the saved findings instead of diagnosing again." },
    related: ["polish", "design"],
  },
  {
    slug: "design",
    name: "design",
    line: "Build something new, or redesign what you have in a new direction.",
    intro:
      "Design is for when there's nothing to polish yet, or when the current look can't reach a 10. It offers two or three written Directions, builds the one you pick in your real codebase, and checks it in all four Capture cells before it says it's done. A redesign keeps every feature and every word that matters.",
    edits: true,
    tryIt: [
      { cmd: "/pristine design a pricing page for teams of 5 to 50", note: "A fresh build. Say who it's for and it shapes the Directions around them." },
      { cmd: "/pristine design redesign the dashboard, it looks like every admin template", note: "A redesign. Content and behavior stay; the look changes." },
      { cmd: "/pristine design an empty state for the projects list, editorial and calm", note: "Name the direction yourself and it skips the choice, states it in two lines, and builds." },
      { cmd: "/pristine design a status badge like this  [pasted screenshot]", note: "A reference image fixes the look. It asks one question about motion and states before building." },
    ],
    steps: [
      { t: "Reads context and the baseline", d: "DESIGN.md, the routes around the target, and on a redesign a full Capture of the current page plus a list of every feature it must keep." },
      { t: "Writes 2 to 3 Directions", d: "Each one is an idea, not a shade: the structure, type, color, motion and one signature moment. You pick one." },
      { t: "Builds tokens first", d: "Extends your tokens with what the Direction needs and updates DESIGN.md to match. No hard-coded one-off values." },
      { t: "Builds to the craft floor", d: "Light and dark, desktop and mobile, every state (empty, loading, error, long content), keyboard and screen reader." },
      { t: "Verifies by looking", d: "One more Capture of all four cells, then fixes what it finds before reporting." },
    ],
    youGet: [
      "The chosen Direction, built in your stack",
      "On a redesign, a checklist of preserved features",
      "Dimension scores, and what's still short of 10",
    ],
    check: [
      "Use it on a phone. Directions are judged on desktop first by most people; mobile is where they break.",
      "Toggle dark mode. It should look designed, not inverted.",
      "On a redesign, go through the preserved-features list and try each one.",
    ],
    followUp: { cmd: "Direction B, but keep our current navy as the accent instead of the green", note: "Mix and adjust Directions in plain words before or after the build." },
    related: ["polish", "critique", "init"],
  },
  {
    slug: "polish",
    name: "polish",
    line: "Finish what you have. Same look, every detail raised.",
    intro:
      "Polish is what a bare /pristine runs on existing UI. It captures the page, finds what's holding the score down, and applies only the Lenses that raise it, keeping the look, content and behavior. Then it captures again and reports every change with real values.",
    edits: true,
    tryIt: [
      { cmd: "/pristine polish src/app/settings/page.tsx", note: "The default. It picks the Lenses from what it finds." },
      { cmd: "/pristine the signup form feels off on mobile", note: "Describe the symptom. A bare invocation on existing UI routes to polish." },
      { cmd: "/pristine polish bolder typeset the landing hero", note: "Name Lenses to force them. It runs exactly those, in that order." },
      { cmd: "/pristine polish harden the invoices table, real customers have 40-character company names", note: "Give the edge case you care about and it tests that first." },
    ],
    steps: [
      { t: "Captures and diagnoses", d: "A baseline Capture of all four cells and a quick score, so every change has a before." },
      { t: "Plans the Lenses", d: "Picks the few that raise the lowest Dimensions. Never two that fight, like bolder and quieter." },
      { t: "Applies them in order", d: "Structure before detail: distill and layout, then typeset and color, then motion, then harden and the last details." },
      { t: "Verifies by looking", d: "Captures again, checks nothing regressed, and reruns the detector on every edited file." },
    ],
    youGet: [
      "A Before / After / Why table with real values (\"13px #999 → 15px --ink-2, 4.9:1\")",
      "Dimension scores before and after",
      "Detector findings it accepted, with the reason",
      "What's still short of 10, honestly",
    ],
    check: [
      "Do the main task on a narrow screen, then try the empty, loading and error states.",
      "Tab through it. Every focusable thing should show where focus is.",
      "If polish says the page is below Level 6, it will recommend design instead of quietly redesigning.",
    ],
    followUp: { cmd: "The error message is clearer now, but the form jumps when it appears. Keep the button still.", note: "Point at what's still wrong; it fixes that and captures again." },
    related: ["critique", "design"],
  },
];

export const lensDocs: LensDoc[] = [
  {
    slug: "bolder", name: "bolder", group: "louder",
    line: "Take a clear position on what matters, and say it with confidence.",
    intro: "For sections that read flat, timid or interchangeable. Bolder is a decisive move in scale, weight, contrast or space. Gradients, glows and extra animation are the opposite.",
    raises: "Persona fit, Hierarchy & clarity",
    skip: "The page is already loud or busy (use quieter). Dense task screens like tables and settings, where the problem is clarity.",
    tryIt: { cmd: "/pristine polish bolder the landing hero", note: "Best on heroes, headlines, key numbers and the one primary action." },
    examples: [
      { before: "36px headline, 3 equal buttons, stock illustration", after: "80px headline in the display face, one primary action, the real product as the image" },
      { before: "Key metric at 14px in a row of 8 identical cards", after: "The metric at 52px, alone, with its change and what it means" },
    ],
    laws: ["Visual Hierarchy", "Von Restorff Effect"],
  },
  {
    slug: "colorize", name: "colorize", group: "louder",
    line: "Give color a job: action, state, category, or a deliberate mood.",
    intro: "For gray-on-gray screens where the primary action hides and selected looks like unselected. Every color it adds encodes something and comes from your tokens.",
    raises: "Color & theming",
    skip: "Too many colors already (use decolorize). Inventing a new brand palette, which is a DESIGN.md decision.",
    tryIt: { cmd: "/pristine polish colorize the kanban board", note: "Good for status, categories, charts and selected states." },
    examples: [
      { before: "Every status pill gray, selected tab only bold", after: "Status hues for blocked and done only, selected tab with the accent underline" },
      { before: "Chart series in 6 default library colors", after: "Your series in one ramp, the series that matters in the accent" },
    ],
    laws: ["Law of Similarity", "Von Restorff Effect"],
  },
  {
    slug: "typeset", name: "typeset", group: "louder",
    line: "Make text comfortable to read and obvious in its role.",
    intro: "A real type scale, deliberate weights, a readable line length, and type that survives every viewport, theme and slow font load.",
    raises: "Typography",
    skip: "The type is fine and the structure is wrong (use layout) or the words are wrong (use clarify).",
    tryIt: { cmd: "/pristine polish typeset the docs article", note: "Best on long reading, docs, dense tables and anything with many text sizes." },
    examples: [
      { before: "11 font sizes, body at 14px, 110-character lines", after: "6-step scale, body 17/1.6, 68-character measure" },
      { before: "Numbers in a table jump width as they change", after: "Tabular numerals, right-aligned, units in a quieter weight" },
    ],
    laws: ["Visual Hierarchy", "Aesthetic-Usability Effect"],
  },
  {
    slug: "delight", name: "delight", group: "motion",
    line: "Show the product's character in a useful moment.",
    intro: "Not confetti. Delight finds the few moments where a user feels relief, pride or worry, and makes the product answer like it understands.",
    raises: "Persona fit",
    skip: "Broken states or contrast failures remain (fix those first). Payments, deletion and security, where calm beats charm.",
    tryIt: { cmd: "/pristine polish delight the first-project-created moment", note: "Point it at a finish line: first success, an empty state, a completed setup." },
    examples: [
      { before: "\"Success!\" toast after the first invoice is paid", after: "\"Paid, 3 days early. $412 set aside for Q3 tax.\" with the set-aside amount counting up" },
      { before: "Empty inbox: gray icon and \"No items\"", after: "\"All caught up. Last client reply was 2 hours ago.\"" },
    ],
    laws: ["Peak-End Rule", "Goal-Gradient Effect"],
  },
  {
    slug: "overdrive", name: "overdrive", group: "motion",
    line: "One extraordinary moment that only this product could have.",
    intro: "The riskiest Lens, so it proposes before it builds. Used only when the basics already score 7 or more.",
    raises: "Persona fit",
    skip: "Weak hierarchy, type or contrast. Screens where people need calm focus, like settings.",
    tryIt: { cmd: "/pristine polish overdrive the pricing page", note: "Expect a written proposal first. Say yes, adjust, or no." },
    examples: [
      { before: "Static three-plan grid", after: "A \"price it for your setup\" control that rewrites every card's real total as you change it" },
      { before: "Screenshot of the product in the hero", after: "The real product, live and interactive, running on sample data" },
    ],
    laws: ["Von Restorff Effect", "Peak-End Rule"],
  },
  {
    slug: "quieter", name: "quieter", group: "calmer",
    line: "Turn the volume down everywhere except the one thing that leads.",
    intro: "For screens where everything shouts and long sessions are tiring. Quiet keeps a point of view: gray text on white with identical cards is not quiet, it's generic.",
    raises: "Hierarchy & clarity, Persona fit",
    skip: "The page is flat or timid (use bolder). Too many elements rather than too much intensity (use distill).",
    tryIt: { cmd: "/pristine polish quieter the admin dashboard", note: "Best on tools people use all day." },
    examples: [
      { before: "Bold labels, bold values, heavy shadows on every card", after: "Regular labels in ink-2, values in weight 600, hairline borders, one shadow" },
      { before: "Badges, icons and color on every table row", after: "Color only on the rows that need action" },
    ],
    laws: ["Visual Hierarchy", "Von Restorff Effect"],
  },
  {
    slug: "decolorize", name: "decolorize", group: "calmer",
    line: "Make color rare enough to mean something.",
    intro: "When every section and tag has its own hue, the primary action stops standing out. Decolorize moves to tinted neutrals and one accent that does real work.",
    raises: "Color & theming, Hierarchy & clarity",
    skip: "Already monochrome with unclear states (use colorize).",
    tryIt: { cmd: "/pristine polish decolorize the feature grid", note: "Good on landing pages, tag-heavy lists and rainbow dashboards." },
    examples: [
      { before: "Six feature cards, six icon colors, gradient buttons", after: "One ink icon style, one accent on the primary action" },
      { before: "Tags in 9 random hues", after: "Neutral tags, the accent only on the filter that's active" },
    ],
    laws: ["Von Restorff Effect", "Law of Similarity"],
  },
  {
    slug: "distill", name: "distill", group: "calmer",
    line: "Remove what stands between the user and their goal.",
    intro: "Every element has to earn its place. Distill cuts, merges and moves advanced options behind a step. It never removes something a Persona needs.",
    raises: "Hierarchy & clarity, Persona fit",
    skip: "The page is sparse and flat (use bolder) or is missing information (use clarify).",
    tryIt: { cmd: "/pristine polish distill the signup form", note: "Best on forms, onboarding, pricing and crowded headers." },
    examples: [
      { before: "Signup asks for 9 fields, including company size and phone", after: "Email and password; the rest asked later, when it's needed" },
      { before: "Five pricing plans and a comparison of 40 rows", after: "Three plans, the 6 rows that differ, the rest one click away" },
    ],
    laws: ["Hick's Law", "Progressive Disclosure", "Tesler's Law", "Occam's Razor"],
  },
  {
    slug: "layout", name: "layout", group: "structure",
    line: "Put things in the order the eye should read them.",
    intro: "What is this screen, what matters most, what belongs together: layout answers those before a word is read. Spacing tighter inside a group than between groups does most of the work.",
    raises: "Layout & spacing, Hierarchy & clarity",
    skip: "Structure is fine and only type or color is weak. Breaks on one viewport only (use adapt).",
    tryIt: { cmd: "/pristine polish layout the settings page", note: "Best on long pages, dashboards and settings." },
    examples: [
      { before: "24px gap everywhere, 14 settings in one column", after: "Four named groups, 12px inside a group and 48px between" },
      { before: "Primary chart in the third row", after: "Primary chart first and full width, details below" },
    ],
    laws: ["Law of Proximity", "Law of Common Region", "Miller's Law", "Serial Position Effect"],
  },
  {
    slug: "adapt", name: "adapt", group: "structure",
    line: "Make it feel native on the screen the user is actually holding.",
    intro: "Not shrinking pixels. Adapt rethinks the experience for a phone on a bus, a laptop at a desk and a wide monitor: thumb reach, real targets, what to show first.",
    raises: "Responsiveness",
    skip: "The problem looks the same on every screen (use layout or typeset). Native iOS and Android, which Pristine doesn't cover.",
    tryIt: { cmd: "/pristine polish adapt the booking flow", note: "It captures at 390px and also checks 320 and 768." },
    examples: [
      { before: "Desktop table squeezed to 390px with horizontal scroll", after: "Each row becomes a card with the two fields people scan" },
      { before: "Primary button at the top of a long mobile form", after: "Sticky bottom action in thumb reach, 48px tall" },
    ],
    laws: ["Fitts's Law", "Jakob's Law"],
  },
  {
    slug: "consistency", name: "consistency", group: "structure",
    line: "Make the product feel like one thing, made by one team.",
    intro: "Same concept, same look, same words, same behavior everywhere. Users learn it once and trust it after that.",
    raises: "Consistency",
    skip: "The design system itself is wrong (fix DESIGN.md first). One-off details (use polish-details).",
    tryIt: { cmd: "/pristine polish consistency across the account pages", note: "Point it at several related screens at once." },
    examples: [
      { before: "Buttons in 4 heights and 3 radii across settings", after: "One button component, 48px, 6px radius" },
      { before: "\"Delete\", \"Remove\" and \"Trash\" for the same action", after: "\"Delete\" everywhere, with the same confirm pattern" },
    ],
    laws: ["Jakob's Law", "Law of Similarity"],
  },
  {
    slug: "animate", name: "animate", group: "motion",
    line: "Use motion to say \"I heard you\", \"this came from there\", and \"this changed\".",
    intro: "Motion with a job, at 60fps, using transform and opacity only. The more often a motion plays, the less of it there should be. Reduced motion still fades instead of jumping.",
    raises: "Motion & interaction",
    skip: "The page already feels overstimulating (use quieter). Hiding weak layout behind movement.",
    tryIt: { cmd: "/pristine polish animate the sidebar and dropdowns", note: "Best on menus, panels, lists that change and press feedback." },
    examples: [
      { before: "Dropdown appears instantly and vanishes instantly", after: "Scales from its trigger in 160ms, fades out in 120ms" },
      { before: "Removed list item just disappears", after: "Item collapses its height while the rest slide up, 200ms" },
    ],
    laws: ["Doherty Threshold", "Feedback Loops"],
  },
  {
    slug: "clarify", name: "clarify", group: "sturdier",
    line: "Make the words say what's happening, what to do next, and what it costs.",
    intro: "Reads the interface like a nervous first-time user. Every label that makes someone guess, hesitate or feel blamed is a bug. Prices, legal text and facts are never changed without asking.",
    raises: "Copy, Hierarchy & clarity",
    skip: "The words are clear and the problem is visual (use typeset or layout).",
    tryIt: { cmd: "/pristine polish clarify the payment errors", note: "Best on errors, empty states, buttons and confirmation dialogs." },
    examples: [
      { before: "\"Error 402: Request failed\"", after: "\"Your card was declined. Try another card, or check with your bank.\"" },
      { before: "Button: \"Submit\"", after: "Button: \"Send invoice to Harbor & Pine\"" },
    ],
    laws: ["Recognition over Recall", "Feedback Loops", "Goal-Gradient Effect"],
  },
  {
    slug: "harden", name: "harden", group: "sturdier",
    line: "Make it survive real names, real networks and real people.",
    intro: "Tries hard to break the design, then makes every broken case look intentional: long text, empty data, slow loads, errors, keyboard only, screen readers, 200% zoom.",
    raises: "Robustness & performance, Accessibility",
    skip: "The happy path itself is unclear (fix that first with layout or clarify).",
    tryIt: { cmd: "/pristine polish harden the team members table", note: "Tell it your worst real data and it tests that first." },
    examples: [
      { before: "A 40-character company name breaks the card layout", after: "It truncates with a tooltip, and the full name is in the accessible label" },
      { before: "Loading shows a blank page for 2 seconds", after: "A skeleton that matches the final layout, with no shift when data arrives" },
    ],
    laws: ["Postel's Law", "Feedback Loops"],
  },
  {
    slug: "optimize", name: "optimize", group: "sturdier",
    line: "Make it feel fast on the user's real phone, then prove it.",
    intro: "Measures first, fixes the biggest bottleneck, and measures again. Judges speed by what people see: when content appears, whether it jumps, whether taps answer at once.",
    raises: "Robustness & performance",
    skip: "Nothing is measurably slow. It never trades accessibility or quality for a number.",
    tryIt: { cmd: "/pristine polish optimize the home page on mobile", note: "Reports LCP, layout shift and interaction delay before and after." },
    examples: [
      { before: "1.8MB hero PNG, LCP 4.1s on mobile", after: "AVIF at the rendered size with high fetch priority, LCP 1.9s" },
      { before: "Font swap shifts the headline by 40px", after: "Metric-matched fallback, no visible shift" },
    ],
    laws: ["Doherty Threshold"],
  },
  {
    slug: "polish-details", name: "polish-details", group: "sturdier",
    line: "Hunt the small defects that make a product feel unfinished.",
    intro: "The last pass: edges a few pixels off, a missing hover, a focus ring that disappears on one background, a control row with mismatched heights. It refines; it never redesigns.",
    raises: "All Dimensions",
    skip: "The concept or structure is wrong; details can't save it (use bolder, layout or distill).",
    tryIt: { cmd: "/pristine polish polish-details the checkout page", note: "Run it last, after the bigger Lenses." },
    examples: [
      { before: "Copy box 52px tall next to a 48px button", after: "Both use the 48px control height and line up" },
      { before: "Focus ring invisible on the dark footer", after: "A 2px ring in a color that passes 3:1 on both backgrounds" },
    ],
    laws: ["Aesthetic-Usability Effect", "Law of Similarity"],
  },
];
