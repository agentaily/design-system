import React, { useState } from "react";

const AX_ARTIFACT_CSS = `
.ax-artifact { border: 1px solid var(--border-strong); border-radius: var(--radius-3); overflow: hidden; background: var(--surface-card); }
.ax-artifact__head { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-bottom: 1px solid var(--border-default); }
.ax-artifact__icon { width: 16px; height: 16px; flex: none; color: var(--text-faint); }
.ax-artifact__meta { flex: 1; min-width: 0; }
.ax-artifact__title { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-body); margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ax-artifact__sub { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); margin-top: 1px; }
.ax-artifact__tabs { display: flex; gap: 2px; padding: 2px; background: var(--surface-raised); border-radius: var(--radius-2); }
.ax-artifact__tab { appearance: none; background: none; border: none; cursor: pointer; padding: 4px 10px; border-radius: var(--radius-1); font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }
.ax-artifact__tab--active { background: var(--surface-card); color: var(--text-body); }
.ax-artifact__actions { display: flex; gap: 2px; }
.ax-artifact__body { max-height: 280px; overflow: auto; }
.ax-artifact__preview { padding: 20px; background: var(--bg-1); min-height: 120px; }
[data-theme="dark"] .ax-artifact__preview { background: var(--bg-0); }
.ax-artifact__pre { margin: 0; padding: 14px 16px; font-family: var(--font-mono); font-size: var(--text-sm); line-height: 1.6; color: var(--text-body); white-space: pre; overflow-x: auto; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-artifact-css")) {
  const s = document.createElement("style");
  s.id = "ax-artifact-css";
  s.textContent = AX_ARTIFACT_CSS;
  document.head.appendChild(s);
}

const Box = (
  <svg
    className="ax-artifact__icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <path d="m3.3 7 8.7 5 8.7-5M12 22V12"></path>
  </svg>
);

export function Artifact({
  title = "Artifact",
  subtitle,
  code,
  preview,
  defaultTab = "preview",
  actions,
  className = "",
  ...rest
}) {
  const [tab, setTab] = useState(preview ? defaultTab : "code");
  return (
    <div className={["ax-artifact", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-artifact__head">
        {Box}
        <div className="ax-artifact__meta">
          <p className="ax-artifact__title">{title}</p>
          {subtitle ? <p className="ax-artifact__sub">{subtitle}</p> : null}
        </div>
        {preview && code ? (
          <div className="ax-artifact__tabs">
            <button
              className={
                "ax-artifact__tab" + (tab === "preview" ? " ax-artifact__tab--active" : "")
              }
              onClick={() => setTab("preview")}
            >
              Preview
            </button>
            <button
              className={"ax-artifact__tab" + (tab === "code" ? " ax-artifact__tab--active" : "")}
              onClick={() => setTab("code")}
            >
              Code
            </button>
          </div>
        ) : null}
        {actions ? <div className="ax-artifact__actions">{actions}</div> : null}
      </div>
      <div className="ax-artifact__body">
        {tab === "preview" && preview ? (
          <div className="ax-artifact__preview">{preview}</div>
        ) : (
          <pre className="ax-artifact__pre">{code}</pre>
        )}
      </div>
    </div>
  );
}
