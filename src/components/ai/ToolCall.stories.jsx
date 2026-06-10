import React from "react";
import { ToolCall } from "./ToolCall.jsx";

export default {
  title: "AI/ToolCall",
  component: ToolCall,
  argTypes: {
    status: { control: "select", options: ["running", "done", "error"] },
    defaultOpen: { control: "boolean" },
  },
  args: {
    name: "get_weather",
    args: { city: "SF" },
    result: { temp: 14, unit: "C" },
    status: "done",
    defaultOpen: true,
  },
};

export const Default = {};

export const Running = {
  args: {
    name: "search_web",
    args: { query: "CAP theorem" },
    result: undefined,
    status: "running",
    defaultOpen: false,
  },
};

export const Error = {
  args: {
    name: "fetch_url",
    args: { url: "https://api.weather.gov/points/37.77,-122.42" },
    result: "ETIMEDOUT: no response within 10s. Retry in 18s.",
    status: "error",
    defaultOpen: true,
  },
};

export const Sequence = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 560 }}>
      <ToolCall name="search_web" status="done" args={{ query: "CAP theorem proof" }} result={{ hits: 8, top: "Gilbert & Lynch, 2002" }} />
      <ToolCall name="read_file" status="done" args={{ path: "notes/cap.md" }} result="412 lines" />
      <ToolCall name="run_python" status="running" args={'verify_quorum(n=5, w=3, r=3)'} />
    </div>
  ),
};
