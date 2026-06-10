import React from "react";

const AX_TOAST_CSS = `
.ax-toast {
  display: flex; align-items: flex-start; gap: 10px;
  width: 340px; padding: 12px 14px;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-3);
  box-shadow: var(--shadow-2);
}
.ax-toast__bar { width: 3px; align-self: stretch; flex: none; border-radius: 1px; background: var(--text-faint); }
.ax-toast--ok .ax-toast__bar { background: var(--ok); }
.ax-toast--warn .ax-toast__bar { background: var(--warn); }
.ax-toast--danger .ax-toast__bar { background: var(--danger); }
.ax-toast__body { flex: 1; min-width: 0; }
.ax-toast__title { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-body); margin: 0; }
.ax-toast__desc { font-size: var(--text-sm); color: var(--text-muted); margin: 2px 0 0; line-height: var(--leading-snug); }
.ax-toast__close {
  appearance: none; background: none; border: none; cursor: pointer;
  color: var(--text-faint); font-size: 14px; line-height: 1; padding: 2px;
  font-family: var(--font-mono);
}
.ax-toast__close:hover { color: var(--text-body); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-toast-css")) {
  const s = document.createElement("style");
  s.id = "ax-toast-css";
  s.textContent = AX_TOAST_CSS;
  document.head.appendChild(s);
}

export function Toast({ variant = "neutral", title, description, onClose, className = "", ...rest }) {
  const cls = [
    "ax-toast",
    variant !== "neutral" ? `ax-toast--${variant}` : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <div role="status" className={cls} {...rest}>
      <span className="ax-toast__bar"></span>
      <div className="ax-toast__body">
        <p className="ax-toast__title">{title}</p>
        {description ? <p className="ax-toast__desc">{description}</p> : null}
      </div>
      {onClose ? <button className="ax-toast__close" aria-label="Dismiss" onClick={onClose}>✕</button> : null}
    </div>
  );
}
