import React from "react";
import { ConversationThread } from "./ConversationThread.jsx";
import { Queue } from "../ai/Queue.jsx";

export default {
  title: "Chat/ConversationThread",
  component: ConversationThread,
  parameters: { layout: "fullscreen" },
};

function ThreadDemo({ seed = [] }) {
  const [messages, setMessages] = React.useState(seed);
  const [draft, setDraft] = React.useState("");
  const push = (m) => setMessages((ms) => [...ms, m]);
  const q = Queue.useQueue({
    onFirst: async (text) => {
      push({ role: "user", text });
      push({ role: "assistant", text: "收到，我先放一个姓名 + 邮箱字段的报名表。", time: "12:04" });
    },
    onBatch: async (texts) => texts.forEach((t) => push({ role: "user", text: t })),
  });
  return (
    <div style={{ height: "100vh" }}>
      <ConversationThread
        controller={q}
        messages={messages}
        draft={draft}
        onDraftChange={setDraft}
        hints={["做一个活动报名表", "加一个邮箱字段", "把标题字号调大"]}
        onModelClick={() => console.log("[ConversationThread] model pill clicked")}
      />
    </div>
  );
}

export const Empty = { render: () => <ThreadDemo /> };

export const WithMessages = {
  render: () => (
    <ThreadDemo
      seed={[
        { role: "user", text: "做一个活动报名表" },
        {
          role: "assistant",
          text: "好的，已生成姓名、邮箱、人数三个字段的报名表。",
          time: "12:04",
        },
      ]}
    />
  ),
};
