import React from "react";

const AX_DIALOG_CSS = `
.ax-dialog-overlay {
  position: fixed; inset: 0; z-index: 100;
  display: flex; align-items: center; justify-content: center;
  background: var(--bg-overlay);
  backdrop-filter: blur(var(--blur-overlay));
  -webkit-backdrop-filter: blur(var(--blur-overlay));
  animation: ax-dialog-fade var(--dur-2) var(--ease-out);
}
.ax-dialog {
  width: min(480px, calc(100vw - 48px));
  background: var(--surface-panel);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-3);
  box-shadow: var(--shadow-3);
  animation: ax-dialog-rise var(--dur-3) var(--ease-out);
}
.ax-dialog--inline { position: relative; animation: none; }
.ax-dialog__head {
  display: flex; align-items: center; justify-content: space-between;
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--border-default);
}
.ax-dialog__title {
  margin: 0; font-family: var(--font-mono); font-size: var(--text-xs);
  font-weight: var(--weight-medium); letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--text-muted);
}
.ax-dialog__close {
  appearance: none; background: none; border: none; cursor: pointer;
  color: var(--text-faint); font-family: var(--font-mono); font-size: 13px;
  padding: 2px 4px; border-radius: var(--radius-1);
}
.ax-dialog__close:hover { color: var(--text-body); background: var(--surface-raised); }
.ax-dialog__body { padding: var(--space-5); }
.ax-dialog__foot {
  display: flex; justify-content: flex-end; gap: var(--space-2);
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--border-default);
}
@keyframes ax-dialog-fade { from { opacity: 0; } }
@keyframes ax-dialog-rise { from { opacity: 0; transform: translateY(8px); } }
@media (prefers-reduced-motion: reduce) {
  .ax-dialog-overlay, .ax-dialog { animation: none; }
}
`;

if (typeof document !== "undefined" && !document.getElementById("ax-dialog-css")) {
  const s = document.createElement("style");
  s.id = "ax-dialog-css";
  s.textContent = AX_DIALOG_CSS;
  document.head.appendChild(s);
}

export function Dialog({
  open = true,
  inline = false,
  title,
  footer,
  onClose,
  children,
  className = "",
  ...rest
}) {
  if (!open) return null;
  const panel = (
    <div
      role="dialog"
      aria-modal={!inline}
      className={["ax-dialog", inline ? "ax-dialog--inline" : "", className].filter(Boolean).join(" ")}
      onClick={(e) => e.stopPropagation()}
      {...rest}
    >
      <div className="ax-dialog__head">
        <h2 className="ax-dialog__title">{title}</h2>
        {onClose ? <button className="ax-dialog__close" aria-label="Close" onClick={onClose}>ESC ✕</button> : null}
      </div>
      <div className="ax-dialog__body">{children}</div>
      {footer ? <div className="ax-dialog__foot">{footer}</div> : null}
    </div>
  );
  if (inline) return panel;
  return (
    <div className="ax-dialog-overlay" onClick={onClose}>
      {panel}
    </div>
  );
}
