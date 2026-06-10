import React from "react";

const AX_KBD_CSS = `
.ax-kbd {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 20px; height: 20px; padding: 0 5px;
  background: var(--surface-raised);
  border: 1px solid var(--border-strong);
  border-bottom-width: 2px;
  border-radius: var(--radius-1);
  font-family: var(--font-mono); font-size: 11px;
  font-weight: var(--weight-medium); color: var(--text-muted);
}
`;

if (typeof document !== "undefined" && !document.getElementById("ax-kbd-css")) {
  const s = document.createElement("style");
  s.id = "ax-kbd-css";
  s.textContent = AX_KBD_CSS;
  document.head.appendChild(s);
}

export function Kbd({ children, className = "", ...rest }) {
  return <kbd className={["ax-kbd", className].filter(Boolean).join(" ")} {...rest}>{children}</kbd>;
}
