const story = {
  tools: [
    { id: "read-issue", brand: "github" },
    { id: "read-file", brand: "github" },
    { id: "create-pr", brand: "github" },
    { id: "notify", brand: "slack" },
    { id: "local" },
  ],
  agents: [{ id: "research" }, { id: "review" }],
};

const repeated = <AgentFanout agents={story.agents} tools={story.tools.flatMap(tool => tool.brand ? [tool.brand] : [])} />;
const mapped = <AgentFanout tools={story.tools.map(tool => tool.brand)} />;
const providers = <AgentFanout
  tools={operations.flatMap((operation) =>
    operation.provider ? [operation.provider] : []
  )}
/>;
const mappedProviders = <AgentFanout tools={operations.map(operation => operation.provider)} />;
