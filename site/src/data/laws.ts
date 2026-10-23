export type LawGroup = "choose" | "group" | "act" | "learn" | "feel";
export type Law = { name: string; says: string; does: string; lens: string; group: LawGroup };

export const lawGroups: { id: LawGroup; name: string; d: string }[] = [
  { id: "choose", name: "Choosing", d: "How fast people pick, and what they notice first." },
  { id: "group", name: "Grouping", d: "How the eye decides what belongs together." },
  { id: "act", name: "Acting", d: "Targets, speed and the answer to every action." },
  { id: "learn", name: "Learning", d: "What people already know, and what they have to remember." },
  { id: "feel", name: "Feeling", d: "What people remember about how it felt." },
];

export const laws: Law[] = [
  { name: "Aesthetic-Usability Effect", says: "People believe a good-looking interface is easier to use.", does: "Holds every screen to the craft floor before calling it done.", lens: "polish-details" , group: "feel" },
  { name: "Hick's Law", says: "More choices make every decision slower.", does: "Caps competing choices at four, and counts them.", lens: "distill" , group: "choose" },
  { name: "Fitts's Law", says: "Big, close targets are faster to hit.", does: "44px targets, primary actions in thumb reach on mobile.", lens: "adapt" , group: "act" },
  { name: "Jakob's Law", says: "People expect your product to work like the ones they already use.", does: "Keeps familiar patterns unless breaking one clearly pays.", lens: "consistency" , group: "learn" },
  { name: "Miller's Law", says: "Short-term memory holds about seven things.", does: "Chunks any run longer than seven into named groups.", lens: "layout" , group: "group" },
  { name: "Doherty Threshold", says: "Responses under 400ms keep people in flow.", does: "Shows feedback on every action within 400ms, real or optimistic.", lens: "optimize" , group: "act" },
  { name: "Law of Proximity", says: "Things near each other read as related.", does: "Spaces tighter inside a group than between groups.", lens: "layout" , group: "group" },
  { name: "Law of Similarity", says: "Things that look alike read as the same kind.", does: "One look per role: same thing, same style, everywhere.", lens: "consistency" , group: "group" },
  { name: "Law of Common Region", says: "Things inside one boundary read as a group.", does: "Uses containers only where they mean a group.", lens: "layout" , group: "group" },
  { name: "Visual Hierarchy", says: "The eye goes to the strongest element first.", does: "One clear first read per screen, then a calm order.", lens: "bolder · quieter" , group: "choose" },
  { name: "Progressive Disclosure", says: "Show what most people need; reveal the rest on request.", does: "Moves advanced options behind a step, never removes them.", lens: "distill" , group: "learn" },
  { name: "Recognition over Recall", says: "Seeing an option beats remembering it.", does: "Visible labels, recent items, and examples in place of blank fields.", lens: "clarify" , group: "learn" },
  { name: "Von Restorff Effect", says: "The one thing that differs is the one remembered.", does: "One accent per screen, spent on the action that matters.", lens: "decolorize" , group: "choose" },
  { name: "Peak-End Rule", says: "People judge an experience by its best moment and its end.", does: "Designs the finish of a flow, not just the start.", lens: "delight" , group: "feel" },
  { name: "Goal-Gradient Effect", says: "People speed up as the goal gets close.", does: "Shows step progress, and never starts it at zero.", lens: "clarify" , group: "feel" },
  { name: "Serial Position Effect", says: "First and last items are remembered best.", does: "Puts the key items first and last in lists and nav.", lens: "layout" , group: "choose" },
  { name: "Tesler's Law", says: "Some complexity can't be removed, only moved.", does: "Moves it to the system: infer, prefill, detect.", lens: "distill" , group: "learn" },
  { name: "Postel's Law", says: "Be liberal in what you accept, strict in what you store.", does: "Accepts messy input, normalizes it, and says what it changed.", lens: "harden" , group: "act" },
  { name: "Occam's Razor", says: "The simplest solution that works is usually right.", does: "Removes before it adds.", lens: "distill" , group: "choose" },
  { name: "Feedback Loops", says: "Every action needs a visible result.", does: "Pressed, loading, done and failed states on everything that acts.", lens: "clarify · harden" , group: "act" },
];
