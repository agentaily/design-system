import React from "react";
import { Switch } from "./Switch.jsx";

export default {
  title: "Inputs/Switch",
  component: Switch,
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: { label: "Stream responses" },
};

export const Default = {};

export const Controlled = {
  render: () => {
    const [on, setOn] = React.useState(true);
    return <Switch label="Stream responses" checked={on} onChange={(e) => setOn(e.target.checked)} />;
  },
};

export const States = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
      <Switch label="Disabled, off" disabled />
      <Switch label="Disabled, on" disabled defaultChecked />
    </div>
  ),
};

export const SettingsList = {
  render: () => {
    const [settings, setSettings] = React.useState({ stream: true, memory: true, sounds: false });
    const toggle = (key) => (e) => setSettings({ ...settings, [key]: e.target.checked });
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Switch label="Stream responses" checked={settings.stream} onChange={toggle("stream")} />
        <Switch label="Keep chat memory" checked={settings.memory} onChange={toggle("memory")} />
        <Switch label="Notification sounds" checked={settings.sounds} onChange={toggle("sounds")} />
      </div>
    );
  },
};
