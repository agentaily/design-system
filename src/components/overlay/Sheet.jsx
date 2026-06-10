import React from "react";

const AX_SHEET_CSS = `
.ax-sheet-overlay {
  position: fixed; inset: 0; z-index: 90; background: var(--bg-overlay);
  backdrop-filter: blur(var(--blur-overlay)); -webkit-backdrop-filter: blur(var(--blur-overlay));
  animation: ax-sheet-fade var(--dur-2) var(--ease-out);
}
.ax-sheet {
  position: fixed; z-index: 91; background: var(--surface-panel);
  display: flex; flex-direction: column; box-shadow: var(--shadow-3);
}
.ax-sheet--right { top: 0; bottom: 0; right: 0; width: min(420px, 92vw); border-left: 1px solid var(--border-strong); animation: ax-sheet-right var(--dur-3) var(--ease-out); }
.ax-sheet--left { top: 0; bottom: 0; left: 0; width: min(420px, 92vw); border-right: 1px solid var(--border-strong); animation: ax-sheet-left var(--dur-3) var(--ease-out); }
.ax-sheet--bottom { left: 0; right: 0; bottom: 0; max-height: 80vh; border-top: 1px solid var(--border-strong); border-radius: var(--radius-3) var(--radius-3) 0 0; animation: ax-sheet-bottom var(--dur-3) var(--ease-out); }
.ax-sheet__head { display: flex; align-items: center; justify-content: space-between; padding: var(--space-5); border-bottom: 1px solid var(--border-default); }
.ax-sheet__title { margin: 0; font-family: var(--font-display); font-size: var(--text-lg); font-weight: var(--weight-medium); letter-spacing: var(--tracking-tight); color: var(--text-body); }
.ax-sheet__close { appearance: none; background: none; border: none; cursor: pointer; color: var(--text-faint); font-family: var(--font-mono); font-size: 13px; padding: 2px 4px; border-radius: var(--radius-1); }
.ax-sheet__close:hover { color: var(--text-body); background: var(--surface-raised); }
.ax-sheet__body { flex: 1; overflow-y: auto; padding: var(--space-5); }
@keyframes ax-sheet-fade { from { opacity: 0; } }
@keyframes ax-sheet-right { from { transform: translateX(100%); } }
@keyframes ax-sheet-left { from { transform: translateX(-100%); } }
@keyframes ax-sheet-bottom { from { transform: translateY(100%); } }
@media (prefers-reduced-motion: reduce) { .ax-sheet-overlay, .ax-sheet { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-sheet-css")) {
  const s = document.createElement("style");
  s.id = "ax-sheet-css";
  s.textContent = AX_SHEET_CSS;
  document.head.appendChild(s);
}

export function Sheet({ open = true, side = "right", title, onClose, children, className = "", ...rest }) {
  if (!open) return null;
  return (
    <React.Fragment>
      <div className="ax-sheet-overlay" onClick={onClose}></div>
      <div role="dialog" aria-modal="true" className={["ax-sheet", "ax-sheet--" + side, className].filter(Boolean).join(" ")} {...rest}>
        <div className="ax-sheet__head">
          <h2 className="ax-sheet__title">{title}</h2>
          {onClose ? <button className="ax-sheet__close" aria-label="Close" onClick={onClose}>ESC ✕</button> : null}
        </div>
        <div className="ax-sheet__body">{children}</div>
      </div>
    </React.Fragment>
  );
}
