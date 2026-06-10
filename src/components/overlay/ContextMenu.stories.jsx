import React from "react";
import { ContextMenu } from "./ContextMenu.jsx";

const PenIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
  </svg>
);

const CopyIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2"></rect>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
  </svg>
);

const TrashIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

export default {
  title: "Overlay/ContextMenu",
  component: ContextMenu,
};

export const Default = {
  render: () => (
    <ContextMenu
      items={[
        { type: "label", label: "Conversation" },
        { label: "Rename", icon: PenIcon, shortcut: "⌘R" },
        { label: "Duplicate", icon: CopyIcon },
        { type: "separator" },
        { label: "Delete", icon: TrashIcon, danger: true },
      ]}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 180,
          maxWidth: 480,
          border: "1px dashed var(--border-strong)",
          borderRadius: "var(--radius-3)",
          color: "var(--text-faint)",
          fontFamily: "var(--font-mono)",
          fontSize: "var(--text-xs)",
          letterSpacing: "var(--tracking-label)",
          textTransform: "uppercase",
          userSelect: "none",
        }}
      >
        Right-click this area
      </div>
    </ContextMenu>
  ),
};
