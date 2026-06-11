import React from "react";
import { Input } from "./Input.jsx";

export default {
  title: "Inputs/Input",
  component: Input,
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    hint: { control: "text" },
    error: { control: "text" },
    mono: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { label: "API key", mono: true, placeholder: "ax-", hint: "Stored locally." },
};

export const Default = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <Input {...args} />
    </div>
  ),
};

export const WithError = {
  render: () => (
    <div style={{ width: 320 }}>
      <Input label="Email" type="email" defaultValue="yarn@" error="Enter a complete address." />
    </div>
  ),
};

export const States = {
  render: () => (
    <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 16 }}>
      <Input label="Display name" placeholder="Ada Lovelace" />
      <Input label="Session id" mono defaultValue="sess_7f3a2c" hint="Read-only after creation." />
      <Input label="Email" defaultValue="yarn@" error="Enter a complete address." />
      <Input label="Organization" defaultValue="Agentaily" disabled />
    </div>
  ),
};

export const Controlled = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div style={{ width: 320 }}>
        <Input
          label="Workspace name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="my-workspace"
          hint={value.length + "/32 characters"}
        />
      </div>
    );
  },
};

export const Required = {
  render: () => {
    const [name, setName] = React.useState("");
    const [touched, setTouched] = React.useState(false);
    const error = touched && !name.trim() ? "Display name is required." : undefined;
    return (
      <div style={{ width: 320 }}>
        <Input
          label="Display name"
          required
          placeholder="Lin Wei"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched(true)}
          error={error}
        />
      </div>
    );
  },
};
