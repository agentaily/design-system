import React from "react";
import { Plan } from "./Plan.jsx";

export default {
  title: "AI/Plan",
  component: Plan,
  args: {
    steps: [
      { title: "Analyze", description: "界定 CAP 三要素", status: "done" },
      { title: "Retrieve", description: "检索证明文献", status: "active" },
      { title: "Synthesize", status: "pending" },
      {
        title: "Verify",
        description: "Cross-check claims against two independent sources",
        status: "pending",
      },
    ],
  },
};

export const Default = {};

export const Proposed = {
  args: {
    steps: [
      { title: "Read the failing test", description: "tests/test_retry.py::test_backoff" },
      {
        title: "Reproduce locally",
        description: "Pin the seed; the failure shows up in 1 of 12 runs",
      },
      { title: "Patch the backoff jitter" },
      { title: "Re-run the suite", description: "Target: 0 failures across 20 runs" },
    ],
  },
};

export const Completed = {
  args: {
    steps: [
      { title: "Analyze", description: "界定 CAP 三要素", status: "done" },
      { title: "Retrieve", description: "检索证明文献", status: "done" },
      { title: "Synthesize", description: "结论先行，证据随后", status: "done" },
    ],
  },
};
