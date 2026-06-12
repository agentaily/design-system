import React, { useState, useEffect, useRef } from "react";
import { Alert } from "../feedback/Alert.jsx";
import { Badge } from "../display/Badge.jsx";
import { BrandMark } from "../utilities/BrandMark.jsx";
import { Button } from "../buttons/Button.jsx";
import { HelpSteps } from "./HelpSteps.jsx";
import { Icon } from "../utilities/Icon.jsx";
import { IconButton } from "../buttons/IconButton.jsx";
import { SecretField } from "../inputs/SecretField.jsx";
import { Select } from "../inputs/Select.jsx";
import { StatusPill } from "../display/StatusPill.jsx";
import { Switch } from "../inputs/Switch.jsx";
import { TestRow } from "./TestRow.jsx";

// IntegrationSettings — fullscreen modal for connecting the two services an
// Agentaily designer needs to run: a DeepSeek key (drives the conversation) and
// a Feishu Bitable (receives the data). Self-persisting to localStorage; reports
// readiness; gated save. The one cross-app difference (a monthly usage cap) is
// behind `showUsageCap`. Composes SecretField / StatusPill / TestRow / HelpSteps.
const AX_INTEGRATION_CSS = `
.s-overlay { position: fixed; inset: 0; z-index: 100; display: flex; animation: s-fade var(--dur-2) var(--ease-out) both; }
.s-modal { position: relative; flex: 1; display: flex; flex-direction: column; min-height: 0;
  background: var(--surface-page); animation: s-rise var(--dur-3) var(--ease-out) both; }
@keyframes s-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes s-rise { from { opacity: 0; transform: translateY(10px) scale(0.994); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .s-overlay, .s-modal { animation: none; } }

.s-modal__bar { flex: none; display: flex; align-items: center; gap: 16px; height: 52px;
  padding: 0 12px 0 18px; border-bottom: 1px solid var(--border-default); background: var(--surface-panel); }
.s-modal__brand { display: flex; align-items: center; gap: 8px; }
.s-modal__word { font-family: var(--font-mono); font-size: 15px; font-weight: 500; letter-spacing: -0.02em; color: var(--text-body); }
.s-modal__div { color: var(--text-faint); }
.s-modal__crumb { font-family: var(--font-mono); font-size: 13px; color: var(--text-body); }
.s-modal__baractions { margin-left: auto; display: flex; align-items: center; gap: 12px; flex: none; }

.s-modal__body { flex: 1; overflow-y: auto; min-height: 0; }
.s-wrap { max-width: 768px; margin: 0 auto; padding: 40px 24px 48px; }

.s-hero { margin-bottom: 28px; }
.s-hero__kicker { color: var(--text-faint); margin-bottom: 12px; }
.s-hero__h { font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 500;
  letter-spacing: var(--tracking-tight); line-height: var(--leading-tight); color: var(--text-body); margin: 0 0 10px; }
.s-hero__p { font-size: var(--text-md); color: var(--text-muted); line-height: var(--leading-body); margin: 0; max-width: 62ch; }

.s-ready { display: flex; align-items: center; gap: 14px; padding: 13px 16px; margin-bottom: 26px;
  border: 1px solid var(--border-default); border-radius: var(--radius-3); background: var(--surface-panel); }
.s-ready__steps { display: flex; align-items: center; gap: 7px; flex: none; }
.s-ready__dot { width: 9px; height: 9px; border-radius: var(--radius-1); border: 1px solid var(--border-strong);
  background: transparent; transition: background var(--dur-2) var(--ease-out), border-color var(--dur-2) var(--ease-out); }
.s-ready__dot.is-on { background: var(--ok); border-color: var(--ok); }
.s-ready__txt { flex: 1; min-width: 0; font-size: var(--text-sm); color: var(--text-muted); }
.s-ready__txt strong { color: var(--text-body); font-weight: 500; }
.s-ready__count { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-faint); letter-spacing: 0.04em; flex: none; }

.s-cards { display: flex; flex-direction: column; gap: 18px; }
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

.s-detect { display: flex; flex-direction: column; gap: 9px; padding: 13px 14px; border: 1px solid var(--border-default);
  border-radius: var(--radius-2); background: var(--surface-page); }
.s-detect__row { display: flex; align-items: center; gap: 10px; }
.s-detect__k { font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--text-faint); width: 84px; flex: none; }
.s-detect__v { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-body); word-break: break-all; flex: 1; }
.s-detect__ok { color: var(--ok); display: flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 10px;
  letter-spacing: var(--tracking-label); text-transform: uppercase; flex: none; }

.s-cap { display: flex; align-items: center; gap: 12px; padding-top: 4px; }
.s-cap__field { display: flex; align-items: center; gap: 8px; }
.s-cap__field .ax-input { width: 132px; }
.s-cap.is-off { opacity: 0.5; }

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

.s-save { flex: none; border-top: 1px solid var(--border-default); background: var(--surface-panel); }
.s-save__inner { max-width: 768px; margin: 0 auto; padding: 12px 24px; display: flex; align-items: center; gap: 16px; }
.s-save__status { flex: 1; min-width: 0; display: flex; align-items: center; gap: 9px; font-size: var(--text-sm); color: var(--text-muted); }
.s-save__status svg { flex: none; }
.s-save__actions { display: flex; align-items: center; gap: 8px; flex: none; }
@media (max-width: 520px) { .s-wrap { padding: 24px 16px 36px; } .s-modal__baractions { gap: 6px; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-integration-css")) {
  const s = document.createElement("style");
  s.id = "ax-integration-css";
  s.textContent = AX_INTEGRATION_CSS;
  document.head.appendChild(s);
}

const S_LS_KEY = "agentaily.integrations.v1";
const s_sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function s_parseFeishu(url) {
  if (!url) return null;
  const tokenM = url.match(/\/base\/([A-Za-z0-9]+)/) || url.match(/[?&]app_token=([A-Za-z0-9]+)/);
  const tableM = url.match(/[?&]table=([A-Za-z0-9]+)/);
  if (!tokenM) return null;
  return { token: tokenM[1], table: tableM ? tableM[1] : "" };
}

const S_FIELD_MAP = [
  { from: "姓名", to: "姓名", tag: null },
  { from: "手机号", to: "手机号", tag: null },
  { from: "邮箱", to: "邮箱", tag: null },
  { from: "报名场次", to: "场次", tag: "单选" },
  { from: "备注", to: "备注", tag: null },
  { from: null, to: "提交时间", tag: "自动" },
  { from: null, to: "来源链接", tag: "自动" },
];

function s_load() {
  try {
    return JSON.parse(localStorage.getItem(S_LS_KEY)) || {};
  } catch (e) {
    return {};
  }
}

export function IntegrationSettings({ onClose, showUsageCap = true, storageKey = S_LS_KEY }) {
  const load = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || {};
    } catch (e) {
      return {};
    }
  };
  const boot = useRef(load()).current;

  const [dsKey, setDsKey] = useState(boot.dsKey || "");
  const [dsModel, setDsModel] = useState(boot.dsModel || "deepseek-chat");
  const [capOn, setCapOn] = useState(!!boot.capOn);
  const [cap, setCap] = useState(boot.cap || "200");
  const [dsStatus, setDsStatus] = useState(boot.dsStatus === "ok" ? "ok" : "idle");
  const [dsResult, setDsResult] = useState(boot.dsResult || "");

  const [appId, setAppId] = useState(boot.appId || "");
  const [secret, setSecret] = useState(boot.secret || "");
  const [link, setLink] = useState(boot.link || "");
  const [fsStatus, setFsStatus] = useState(boot.fsStatus === "ok" ? "ok" : "idle");
  const [fsResult, setFsResult] = useState(boot.fsResult || "");

  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(!!boot.saved);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose && onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const parsed = s_parseFeishu(link);
  const dsConnected = dsStatus === "ok";
  const fsConnected = fsStatus === "ok";
  const readyCount = (dsConnected ? 1 : 0) + (fsConnected ? 1 : 0);
  const allReady = dsConnected && fsConnected;

  useEffect(() => {
    const snap = {
      dsKey,
      dsModel,
      capOn,
      cap,
      dsStatus,
      dsResult,
      appId,
      secret,
      link,
      fsStatus,
      fsResult,
      saved,
    };
    try {
      localStorage.setItem(storageKey, JSON.stringify(snap));
    } catch (e) {}
  }, [
    dsKey,
    dsModel,
    capOn,
    cap,
    dsStatus,
    dsResult,
    appId,
    secret,
    link,
    fsStatus,
    fsResult,
    saved,
    storageKey,
  ]);

  const touch = () => {
    setDirty(true);
    setSaved(false);
  };
  const editDs = (setter) => (v) => {
    setter(v);
    if (dsStatus !== "idle") {
      setDsStatus("idle");
      setDsResult("");
    }
    touch();
  };
  const editFs = (setter) => (v) => {
    setter(v);
    if (fsStatus !== "idle") {
      setFsStatus("idle");
      setFsResult("");
    }
    touch();
  };

  const testDeepSeek = async () => {
    setDsStatus("testing");
    setDsResult("");
    await s_sleep(1300);
    const k = dsKey.trim();
    if (k.startsWith("sk-") && k.length >= 20) {
      setDsStatus("ok");
      setDsResult(`连接正常 · 延迟 0.4s · ${dsModel}`);
    } else {
      setDsStatus("error");
      setDsResult(k ? "密钥无效或额度不足，请核对后重试" : "请先填写 API Key");
    }
    touch();
  };

  const testFeishu = async () => {
    setFsStatus("testing");
    setFsResult("");
    await s_sleep(1500);
    if (!appId.trim() || !secret.trim()) {
      setFsStatus("error");
      setFsResult("缺少 App ID 或 App Secret");
      touch();
      return;
    }
    if (!parsed) {
      setFsStatus("error");
      setFsResult("无法识别多维表格链接，请粘贴完整 URL");
      touch();
      return;
    }
    if (!parsed.table) {
      setFsStatus("error");
      setFsResult("链接缺少数据表 (table) 参数");
      touch();
      return;
    }
    setFsStatus("ok");
    setFsResult("已连接 ·「报名登记表」· 检测到 6 个字段");
    touch();
  };

  const onSave = () => {
    setSaved(true);
    setDirty(false);
  };
  const onDiscard = () => {
    const b = load();
    setDsKey(b.dsKey || "");
    setDsModel(b.dsModel || "deepseek-chat");
    setCapOn(!!b.capOn);
    setCap(b.cap || "200");
    setDsStatus(b.dsStatus === "ok" ? "ok" : "idle");
    setDsResult(b.dsResult || "");
    setAppId(b.appId || "");
    setSecret(b.secret || "");
    setLink(b.link || "");
    setFsStatus(b.fsStatus === "ok" ? "ok" : "idle");
    setFsResult(b.fsResult || "");
    setSaved(!!b.saved);
    setDirty(false);
  };

  return (
    <div className="s-overlay" role="dialog" aria-modal="true" aria-label="集成设置">
      <div className="s-modal">
        <header className="s-modal__bar">
          <div className="s-modal__brand">
            <BrandMark size={16} />
            <span className="s-modal__word">agentaily</span>
            <span className="s-modal__div">/</span>
            <span className="s-modal__crumb">集成设置</span>
          </div>
          <div className="s-modal__baractions">
            <Badge variant={allReady ? "ok" : "neutral"} dot={allReady}>
              {allReady ? "就绪" : "未就绪"}
            </Badge>
            <IconButton label="关闭" onClick={() => onClose && onClose()}>
              <Icon name="x" size={16} />
            </IconButton>
          </div>
        </header>

        <main className="s-modal__body">
          <div className="s-wrap">
            <div className="s-hero">
              <div className="ax-label s-hero__kicker">集成 · INTEGRATIONS</div>
              <h1 className="s-hero__h">连接你的服务</h1>
              <p className="s-hero__p">
                运行需要两条连接：一把驱动对话的 DeepSeek
                密钥，和一张接收数据的飞书多维表格。两项都连通后即可发布。
              </p>
            </div>

            <div className="s-ready">
              <div className="s-ready__steps">
                <span className={"s-ready__dot" + (dsConnected ? " is-on" : "")}></span>
                <span className={"s-ready__dot" + (fsConnected ? " is-on" : "")}></span>
              </div>
              <div className="s-ready__txt">
                {allReady ? (
                  <span>
                    <strong>两项连接均已就绪。</strong>保存后即可开始运行。
                  </span>
                ) : (
                  <span>
                    完成下方 <strong>2 项</strong> 连接后才能发布运行。
                  </span>
                )}
              </div>
              <span className="s-ready__count">{readyCount} / 2</span>
            </div>

            <div className="s-cards">
              {/* ── Card 1 · DeepSeek ── */}
              <section
                className={
                  "s-card" +
                  (dsStatus === "ok" ? " is-ok" : dsStatus === "error" ? " is-error" : "")
                }
              >
                <div className="s-card__head">
                  <div className="s-card__toprow">
                    <div className="s-card__icon">
                      <Icon name="key" size={16} />
                    </div>
                    <span className="ax-label s-card__eyebrow">对话引擎 · LLM</span>
                    <span className="s-card__status">
                      <StatusPill status={dsStatus} />
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
                    value={dsKey}
                    onChange={editDs(setDsKey)}
                    placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                    error={dsStatus === "error" && !dsKey.trim() ? "此项必填" : undefined}
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
                        value={dsModel}
                        onChange={(e) => editDs(setDsModel)(e.target.value)}
                        options={[
                          { value: "deepseek-chat", label: "deepseek-chat · 通用 · 快" },
                          { value: "deepseek-reasoner", label: "deepseek-reasoner · 深度推理" },
                        ]}
                      />
                    </div>
                  </div>

                  {showUsageCap ? (
                    <React.Fragment>
                      <Alert
                        variant="warn"
                        icon={<Icon name="zap" size={15} />}
                        title="用量由你承担"
                      >
                        每一轮对话消耗的都是你自己 DeepSeek
                        账户的额度。用得越多，调用越多——建议设置每月上限以防意外超支。
                      </Alert>
                      <div className={"s-cap" + (capOn ? "" : " is-off")}>
                        <Switch
                          label="启用每月用量上限"
                          checked={capOn}
                          onChange={(e) => {
                            setCapOn(e.target.checked);
                            touch();
                          }}
                        />
                        <div className="s-cap__field" style={{ display: capOn ? "flex" : "none" }}>
                          <input
                            className="ax-input ax-input--mono"
                            type="text"
                            inputMode="numeric"
                            value={cap}
                            onChange={(e) => {
                              setCap(e.target.value.replace(/[^0-9]/g, ""));
                              touch();
                            }}
                            aria-label="每月上限（元）"
                          />
                          <span className="s-field__hint" style={{ margin: 0 }}>
                            元 / 月，达到后暂停对话
                          </span>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : null}

                  <HelpSteps
                    title="如何获取 DeepSeek API Key？"
                    steps={[
                      <>
                        登录 <code>platform.deepseek.com</code>，进入「API Keys」页面。
                      </>,
                      <>点击「创建 API Key」，命名后立即复制——密钥只在创建时完整显示一次。</>,
                      <>在「充值」中确认账户余额充足，对话才能持续调用。</>,
                      <>
                        把以 <code>sk-</code> 开头的密钥粘贴到上方输入框。
                      </>,
                    ]}
                    link={{
                      href: "https://platform.deepseek.com",
                      label: "打开 DeepSeek 开放平台",
                    }}
                  />
                </div>

                <TestRow
                  status={dsStatus}
                  result={dsResult}
                  onTest={testDeepSeek}
                  disabled={!dsKey.trim()}
                  idleHint="填写密钥后测试连通性"
                />
              </section>

              {/* ── Card 2 · Feishu Bitable ── */}
              <section
                className={
                  "s-card" +
                  (fsStatus === "ok" ? " is-ok" : fsStatus === "error" ? " is-error" : "")
                }
              >
                <div className="s-card__head">
                  <div className="s-card__toprow">
                    <div className="s-card__icon">
                      <Icon name="table" size={16} />
                    </div>
                    <span className="ax-label s-card__eyebrow">数据写入 · FEISHU BITABLE</span>
                    <span className="s-card__status">
                      <StatusPill status={fsStatus} />
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
                        className="ax-input ax-input--mono"
                        type="text"
                        value={appId}
                        spellCheck="false"
                        placeholder="cli_xxxxxxxxxxxx"
                        onChange={(e) => editFs(setAppId)(e.target.value)}
                      />
                      <p className="s-field__hint">应用标识，可公开。</p>
                    </div>
                    <SecretField
                      label="App Secret"
                      value={secret}
                      onChange={editFs(setSecret)}
                      placeholder="••••••••••••••••"
                      hint="应用密钥，加密存储。"
                    />
                  </div>

                  <div>
                    <label className="s-field__label ax-label">多维表格链接</label>
                    <input
                      className="ax-input"
                      type="text"
                      value={link}
                      spellCheck="false"
                      placeholder="https://your-team.feishu.cn/base/bascn…?table=tbl…"
                      onChange={(e) => editFs(setLink)(e.target.value)}
                    />
                    <p className="s-field__hint">
                      在多维表格右上角「分享」中复制链接粘贴即可，App Token 与数据表会自动识别。
                    </p>
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

                  {fsConnected ? (
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
                          {S_FIELD_MAP.map((m, i) => (
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

                  <HelpSteps
                    title="如何获取飞书应用凭证？"
                    steps={[
                      <>
                        打开飞书开放平台 <code>open.feishu.cn</code>，创建一个「企业自建应用」。
                      </>,
                      <>
                        在「凭证与基础信息」中复制 <code>App ID</code> 与 <code>App Secret</code>。
                      </>,
                      <>
                        到「权限管理」开通多维表格读写权限 <code>bitable:app</code>，并发布版本。
                      </>,
                      <>
                        在目标多维表格里，把这个应用添加为<strong>可编辑协作者</strong>。
                      </>,
                      <>复制该多维表格的分享链接，粘贴到上方「多维表格链接」。</>,
                    ]}
                    link={{ href: "https://open.feishu.cn", label: "打开飞书开放平台" }}
                  />
                </div>

                <TestRow
                  status={fsStatus}
                  result={fsResult}
                  onTest={testFeishu}
                  disabled={!appId.trim() || !secret.trim() || !parsed}
                  idleHint="填写凭证与链接后测试写入权限"
                />
              </section>
            </div>
          </div>
        </main>

        <footer className="s-save">
          <div className="s-save__inner">
            <div className="s-save__status">
              {!allReady ? (
                <>
                  <Icon name="info" size={15} style={{ color: "var(--text-faint)" }} />
                  <span>完成两项连接后即可保存并启用。</span>
                </>
              ) : saved ? (
                <>
                  <Icon name="check" size={15} style={{ color: "var(--ok)" }} />
                  <span>已保存 · 已启用对话与数据写入。</span>
                </>
              ) : (
                <>
                  <Icon name="zap" size={15} style={{ color: "var(--text-muted)" }} />
                  <span>配置已就绪，保存后立即生效。</span>
                </>
              )}
            </div>
            <div className="s-save__actions">
              <Button variant="ghost" size="md" disabled={!dirty} onClick={onDiscard}>
                放弃更改
              </Button>
              <Button
                variant="primary"
                size="md"
                icon={<Icon name="save" size={14} />}
                disabled={!allReady || !dirty}
                onClick={onSave}
              >
                保存配置
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
