import React from "react";
import { DeepSeekCard } from "./DeepSeekCard.jsx";
import { Button } from "../buttons/Button.jsx";
import { Icon } from "../utilities/Icon.jsx";
import { Spinner } from "../feedback/Spinner.jsx";

// Reference host for the pure-display connection card. EVERYTHING outside the
// card — the config object, persistence, the readiness rail, the Save bar + gate,
// and the backend-error slot — belongs to this caller; the card only renders
// (props in, events out). Mirrors the DeepSeekCard.prompt.md "controlled +
// backend-wired" example. Compose more services by dropping additional cards
// (another DeepSeekCard, or a custom card built on ConnectionCard) into the host.
export default {
  title: "Settings/Connection Cards",
  parameters: { layout: "fullscreen" },
};

const railDot = (on) => ({
  width: 9,
  height: 9,
  borderRadius: "var(--radius-1)",
  border: "1px solid " + (on ? "var(--ok)" : "var(--border-strong)"),
  background: on ? "var(--ok)" : "transparent",
});

function IntegrationsScreen() {
  const [cfg, setCfg] = React.useState({
    dsKey: "",
    dsStatus: "ok",
    dsResult: "连接正常 · 延迟 0.4s",
    hasStoredKey: true,
  });
  const [saving, setSaving] = React.useState(false);
  const set = (patch) => setCfg((c) => ({ ...c, ...patch }));

  const mockTest = () => {
    set({ dsStatus: "testing", dsResult: "" });
    setTimeout(() => set({ dsStatus: "ok", dsResult: "连接正常 · 延迟 0.4s" }), 800);
  };

  const ready = cfg.dsStatus === "ok" ? 1 : 0;
  const allReady = ready === 1;
  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 600);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--surface-page)" }}>
      <div style={{ maxWidth: 768, margin: "0 auto", padding: "36px 24px 40px" }}>
        <div style={{ marginBottom: 22 }}>
          <div className="ax-label" style={{ color: "var(--text-faint)", marginBottom: 10 }}>
            集成 · INTEGRATIONS
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-2xl)",
              fontWeight: 500,
              letterSpacing: "var(--tracking-tight)",
              lineHeight: "var(--leading-tight)",
              color: "var(--text-body)",
              margin: "0 0 8px",
            }}
          >
            连接你的服务
          </h1>
          <p
            style={{
              fontSize: "var(--text-md)",
              color: "var(--text-muted)",
              lineHeight: "var(--leading-body)",
              margin: 0,
              maxWidth: "60ch",
            }}
          >
            可复用的连接卡——状态、持久化、保存与门禁都归这个调用方页面，卡片只负责渲染。
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "13px 16px",
            marginBottom: 22,
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-3)",
            background: "var(--surface-panel)",
          }}
        >
          <div style={{ display: "flex", gap: 7, flex: "none" }}>
            <span style={railDot(cfg.dsStatus === "ok")} />
          </div>
          <div style={{ flex: 1, fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
            {allReady ? (
              <span>
                <strong style={{ color: "var(--text-body)", fontWeight: 500 }}>连接已就绪。</strong>
                保存后即可开始运行。
              </span>
            ) : (
              <span>
                完成下方{" "}
                <strong style={{ color: "var(--text-body)", fontWeight: 500 }}>1 项</strong>{" "}
                连接后才能发布运行。
              </span>
            )}
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-xs)",
              color: "var(--text-faint)",
              flex: "none",
            }}
          >
            {ready} / 1
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <DeepSeekCard
            apiKey={cfg.dsKey}
            onApiKeyChange={(v) => set({ dsKey: v, dsStatus: "idle", dsResult: "" })}
            status={cfg.dsStatus}
            result={cfg.dsResult}
            onTest={mockTest}
            masked={cfg.hasStoredKey}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 20,
            paddingTop: 18,
            borderTop: "1px solid var(--border-default)",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 9,
              fontSize: "var(--text-sm)",
              color: "var(--text-muted)",
            }}
          >
            {allReady ? (
              <>
                <Icon name="check" size={15} style={{ color: "var(--ok)" }} />
                <span>配置就绪，保存后立即生效。</span>
              </>
            ) : (
              <>
                <Icon name="info" size={15} style={{ color: "var(--text-faint)" }} />
                <span>完成连接后即可保存。</span>
              </>
            )}
          </div>
          <Button
            variant="primary"
            size="md"
            disabled={!allReady || saving}
            aria-busy={saving || undefined}
            icon={saving ? <Spinner size="sm" /> : <Icon name="save" size={14} />}
            onClick={save}
          >
            保存配置
          </Button>
        </div>
      </div>
    </div>
  );
}

export const Default = { name: "Integrations screen", render: () => <IntegrationsScreen /> };
