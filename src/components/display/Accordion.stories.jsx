import React from "react";
import { Accordion } from "./Accordion.jsx";

const faqItems = [
  {
    id: "a",
    title: "What is agentaily?",
    content: "An AI chatbot that runs in your terminal and browser. Median time to first token is 0.4s.",
  },
  {
    id: "b",
    title: "Is my data private?",
    content: "Yes — conversations are encrypted locally before sync. Nothing is stored in plaintext.",
  },
  {
    id: "c",
    title: "How large is the context window?",
    content: "128k tokens on every plan. Longer inputs are chunked automatically.",
  },
];

export default {
  title: "Display/Accordion",
  component: Accordion,
  argTypes: {
    multiple: { control: "boolean" },
  },
  args: { items: faqItems, multiple: false, defaultOpen: ["a"] },
};

export const Default = {};

export const Multiple = {
  render: () => <Accordion multiple defaultOpen={["a", "b"]} items={faqItems} />,
};

export const ChineseFaq = {
  render: () => (
    <Accordion
      defaultOpen={["a"]}
      items={[
        { id: "a", title: "什么是 agentaily?", content: "一个跑在终端和浏览器里的 AI 助手。首字延迟中位数 0.4s。" },
        { id: "b", title: "我的数据安全吗?", content: "安全 — 对话在本地加密后再同步,不保存明文。" },
        { id: "c", title: "上下文窗口有多大?", content: "所有方案均为 128k token,超长输入自动分块。" },
      ]}
    />
  ),
};
