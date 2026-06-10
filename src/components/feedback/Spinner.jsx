import React from "react";

const AX_SPINNER_CSS = `
.ax-spinner {
  display: inline-block; flex: none;
  border: 2px solid var(--border-strong);
  border-top-color: var(--text-body);
  border-radius: var(--radius-1);
  animation: ax-spin 0.9s steps(8) infinite;
}
.ax-spinner--sm { width: 14px; height: 14px; }
.ax-spinner--md { width: 20px; height: 20px; }
.ax-spinner--lg { width: 28px; height: 28px; }
@keyframes ax-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .ax-spinner { animation-duration: 2s; }
}
`;

if (typeof document !== "undefined" && !document.getElementById("ax-spinner-css")) {
  const s = document.createElement("style");
  s.id = "ax-spinner-css";
  s.textContent = AX_SPINNER_CSS;
  document.head.appendChild(s);
}

export function Spinner({ size = "md", className = "", ...rest }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={["ax-spinner", `ax-spinner--${size}`, className].filter(Boolean).join(" ")}
      {...rest}
    ></span>
  );
}
