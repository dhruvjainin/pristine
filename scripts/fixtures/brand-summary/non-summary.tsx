const actions = <ToolActivity tools={story.tools.map(tool => tool.brand)} />;
const agents = <AgentFanout agents={story.tools.map(tool => tool.brand)} tools={uniqueBrands} />;
const identities = <AgentFanout tools={story.tools.map(tool => tool.id)} />;
const rows = <AgentFanout tools={story.tools.map(tool => ({ id: tool.id, brand: tool.brand }))} />;
