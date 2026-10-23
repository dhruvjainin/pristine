// Shared fixture for the Tidepool overview, used by both BEFORE and AFTER so the facts match.
// Worst-case rows (long name, unbreakable email, one-letter name) are spread across the first screen.

export const workspace = { name: "Tidepool Growth", user: "Sam Okafor", initials: "SO" };

export const weeks = [
  "Jul 28", "Aug 4", "Aug 11", "Aug 18", "Aug 25", "Sep 1",
  "Sep 8", "Sep 15", "Sep 22", "Sep 29", "Oct 6", "Oct 13",
];
export const signups = [968, 1012, 1040, 995, 1088, 1121, 1076, 1150, 1188, 1203, 1210, 1284];
export const activated = [320, 338, 351, 329, 362, 377, 358, 389, 402, 409, 414, 537];
export const mrr = [43180, 43610, 44020, 44390, 44870, 45320, 45710, 46280, 46940, 47450, 47820, 48920];

export const shippedIndex = 11; // onboarding checklist shipped Monday Oct 13
export const shippedLabel = "Onboarding checklist shipped";

export const funnel = [
  { step: "Visited signup page", count: 6930 },
  { step: "Created account", count: 1284 },
  { step: "Created first project", count: 902 },
  { step: "Installed tracking snippet", count: 611 },
  { step: "Activated (first event in 7 days)", count: 537 },
];

// Weekly cohorts, % of the cohort still active in week N. null = week hasn't happened yet.
export const cohorts = [
  { week: "Sep 8", size: 1076, values: [100, 58.2, 41.0, 33.4, 28.9, 27.1] },
  { week: "Sep 15", size: 1150, values: [100, 57.1, 40.3, 32.8, 28.1, null] },
  { week: "Sep 22", size: 1188, values: [100, 59.4, 41.8, 33.9, null, null] },
  { week: "Sep 29", size: 1203, values: [100, 58.8, 40.9, null, null, null] },
  { week: "Oct 6", size: 1210, values: [100, 60.1, null, null, null, null] },
  { week: "Oct 13", size: 1284, values: [100, null, null, null, null, null] },
];

export const events = [
  { at: "2026-10-19T16:42:00Z", ago: "2 min ago", name: "Aleksandra Wiśniewska-Kowalczyk", email: "aleksandra.wisniewska-kowalczyk@baltic-freight.example.com", event: "project_created", props: "project=Q4 Freight Lane Forecasting · template=blank · source=checklist_step_2", plan: "Trial" },
  { at: "2026-10-19T16:39:00Z", ago: "5 min ago", name: "Bartholomew Fitzgerald", email: "bartholomew.fitzgerald@northwind-industries-holdings.example.com", event: "snippet_installed", props: "domain=app.northwind-industries-holdings.example.com · framework=next · first_event_ms=8412", plan: "Growth" },
  { at: "2026-10-19T16:31:00Z", ago: "13 min ago", name: "Jo", email: "jo@kiln.example", event: "signup", props: "utm_source=newsletter · utm_campaign=oct-activation-guide", plan: "Free" },
  { at: "2026-10-19T16:20:00Z", ago: "24 min ago", name: "Đặng Thị Ngọc Hân", email: "han.dang@saigonmetrics.example.vn", event: "teammate_invited", props: "invited=3 · role=editor", plan: "Growth" },
  { at: "2026-10-19T15:58:00Z", ago: "46 min ago", name: "Priya Raman", email: "priya@ledgerfox.example", event: "plan_upgraded", props: "from=Free · to=Growth · mrr_delta=$149", plan: "Growth" },
  { at: "2026-10-19T15:41:00Z", ago: "1 hr ago", name: "Marcus Lindqvist", email: "marcus.lindqvist@fjordlabs.example.se", event: "checklist_completed", props: "steps=4/4 · minutes_to_complete=11", plan: "Trial" },
];

export const fmt = new Intl.NumberFormat("en-US");
export const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// AFTER-only context. Step conversion (% of previous step), averaged over the 11 weeks before the checklist.
export const funnelPrior = [null, 18.3, 62.0, 63.0, 86.0];
export const checklistSteps = ["Created first project", "Installed tracking snippet"]; // steps the checklist walks people through
export const finalReadLabel = "Mon, Oct 27"; // every Oct 13 signup has had its full 7 days by then

export type SourceState = "live" | "done" | "retrying" | "failed";
export const sources: { name: string; kind: string; state: SourceState; detail: string; meta: string; action?: string }[] = [
  { name: "Web SDK", kind: "app.tidepool.example", state: "live", detail: "41 events / min", meta: "3 rejected in the last hour: “plan” sent as a number" },
  { name: "iOS SDK", kind: "v4.2.1", state: "live", detail: "6 events / min", meta: "2 devices on v3.9 still sending legacy names" },
  { name: "Stripe billing", kind: "Feeds MRR", state: "retrying", detail: "Last sync 06:10 · retrying in 4 min", meta: "MRR may lag by up to 1 hour" },
  { name: "HubSpot CRM", kind: "Feeds company properties", state: "failed", detail: "Access token expired Oct 18", meta: "212 new accounts have no company size", action: "Reconnect HubSpot" },
  { name: "Warehouse export", kind: "Nightly to BigQuery", state: "done", detail: "1,912,408 rows at 05:00", meta: "Next run tonight at 05:00" },
];

// Arrives on the live feed after load, newest first.
export const incoming = [
  { at: "2026-10-19T16:44:00Z", name: "Tomás Echeverría", email: "tomas@altamar.example.cl", event: "signup", props: "utm_source=google · utm_campaign=brand", plan: "Free" },
  { at: "2026-10-19T16:44:30Z", name: "Aleksandra Wiśniewska-Kowalczyk", email: "aleksandra.wisniewska-kowalczyk@baltic-freight.example.com", event: "snippet_installed", props: "domain=freight.baltic-freight.example.com · framework=remix", plan: "Trial" },
  { at: "2026-10-19T16:45:10Z", name: "Jo", email: "jo@kiln.example", event: "project_created", props: "project=Kiln · template=saas · source=checklist_step_2", plan: "Free" },
  { at: "2026-10-19T16:46:00Z", name: "Mei-Ling Hsu", email: "meiling.hsu@pinecone-studio.example.tw", event: "checklist_completed", props: "steps=4/4 · minutes_to_complete=7", plan: "Trial" },
];
