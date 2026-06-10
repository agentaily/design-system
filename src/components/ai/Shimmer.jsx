import React from "react";

const AX_SHIMMER_CSS = `
.ax-shimmer {
  display: inline-block;
  background: linear-gradient(90deg, var(--text-faint) 0%, var(--text-body) 20%, var(--text-faint) 40%, var(--text-faint) 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: transparent;
  animation: ax-shimmer-text 2s linear infinite;
}
@keyframes ax-shimmer-text { to { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) { .ax-shimmer { animation: none; -webkit-text-fill-color: var(--text-muted); color: var(--text-muted); } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-shimmer-css")) {
  const s = document.createElement("style");
  s.id = "ax-shimmer-css";
  s.textContent = AX_SHIMMER_CSS;
  document.head.appendChild(s);
}

export function Shimmer({ children, as = "span", className = "", ...rest }) {
  const Tag = as;
  return <Tag className={["ax-shimmer", className].filter(Boolean).join(" ")} {...rest}>{children}</Tag>;
}
