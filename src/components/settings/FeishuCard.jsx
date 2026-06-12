import React from "react";
import { HelpSteps } from "./HelpSteps.jsx";
import { Icon } from "../utilities/Icon.jsx";
import { SecretField } from "../inputs/SecretField.jsx";
import { StatusPill } from "../display/StatusPill.jsx";
import { TestRow } from "./TestRow.jsx";

// FeishuCard — a PURE-DISPLAY connection card for a Feishu (Lark) Bitable data
// sink. Props in (appId / secret / link, status, result, masked, errors,
// fieldMap, help…), events out (onAppIdChange / onSecretChange / onLinkChange /
// onTest). Zero state, zero localStorage, zero save bar, zero gating — the
// caller owns all of that. The only thing it derives locally is the App
// Token / table read-out parsed from the share link (pure display). Composes
// SecretField / StatusPill / TestRow / HelpSteps.
const AX_FEISHUCARD_CSS = `
.s-detect { display: flex; flex-direction: column; gap: 9px; padding: 13px 14px; border: 1px solid var(--border-default);
  border-radius: var(--radius-2); background: var(--surface-page); }
.s-detect__row { display: flex; align-items: center; gap: 10px; }
.s-detect__k { font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--text-faint); width: 84px; flex: none; }
.s-detect__v { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-body); word-break: break-all; flex: 1; }
.s-detect__ok { color: var(--ok); display: flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 10px;
  letter-spacing: var(--tracking-label); text-transform: uppercase; flex: none; }
.s-map { width: 100%; border-collapse: collapse; font-size: var(--text-xs); }
.s-map th { text-align: left; font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--text-faint); font-weight: 500; padding: 0 0 8px; }
.s-map td { padding: 7px 0; border-top: 1px solid var(--border-default); color: var(--text-body); vertical-align: middle; }
.s-map__from { color: var(--text-muted); }
.s-map__arrow { width: 36px; color: var(--text-faint); }
.s-map__col { font-family: var(--font-mono); }
.s-map__tag { font-family: var(--font-mono); font-size: 9px; letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--text-faint); border: 1px solid var(--border-default); border-radius: var(--radius-1); padding: 2px 5px; margin-left: 7px; }
.s-sub { display: flex; align-items: center; gap: 8px; }
.s-sub__line { flex: 1; height: 1px; background: var(--border-default); }
`;

