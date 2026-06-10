import React from "react";

const AX_AGENT_CSS = `
.ax-agent { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border: 1px solid var(--border-default); border-radius: var(--radius-full); background: var(--surface-card); }
.ax-agent__avatar { width: 26px; height: 26px; flex: none; border-radius: var(--radius-2); background: var(--accent); color: var(--accent-fg); display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 12px; font-weight: var(--weight-bold); }
.ax-agent__body { display: flex; flex-direction: column; min-width: 0; }
.ax-agent__name { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--text-body); display: flex; align-items: center; gap: 7px; }
.ax-agent__status { display: flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); }
.ax-agent__dot { width: 6px; height: 6px; border-radius: 1px; background: var(--text-faint); }
.ax-agent--working .ax-agent__dot { background: var(--warn); animation: ax-agent-pulse 1s var(--ease-out) infinite; }
.ax-agent--working .ax-agent__status { color: var(--warn); }
.ax-agent--idle .ax-agent__dot { background: var(--ok); }
.ax-agent--idle .ax-agent__status { color: var(--ok); }
.ax-agent__model { font-size: 10px; color: var(--text-faint); border: 1px solid var(--border-default); border-radius: var(--radius-1); padding: 1px 5px; }
@keyframes ax-agent-pulse { 50% { opacity: 0.35; } }
@media (prefers-reduced-motion: reduce) { .ax-agent--working .ax-agent__dot { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-agent-css")) {
  const s = document.createElement("style");
  s.id = "ax-agent-css";
  s.textContent = AX_AGENT_CSS;
  document.head.appendChild(s);
}

const STATUS = { working: "Working", idle: "Ready", error: "Error" };

export function Agent({ name = "agent", model, status = "idle", task, className = "", ...rest }) {
  const initials = name.slice(0, 2).toUpperCase();
  return (
    <div className={["ax-agent", "ax-agent--" + status, className].filter(Boolean).join(" ")} {...rest}>
      <span className="ax-agent__avatar">{initials}</span>
      <span className="ax-agent__body">
        <span className="ax-agent__name">{name}{model ? <span className="ax-agent__model">{model}</span> : null}</span>
        <span className="ax-agent__status"><span className="ax-agent__dot"></span>{task || STATUS[status]}</span>
      </span>
    </div>
  );
}
