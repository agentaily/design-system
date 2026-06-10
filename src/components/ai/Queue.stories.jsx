import React from "react";
import { Queue } from "./Queue.jsx";

export default {
  title: "AI/Queue",
  component: Queue,
  args: {
    title: "Queued",
    items: [
      { text: "Summarize PR #412", status: "running" },
      "Write the changelog entry",
      "Tag release v0.9.2",
    ],
  },
};

export const Default = {};

export const Removable = {
  render: () => {
    const [items, setItems] = React.useState([
      { text: "Summarize PR #412", status: "running" },
      { text: "Write the changelog entry", status: "pending" },
      { text: "Tag release v0.9.2", status: "pending" },
      { text: "把发布说明翻译成中文", status: "pending" },
    ]);
    return (
      <div style={{ maxWidth: 420 }}>
        <Queue
          items={items}
          onRemove={(index) => setItems((its) => its.filter((_, i) => i !== index))}
        />
      </div>
    );
  },
};

export const AllPending = {
  args: {
    title: "Up next",
    items: ["Re-run the flaky test 20 times", "Diff the two traces", "Draft the incident note"],
  },
};
