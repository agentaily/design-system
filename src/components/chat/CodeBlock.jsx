import React, { useState } from "react";

const AX_CODE_CSS = `
.ax-code {
  border: 1px solid var(--border-default);
  border-radius: var(--radius-2);
  overflow: hidden;
  background: var(--bg-0);
}
[data-theme="light"] .ax-code, .ax-code--paper { background: var(--bg-1); }
.ax-code__head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 12px;
  border-bottom: 1px solid var(--border-default);
  background: var(--surface-card);
}
.ax-code__lang {
  font-family: var(--font-mono); font-size: var(--text-xs);
  letter-spacing: var(--tracking-label); text-transform: uppercase;
  color: var(--text-faint);
}
.ax-code__copy {
  appearance: none; background: none; border: none; cursor: pointer;
  font-family: var(--font-mono); font-size: var(--text-xs);
  color: var(--text-faint); padding: 2px 6px; border-radius: var(--radius-1);
  transition: color var(--dur-1) var(--ease-out), background var(--dur-1) var(--ease-out);
}
.ax-code__copy:hover { color: var(--text-body); background: var(--surface-raised); }
.ax-code__pre {
  margin: 0; padding: 14px 16px; overflow-x: auto;
  font-family: var(--font-mono); font-size: var(--text-sm);
  line-height: 1.7; color: var(--text-body);
}
`;

if (typeof document !== "undefined" && !document.getElementById("ax-code-css")) {
  const s = document.createElement("style");
  s.id = "ax-code-css";
  s.textContent = AX_CODE_CSS;
  document.head.appendChild(s);
}

export function CodeBlock({ code = "", lang = "text", className = "", ...rest }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    try {
      navigator.clipboard && navigator.clipboard.writeText(code);
    } catch (e) { /* noop */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className={["ax-code", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-code__head">
        <span className="ax-code__lang">{lang}</span>
        <button type="button" className="ax-code__copy" onClick={copy}>
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
      <pre className="ax-code__pre"><code>{code}</code></pre>
    </div>
  );
}
