import React from "react";
import { DropdownMenu } from "./DropdownMenu.jsx";
import { Button } from "../buttons/Button.jsx";

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

const TrashIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const items = [
  { type: "label", label: "Conversation" },
  { label: "Rename", icon: PenIcon, shortcut: "⌘R" },
  { label: "Export", icon: FileIcon },
  { label: "Pin to top", disabled: true },
  { type: "separator" },
  { label: "Delete", icon: TrashIcon, danger: true },
];

export default {
  title: "Overlay/DropdownMenu",
  component: DropdownMenu,
  argTypes: {
    align: { control: "select", options: ["start", "end"] },
  },
};

export const Default = {
  render: () => (
    <div style={{ minHeight: 280 }}>
      <DropdownMenu trigger={<Button variant="secondary">Actions</Button>} items={items} />
    </div>
  ),
};

export const AlignEnd = {
  render: () => (
    <div style={{ minHeight: 280, display: "flex", justifyContent: "flex-end" }}>
      <DropdownMenu
        align="end"
        trigger={<Button variant="secondary">More</Button>}
        items={items}
      />
    </div>
  ),
};
