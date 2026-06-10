import React from "react";
import { Item } from "./Item.jsx";
import { Button } from "../buttons/Button.jsx";

const keyIcon = (
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
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="m21 2-9.6 9.6" />
    <path d="m15.5 7.5 3 3L22 7l-3-3" />
  </svg>
);

const fileIcon = (
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
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </svg>
);

export default {
  title: "Display/Item",
  component: Item,
  argTypes: {
    interactive: { control: "boolean" },
    flush: { control: "boolean" },
    mediaBox: { control: "boolean" },
  },
  args: {
    title: "API key",
    description: "Created 2 days ago. Last used 14 minutes ago.",
    interactive: false,
    flush: false,
  },
};

export const Default = {};

export const WithMediaAndActions = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Item
        media={keyIcon}
        title="sk-prod-01"
        description="Created 2 days ago. 1,284 requests this week."
        actions={
          <Button variant="ghost" size="sm">
            Revoke
          </Button>
        }
      />
    </div>
  ),
};

export const Interactive = {
  render: () => (
    <div style={{ display: "grid", gap: 8, maxWidth: 480 }}>
      <Item interactive media={fileIcon} title="quarterly-report.pdf" description="2.4 MB, uploaded 0.4s ago" />
      <Item interactive media={fileIcon} title="meeting-notes.md" description="18 KB, uploaded yesterday" />
    </div>
  ),
};

export const FlushList = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Item flush title="Streaming" description="Tokens render as they arrive." />
      <Item flush title="Local search" description="Past conversations indexed on device, lookups under 80ms." />
      <Item flush title="Retention" description="Conversations kept 30 days, then deleted." />
    </div>
  ),
};
