import React from "react";

const AX_BTN_CSS = `
.ax-btn {
  display: inline-flex; align-items: center; justify-content: center;
  gap: 8px; border: 1px solid transparent; border-radius: var(--radius-2);
  font-family: var(--font-body); font-weight: var(--weight-medium);
  cursor: pointer; white-space: nowrap; user-select: none;
  transition: background var(--dur-1) var(--ease-out), border-color var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out), transform var(--dur-1) var(--ease-out);
}
.ax-btn:focus-visible { outline: none; box-shadow: var(--ring); }
.ax-btn:active:not(:disabled) { transform: translateY(1px); }
.ax-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.ax-btn svg { width: 16px; height: 16px; flex: none; }

.ax-btn--primary { background: var(--accent); color: var(--accent-fg); }
.ax-btn--primary:hover:not(:disabled) { background: var(--accent-hover); }
.ax-btn--secondary { background: transparent; color: var(--text-body); border-color: var(--border-strong); }
.ax-btn--secondary:hover:not(:disabled) { background: var(--surface-raised); }
.ax-btn--ghost { background: transparent; color: var(--text-muted); }
.ax-btn--ghost:hover:not(:disabled) { background: var(--surface-raised); color: var(--text-body); }
.ax-btn--danger { background: transparent; color: var(--danger); border-color: var(--danger); }
.ax-btn--danger:hover:not(:disabled) { background: var(--danger-dim); }

.ax-btn--sm { height: 28px; padding: 0 10px; font-size: var(--text-sm); }
.ax-btn--md { height: 36px; padding: 0 14px; font-size: var(--text-sm); }
.ax-btn--lg { height: 44px; padding: 0 20px; font-size: var(--text-md); }
.ax-btn--full { width: 100%; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-btn-css")) {
  const s = document.createElement("style");
  s.id = "ax-btn-css";
  s.textContent = AX_BTN_CSS;
  document.head.appendChild(s);
}

export function Button({
  variant = "primary",
  size = "md",
  full = false,
  icon = null,
  children,
  className = "",
  ...rest
}) {
  const cls = [
    "ax-btn",
    `ax-btn--${variant}`,
    `ax-btn--${size}`,
    full ? "ax-btn--full" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <button type="button" className={cls} {...rest}>
      {icon}
      {children}
    </button>
  );
}
