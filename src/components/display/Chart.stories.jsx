import React from "react";
import { BarChart, LineChart, Chart } from "./Chart.jsx";

const week = [
  { value: 40, label: "Mon" },
  { value: 72, label: "Tue" },
  { value: 58, label: "Wed" },
  { value: 91, label: "Thu" },
  { value: 64, label: "Fri" },
  { value: 22, label: "Sat", muted: true },
  { value: 18, label: "Sun", muted: true },
];

const tokensByWeek = [
  { value: 12, label: "W1" },
  { value: 34, label: "W2" },
  { value: 28, label: "W3" },
  { value: 47, label: "W4" },
  { value: 41, label: "W5" },
  { value: 63, label: "W6" },
];

export default {
  title: "Display/Chart",
  component: BarChart,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
  args: { title: "Messages / day", data: week },
};

export const Bar = {};

export const Line = {
  render: () => <LineChart title="Tokens / week (k)" height={120} data={tokensByWeek} />,
};

export const BarPlainNumbers = {
  render: () => <BarChart title="Tool calls / hour" data={[8, 14, 11, 27, 19, 33, 24, 12]} />,
};

export const TypeProp = {
  render: () => (
    <div style={{ display: "grid", gap: 32 }}>
      <Chart type="bar" title="type=bar" data={week} />
      <Chart type="line" title="type=line" data={tokensByWeek} />
    </div>
  ),
};
