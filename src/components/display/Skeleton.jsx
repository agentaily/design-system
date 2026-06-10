import React from "react";

const AX_SKELETON_CSS = `
.ax-skeleton {
  display: block; background: var(--surface-raised);
  border-radius: var(--radius-1); position: relative; overflow: hidden;
}
.ax-skeleton::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent, var(--bg-3), transparent);
  transform: translateX(-100%);
  animation: ax-shimmer 1.4s var(--ease-out) infinite;
}
[data-theme="light"] .ax-skeleton::after { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent); }
.ax-skeleton--text { height: 0.7em; margin: 0.2em 0; }
.ax-skeleton--circle { border-radius: var(--radius-2); }
@keyframes ax-shimmer { 100% { transform: translateX(100%); } }
@media (prefers-reduced-motion: reduce) { .ax-skeleton::after { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-skeleton-css")) {
  const s = document.createElement("style");
  s.id = "ax-skeleton-css";
  s.textContent = AX_SKELETON_CSS;
  document.head.appendChild(s);
}

export function Skeleton({ variant = "block", width, height, lines = 1, className = "", style = {}, ...rest }) {
  if (variant === "text" && lines > 1) {
    return (
      <div className={className} {...rest}>
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className="ax-skeleton ax-skeleton--text"
            style={{ width: i === lines - 1 ? "60%" : "100%" }}
          ></span>
        ))}
      </div>
    );
  }
  const cls = ["ax-skeleton", variant === "text" ? "ax-skeleton--text" : "", variant === "circle" ? "ax-skeleton--circle" : "", className].filter(Boolean).join(" ");
  return <span className={cls} style={{ width, height, ...style }} {...rest}></span>;
}
