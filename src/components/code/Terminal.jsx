import React, { useState } from "react";

const AX_TERMINAL_CSS = `
.ax-terminal { border: 1px solid var(--border-strong); border-radius: var(--radius-3); overflow: hidden; background: var(--bg-0); font-family: var(--font-mono); }
[data-theme="light"] .ax-terminal { background: #0A0A0B; }
.ax-terminal__bar { display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: var(--bg-1); border-bottom: 1px solid var(--border-default); }
[data-theme="light"] .ax-terminal__bar { background: #18181B; border-color: rgba(255,255,255,0.1); }
.ax-terminal__dots { display: flex; gap: 6px; }
.ax-terminal__dot { width: 9px; height: 9px; border-radius: var(--radius-1); background: rgba(255,255,255,0.18); }
.ax-terminal__title { font-size: 11px; color: #A1A1AA; letter-spacing: 0.04em; flex: 1; text-align: center; }
.ax-terminal__copy { appearance: none; background: none; border: none; cursor: pointer; color: #63636B; font-size: 11px; padding: 2px 6px; border-radius: var(--radius-1); }
.ax-terminal__copy:hover { color: #F4F4F5; }
.ax-terminal__body { padding: 14px 16px; overflow-x: auto; font-size: var(--text-sm); line-height: 1.7; }
.ax-terminal__line { white-space: pre; color: #E4E4E7; }
.ax-terminal__prompt { color: #3ECF8E; user-select: none; }
.ax-terminal__cmd { color: #F4F4F5; }
.ax-terminal__out { color: #A1A1AA; }
.ax-terminal__err { color: #E5484D; }
.ax-terminal__cursor { display: inline-block; width: 0.5em; height: 1em; background: #3ECF8E; vertical-align: text-bottom; animation: ax-term-blink 1.1s steps(1) infinite; }
@keyframes ax-term-blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .ax-terminal__cursor { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-terminal-css")) {
  const s = document.createElement("style");
  s.id = "ax-terminal-css";
  s.textContent = AX_TERMINAL_CSS;
  document.head.appendChild(s);
}

export function Terminal({ title = "bash", lines = [], prompt = "$", cursor = false, className = "", ...rest }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const text = lines.map((l) => (typeof l === "string" ? l : (l.type === "command" ? prompt + " " + l.text : l.text))).join("\n");
    try { navigator.clipboard && navigator.clipboard.writeText(text); } catch (e) {}
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className={["ax-terminal", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-terminal__bar">
        <span className="ax-terminal__dots"><span className="ax-terminal__dot"></span><span className="ax-terminal__dot"></span><span className="ax-terminal__dot"></span></span>
        <span className="ax-terminal__title">{title}</span>
        <button className="ax-terminal__copy" onClick={copy}>{copied ? "copied ✓" : "copy"}</button>
      </div>
      <div className="ax-terminal__body">
        {lines.map((l, i) => {
          const line = typeof l === "string" ? { type: "command", text: l } : l;
          const isLast = i === lines.length - 1;
          if (line.type === "command") {
            return <div className="ax-terminal__line" key={i}><span className="ax-terminal__prompt">{prompt} </span><span className="ax-terminal__cmd">{line.text}</span>{cursor && isLast ? <span className="ax-terminal__cursor"></span> : null}</div>;
          }
          return <div className={"ax-terminal__line ax-terminal__" + (line.type === "error" ? "err" : "out")} key={i}>{line.text}{cursor && isLast ? <span className="ax-terminal__cursor"></span> : null}</div>;
        })}
      </div>
    </div>
  );
}
