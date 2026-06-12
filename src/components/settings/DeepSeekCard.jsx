import React from "react";
import { Alert } from "../feedback/Alert.jsx";
import { HelpSteps } from "./HelpSteps.jsx";
import { Icon } from "../utilities/Icon.jsx";
import { SecretField } from "../inputs/SecretField.jsx";
import { Select } from "../inputs/Select.jsx";
import { StatusPill } from "../display/StatusPill.jsx";
import { Switch } from "../inputs/Switch.jsx";
import { TestRow } from "./TestRow.jsx";

// DeepSeekCard — a PURE-DISPLAY connection card for a DeepSeek LLM key. It only
// renders: props in (apiKey, model, status, result, masked, errors, help…),
// events out (onApiKeyChange / onModelChange / onTest). Zero state, zero
// localStorage, zero save bar, zero readiness gating — the caller owns all of
// that. Composes SecretField / StatusPill / TestRow / HelpSteps. Reusable by any
// product that needs to wire a DeepSeek key, not just the integration modal.

// Shared connection-card shell — injected once under a single id so DeepSeekCard
// and FeishuCard render identically whether one or both are mounted.
const AX_CONNCARD_CSS = `
.s-card { position: relative; background: var(--surface-card); border: 1px solid var(--border-default);
  border-radius: var(--radius-3); overflow: hidden; transition: border-color var(--dur-2) var(--ease-out); }
.s-card.is-ok { border-color: rgba(62, 207, 142, 0.4); }
.s-card.is-error { border-color: rgba(229, 72, 77, 0.4); }
.s-card__head { padding: 20px 24px 18px; }
.s-card__toprow { display: flex; align-items: center; gap: 11px; margin-bottom: 15px; }
.s-card__icon { flex: none; width: 30px; height: 30px; border-radius: var(--radius-2);
  border: 1px solid var(--border-strong); background: var(--surface-raised); color: var(--text-body);
  display: flex; align-items: center; justify-content: center; }
.s-card__eyebrow { color: var(--text-faint); }
.s-card__status { margin-left: auto; flex: none; }
.s-card__title { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 500;
  letter-spacing: var(--tracking-tight); line-height: var(--leading-tight); color: var(--text-body); margin: 0; }
.s-card__desc { font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-snug); margin: 9px 0 0; max-width: 58ch; }
.s-card__body { padding: 4px 24px 22px; display: flex; flex-direction: column; gap: 18px; }
.s-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 560px) { .s-row2 { grid-template-columns: 1fr; } }
.s-lock { display: flex; align-items: flex-start; gap: 8px; font-size: var(--text-xs); color: var(--text-faint); line-height: var(--leading-snug); }
.s-lock svg { flex: none; margin-top: 1px; color: var(--text-muted); }
.s-lock strong { color: var(--text-muted); font-weight: 500; }
`;

const AX_DEEPSEEKCARD_CSS = `
.s-cap { display: flex; align-items: center; gap: 12px; padding-top: 4px; }
.s-cap__field { display: flex; align-items: center; gap: 8px; }
.s-cap__field .ax-input { width: 132px; }
.s-cap.is-off { opacity: 0.5; }
`;

function s_injectCss(id, css) {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const s = document.createElement("style");
  s.id = id;
  s.textContent = css;
  document.head.appendChild(s);
}
s_injectCss("ax-conncard-css", AX_CONNCARD_CSS);
s_injectCss("ax-deepseekcard-css", AX_DEEPSEEKCARD_CSS);

const DS_DEFAULT_MODELS = [
  { value: "deepseek-chat", label: "deepseek-chat · 通用 · 快" },
  { value: "deepseek-reasoner", label: "deepseek-reasoner · 深度推理" },
];

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
  model = "deepseek-chat",
  onModelChange,
  models = DS_DEFAULT_MODELS,
  status = "idle",
  result,
  onTest,
  masked = false,
  keyError,
  showUsageCap = false,
  capOn = false,
  onCapOnChange,
  cap = "",
  onCapChange,
  help,
  canTest,
  idleHint = "填写密钥后测试连通性",
}) {
  // Masked echo is derived, not stateful: a stored key is present (masked) and
  // the field is still empty → show the masked placeholder + "leave blank" hint,
  // and treat it as "present" for the Test button. The moment the caller's value
  // is non-empty (user typed), the field behaves normally.
  const maskedNow = masked && !(apiKey || "").trim();
  const testDisabled = canTest !== undefined ? !canTest : !(apiKey || "").trim() && !masked;
  const help_ = help || DS_DEFAULT_HELP;

  return (
    <section
      className={"s-card" + (status === "ok" ? " is-ok" : status === "error" ? " is-error" : "")}
    >
      <div className="s-card__head">
        <div className="s-card__toprow">
          <div className="s-card__icon">
            <Icon name="key" size={16} />
          </div>
          <span className="ax-label s-card__eyebrow">对话引擎 · LLM</span>
          <span className="s-card__status">
            <StatusPill status={status} />
          </span>
        </div>
        <h2 className="s-card__title">DeepSeek</h2>
        <p className="s-card__desc">
          驱动对话式交互。用户发送的每一条消息，都通过这把密钥调用 DeepSeek 补全。
        </p>
      </div>

      <div className="s-card__body">
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

        <div className="s-lock">
          <Icon name="lock" size={14} />
          <span>
            <strong>密钥加密存储</strong>，仅在服务端发起调用。用户
            <strong>永远看不到、也拿不到这把密钥。</strong>
          </span>
        </div>

        <div className="s-row2">
          <div>
            <label className="s-field__label ax-label">对话模型</label>
            <Select
              value={model}
              onChange={(e) => onModelChange && onModelChange(e.target.value)}
              options={models}
            />
          </div>
        </div>

        {showUsageCap ? (
          <React.Fragment>
            <Alert variant="warn" icon={<Icon name="zap" size={15} />} title="用量由你承担">
              每一轮对话消耗的都是你自己 DeepSeek
              账户的额度。用得越多，调用越多——建议设置每月上限以防意外超支。
            </Alert>
            <div className={"s-cap" + (capOn ? "" : " is-off")}>
              <Switch
                label="启用每月用量上限"
                checked={capOn}
                onChange={(e) => onCapOnChange && onCapOnChange(e.target.checked)}
              />
              <div className="s-cap__field" style={{ display: capOn ? "flex" : "none" }}>
                <input
                  className="ax-input ax-input--mono"
                  type="text"
                  inputMode="numeric"
                  value={cap}
                  onChange={(e) =>
                    onCapChange && onCapChange(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  aria-label="每月上限（元）"
                />
                <span className="s-field__hint" style={{ margin: 0 }}>
                  元 / 月，达到后暂停对话
                </span>
              </div>
            </div>
          </React.Fragment>
        ) : null}

        <HelpStepsSlot help={help_} />
      </div>

      <TestRow
        status={status}
        result={result}
        onTest={onTest}
        disabled={testDisabled}
        idleHint={idleHint}
      />
    </section>
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
