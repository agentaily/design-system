import React from "react";
import { Checkbox } from "./Checkbox.jsx";

export default {
  title: "Inputs/Checkbox",
  component: Checkbox,
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: { label: "Remember this device" },
};

export const Default = {};

export const Controlled = {
  render: () => {
    const [checked, setChecked] = React.useState(true);
    return (
      <Checkbox
        label="Stream responses"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

export const States = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled, checked" disabled defaultChecked />
    </div>
  ),
};

export const Group = {
  render: () => {
    const [prefs, setPrefs] = React.useState({ memory: true, usage: false, beta: false });
    const toggle = (key) => (e) => setPrefs({ ...prefs, [key]: e.target.checked });
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Checkbox label="Keep chat memory" checked={prefs.memory} onChange={toggle("memory")} />
        <Checkbox label="Send anonymous usage data" checked={prefs.usage} onChange={toggle("usage")} />
        <Checkbox label="Join the beta channel" checked={prefs.beta} onChange={toggle("beta")} />
      </div>
    );
  },
};
