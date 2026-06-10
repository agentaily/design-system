import React from "react";

const AX_CONFIRM_CSS = `
.ax-confirm { border: 1px solid var(--border-strong); border-radius: var(--radius-3); background: var(--surface-card); overflow: hidden; }
.ax-confirm__head { display: flex; align-items: center; gap: 10px; padding: 12px 14px; }
.ax-confirm__icon { width: 16px; height: 16px; flex: none; color: var(--warn); }
.ax-confirm__title { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-body); flex: 1; }
.ax-confirm__body { padding: 0 14px 12px 40px; }
.ax-confirm__desc { font-size: var(--text-sm); color: var(--text-muted); margin: 0; line-height: var(--leading-body); }
.ax-confirm__detail { margin-top: 10px; padding: 8px 10px; background: var(--bg-0); border: 1px solid var(--border-default); border-radius: var(--radius-2); font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-body); white-space: pre-wrap; word-break: break-word; }
[data-theme="light"] .ax-confirm__detail { background: var(--bg-1); }
.ax-confirm__actions { display: flex; gap: 8px; padding: 12px 14px; border-top: 1px solid var(--border-default); background: var(--surface-panel); }
.ax-confirm__spacer { flex: 1; }
.ax-confirm__btn { display: inline-flex; align-items: center; justify-content: center; height: 32px; padding: 0 14px; cursor: pointer; border-radius: var(--radius-2); font-family: var(--font-body); font-size: var(--text-sm); font-weight: var(--weight-medium); border: 1px solid transparent; transition: background var(--dur-1) var(--ease-out); }
.ax-confirm__btn--deny { background: transparent; color: var(--text-muted); border-color: var(--border-strong); }
.ax-confirm__btn--deny:hover { background: var(--surface-raised); color: var(--text-body); }
.ax-confirm__btn--allow { background: var(--accent); color: var(--accent-fg); }
.ax-confirm__btn--allow:hover { background: var(--accent-hover); }
.ax-confirm--resolved { opacity: 0.6; }
.ax-confirm__verdict { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; padding: 12px 14px; border-top: 1px solid var(--border-default); }
.ax-confirm__verdict--allowed { color: var(--ok); }
.ax-confirm__verdict--denied { color: var(--danger); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-confirm-css")) {
  const s = document.createElement("style");
  s.id = "ax-confirm-css";
  s.textContent = AX_CONFIRM_CSS;
  document.head.appendChild(s);
}

const Warn = <svg className="ax-confirm__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"></path><path d="M12 9v4M12 17h.01"></path></svg>;

export function Confirmation({ title = "Confirm action", description, detail, allowLabel = "Allow", denyLabel = "Deny", resolved, onAllow, onDeny, className = "", ...rest }) {
  return (
    <div className={["ax-confirm", resolved ? "ax-confirm--resolved" : "", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-confirm__head">
        {Warn}
        <span className="ax-confirm__title">{title}</span>
      </div>
      {(description || detail) ? (
        <div className="ax-confirm__body">
          {description ? <p className="ax-confirm__desc">{description}</p> : null}
          {detail ? <div className="ax-confirm__detail">{detail}</div> : null}
        </div>
      ) : null}
      {resolved ? (
        <div className={"ax-confirm__verdict ax-confirm__verdict--" + (resolved === "allowed" ? "allowed" : "denied")}>
          {resolved === "allowed" ? "✓ Allowed" : "✕ Denied"}
        </div>
      ) : (
        <div className="ax-confirm__actions">
          <span className="ax-confirm__spacer"></span>
          <button className="ax-confirm__btn ax-confirm__btn--deny" onClick={onDeny}>{denyLabel}</button>
          <button className="ax-confirm__btn ax-confirm__btn--allow" onClick={onAllow}>{allowLabel}</button>
        </div>
      )}
    </div>
  );
}
