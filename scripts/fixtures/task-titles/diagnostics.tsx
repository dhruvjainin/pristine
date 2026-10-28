export function Diagnostics({ resources }) {
  const entries = resources.map(resource => ({
    title: `${resource.kind}: ${resource.key}`,
  }));
  return <pre>{JSON.stringify(entries)}</pre>;
}
