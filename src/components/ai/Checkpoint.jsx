import React from "react";

const AX_CHECKPOINT_CSS = `
.ax-checkpoint { display: flex; align-items: center; gap: 12px; padding: 6px 0; }
.ax-checkpoint__line { flex: 1; height: 1px; background: var(--border-default); }
.ax-checkpoint__chip { display: inline-flex; align-items: center; gap: 8px; padding: 4px 10px; border: 1px solid var(--border-default); border-radius: var(--radius-full); background: var(--surface-card); white-space: nowrap; }
.ax-checkpoint__icon { width: 13px; height: 13px; color: var(--text-faint); }
.ax-checkpoint__label { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-muted); }
.ax-checkpoint__time { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); }
.ax-checkpoint__restore { appearance: none; background: none; border: none; cursor: pointer; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-faint); padding: 0; transition: color var(--dur-1) var(--ease-out); }
.ax-checkpoint__restore:hover { color: var(--text-body); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-checkpoint-css")) {
  const s = document.createElement("style");
  s.id = "ax-checkpoint-css";
  s.textContent = AX_CHECKPOINT_CSS;
  document.head.appendChild(s);
}

const Flag = <svg className="ax-checkpoint__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><path d="M4 22v-7"></path></svg>;

export function Checkpoint({ label = "Checkpoint", time, onRestore, className = "", ...rest }) {
  return (
    <div className={["ax-checkpoint", className].filter(Boolean).join(" ")} {...rest}>
      <span className="ax-checkpoint__line"></span>
      <span className="ax-checkpoint__chip">
        {Flag}
        <span className="ax-checkpoint__label">{label}</span>
        {time ? <span className="ax-checkpoint__time">{time}</span> : null}
        {onRestore ? <button className="ax-checkpoint__restore" onClick={onRestore}>↺ Restore</button> : null}
      </span>
      <span className="ax-checkpoint__line"></span>
    </div>
  );
}
