import React from "react";
import { Button } from "../buttons/Button.jsx";
import { Icon } from "../utilities/Icon.jsx";
import { Spinner } from "../feedback/Spinner.jsx";

// TestRow — the "测试连接" footer for a connection card: an inline result that
// reflects four states (idle / testing / ok / error) next to a test button.
const AX_TESTROW_CSS = `
.ax-testrow { display: flex; align-items: center; gap: 14px; padding: 14px 24px; border-top: 1px solid var(--border-default);
  background: var(--surface-panel); }
.ax-testrow__result { flex: 1; min-width: 0; display: flex; align-items: center; gap: 8px; font-size: var(--text-sm);
  font-family: var(--font-mono); }
.ax-testrow__result.is-idle { color: var(--text-faint); font-size: var(--text-xs); letter-spacing: 0.02em; }
.ax-testrow__result.is-testing { color: var(--text-muted); }
.ax-testrow__result.is-ok { color: var(--ok); }
.ax-testrow__result.is-error { color: var(--danger); }
.ax-testrow__result svg { flex: none; }
.ax-testrow__spin { display: inline-flex; }
@media (max-width: 520px) { .ax-testrow { flex-wrap: wrap; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-testrow-css")) {
  const s = document.createElement("style");
  s.id = "ax-testrow-css";
  s.textContent = AX_TESTROW_CSS;
  document.head.appendChild(s);
}

export function TestRow({
  status = "idle",
  result,
  onTest,
  disabled = false,
  idleHint,
  testLabel = "测试连接",
  retestLabel = "重新测试",
}) {
  return (
    <div className="ax-testrow">
      <div className={"ax-testrow__result is-" + status}>
        {status === "idle" && <span>{idleHint || "尚未测试"}</span>}
        {status === "testing" && (
          <>
            <span className="ax-testrow__spin">
              <Spinner size="sm" />
            </span>
            <span>正在握手…</span>
          </>
        )}
        {status === "ok" && (
          <>
            <Icon name="check" size={15} />
            <span>{result}</span>
          </>
        )}
        {status === "error" && (
          <>
            <Icon name="x" size={15} />
            <span>{result}</span>
          </>
        )}
      </div>
      <Button
        variant="secondary"
        size="sm"
        disabled={disabled || status === "testing"}
        icon={<Icon name={status === "ok" ? "refresh" : "plug"} size={14} />}
        onClick={onTest}
      >
        {status === "ok" ? retestLabel : testLabel}
      </Button>
    </div>
  );
}
