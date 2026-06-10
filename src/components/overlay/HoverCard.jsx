import React, { useState, useRef, useEffect, useCallback } from "react";

const AX_HOVERCARD_CSS = `
.ax-hovercard { position: relative; display: inline-flex; }
.ax-hovercard__trigger { border-bottom: 1px dashed var(--border-strong); cursor: help; }
.ax-hovercard__panel {
  position: absolute; z-index: 60; bottom: calc(100% + 8px); left: 50%; transform: translateX(-50%);
  width: 280px; padding: var(--space-4); pointer-events: none;
  background: var(--surface-panel); border: 1px solid var(--border-strong);
  border-radius: var(--radius-3); box-shadow: var(--shadow-2);
  opacity: 0; transition: opacity var(--dur-2) var(--ease-out), transform var(--dur-2) var(--ease-out);
}
.ax-hovercard__panel--bottom { bottom: auto; top: calc(100% + 8px); }
.ax-hovercard--open .ax-hovercard__panel { opacity: 1; pointer-events: auto; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-hovercard-css")) {
  const s = document.createElement("style");
  s.id = "ax-hovercard-css";
  s.textContent = AX_HOVERCARD_CSS;
  document.head.appendChild(s);
}

export function HoverCard({ trigger, children, side = "top", openDelay = 200, closeDelay = 120, className = "", ...rest }) {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const enter = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(true), openDelay); };
  const leave = () => { clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), closeDelay); };
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <span
      className={["ax-hovercard", open ? "ax-hovercard--open" : "", className].filter(Boolean).join(" ")}
      onMouseEnter={enter} onMouseLeave={leave} onFocus={enter} onBlur={leave}
      {...rest}
    >
      <span className="ax-hovercard__trigger">{trigger}</span>
      <span className={"ax-hovercard__panel" + (side === "bottom" ? " ax-hovercard__panel--bottom" : "")}>{children}</span>
    </span>
  );
}
