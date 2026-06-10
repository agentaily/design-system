import React from "react";
import { Progress } from "./Progress.jsx";

export default {
  title: "Display/Progress",
  component: Progress,
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100 } },
    showValue: { control: "boolean" },
    indeterminate: { control: "boolean" },
  },
  args: { value: 64, max: 100, label: "Uploading", showValue: true, indeterminate: false },
};

export const Default = {};

export const Indeterminate = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Progress label="Indexing conversations" indeterminate />
    </div>
  ),
};

export const Levels = {
  render: () => (
    <div style={{ display: "grid", gap: 20, maxWidth: 360 }}>
      <Progress label="Queued" value={0} showValue />
      <Progress label="Context used" value={35} showValue />
      <Progress label="Upload" value={100} showValue />
    </div>
  ),
};

export const BareTrack = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <Progress value={48} />
    </div>
  ),
};
