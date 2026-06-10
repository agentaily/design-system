import React from "react";

const AX_ALERTDIALOG_CSS = `
.ax-alertdialog-overlay { position: fixed; inset: 0; z-index: 110; display: flex; align-items: center; justify-content: center; background: var(--bg-overlay); backdrop-filter: blur(var(--blur-overlay)); -webkit-backdrop-filter: blur(var(--blur-overlay)); animation: ax-ad-fade var(--dur-2) var(--ease-out); }
.ax-alertdialog { width: min(420px, calc(100vw - 48px)); background: var(--surface-panel); border: 1px solid var(--border-strong); border-radius: var(--radius-3); box-shadow: var(--shadow-3); padding: var(--space-6); animation: ax-ad-rise var(--dur-3) var(--ease-out); }
.ax-alertdialog--inline { position: relative; animation: none; box-shadow: none; }
.ax-alertdialog__icon { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: var(--radius-2); margin-bottom: var(--space-4); }
.ax-alertdialog__icon--danger { background: var(--danger-dim); color: var(--danger); }
.ax-alertdialog__icon--warn { background: var(--warn-dim); color: var(--warn); }
.ax-alertdialog__title { font-family: var(--font-display); font-size: var(--text-lg); font-weight: var(--weight-medium); letter-spacing: var(--tracking-tight); color: var(--text-body); margin: 0 0 8px; }
.ax-alertdialog__desc { font-size: var(--text-sm); color: var(--text-muted); margin: 0 0 var(--space-6); line-height: var(--leading-body); }
.ax-alertdialog__actions { display: flex; justify-content: flex-end; gap: var(--space-2); }
.ax-alertdialog__btn { display: inline-flex; align-items: center; justify-content: center; height: 36px; padding: 0 16px; cursor: pointer; border-radius: var(--radius-2); font-family: var(--font-body); font-size: var(--text-sm); font-weight: var(--weight-medium); border: 1px solid transparent; transition: background var(--dur-1) var(--ease-out); }
.ax-alertdialog__btn--cancel { background: transparent; color: var(--text-muted); border-color: var(--border-strong); }
.ax-alertdialog__btn--cancel:hover { background: var(--surface-raised); color: var(--text-body); }
.ax-alertdialog__btn--confirm { background: var(--accent); color: var(--accent-fg); }
.ax-alertdialog__btn--confirm:hover { background: var(--accent-hover); }
.ax-alertdialog__btn--danger { background: var(--danger); color: #fff; }
.ax-alertdialog__btn--danger:hover { filter: brightness(1.1); }
@keyframes ax-ad-fade { from { opacity: 0; } }
@keyframes ax-ad-rise { from { opacity: 0; transform: translateY(8px); } }
@media (prefers-reduced-motion: reduce) { .ax-alertdialog-overlay, .ax-alertdialog { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-alertdialog-css")) {
  const s = document.createElement("style");
  s.id = "ax-alertdialog-css";
  s.textContent = AX_ALERTDIALOG_CSS;
  document.head.appendChild(s);
}

const Warn = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"></path><path d="M12 9v4M12 17h.01"></path></svg>;

export function AlertDialog({ open = true, inline = false, tone = "danger", title, description, cancelLabel = "Cancel", confirmLabel = "Confirm", onCancel, onConfirm, className = "", ...rest }) {
  if (!open) return null;
  const panel = (
    <div className={["ax-alertdialog", inline ? "ax-alertdialog--inline" : "", className].filter(Boolean).join(" ")} role="alertdialog" aria-modal={!inline} onClick={(e) => e.stopPropagation()} {...rest}>
      <div className={"ax-alertdialog__icon ax-alertdialog__icon--" + (tone === "warn" ? "warn" : "danger")}>{Warn}</div>
      <h2 className="ax-alertdialog__title">{title}</h2>
      {description ? <p className="ax-alertdialog__desc">{description}</p> : null}
      <div className="ax-alertdialog__actions">
        <button className="ax-alertdialog__btn ax-alertdialog__btn--cancel" onClick={onCancel}>{cancelLabel}</button>
        <button className={"ax-alertdialog__btn " + (tone === "danger" ? "ax-alertdialog__btn--danger" : "ax-alertdialog__btn--confirm")} onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </div>
  );
  if (inline) return panel;
  return <div className="ax-alertdialog-overlay" onClick={onCancel}>{panel}</div>;
}
