import React from "react";

const AX_ICONBTN_CSS = `
.ax-iconbtn {
  display: inline-flex; align-items: center; justify-content: center;
  border: 1px solid transparent; border-radius: var(--radius-2);
  background: transparent; color: var(--text-muted); cursor: pointer;
  transition: background var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out), transform var(--dur-1) var(--ease-out);
}
.ax-iconbtn:hover:not(:disabled) { background: var(--surface-raised); color: var(--text-body); }
.ax-iconbtn:active:not(:disabled) { transform: translateY(1px); }
.ax-iconbtn:focus-visible { outline: none; box-shadow: var(--ring); }
.ax-iconbtn:disabled { opacity: 0.4; cursor: not-allowed; }
.ax-iconbtn--outline { border-color: var(--border-strong); color: var(--text-body); }
.ax-iconbtn--solid { background: var(--accent); color: var(--accent-fg); }
.ax-iconbtn--solid:hover:not(:disabled) { background: var(--accent-hover); color: var(--accent-fg); }
.ax-iconbtn--sm { width: 28px; height: 28px; }
.ax-iconbtn--sm svg { width: 14px; height: 14px; }
.ax-iconbtn--md { width: 36px; height: 36px; }
.ax-iconbtn--md svg { width: 16px; height: 16px; }
.ax-iconbtn--lg { width: 44px; height: 44px; }
.ax-iconbtn--lg svg { width: 20px; height: 20px; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-iconbtn-css")) {
  const s = document.createElement("style");
  s.id = "ax-iconbtn-css";
  s.textContent = AX_ICONBTN_CSS;
  document.head.appendChild(s);
}

export function IconButton({
  variant = "ghost",
  size = "md",
  label,
  children,
  className = "",
  ...rest
}) {
  const cls = [
    "ax-iconbtn",
    variant !== "ghost" ? `ax-iconbtn--${variant}` : "",
    `ax-iconbtn--${size}`,
    className,
  ].filter(Boolean).join(" ");
  return (
    <button type="button" className={cls} aria-label={label} title={label} {...rest}>
      {children}
    </button>
  );
}
