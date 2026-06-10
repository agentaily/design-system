import React from "react";

const AX_AVATAR_CSS = `
.ax-avatar {
  display: inline-flex; align-items: center; justify-content: center;
  flex: none; overflow: hidden;
  background: var(--surface-raised); border: 1px solid var(--border-default);
  border-radius: var(--radius-2); color: var(--text-muted);
  font-family: var(--font-mono); font-weight: var(--weight-medium);
}
.ax-avatar--solid { background: var(--accent); border-color: var(--accent); color: var(--accent-fg); }
.ax-avatar img { width: 100%; height: 100%; object-fit: cover; }
.ax-avatar--sm { width: 24px; height: 24px; font-size: 10px; }
.ax-avatar--md { width: 32px; height: 32px; font-size: 12px; }
.ax-avatar--lg { width: 44px; height: 44px; font-size: var(--text-md); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-avatar-css")) {
  const s = document.createElement("style");
  s.id = "ax-avatar-css";
  s.textContent = AX_AVATAR_CSS;
  document.head.appendChild(s);
}

function initials(name = "") {
  const parts = name.trim().split(/\s+/);
  if (!parts[0]) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function Avatar({ name = "", src, size = "md", solid = false, className = "", ...rest }) {
  const cls = [
    "ax-avatar",
    `ax-avatar--${size}`,
    solid ? "ax-avatar--solid" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <span className={cls} title={name} {...rest}>
      {src ? <img src={src} alt={name} /> : initials(name)}
    </span>
  );
}
