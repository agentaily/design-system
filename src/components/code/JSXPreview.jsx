import React from "react";

const AX_JSXPREVIEW_CSS = `
.ax-jsxpreview { display: grid; grid-template-columns: 1fr 1fr; border: 1px solid var(--border-default); border-radius: var(--radius-3); overflow: hidden; }
.ax-jsxpreview--stacked { grid-template-columns: 1fr; }
.ax-jsxpreview__pane { min-width: 0; }
.ax-jsxpreview__pane--code { border-right: 1px solid var(--border-default); background: var(--bg-0); }
[data-theme="light"] .ax-jsxpreview__pane--code { background: var(--bg-1); }
.ax-jsxpreview--stacked .ax-jsxpreview__pane--code { border-right: none; border-bottom: 1px solid var(--border-default); }
.ax-jsxpreview__label { font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); padding: 8px 12px; border-bottom: 1px solid var(--border-default); }
.ax-jsxpreview__pre { margin: 0; padding: 12px; font-family: var(--font-mono); font-size: var(--text-xs); line-height: 1.6; color: var(--text-body); white-space: pre; overflow-x: auto; }
.ax-jsxpreview__render { padding: 20px; display: flex; align-items: center; justify-content: center; min-height: 100px; background: var(--surface-card); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-jsxpreview-css")) {
  const s = document.createElement("style");
  s.id = "ax-jsxpreview-css";
  s.textContent = AX_JSXPREVIEW_CSS;
  document.head.appendChild(s);
}

export function JSXPreview({ code, children, stacked = false, className = "", ...rest }) {
  return (
    <div className={["ax-jsxpreview", stacked ? "ax-jsxpreview--stacked" : "", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-jsxpreview__pane ax-jsxpreview__pane--code">
        <div className="ax-jsxpreview__label">JSX</div>
        <pre className="ax-jsxpreview__pre">{code}</pre>
      </div>
      <div className="ax-jsxpreview__pane">
        <div className="ax-jsxpreview__label">Preview</div>
        <div className="ax-jsxpreview__render">{children}</div>
      </div>
    </div>
  );
}
