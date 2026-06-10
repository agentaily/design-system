import React from "react";

const AX_BADGE_CSS = `
.ax-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 2px 7px; border-radius: var(--radius-1);
  font-family: var(--font-mono); font-size: var(--text-xs);
  font-weight: var(--weight-medium); letter-spacing: var(--tracking-label);
  text-transform: uppercase; white-space: nowrap;
  border: 1px solid var(--border-default);
  background: var(--surface-raised); color: var(--text-muted);
}
.ax-badge__dot { width: 6px; height: 6px; border-radius: 1px; background: currentColor; }
.ax-badge--solid { background: var(--accent); border-color: var(--accent); color: var(--accent-fg); }
.ax-badge--outline { background: transparent; border-color: var(--border-strong); color: var(--text-body); }
.ax-badge--ok { background: var(--ok-dim); border-color: transparent; color: var(--ok); }
.ax-badge--warn { background: var(--warn-dim); border-color: transparent; color: var(--warn); }
.ax-badge--danger { background: var(--danger-dim); border-color: transparent; color: var(--danger); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-badge-css")) {
  const s = document.createElement("style");
  s.id = "ax-badge-css";
  s.textContent = AX_BADGE_CSS;
  document.head.appendChild(s);
}

export function Badge({ variant = "neutral", dot = false, children, className = "", ...rest }) {
  const cls = [
    "ax-badge",
    variant !== "neutral" ? `ax-badge--${variant}` : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      {dot ? <span className="ax-badge__dot"></span> : null}
      {children}
    </span>
  );
}
