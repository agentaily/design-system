import React from "react";
import { MarkupLayer } from "./MarkupLayer.jsx";
import { Button } from "../buttons/Button.jsx";

export default {
  title: "Review/MarkupLayer",
  component: MarkupLayer,
  parameters: { layout: "fullscreen" },
};

function Demo() {
  const [on, setOn] = React.useState(true);
  const [sent, setSent] = React.useState("");
  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 12, display: "flex", gap: 12, alignItems: "center" }}>
        <Button size="sm" onClick={() => setOn(true)}>
          开启标注
        </Button>
        {sent ? (
          <span
            style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}
          >
            已发送：{sent}
          </span>
        ) : null}
      </div>

      {/* The parent MUST be position: relative — the layer fills it (inset: 0). */}
      <div
        style={{
          position: "relative",
          padding: 32,
          minHeight: 360,
          border: "1px solid var(--border-default)",
          borderRadius: "var(--radius-3)",
          background: "var(--surface-card)",
        }}
      >
        <h1 data-mk-label="标题" data-mk-kind="文本" style={{ marginTop: 0 }}>
          活动报名
        </h1>
        <p data-mk-label="说明文字" data-mk-kind="文本" style={{ color: "var(--text-muted)" }}>
          填写以下信息完成报名。
        </p>
        <button data-mk-label="提交按钮" data-mk-kind="按钮">
          提交
        </button>

        {on && (
          <MarkupLayer
            onClose={() => setOn(false)}
            onSend={(msg) => {
              setSent(msg);
              setOn(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export const Default = { render: () => <Demo /> };
