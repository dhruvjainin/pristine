import { PlanOutline } from "@app/ui";

export function Plan({ resources }) {
  const tasks = resources.map(resource => ({
    id: resource.key,
    title: `${resource.kind}: ${resource.key}`,
  }));
  return <PlanOutline tasks={tasks} />;
}

export function LegacyPlan({ items }) {
  const tasks = items.map(item => ({
    id: item.id,
    title: `${item.type}: ${item.id}`,
  }));
  return <PlanOutline tasks={tasks} />;
}
