import React from "react";

const AX_PERSONA_CSS = `
.ax-persona { display: flex; align-items: center; gap: 12px; padding: 12px 14px; border: 1px solid var(--border-default); border-radius: var(--radius-3); background: var(--surface-card); }
.ax-persona--selected { border-color: var(--border-strong); }
.ax-persona__orb { width: 42px; height: 42px; flex: none; border-radius: var(--radius-2); display: flex; align-items: center; justify-content: center; position: relative; background: var(--accent); color: var(--accent-fg); font-family: var(--font-mono); font-size: var(--text-md); font-weight: var(--weight-bold); overflow: hidden; }
.ax-persona__ring { position: absolute; inset: 0; border-radius: var(--radius-2); }
.ax-persona--speaking .ax-persona__ring { box-shadow: 0 0 0 2px var(--ok); animation: ax-persona-pulse 1.2s var(--ease-out) infinite; }
.ax-persona__body { flex: 1; min-width: 0; }
.ax-persona__name { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-body); display: flex; align-items: center; gap: 8px; }
.ax-persona__tag { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-faint); border: 1px solid var(--border-default); border-radius: var(--radius-1); padding: 1px 4px; }
.ax-persona__desc { font-size: var(--text-xs); color: var(--text-muted); margin-top: 2px; line-height: var(--leading-snug); }
@keyframes ax-persona-pulse { 50% { box-shadow: 0 0 0 4px var(--ok-dim); } }
@media (prefers-reduced-motion: reduce) { .ax-persona--speaking .ax-persona__ring { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-persona-css")) {
  const s = document.createElement("style");
  s.id = "ax-persona-css";
  s.textContent = AX_PERSONA_CSS;
  document.head.appendChild(s);
}

export function Persona({ name, tag, description, avatar, speaking = false, selected = false, className = "", ...rest }) {
  const initials = (name || "AI").slice(0, 2).toUpperCase();
  return (
    <div className={["ax-persona", speaking ? "ax-persona--speaking" : "", selected ? "ax-persona--selected" : "", className].filter(Boolean).join(" ")} {...rest}>
      <span className="ax-persona__orb">
        {avatar ? <img src={avatar} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
        <span className="ax-persona__ring"></span>
      </span>
      <div className="ax-persona__body">
        <div className="ax-persona__name">{name}{tag ? <span className="ax-persona__tag">{tag}</span> : null}</div>
        {description ? <div className="ax-persona__desc">{description}</div> : null}
      </div>
    </div>
  );
}
