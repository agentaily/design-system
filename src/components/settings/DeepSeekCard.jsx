import React from "react";
import { ConnectionCard } from "./ConnectionCard.jsx";
import { HelpSteps } from "./HelpSteps.jsx";
import { SecretField } from "../inputs/SecretField.jsx";

// DeepSeekCard — a PURE-DISPLAY connection card for a DeepSeek LLM key. Props in
// (apiKey, status, result, masked, errors, help…), events out
// (onApiKeyChange / onTest). The caller owns config + persistence.
// It composes the shared <ConnectionCard> shell (header / collapse / TestRow) and
// only supplies its own fields (key · help).
const DS_DEFAULT_HELP = {
  title: "如何获取 DeepSeek API Key？",
  steps: [
    <React.Fragment>
      登录 <code>platform.deepseek.com</code>，进入「API Keys」页面。
    </React.Fragment>,
    <React.Fragment>
      点击「创建 API Key」，命名后立即复制——密钥只在创建时完整显示一次。
    </React.Fragment>,
    <React.Fragment>在「充值」中确认账户余额充足，对话才能持续调用。</React.Fragment>,
    <React.Fragment>
      把以 <code>sk-</code> 开头的密钥粘贴到上方输入框。
    </React.Fragment>,
  ],
  link: { href: "https://platform.deepseek.com", label: "打开 DeepSeek 开放平台" },
};

export function DeepSeekCard({
  apiKey = "",
  onApiKeyChange,
  status = "idle",
  result,
  onTest,
  masked = false,
  keyError,
  help,
  canTest,
  idleHint = "填写密钥后测试连通性",
  collapsible = true,
  expanded,
  onExpandedChange,
}) {
  // Masked echo is derived, not stateful: a stored key is present (masked) and
  // the field is still empty → show the masked placeholder + "leave blank" hint.
  const maskedNow = masked && !(apiKey || "").trim();
  const testDisabled = canTest !== undefined ? !canTest : !(apiKey || "").trim() && !masked;
  const help_ = help || DS_DEFAULT_HELP;
  const summary = result || (status === "ok" ? "已连接" : "未连接");

  return (
    <ConnectionCard
      icon="key"
      title="DeepSeek"
      desc="驱动对话式交互。用户发送的每一条消息，都通过这把密钥调用 DeepSeek 补全。"
      status={status}
      result={result}
      summary={summary}
      onTest={onTest}
      testDisabled={testDisabled}
      idleHint={idleHint}
      collapsible={collapsible}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <SecretField
        label="API KEY"
        value={apiKey}
        onChange={onApiKeyChange}
        placeholder={
          maskedNow ? "已保存 ········  ·  留空则保持不变" : "sk-xxxxxxxxxxxxxxxxxxxxxxxx"
        }
        hint={maskedNow ? "已存密钥 · 留空表示不修改，输入新值即覆盖" : undefined}
        error={keyError}
      />

      <HelpStepsSlot help={help_} />
    </ConnectionCard>
  );
}

// Renders a HelpSteps node from either a {title, steps, link} object or a
// ready-made React node passed straight through.
function HelpStepsSlot({ help }) {
  if (!help) return null;
  if (React.isValidElement(help)) return help;
  return (
    <HelpSteps
      title={help.title}
      steps={help.steps}
      link={help.link}
      defaultOpen={help.defaultOpen}
    />
  );
}
