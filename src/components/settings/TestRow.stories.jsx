import React from "react";
import { TestRow } from "./TestRow.jsx";

export default {
  title: "Settings/TestRow",
  component: TestRow,
  argTypes: {
    status: { control: "select", options: ["idle", "testing", "ok", "error"] },
  },
};

const Frame = ({ children }) => (
  <div
    style={{
      maxWidth: 420,
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-3)",
      overflow: "hidden",
    }}
  >
    <div style={{ padding: 16, color: "var(--text-muted)", fontSize: "var(--text-sm)" }}>
      连接卡片内容…
    </div>
    {children}
  </div>
);

export const Idle = {
  render: () => (
    <Frame>
      <TestRow status="idle" idleHint="填写密钥后测试连通性" disabled />
    </Frame>
  ),
};

export const Testing = {
  render: () => (
    <Frame>
      <TestRow status="testing" />
    </Frame>
  ),
};

export const Ok = {
  render: () => (
    <Frame>
      <TestRow status="ok" result="连接成功 · 延迟 142ms" />
    </Frame>
  ),
};

export const Error = {
  render: () => (
    <Frame>
      <TestRow status="error" result="401 · 密钥无效" />
    </Frame>
  ),
};
