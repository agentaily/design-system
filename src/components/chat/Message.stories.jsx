import React from "react";
import { Message } from "./Message.jsx";

export default {
  title: "Chat/Message",
  component: Message,
  argTypes: {
    role: { control: "select", options: ["user", "assistant"] },
    streaming: { control: "boolean" },
    name: { control: "text" },
    time: { control: "text" },
  },
  args: {
    role: "assistant",
    time: "14:02",
    children: (
      <p>
        Use streaming. Time to first token drops from 2.1s to 0.4s, and perceived
        wait is what users actually judge.
      </p>
    ),
  },
};

export const Assistant = {};

export const User = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <Message role="user">
        <p>What is an agentaily?</p>
      </Message>
    </div>
  ),
};

export const Streaming = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <Message role="assistant" time="14:02" streaming>
        <p>
          A statement taken to be true so the next step of reasoning can proceed.
          Every agent run starts from one
        </p>
      </Message>
    </div>
  ),
};

export const Thread = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 640 }}>
      <Message role="user">
        <p>Should I cache the embeddings?</p>
      </Message>
      <Message role="assistant" time="14:02">
        <p>
          Cache them. Recomputing 10k embeddings costs about $0.13 and 40s per
          run; a cache hit costs nothing.
        </p>
        <p>Key by content hash, not document id, so edits invalidate cleanly.</p>
      </Message>
      <Message role="user">
        <p>用 Redis 还是本地文件？</p>
      </Message>
      <Message role="assistant" time="14:05" streaming>
        <p>本地文件就够。10k 条向量约 60 MB，远未到需要引入 Redis 的规模</p>
      </Message>
    </div>
  ),
};
