import React, { useState } from "react";

const AX_SNIPPET_CSS = `
.ax-snippet { display: flex; align-items: center; gap: 8px; background: var(--bg-0); border: 1px solid var(--border-default); border-radius: var(--radius-2); padding: 6px 6px 6px 12px; font-family: var(--font-mono); }
[data-theme="light"] .ax-snippet { background: var(--bg-1); }
.ax-snippet__prompt { color: var(--text-faint); user-select: none; }
.ax-snippet__code { flex: 1; min-width: 0; overflow-x: auto; white-space: nowrap; font-size: var(--text-sm); color: var(--text-body); }
.ax-snippet__copy { appearance: none; background: none; border: 1px solid var(--border-default); cursor: pointer; color: var(--text-faint); font-family: var(--font-mono); font-size: 11px; padding: 4px 8px; border-radius: var(--radius-1); flex: none; transition: color var(--dur-1) var(--ease-out), border-color var(--dur-1) var(--ease-out); }
.ax-snippet__copy:hover { color: var(--text-body); border-color: var(--border-strong); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-snippet-css")) {
  const s = document.createElement("style");
  s.id = "ax-snippet-css";
  s.textContent = AX_SNIPPET_CSS;
  document.head.appendChild(s);
}

export function Snippet({ code = "", prompt = "$", className = "", ...rest }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    try { navigator.clipboard && navigator.clipboard.writeText(code); } catch (e) {}
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className={["ax-snippet", className].filter(Boolean).join(" ")} {...rest}>
      {prompt ? <span className="ax-snippet__prompt">{prompt}</span> : null}
      <code className="ax-snippet__code">{code}</code>
      <button className="ax-snippet__copy" onClick={copy}>{copied ? "✓" : "copy"}</button>
    </div>
  );
}
