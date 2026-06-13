import React from "react";
import { DeepSeekCard } from "./DeepSeekCard.jsx";
import { FeishuCard } from "./FeishuCard.jsx";
import { Button } from "../buttons/Button.jsx";
import { Icon } from "../utilities/Icon.jsx";
import { Spinner } from "../feedback/Spinner.jsx";

// Reference host for the two pure-display connection cards. EVERYTHING outside
// the cards — the config object, persistence, the readiness rail, the Save bar +
// gate, and the backend-error slot — belongs to this caller; the cards only
// render (props in, events out). Mirrors settings/connectioncards.card.html and
// the DeepSeekCard.prompt.md "controlled + backend-wired" example.
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
    dsModel: "deepseek-chat",
    dsStatus: "ok",
    dsResult: "连接正常 · 延迟 0.4s · deepseek-chat",
    appId: "cli_a1b2c3d4e5f6",
    secret: "",
    link: "https://team.feishu.cn/base/bascnEXAMPLE?table=tblRSVP",
    fsStatus: "ok",
    fsResult: "已连接 ·「报名登记表」· 检测到 6 个字段",
    hasStoredKey: true,
    hasStoredSecret: true,
  });
  const [saving, setSaving] = React.useState(false);
  const set = (patch) => setCfg((c) => ({ ...c, ...patch }));

  const mockTest = (which) => {
    const k = which === "ds" ? "dsStatus" : "fsStatus";
    const r = which === "ds" ? "dsResult" : "fsResult";
    set({ [k]: "testing", [r]: "" });
    setTimeout(
      () =>
        set({
          [k]: "ok",
          [r]:
            which === "ds"
              ? "连接正常 · 延迟 0.4s · deepseek-chat"
              : "已连接 ·「报名登记表」· 检测到 6 个字段",
        }),
      800,
    );
  };

  const ready = (cfg.dsStatus === "ok" ? 1 : 0) + (cfg.fsStatus === "ok" ? 1 : 0);
  const allReady = ready === 2;
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
            两张可复用的连接卡——状态、持久化、保存与门禁都归这个调用方页面，卡片只负责渲染。
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
            <span style={railDot(cfg.fsStatus === "ok")} />
          </div>
          <div style={{ flex: 1, fontSize: "var(--text-sm)", color: "var(--text-muted)" }}>
            {allReady ? (
              <span>
                <strong style={{ color: "var(--text-body)", fontWeight: 500 }}>
                  两项连接均已就绪。
                </strong>
                保存后即可开始运行。
              </span>
            ) : (
              <span>
                完成下方{" "}
                <strong style={{ color: "var(--text-body)", fontWeight: 500 }}>2 项</strong>{" "}
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
            {ready} / 2
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <DeepSeekCard
            apiKey={cfg.dsKey}
            onApiKeyChange={(v) => set({ dsKey: v, dsStatus: "idle", dsResult: "" })}
            model={cfg.dsModel}
            onModelChange={(v) => set({ dsModel: v })}
            status={cfg.dsStatus}
            result={cfg.dsResult}
            onTest={() => mockTest("ds")}
            masked={cfg.hasStoredKey}
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
            onTest={() => mockTest("fs")}
            masked={cfg.hasStoredSecret}
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
                <span>完成两项连接后即可保存。</span>
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
