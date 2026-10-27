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

const unique = <AgentFanout agents={story.agents} tools={[...new Set(story.tools.flatMap(tool => tool.brand ? [tool.brand] : []))]} />;
const mapped = <AgentFanout tools={Array.from(new Set(story.tools.map(tool => tool.brand)))} />;
const providers = <AgentFanout tools={[...new Set(operations.flatMap(operation => operation.provider ? [operation.provider] : []))]} />;
