import React from "react";
import { Select } from "./Select.jsx";

export default {
  title: "Inputs/Select",
  component: Select,
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Model",
    options: ["agentaily-2", "agentaily-2-mini", "agentaily-1"],
  },
};

export const Default = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <Select {...args} />
    </div>
  ),
};

export const Controlled = {
  render: () => {
    const [model, setModel] = React.useState("agentaily-2");
    return (
      <div style={{ width: 280 }}>
        <Select
          label="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          options={["agentaily-2", "agentaily-2-mini", "agentaily-1"]}
        />
      </div>
    );
  },
};

export const ObjectOptions = {
  render: () => {
    const [ctx, setCtx] = React.useState("128k");
    return (
      <div style={{ width: 280 }}>
        <Select
          label="Context window"
          value={ctx}
          onChange={(e) => setCtx(e.target.value)}
          options={[
            { value: "32k", label: "32k tokens" },
            { value: "128k", label: "128k tokens" },
            { value: "200k", label: "200k tokens" },
          ]}
        />
      </div>
    );
  },
};

export const Disabled = {
  render: () => (
    <div style={{ width: 280 }}>
      <Select label="Region" options={["us-east-1"]} disabled />
    </div>
  ),
};
