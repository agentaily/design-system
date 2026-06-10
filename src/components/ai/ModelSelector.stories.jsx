import React from "react";
import { ModelSelector } from "./ModelSelector.jsx";

const MODELS = [
  { value: "agentaily-2", description: "最强推理 · 128k context", tag: "DEFAULT" },
  { value: "agentaily-2-mini", description: "更快更省 · 64k context", tag: "FAST" },
  { value: "agentaily-1", description: "上一代 · 32k context" },
];

export default {
  title: "AI/ModelSelector",
  component: ModelSelector,
  argTypes: {
    align: { control: "select", options: ["start", "end"] },
  },
};

export const Default = {
  render: () => {
    const [model, setModel] = React.useState("agentaily-2");
    return (
      <div style={{ minHeight: 220 }}>
        <ModelSelector value={model} onChange={setModel} models={MODELS} />
      </div>
    );
  },
};

export const PlainStrings = {
  render: () => {
    const [model, setModel] = React.useState("agentaily-2-mini");
    return (
      <div style={{ minHeight: 180 }}>
        <ModelSelector
          value={model}
          onChange={setModel}
          models={["agentaily-2", "agentaily-2-mini", "agentaily-1"]}
        />
      </div>
    );
  },
};

export const AlignEnd = {
  render: () => {
    const [model, setModel] = React.useState("agentaily-2");
    return (
      <div
        style={{
          minHeight: 220,
          width: 420,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <span style={{ alignSelf: "flex-start" }}>
          <ModelSelector value={model} onChange={setModel} models={MODELS} align="end" />
        </span>
      </div>
    );
  },
};
