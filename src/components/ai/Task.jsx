import React from "react";

const AX_TASK_CSS = `
.ax-task { border: 1px solid var(--border-default); border-radius: var(--radius-3); background: var(--surface-card); overflow: hidden; }
.ax-task__head { display: flex; align-items: center; gap: 10px; padding: 11px 14px; border-bottom: 1px solid var(--border-default); }
.ax-task__title { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-muted); flex: 1; }
.ax-task__count { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }
.ax-task__list { padding: 6px; }
.ax-task__item { display: flex; align-items: flex-start; gap: 10px; padding: 7px 8px; font-size: var(--text-sm); color: var(--text-body); }
.ax-task__mark { width: 16px; height: 16px; flex: none; margin-top: 1px; border: 1px solid var(--border-strong); border-radius: var(--radius-1); position: relative; }
.ax-task__item--done .ax-task__mark { background: var(--accent); border-color: var(--accent); }
.ax-task__item--done .ax-task__mark::after { content: ""; position: absolute; left: 4.5px; top: 1.5px; width: 4px; height: 8px; border-right: 2px solid var(--accent-fg); border-bottom: 2px solid var(--accent-fg); transform: rotate(45deg); }
.ax-task__item--active .ax-task__mark { border-color: var(--warn); }
.ax-task__item--active .ax-task__mark::after { content: ""; position: absolute; inset: 3px; border-radius: 1px; background: var(--warn); animation: ax-task-pulse 1s var(--ease-out) infinite; }
.ax-task__item--done .ax-task__label { color: var(--text-faint); text-decoration: line-through; text-decoration-color: var(--border-strong); }
.ax-task__label { flex: 1; line-height: var(--leading-snug); }
.ax-task__meta { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); flex: none; }
@keyframes ax-task-pulse { 50% { opacity: 0.4; } }
@media (prefers-reduced-motion: reduce) { .ax-task__item--active .ax-task__mark::after { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-task-css")) {
  const s = document.createElement("style");
  s.id = "ax-task-css";
  s.textContent = AX_TASK_CSS;
  document.head.appendChild(s);
}

export function Task({ title = "Tasks", items = [], className = "", ...rest }) {
  const done = items.filter((i) => i.status === "done").length;
  return (
    <div className={["ax-task", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-task__head">
        <span className="ax-task__title">{title}</span>
        <span className="ax-task__count">{done}/{items.length}</span>
      </div>
      <div className="ax-task__list">
        {items.map((it, i) => (
          <div key={i} className={"ax-task__item ax-task__item--" + (it.status || "pending")}>
            <span className="ax-task__mark"></span>
            <span className="ax-task__label">{it.label}</span>
            {it.meta ? <span className="ax-task__meta">{it.meta}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
