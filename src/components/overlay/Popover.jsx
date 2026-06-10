import React, { useState, useRef, useEffect, useCallback } from "react";

const AX_POPOVER_CSS = `
.ax-pop { position: relative; display: inline-flex; }
.ax-pop__panel {
  position: absolute; z-index: 60; min-width: 180px;
  background: var(--surface-panel); border: 1px solid var(--border-strong);
  border-radius: var(--radius-3); box-shadow: var(--shadow-2);
  padding: var(--space-2);
  animation: ax-pop-in var(--dur-2) var(--ease-out);
}
.ax-pop__panel--top { bottom: calc(100% + 6px); }
.ax-pop__panel--bottom { top: calc(100% + 6px); }
.ax-pop__panel--start { left: 0; }
.ax-pop__panel--end { right: 0; }
.ax-pop__panel--pad { padding: var(--space-4); }
@keyframes ax-pop-in { from { opacity: 0; transform: translateY(-4px); } }
@media (prefers-reduced-motion: reduce) { .ax-pop__panel { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-popover-css")) {
  const s = document.createElement("style");
  s.id = "ax-popover-css";
  s.textContent = AX_POPOVER_CSS;
  document.head.appendChild(s);
}

export function Popover({ trigger, children, side = "bottom", align = "start", padded = false, className = "", ...rest }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const onDoc = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", onDoc);
      const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
      document.addEventListener("keydown", onKey);
      return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
    }
  }, [open, onDoc]);

  return (
    <span className={["ax-pop", className].filter(Boolean).join(" ")} ref={ref} {...rest}>
      <span onClick={() => setOpen((o) => !o)}>{trigger}</span>
      {open ? (
        <div className={["ax-pop__panel", "ax-pop__panel--" + side, "ax-pop__panel--" + align, padded ? "ax-pop__panel--pad" : ""].join(" ")}>
          {typeof children === "function" ? children({ close: () => setOpen(false) }) : children}
        </div>
      ) : null}
    </span>
  );
}
