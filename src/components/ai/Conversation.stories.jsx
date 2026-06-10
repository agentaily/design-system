import React from "react";
import { Conversation } from "./Conversation.jsx";
import { Message } from "../chat/Message.jsx";
import { Button } from "../buttons/Button.jsx";

const SEED = [
  { role: "user", text: "Trace why the build got slower last week." },
  {
    role: "assistant",
    text: "Found it. The sourcemap step runs twice — once in the bundler, once in the uploader. Dropping the duplicate saves 41s per build.",
  },
  { role: "user", text: "Fix it and verify." },
  {
    role: "assistant",
    text: "Patched the pipeline config. Build time is back to 2m 10s from 2m 51s, stable across three runs.",
  },
  { role: "user", text: "把结论写进 changelog。" },
  {
    role: "assistant",
    text: "已写入 CHANGELOG.md：去除重复的 sourcemap 步骤，平均提速 41s。",
  },
];

const NEXT = [
  "Queued the nightly benchmark; results land at 02:00.",
  "Benchmark done: p95 latency 212ms, down 9%.",
  "Nothing else pending. The thread is up to date.",
];

export default {
  title: "AI/Conversation",
  component: Conversation,
};

export const Default = {
  render: () => {
    const [messages, setMessages] = React.useState(SEED);
    const append = () => {
      setMessages((ms) => [
        ...ms,
        { role: "assistant", text: NEXT[(ms.length - SEED.length) % NEXT.length] },
      ]);
    };
    return (
      <div style={{ maxWidth: 680 }}>
        <Conversation
          style={{
            height: 360,
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-3)",
          }}
        >
          {messages.map((m, i) => (
            <Message key={i} role={m.role}>
              <p>{m.text}</p>
            </Message>
          ))}
        </Conversation>
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
          <Button variant="secondary" size="sm" onClick={append}>
            Append message
          </Button>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-faint)" }}>
            scroll up to see the jump pill
          </span>
        </div>
      </div>
    );
  },
};

export const Streaming = {
  render: () => (
    <div style={{ maxWidth: 680 }}>
      <Conversation
        style={{
          height: 300,
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-3)",
        }}
      >
        <Message role="user">
          <p>What is an agentaily?</p>
        </Message>
        <Message role="assistant" time="14:02" streaming>
          <p>
            A statement taken to be true so the next step of reasoning can
            proceed. Every agent run starts from one
          </p>
        </Message>
      </Conversation>
    </div>
  ),
};
