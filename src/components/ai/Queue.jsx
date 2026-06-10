import React from "react";

const AX_QUEUE_CSS = `
.ax-queue { display: flex; flex-direction: column; gap: 6px; }
.ax-queue__head { display: flex; align-items: center; gap: 8px; margin-bottom: 2px; }
.ax-queue__title { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); flex: 1; }
.ax-queue__count { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }
.ax-queue__item { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border: 1px solid var(--border-default); border-radius: var(--radius-2); background: var(--surface-card); }
.ax-queue__num { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); width: 16px; flex: none; }
.ax-queue__text { flex: 1; min-width: 0; font-size: var(--text-sm); color: var(--text-body); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ax-queue__item--running { border-color: var(--border-strong); }
.ax-queue__item--running .ax-queue__num { color: var(--warn); }
.ax-queue__status { font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-label); text-transform: uppercase; flex: none; color: var(--text-faint); }
.ax-queue__item--running .ax-queue__status { color: var(--warn); }
.ax-queue__remove { appearance: none; background: none; border: none; cursor: pointer; color: var(--text-faint); font-family: var(--font-mono); font-size: 11px; padding: 2px 4px; border-radius: var(--radius-1); flex: none; }
.ax-queue__remove:hover { color: var(--danger); background: var(--danger-dim); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-queue-css")) {
  const s = document.createElement("style");
  s.id = "ax-queue-css";
  s.textContent = AX_QUEUE_CSS;
  document.head.appendChild(s);
}

export function Queue({ title = "Queued", items = [], onRemove, className = "", ...rest }) {
  return (
    <div className={["ax-queue", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-queue__head">
        <span className="ax-queue__title">{title}</span>
        <span className="ax-queue__count">{items.length}</span>
      </div>
      {items.map((it, i) => {
        const item = typeof it === "string" ? { text: it } : it;
        const running = item.status === "running";
        return (
          <div key={i} className={"ax-queue__item" + (running ? " ax-queue__item--running" : "")}>
            <span className="ax-queue__num">{running ? "▶" : i + 1}</span>
            <span className="ax-queue__text">{item.text}</span>
            {item.status ? <span className="ax-queue__status">{item.status}</span> : null}
            {onRemove && !running ? <button className="ax-queue__remove" aria-label="Remove" onClick={() => onRemove(i)}>✕</button> : null}
          </div>
        );
      })}
    </div>
  );
}
