import React from "react";
import { ConnectionCard } from "./ConnectionCard.jsx";
import { SecretField } from "../inputs/SecretField.jsx";

// ConnectionCard is the shared shell (icon · title · summary · status · collapse
// · TestRow) that DeepSeekCard / FeishuCard compose. Here it is driven directly
// with generic fields. A connected card (status "ok") starts collapsed to its
// header row; click the row to expand, the chevron to collapse.
export default {
  title: "Settings/ConnectionCard",
  component: ConnectionCard,
  parameters: { layout: "padded" },
  argTypes: {
    status: { control: "select", options: ["idle", "testing", "ok", "error"] },
    collapsible: { control: "boolean" },
  },
};

const Frame = ({ children }) => <div style={{ maxWidth: 560, margin: "0 auto" }}>{children}</div>;

function Host({ initial = {}, ...props }) {
  const [token, setToken] = React.useState(initial.token || "");
  const [status, setStatus] = React.useState(initial.status || "idle");
  const [result, setResult] = React.useState(initial.result || "");
  const test = () => {
    setStatus("testing");
    setResult("");
    setTimeout(() => {
      setStatus("ok");
      setResult("连接正常 · 延迟 0.3s");
    }, 700);
  };
  return (
    <Frame>
      <ConnectionCard
        icon="plug"
        title="示例服务"
        desc="一张连接卡的通用外壳——头部、可折叠、状态着色、测试底栏都来自 ConnectionCard，卡片只塞自己的字段。"
        status={status}
        result={result}
        onTest={test}
        testDisabled={!token.trim() && status !== "ok"}
        idleHint="填写 token 后测试连通性"
        {...props}
      >
        <SecretField
          label="ACCESS TOKEN"
          value={token}
          onChange={(v) => {
            setToken(v);
            setStatus("idle");
            setResult("");
          }}
          placeholder="tok-xxxxxxxxxxxx"
        />
      </ConnectionCard>
    </Frame>
  );
}

export const Idle = { render: () => <Host /> };

// Connected → starts collapsed to a one-line header summary; click the row to expand.
export const ConnectedCollapsed = {
  render: () => (
    <Host initial={{ token: "tok-demo123", status: "ok", result: "连接正常 · 延迟 0.3s" }} />
  ),
};

export const Error = {
  render: () => (
    <Host initial={{ token: "tok-bad", status: "error", result: "401 · token 无效" }} />
  ),
};

// Force the body open regardless of connection state.
export const AlwaysExpanded = {
  render: () => (
    <Host
      initial={{ token: "tok-demo123", status: "ok", result: "连接正常 · 延迟 0.3s" }}
      expanded
    />
  ),
};
