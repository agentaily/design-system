import React from "react";

const AX_TOOLTIP_CSS = `
.ax-tip { position: relative; display: inline-flex; }
.ax-tip__bubble {
  position: absolute; left: 50%; transform: translateX(-50%) translateY(2px);
  bottom: calc(100% + 8px); z-index: 50;
  padding: 4px 8px; white-space: nowrap; pointer-events: none;
  background: var(--accent); color: var(--accent-fg);
  border-radius: var(--radius-1);
  font-family: var(--font-mono); font-size: var(--text-xs);
  opacity: 0;
  transition: opacity var(--dur-1) var(--ease-out), transform var(--dur-1) var(--ease-out);
}
.ax-tip--bottom .ax-tip__bubble { bottom: auto; top: calc(100% + 8px); transform: translateX(-50%) translateY(-2px); }
.ax-tip:hover .ax-tip__bubble, .ax-tip:focus-within .ax-tip__bubble { opacity: 1; transform: translateX(-50%) translateY(0); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-tooltip-css")) {
  const s = document.createElement("style");
  s.id = "ax-tooltip-css";
  s.textContent = AX_TOOLTIP_CSS;
  document.head.appendChild(s);
}

export function Tooltip({ label, side = "top", children, className = "", ...rest }) {
  const cls = ["ax-tip", side === "bottom" ? "ax-tip--bottom" : "", className].filter(Boolean).join(" ");
  return (
    <span className={cls} {...rest}>
      {children}
      <span className="ax-tip__bubble" role="tooltip">{label}</span>
    </span>
  );
}
