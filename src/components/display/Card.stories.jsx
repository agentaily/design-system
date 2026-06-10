import React from "react";
import { Card } from "./Card.jsx";

export default {
  title: "Display/Card",
  component: Card,
  argTypes: {
    padding: { control: "select", options: ["none", "md", "lg"] },
    ticks: { control: "boolean" },
  },
  args: {
    eyebrow: "Usage",
    title: "This month",
    padding: "md",
    ticks: false,
    children: "1,284 messages across 96 conversations. Peak day was Tuesday with 412.",
  },
};

export const Default = {};

export const Ticks = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Card eyebrow="Usage" title="This month" ticks>
        <p style={{ margin: 0 }}>1,284 messages across 96 conversations. 2.1M tokens in, 480k out.</p>
      </Card>
    </div>
  ),
};

export const Padding = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 420 }}>
      <Card title="padding: none" padding="none" />
      <Card title="padding: md" padding="md" />
      <Card title="padding: lg" padding="lg" />
    </div>
  ),
};

export const TitleOnly = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Card title="Retention">
        <p style={{ margin: 0 }}>Conversations are kept for 30 days, then deleted. Export anytime.</p>
      </Card>
    </div>
  ),
};
