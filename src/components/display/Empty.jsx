import React from "react";

const AX_EMPTY_CSS = `
.ax-empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: var(--space-16) var(--space-8); gap: var(--space-3);
}
.ax-empty--bordered { border: 1px dashed var(--border-strong); border-radius: var(--radius-3); }
.ax-empty__icon {
  display: flex; align-items: center; justify-content: center;
  width: 44px; height: 44px; margin-bottom: var(--space-2);
  color: var(--text-faint); border: 1px solid var(--border-default); border-radius: var(--radius-2);
}
.ax-empty__icon svg { width: 20px; height: 20px; }
.ax-empty__title { font-family: var(--font-display); font-size: var(--text-lg); font-weight: var(--weight-medium); color: var(--text-body); margin: 0; letter-spacing: var(--tracking-tight); }
.ax-empty__desc { font-size: var(--text-sm); color: var(--text-muted); margin: 0; max-width: 38ch; line-height: var(--leading-body); }
.ax-empty__actions { display: flex; gap: var(--space-2); margin-top: var(--space-3); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-empty-css")) {
  const s = document.createElement("style");
  s.id = "ax-empty-css";
  s.textContent = AX_EMPTY_CSS;
  document.head.appendChild(s);
}

export function Empty({ icon, title, description, actions, bordered = false, className = "", ...rest }) {
  return (
    <div className={["ax-empty", bordered ? "ax-empty--bordered" : "", className].filter(Boolean).join(" ")} {...rest}>
      {icon ? <div className="ax-empty__icon">{icon}</div> : null}
      {title ? <p className="ax-empty__title">{title}</p> : null}
      {description ? <p className="ax-empty__desc">{description}</p> : null}
      {actions ? <div className="ax-empty__actions">{actions}</div> : null}
    </div>
  );
}
