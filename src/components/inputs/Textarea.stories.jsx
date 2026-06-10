import React from "react";
import { Textarea } from "./Textarea.jsx";

export default {
  title: "Inputs/Textarea",
  component: Textarea,
  argTypes: {
    label: { control: "text" },
    hint: { control: "text" },
    rows: { control: "number" },
    disabled: { control: "boolean" },
  },
  args: { label: "System prompt", rows: 4, placeholder: "You are…" },
};

export const Default = {
  render: (args) => (
    <div style={{ width: 420 }}>
      <Textarea {...args} />
    </div>
  ),
};

export const WithHint = {
  render: () => (
    <div style={{ width: 420 }}>
      <Textarea
        label="System prompt"
        rows={4}
        placeholder="You are…"
        hint="Applied to every new chat. Up to 4096 characters."
      />
    </div>
  ),
};

export const Controlled = {
  render: () => {
    const [value, setValue] = React.useState(
      "You are Agentaily, a precise assistant. Answer plainly. Cite numbers exactly."
    );
    return (
      <div style={{ width: 420 }}>
        <Textarea
          label="System prompt"
          rows={5}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          hint={value.length + "/4096 characters"}
        />
      </div>
    );
  },
};

export const Disabled = {
  render: () => (
    <div style={{ width: 420 }}>
      <Textarea label="Audit notes" rows={3} defaultValue="Locked after review on 2026-06-02." disabled />
    </div>
  ),
};
