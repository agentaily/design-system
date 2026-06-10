import React from "react";
import { Snippet } from "./Snippet.jsx";

export default {
  title: "Code/Snippet",
  component: Snippet,
  args: { code: "npm install @agentaily/sdk" },
};

export const Default = {};

export const CustomPrompt = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 460 }}>
      <Snippet prompt=">" code="npx agentaily init my-bot" />
      <Snippet prompt="#" code="systemctl restart agentaily" />
      <Snippet prompt="" code="AGENTAILY_KEY=ag-7f29c4 node server.js" />
    </div>
  ),
};

export const LongCommand = {
  render: () => (
    <div style={{ maxWidth: 380 }}>
      <Snippet code="curl -s https://api.agentaily.chat/v1/models -H 'Authorization: Bearer ag-7f29c4e1b8d2'" />
    </div>
  ),
};
