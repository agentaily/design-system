import React from "react";
import { ConnectionCard } from "./ConnectionCard.jsx";
import { HelpSteps } from "./HelpSteps.jsx";
import { Icon } from "../utilities/Icon.jsx";
import { SecretField } from "../inputs/SecretField.jsx";

// FeishuCard — a PURE-DISPLAY connection card for a Feishu (Lark) Bitable data
// sink. Props in (appId / secret / link, status, result, masked, errors,
// fieldMap, help…), events out (onAppIdChange / onSecretChange / onLinkChange /
// onTest). The caller owns all config/state. It composes the shared
// <ConnectionCard> shell and supplies its own fields + the App-Token/table
// read-out parsed from the share link (pure display).
const AX_FEISHUCARD_CSS = `
.ax-feishu-detect { display: flex; flex-direction: column; gap: 9px; padding: 13px 14px; border: 1px solid var(--border-default);
  border-radius: var(--radius-2); background: var(--surface-page); }
.ax-feishu-detect__row { display: flex; align-items: center; gap: 10px; }
.ax-feishu-detect__k { font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--text-faint); width: 84px; flex: none; }
.ax-feishu-detect__v { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-body); word-break: break-all; flex: 1; }
.ax-feishu-detect__ok { color: var(--ok); display: flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 10px;
  letter-spacing: var(--tracking-label); text-transform: uppercase; flex: none; }
.ax-feishu-map { width: 100%; border-collapse: collapse; font-size: var(--text-xs); }
.ax-feishu-map th { text-align: left; font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--text-faint); font-weight: 500; padding: 0 0 8px; }
.ax-feishu-map td { padding: 7px 0; border-top: 1px solid var(--border-default); color: var(--text-body); vertical-align: middle; }
.ax-feishu-map__from { color: var(--text-muted); }
.ax-feishu-map__arrow { width: 36px; color: var(--text-faint); }
.ax-feishu-map__col { font-family: var(--font-mono); }
.ax-feishu-map__tag { font-family: var(--font-mono); font-size: 9px; letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--text-faint); border: 1px solid var(--border-default); border-radius: var(--radius-1); padding: 2px 5px; margin-left: 7px; }
.ax-feishu-sub { display: flex; align-items: center; gap: 8px; }
.ax-feishu-sub__line { flex: 1; height: 1px; background: var(--border-default); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-feishucard-css")) {
  const s = document.createElement("style");
  s.id = "ax-feishucard-css";
  s.textContent = AX_FEISHUCARD_CSS;
  document.head.appendChild(s);
}

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
  collapsible = true,
  expanded,
  onExpandedChange,
}) {
  const parsed = parseFeishuLink(link);
  const maskedNow = masked && !(secret || "").trim();
  const testDisabled =
    canTest !== undefined
      ? !canTest
      : !(appId || "").trim() || (!(secret || "").trim() && !masked) || !parsed;
  const showMap = showMapping === true;
  const help_ = help || FS_DEFAULT_HELP;

  return (
    <ConnectionCard
      icon="table"
      title="飞书多维表格"
      desc="每次提交后，数据自动写入指定多维表格的一行。需要一个飞书自建应用的凭证，以及目标表格的链接。"
      status={status}
      result={result}
      onTest={onTest}
      testDisabled={testDisabled}
      idleHint={idleHint}
      collapsible={collapsible}
      expanded={expanded}
      onExpandedChange={onExpandedChange}
    >
      <div className="ax-conncard__row2">
        <div>
          <label className="ax-cfield__label ax-label">App ID</label>
          <input
            className={"ax-input ax-input--mono" + (appIdError ? " ax-input--error" : "")}
            type="text"
            value={appId}
            spellCheck="false"
            placeholder="cli_xxxxxxxxxxxx"
            onChange={(e) => onAppIdChange && onAppIdChange(e.target.value)}
          />
          {appIdError ? (
            <p className="ax-cfield__hint ax-cfield__hint--err">{appIdError}</p>
          ) : (
            <p className="ax-cfield__hint">应用标识，可公开。</p>
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
        <label className="ax-cfield__label ax-label">多维表格链接</label>
        <input
          className={"ax-input" + (linkError ? " ax-input--error" : "")}
          type="text"
          value={link}
          spellCheck="false"
          placeholder="https://your-team.feishu.cn/base/bascn…?table=tbl…"
          onChange={(e) => onLinkChange && onLinkChange(e.target.value)}
        />
        {linkError ? (
          <p className="ax-cfield__hint ax-cfield__hint--err">{linkError}</p>
        ) : (
          <p className="ax-cfield__hint">
            在多维表格右上角「分享」中复制链接粘贴即可，App Token 与数据表会自动识别。
          </p>
        )}
      </div>

      {parsed ? (
        <div className="ax-feishu-detect">
          <div className="ax-feishu-detect__row">
            <span className="ax-feishu-detect__k">App Token</span>
            <span className="ax-feishu-detect__v">{parsed.token}</span>
            <span className="ax-feishu-detect__ok">
              <Icon name="check" size={12} />
              已识别
            </span>
          </div>
          <div className="ax-feishu-detect__row">
            <span className="ax-feishu-detect__k">数据表</span>
            <span className="ax-feishu-detect__v">{parsed.table || "—"}</span>
            {parsed.table ? (
              <span className="ax-feishu-detect__ok">
                <Icon name="check" size={12} />
                已识别
              </span>
            ) : (
              <span className="ax-feishu-detect__ok" style={{ color: "var(--warn)" }}>
                <Icon name="warn" size={12} />
                缺失
              </span>
            )}
          </div>
        </div>
      ) : null}

      {showMap ? (
        <div>
          <div className="ax-feishu-sub" style={{ marginBottom: 12 }}>
            <span className="ax-label">字段映射 · 自动</span>
            <span className="ax-feishu-sub__line"></span>
          </div>
          <table className="ax-feishu-map">
            <thead>
              <tr>
                <th>字段</th>
                <th className="ax-feishu-map__arrow"></th>
                <th>表格列</th>
              </tr>
            </thead>
            <tbody>
              {fieldMap.map((m, i) => (
                <tr key={i}>
                  <td className="ax-feishu-map__from">
                    {m.from || <span style={{ color: "var(--text-faint)" }}>—</span>}
                  </td>
                  <td className="ax-feishu-map__arrow">
                    <Icon name="arrow" size={14} />
                  </td>
                  <td>
                    <span className="ax-feishu-map__col">{m.to}</span>
                    {m.tag ? <span className="ax-feishu-map__tag">{m.tag}</span> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      <FeishuHelpSlot help={help_} />
    </ConnectionCard>
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
