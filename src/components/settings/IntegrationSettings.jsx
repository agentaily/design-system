import React, { useState } from "react";
import { DeepSeekCard } from "./DeepSeekCard.jsx";
import { FeishuCard } from "./FeishuCard.jsx";
import { PageSection } from "../layout/PageSection.jsx";

// IntegrationSettings (alias ServiceConnections) — the "集成 / Integrations"
// SECTION of a settings page. It is NOT a panel and does NOT own a shell: it is
// content meant to live inside <SettingsSheet> (which provides the floating
// PanelSheet around it). The section is COMPOSITIONAL — slot any connection
// cards into it via `children` ("往里面组合式地塞卡片"); it wraps them with the
// integration hero + a readiness rail + an optional save row.
//
//   <SettingsSheet>                ← floating settings page (built on PanelSheet)
//     <IntegrationSettings>        ← THIS — the integrations section
//       <DeepSeekCard/>            ← composed-in cards (caller owns their state)
//       <FeishuCard/>
//     </IntegrationSettings>
//   </SettingsSheet>
//
// Convenience: pass NO children and it renders the default DeepSeekCard +
// FeishuCard from `config` and derives the readiness rail itself, so it also
// works standalone. It NEVER persists and owns NO save UI — the container's
// <SettingsSaveBar> (in the SettingsSheet footer) is the single commit point.
const AX_ISET_CSS = `
.ax-iset__rail { display: flex; align-items: center; gap: 14px; padding: 13px 16px;
  border: 1px solid var(--border-default); border-radius: var(--radius-3); background: var(--surface-panel); }
.ax-iset__dots { display: flex; align-items: center; gap: 7px; flex: none; }
.ax-iset__dot { width: 9px; height: 9px; border-radius: var(--radius-1); border: 1px solid var(--border-strong);
  background: transparent; transition: background var(--dur-2) var(--ease-out), border-color var(--dur-2) var(--ease-out); }
.ax-iset__dot.is-on { background: var(--ok); border-color: var(--ok); }
.ax-iset__railtxt { flex: 1; min-width: 0; font-size: var(--text-sm); color: var(--text-muted); }
.ax-iset__railtxt strong { color: var(--text-body); font-weight: 500; }
.ax-iset__count { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-faint); letter-spacing: 0.04em; flex: none; }

.ax-iset__cards { display: flex; flex-direction: column; gap: 18px; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-iset-css")) {
  const s = document.createElement("style");
  s.id = "ax-iset-css";
  s.textContent = AX_ISET_CSS;
  document.head.appendChild(s);
}

const ISET_DEFAULT_CONFIG = {
  dsKey: "",
  dsModel: "deepseek-chat",
  dsStatus: "idle",
  dsResult: "",
  hasStoredKey: false,
  appId: "",
  secret: "",
  link: "",
  fsStatus: "idle",
  fsResult: "",
  hasStoredSecret: false,
};

export function IntegrationSettings({
  // compositional content — the connection cards
  children,
  // readiness rail (compositional mode): how many of `total` are connected
  ready,
  total,
  showRail = true,
  // default-cards mode (no children): state for the built-in DeepSeek + Feishu cards
  config: controlledConfig,
  onConfigChange,
  defaultConfig,
  onTestDeepSeek,
  onTestFeishu,
  deepSeekProps = {},
  feishuProps = {},
  // copy
  kicker = "集成 · INTEGRATIONS",
  title = "连接你的服务",
  intro = "Agentaily 用 DeepSeek 驱动对话，把每次提交写入你的飞书多维表格。两项都连接好，才能开始运行。",
  ...rest
}) {
  const [internal, setInternal] = useState(() => ({
    ...ISET_DEFAULT_CONFIG,
    ...(defaultConfig || {}),
  }));
  const controlled = controlledConfig !== undefined;
  const cfg = controlled ? controlledConfig : internal;
  const set = (patch) => {
    if (controlled) {
      if (onConfigChange) onConfigChange(patch);
    } else setInternal((c) => ({ ...c, ...patch }));
  };

  const usingDefaultCards = !children;

  // Fallback mock probe so the default cards are alive standalone.
  const mock = (which) => {
    const sk = which === "ds" ? "dsStatus" : "fsStatus";
    const rk = which === "ds" ? "dsResult" : "fsResult";
    set({ [sk]: "testing", [rk]: "" });
    setTimeout(
      () =>
        set({
          [sk]: "ok",
          [rk]:
            which === "ds" ? "连接正常 · 延迟 0.4s · " + cfg.dsModel : "已连接 · 检测到 6 个字段",
        }),
      900,
    );
  };

  // Readiness: explicit ready/total wins (compositional); else derive from the
  // default cards' statuses; else unknown → no rail.
  let readyN;
  let totalN;
  if (ready !== undefined || total !== undefined) {
    readyN = ready || 0;
    totalN = total !== undefined ? total : 0;
  } else if (usingDefaultCards) {
    totalN = 2;
    readyN = (cfg.dsStatus === "ok" ? 1 : 0) + (cfg.fsStatus === "ok" ? 1 : 0);
  }
  const hasRail = showRail && totalN !== undefined;
  const allReady = totalN !== undefined && totalN > 0 ? readyN === totalN : false;

  const defaultCards = (
    <React.Fragment>
      <DeepSeekCard
        apiKey={cfg.dsKey}
        onApiKeyChange={(v) => set({ dsKey: v, dsStatus: "idle", dsResult: "" })}
        model={cfg.dsModel}
        onModelChange={(v) => set({ dsModel: v })}
        status={cfg.dsStatus}
        result={cfg.dsResult}
        onTest={onTestDeepSeek || (() => mock("ds"))}
        masked={cfg.hasStoredKey}
        keyError={cfg.dsKeyError}
        {...deepSeekProps}
      />
      <FeishuCard
        appId={cfg.appId}
        onAppIdChange={(v) => set({ appId: v, fsStatus: "idle", fsResult: "" })}
        secret={cfg.secret}
        onSecretChange={(v) => set({ secret: v, fsStatus: "idle", fsResult: "" })}
        link={cfg.link}
        onLinkChange={(v) => set({ link: v, fsStatus: "idle", fsResult: "" })}
        status={cfg.fsStatus}
        result={cfg.fsResult}
        onTest={onTestFeishu || (() => mock("fs"))}
        masked={cfg.hasStoredSecret}
        appIdError={cfg.appIdError}
        secretError={cfg.secretError}
        linkError={cfg.linkError}
        {...feishuProps}
      />
    </React.Fragment>
  );

  return (
    <PageSection className="ax-iset" eyebrow={kicker} title={title} description={intro} {...rest}>
      {hasRail ? (
        <div className="ax-iset__rail">
          <div className="ax-iset__dots">
            {Array.from({ length: totalN }).map((_, i) => (
              <span key={i} className={"ax-iset__dot" + (i < readyN ? " is-on" : "")}></span>
            ))}
          </div>
          <div className="ax-iset__railtxt">
            {allReady ? (
              <span>
                <strong>全部连接均已就绪。</strong>保存后即可开始运行。
              </span>
            ) : (
              <span>
                完成下方 <strong>{totalN} 项</strong> 连接后才能发布运行。
              </span>
            )}
          </div>
          <span className="ax-iset__count">
            {readyN} / {totalN}
          </span>
        </div>
      ) : null}

      <div className="ax-iset__cards">{children || defaultCards}</div>
    </PageSection>
  );
}

// Semantic alias — "服务连接 / Service connections" reads truer than "integration
// settings". Same component, exported under both names.
export const ServiceConnections = IntegrationSettings;
