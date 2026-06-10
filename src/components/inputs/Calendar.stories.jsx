import React from "react";
import { Calendar } from "./Calendar.jsx";

export default {
  title: "Inputs/Calendar",
  component: Calendar,
};

export const Default = {
  render: () => {
    const [date, setDate] = React.useState(null);
    return <Calendar value={date} onChange={setDate} />;
  },
};

export const Preselected = {
  render: () => {
    const [date, setDate] = React.useState(new Date(2026, 5, 18));
    return <Calendar value={date} onChange={setDate} />;
  },
};

export const FixedMonth = {
  render: () => {
    const [date, setDate] = React.useState(new Date(2026, 0, 12));
    return <Calendar value={date} onChange={setDate} month={new Date(2026, 0, 1)} />;
  },
};
