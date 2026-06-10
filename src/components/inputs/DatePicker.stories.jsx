import React from "react";
import { DatePicker } from "./DatePicker.jsx";

export default {
  title: "Inputs/DatePicker",
  component: DatePicker,
};

export const Default = {
  render: () => {
    const [date, setDate] = React.useState(null);
    return (
      <div style={{ minHeight: 380 }}>
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

export const Preselected = {
  render: () => {
    const [date, setDate] = React.useState(new Date(2026, 5, 10));
    return (
      <div style={{ minHeight: 380 }}>
        <DatePicker value={date} onChange={setDate} />
      </div>
    );
  },
};

export const CustomPlaceholder = {
  render: () => {
    const [date, setDate] = React.useState(null);
    return (
      <div style={{ minHeight: 380 }}>
        <DatePicker value={date} onChange={setDate} placeholder="Export logs since" />
      </div>
    );
  },
};
