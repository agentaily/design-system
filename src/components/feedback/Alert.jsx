import React from "react";

const AX_ALERT_CSS = `
.ax-alert {
  display: flex; gap: 12px; padding: 14px 16px;
  border: 1px solid var(--border-default); border-radius: var(--radius-3);
  background: var(--surface-card);
}
.ax-alert__bar { width: 2px; flex: none; align-self: stretch; border-radius: 1px; background: var(--text-faint); }
.ax-alert--ok .ax-alert__bar { background: var(--ok); }
.ax-alert--warn .ax-alert__bar { background: var(--warn); }
.ax-alert--danger .ax-alert__bar { background: var(--danger); }
.ax-alert__icon { flex: none; color: var(--text-muted); margin-top: 1px; }
.ax-alert--ok .ax-alert__icon { color: var(--ok); }
.ax-alert--warn .ax-alert__icon { color: var(--warn); }
.ax-alert--danger .ax-alert__icon { color: var(--danger); }
.ax-alert__icon svg { width: 16px; height: 16px; display: block; }
.ax-alert__body { flex: 1; min-width: 0; }
.ax-alert__title { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-body); margin: 0; }
.ax-alert__desc { font-size: var(--text-sm); color: var(--text-muted); margin: 3px 0 0; line-height: var(--leading-body); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-alert-css")) {
  const s = document.createElement("style");
  s.id = "ax-alert-css";
  s.textContent = AX_ALERT_CSS;
  document.head.appendChild(s);
}

export function Alert({ variant = "neutral", icon, title, children, className = "", ...rest }) {
  const cls = ["ax-alert", variant !== "neutral" ? "ax-alert--" + variant : "", className].filter(Boolean).join(" ");
  return (
    <div role="alert" className={cls} {...rest}>
      {icon ? <span className="ax-alert__icon">{icon}</span> : <span className="ax-alert__bar"></span>}
      <div className="ax-alert__body">
        {title ? <p className="ax-alert__title">{title}</p> : null}
        {children ? <p className="ax-alert__desc">{children}</p> : null}
      </div>
    </div>
  );
}
