import React from "react";
import { Command } from "./Command.jsx";
import { Button } from "../buttons/Button.jsx";

const PlusIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14"></path>
  </svg>
);

const PenIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
  </svg>
);

const FileIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"></path>
    <path d="M14 2v6h6"></path>
  </svg>
);

const SettingsIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v4M12 19v4M4.2 4.2l2.8 2.8M17 17l2.8 2.8M1 12h4M19 12h4M4.2 19.8 7 17M17 7l2.8-2.8"></path>
  </svg>
);

const groups = [
  {
    label: "Actions",
    items: [
      { id: "new", label: "New chat", icon: PlusIcon, shortcut: "⌘N" },
      { id: "rename", label: "Rename chat", icon: PenIcon, shortcut: "⌘R" },
      { id: "export", label: "Export conversation", icon: FileIcon },
    ],
  },
  {
    label: "Navigate",
    items: [
      { id: "docs", label: "Open docs" },
      { id: "settings", label: "Open settings", icon: SettingsIcon, shortcut: "⌘," },
    ],
  },
];

export default {
  title: "Overlay/Command",
  component: Command,
  argTypes: {
    inline: { control: "boolean" },
  },
};

export const Inline = {
  render: () => <Command inline groups={groups} />,
};

export const Triggered = {
  render: function Render() {
    const [open, setOpen] = React.useState(false);
    const [last, setLast] = React.useState(null);
    return (
      <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          Open command palette ⌘K
        </Button>
        {last ? (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--text-faint)",
            }}
          >
            selected: {last}
          </span>
        ) : null}
        <Command
          open={open}
          groups={groups}
          onClose={() => setOpen(false)}
          onSelect={(item) => setLast(item.id)}
        />
      </div>
    );
  },
};

export const Empty = {
  render: () => <Command inline groups={[]} placeholder="Type a command or search…" />,
};
