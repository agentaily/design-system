import React from "react";
import { Toggle, ToggleGroup } from "./Toggle.jsx";

const BoldIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"></path>
  </svg>
);

const ListIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18M3 12h18M3 18h18"></path>
  </svg>
);

const GridIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" rx="1"></rect>
    <rect x="14" y="3" width="7" height="7" rx="1"></rect>
    <rect x="3" y="14" width="7" height="7" rx="1"></rect>
    <rect x="14" y="14" width="7" height="7" rx="1"></rect>
  </svg>
);

export default {
  title: "Inputs/Toggle",
  component: Toggle,
};

export const Default = {
  render: () => {
    const [pressed, setPressed] = React.useState(false);
    return (
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        {BoldIcon}
      </Toggle>
    );
  },
};

export const TextToggle = {
  render: () => {
    const [raw, setRaw] = React.useState(true);
    return (
      <Toggle pressed={raw} onPressedChange={setRaw}>
        Raw output
      </Toggle>
    );
  },
};

export const Disabled = {
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <Toggle disabled>Markdown</Toggle>
      <Toggle pressed disabled>
        Markdown
      </Toggle>
    </div>
  ),
};

export const Group = {
  render: () => {
    const [view, setView] = React.useState("chat");
    return (
      <ToggleGroup
        value={view}
        onChange={setView}
        options={[
          { value: "chat", label: "Chat" },
          { value: "code", label: "Code" },
          { value: "voice", label: "Voice" },
        ]}
      />
    );
  },
};

export const GroupWithIcons = {
  render: () => {
    const [layout, setLayout] = React.useState("list");
    return (
      <ToggleGroup
        value={layout}
        onChange={setLayout}
        options={[
          { value: "list", icon: ListIcon },
          { value: "grid", icon: GridIcon },
        ]}
      />
    );
  },
};