// Shared connection-card shell, mirrored from DeepSeekCard so this card renders
// correctly when mounted on its own. Guarded by a single id — first writer wins.
const AX_CONNCARD_CSS_FS = `
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

function fs_injectCss(id, css) {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const s = document.createElement("style");
  s.id = id;
  s.textContent = css;
  document.head.appendChild(s);
}
fs_injectCss("ax-conncard-css", AX_CONNCARD_CSS_FS);
fs_injectCss("ax-feishucard-css", AX_FEISHUCARD_CSS);

// Parse the App Token + data-table id out of a Bitable share URL — pure display.
export function parseFeishuLink(url) {
  if (!url) return null;
  const tokenM = url.match(/\/base\/([A-Za-z0-9]+)/) || url.match(/[?&]app_token=([A-Za-z0-9]+)/);
  const tableM = url.match(/[?&]table=([A-Za-z0-9]+)/);
  if (!tokenM) return null;
  return { token: tokenM[1], table: tableM ? tableM[1] : "" };
}

const FS_DEFAULT_FIELD_MAP = [
  { from: "姓名", to: "姓名", tag: null },
  { from: "手机号", to: "手机号", tag: null },
  { from: "邮箱", to: "邮箱", tag: null },
  { from: "报名场次", to: "场次", tag: "单选" },
  { from: "备注", to: "备注", tag: null },
  { from: null, to: "提交时间", tag: "自动" },
  { from: null, to: "来源链接", tag: "自动" },
];

const FS_DEFAULT_HELP = {
  title: "如何获取飞书应用凭证？",
  steps: [
    <React.Fragment>
      打开飞书开放平台 <code>open.feishu.cn</code>，创建一个「企业自建应用」。
    </React.Fragment>,
    <React.Fragment>
      在「凭证与基础信息」中复制 <code>App ID</code> 与 <code>App Secret</code>。
    </React.Fragment>,
    <React.Fragment>
      到「权限管理」开通多维表格读写权限 <code>bitable:app</code>，并发布版本。
    </React.Fragment>,
    <React.Fragment>
      在目标多维表格里，把这个应用添加为<strong>可编辑协作者</strong>。
    </React.Fragment>,
    <React.Fragment>复制该多维表格的分享链接，粘贴到上方「多维表格链接」。</React.Fragment>,
  ],
  link: { href: "https://open.feishu.cn", label: "打开飞书开放平台" },
};

export function FeishuCard({
  appId = "",
  onAppIdChange,
  secret = "",
  onSecretChange,
  link = "",
  onLinkChange,
  status = "idle",
  result,
  onTest,
  masked = false,
  appIdError,
  secretError,
  linkError,
  fieldMap = FS_DEFAULT_FIELD_MAP,
  showMapping,
  help,
  canTest,
  idleHint = "填写凭证与链接后测试写入权限",
}) {
  const parsed = parseFeishuLink(link);
  // Masked echo is derived from props (no state): stored secret + empty field →
  // masked placeholder, still counts as "present" for the Test button.
  const maskedNow = masked && !(secret || "").trim();
  const testDisabled =
    canTest !== undefined
      ? !canTest
      : !(appId || "").trim() || (!(secret || "").trim() && !masked) || !parsed;
  const showMap = showMapping !== undefined ? showMapping : status === "ok";
  const help_ = help || FS_DEFAULT_HELP;

  return (
    <section
      className={"s-card" + (status === "ok" ? " is-ok" : status === "error" ? " is-error" : "")}
    >
      <div className="s-card__head">
        <div className="s-card__toprow">
          <div className="s-card__icon">
            <Icon name="table" size={16} />
          </div>
          <span className="ax-label s-card__eyebrow">数据写入 · FEISHU BITABLE</span>
          <span className="s-card__status">
            <StatusPill status={status} />
          </span>
        </div>
        <h2 className="s-card__title">飞书多维表格</h2>
        <p className="s-card__desc">
          每次提交后，数据自动写入指定多维表格的一行。需要一个飞书自建应用的凭证，以及目标表格的链接。
        </p>
      </div>

      <div className="s-card__body">
        <div className="s-row2">
          <div>
            <label className="s-field__label ax-label">App ID</label>
            <input
              className={"ax-input ax-input--mono" + (appIdError ? " ax-input--error" : "")}
              type="text"
              value={appId}
              spellCheck="false"
              placeholder="cli_xxxxxxxxxxxx"
              onChange={(e) => onAppIdChange && onAppIdChange(e.target.value)}
            />
            {appIdError ? (
              <p className="s-field__hint s-field__hint--err">{appIdError}</p>
            ) : (
              <p className="s-field__hint">应用标识，可公开。</p>
            )}
          </div>
          <SecretField
            label="App Secret"
            value={secret}
            onChange={onSecretChange}
            placeholder={maskedNow ? "已保存 ········  ·  留空则保持不变" : "••••••••••••••••"}
            hint={maskedNow ? "已存密钥 · 留空表示不修改" : "应用密钥，加密存储。"}
            error={secretError}
          />
        </div>

        <div>
          <label className="s-field__label ax-label">多维表格链接</label>
          <input
            className={"ax-input" + (linkError ? " ax-input--error" : "")}
            type="text"
            value={link}
            spellCheck="false"
            placeholder="https://your-team.feishu.cn/base/bascn…?table=tbl…"
            onChange={(e) => onLinkChange && onLinkChange(e.target.value)}
          />
          {linkError ? (
            <p className="s-field__hint s-field__hint--err">{linkError}</p>
          ) : (
            <p className="s-field__hint">
              在多维表格右上角「分享」中复制链接粘贴即可，App Token 与数据表会自动识别。
            </p>
          )}
        </div>

        {parsed ? (
          <div className="s-detect">
            <div className="s-detect__row">
              <span className="s-detect__k">App Token</span>
              <span className="s-detect__v">{parsed.token}</span>
              <span className="s-detect__ok">
                <Icon name="check" size={12} />
                已识别
              </span>
            </div>
            <div className="s-detect__row">
              <span className="s-detect__k">数据表</span>
              <span className="s-detect__v">{parsed.table || "—"}</span>
              {parsed.table ? (
                <span className="s-detect__ok">
                  <Icon name="check" size={12} />
                  已识别
                </span>
              ) : (
                <span className="s-detect__ok" style={{ color: "var(--warn)" }}>
                  <Icon name="warn" size={12} />
                  缺失
                </span>
              )}
            </div>
          </div>
        ) : null}

        <div className="s-lock">
          <Icon name="shield" size={14} />
          <span>
            <strong>凭证加密存储</strong>，仅服务端用于写入数据。用户
            <strong>无法接触你的飞书凭证或表格权限。</strong>
          </span>
        </div>

        {showMap ? (
          <div>
            <div className="s-sub" style={{ marginBottom: 12 }}>
              <span className="ax-label">字段映射 · 自动</span>
              <span className="s-sub__line"></span>
            </div>
            <table className="s-map">
              <thead>
                <tr>
                  <th>字段</th>
                  <th className="s-map__arrow"></th>
                  <th>表格列</th>
                </tr>
              </thead>
              <tbody>
                {fieldMap.map((m, i) => (
                  <tr key={i}>
                    <td className="s-map__from">
                      {m.from || <span style={{ color: "var(--text-faint)" }}>—</span>}
                    </td>
                    <td className="s-map__arrow">
                      <Icon name="arrow" size={14} />
                    </td>
                    <td>
                      <span className="s-map__col">{m.to}</span>
                      {m.tag ? <span className="s-map__tag">{m.tag}</span> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <FeishuHelpSlot help={help_} />
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

function FeishuHelpSlot({ help }) {
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
