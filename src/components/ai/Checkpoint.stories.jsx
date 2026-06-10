import React from "react";
import { Checkpoint } from "./Checkpoint.jsx";
import { Message } from "../chat/Message.jsx";

export default {
  title: "AI/Checkpoint",
  component: Checkpoint,
  args: { label: "Checkpoint", time: "14:02" },
};

export const Default = {};

export const WithRestore = {
  render: () => {
    const [restored, setRestored] = React.useState(false);
    return (
      <div style={{ maxWidth: 640 }}>
        <Checkpoint label="Checkpoint" time="14:02" onRestore={() => setRestored(true)} />
        {restored ? (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--text-faint)",
              textAlign: "center",
              margin: "8px 0 0",
            }}
          >
            restored to 14:02
          </p>
        ) : null}
      </div>
    );
  },
};

export const InThread = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 640 }}>
      <Message role="user">
        <p>Refactor the retry logic, then run the tests.</p>
      </Message>
      <Message role="assistant" time="14:02">
        <p>Refactor done. 14 tests pass, 0 fail. Backoff is now jittered at 0.4s base.</p>
      </Message>
      <Checkpoint label="Before edits" time="14:02" onRestore={() => {}} />
      <Message role="user">
        <p>继续：把超时改成 10s。</p>
      </Message>
    </div>
  ),
};
