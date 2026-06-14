import React from "react";
import { DeepSeekCard } from "./DeepSeekCard.jsx";

export default {
  title: "Settings/DeepSeekCard",
  component: DeepSeekCard,
  parameters: { layout: "padded" },
  argTypes: {
    status: { control: "select", options: ["idle", "testing", "ok", "error"] },
  },
};

const Frame = ({ children }) => <div style={{ maxWidth: 560, margin: "0 auto" }}>{children}</div>;

// A tiny caller that owns the config and drives status/result from a mock probe —
// exactly the contract the pure-display card expects (props in, events out, no
// internal state, no localStorage). The host clears the green pill on edit. The
// card composes <ConnectionCard>: connected (status "ok") collapses to a header
// summary by default; click the row to expand.
function Host({ initial, masked = false, ...props }) {
  const [cfg, setCfg] = React.useState({
    dsKey: "",
    dsStatus: "idle",
    dsResult: "",
    ...initial,
  });
  const set = (patch) => setCfg((c) => ({ ...c, ...patch }));
  const test = () => {
    set({ dsStatus: "testing", dsResult: "" });
    setTimeout(() => set({ dsStatus: "ok", dsResult: "连接正常 · 延迟 0.4s" }), 700);
  };
  return (
    <Frame>
      <DeepSeekCard
        apiKey={cfg.dsKey}
        onApiKeyChange={(v) => set({ dsKey: v, dsStatus: "idle", dsResult: "" })}
        status={cfg.dsStatus}
        result={cfg.dsResult}
        onTest={test}
        masked={masked}
        {...props}
      />
    </Frame>
  );
}

export const Default = { render: () => <Host /> };

// Connected → collapses to a one-line header summary by default; click to expand.
export const Connected = {
  render: () => (
    <Host
      initial={{
        dsKey: "sk-demo1234567890",
        dsStatus: "ok",
        dsResult: "连接正常 · 延迟 0.4s",
      }}
    />
  ),
};

// Force the form open even when connected.
export const ConnectedExpanded = {
  render: () => (
    <Host
      expanded
      initial={{
        dsKey: "sk-demo1234567890",
        dsStatus: "ok",
        dsResult: "连接正常 · 延迟 0.4s",
      }}
    />
  ),
};

export const Failed = {
  render: () => (
    <Host
      initial={{ dsKey: "sk-bad", dsStatus: "error", dsResult: "401 · API key 无效或已撤销" }}
    />
  ),
};

// A key is already stored server-side (`masked`): the field echoes a masked
// placeholder + "leave blank to keep", the user can Test without re-entering it,
// and the mask is never submitted back. Typing a new value overrides.
export const MaskedStoredKey = {
  render: () => (
    <Host
      masked
      initial={{
        dsStatus: "ok",
        dsResult: "连接正常",
      }}
    />
  ),
};

// Strings default to English; pass one `copy` object to localize the whole card
// (header, field, help, and the Test row) — here, zh-CN.
const ZH_COPY = {
  title: "DeepSeek",
  desc: "驱动对话式交互。用户发送的每一条消息，都通过这把密钥调用 DeepSeek 补全。",
  connected: "已连接",
  disconnected: "未连接",
  collapse: "收起",
  apiKeyLabel: "API KEY",
  keyPlaceholder: "sk-xxxxxxxxxxxxxxxxxxxxxxxx",
  maskedPlaceholder: "已保存 ········  ·  留空则保持不变",
  maskedHint: "已存密钥 · 留空表示不修改，输入新值即覆盖",
  idleHint: "填写密钥后测试连通性",
  test: "测试连接",
  retest: "重新测试",
  testing: "正在握手…",
  help: {
    title: "如何获取 DeepSeek API Key？",
    steps: [
      <React.Fragment key="1">
        登录 <code>platform.deepseek.com</code>，进入「API Keys」页面。
      </React.Fragment>,
      <React.Fragment key="2">
        点击「创建 API Key」，命名后立即复制——密钥只在创建时完整显示一次。
      </React.Fragment>,
      <React.Fragment key="3">在「充值」中确认账户余额充足，对话才能持续调用。</React.Fragment>,
      <React.Fragment key="4">
        把以 <code>sk-</code> 开头的密钥粘贴到上方输入框。
      </React.Fragment>,
    ],
    link: { href: "https://platform.deepseek.com", label: "打开 DeepSeek 开放平台" },
  },
};

export const Localized = { render: () => <Host expanded copy={ZH_COPY} /> };
