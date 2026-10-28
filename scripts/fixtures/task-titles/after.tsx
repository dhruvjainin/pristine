import { PlanOutline } from "@app/ui";

export function Plan({ resources }) {
  const tasks = resources.map(resource => ({
    id: resource.key,
    title: `Create ${resource.name}`,
    reason: `${resource.kind}: ${resource.key}`,
  }));
  return <PlanOutline tasks={tasks} />;
}
