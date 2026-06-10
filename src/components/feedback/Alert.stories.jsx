import React from "react";
import { Alert } from "./Alert.jsx";

const XIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18M6 6l12 12"></path>
  </svg>
);

const InfoIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16v-4M12 8h.01"></path>
  </svg>
);

export default {
  title: "Feedback/Alert",
  component: Alert,
  argTypes: {
    variant: { control: "select", options: ["neutral", "ok", "warn", "danger"] },
  },
  args: {
    variant: "warn",
    title: "Approaching limit",
    children: "You've used 90% of today's messages.",
  },
};

export const Default = {};

export const Variants = {
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 480 }}>
      <Alert title="Scheduled maintenance">API unavailable Sunday 02:00–02:40 UTC.</Alert>
      <Alert variant="ok" title="Export complete">128 messages written to chat-2026-06-10.json.</Alert>
      <Alert variant="warn" title="Approaching limit">You've used 90% of today's messages.</Alert>
      <Alert variant="danger" title="Request failed">Check your API key.</Alert>
    </div>
  ),
};

export const WithIcon = {
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 480 }}>
      <Alert icon={InfoIcon} title="Context window">This model accepts up to 128k tokens per request.</Alert>
      <Alert variant="danger" icon={XIcon} title="Request failed">Check your API key.</Alert>
    </div>
  ),
};

export const TitleOnly = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <Alert variant="ok" title="Saved" />
    </div>
  ),
};
