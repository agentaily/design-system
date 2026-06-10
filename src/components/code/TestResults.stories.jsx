import React from "react";
import { TestResults } from "./TestResults.jsx";

export default {
  title: "Code/TestResults",
  component: TestResults,
};

export const Default = {
  render: () => (
    <div style={{ maxWidth: 460 }}>
      <TestResults
        duration="1.4s"
        tests={[
          { name: "renders header", status: "pass", time: "12ms" },
          { name: "streams tokens in order", status: "pass", time: "48ms" },
          { name: "handles empty state", status: "fail", time: "230ms" },
          { name: "retries on 429", status: "pass", time: "95ms" },
        ]}
      />
    </div>
  ),
};

export const AllPassing = {
  render: () => (
    <div style={{ maxWidth: 460 }}>
      <TestResults
        duration="0.6s"
        tests={[
          { name: "parses schema", status: "pass", time: "8ms" },
          { name: "masks secrets", status: "pass", time: "11ms" },
          { name: "copies to clipboard", status: "pass", time: "5ms" },
        ]}
      />
    </div>
  ),
};

export const WithSkipped = {
  render: () => (
    <div style={{ maxWidth: 460 }}>
      <TestResults
        duration="2.1s"
        tests={[
          { name: "transcribes 16kHz audio", status: "pass", time: "412ms" },
          { name: "diarizes two speakers", status: "fail", time: "880ms" },
          { name: "a11y: announces live region", status: "skip" },
          { name: "a11y: focus order", status: "skip" },
        ]}
      />
    </div>
  ),
};
