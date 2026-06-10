import React from "react";

const AX_STACKTRACE_CSS = `
.ax-stacktrace { border: 1px solid var(--danger); border-radius: var(--radius-3); overflow: hidden; background: var(--surface-card); font-family: var(--font-mono); }
.ax-stacktrace__head { display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; background: var(--danger-dim); border-bottom: 1px solid var(--border-default); }
.ax-stacktrace__icon { width: 16px; height: 16px; flex: none; color: var(--danger); margin-top: 1px; }
.ax-stacktrace__type { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--danger); }
.ax-stacktrace__msg { font-size: var(--text-sm); color: var(--text-body); margin-top: 2px; font-family: var(--font-body); }
.ax-stacktrace__frames { padding: 6px; }
.ax-stacktrace__frame { display: flex; gap: 10px; padding: 6px 8px; border-radius: var(--radius-1); font-size: var(--text-xs); }
.ax-stacktrace__frame--app { background: var(--surface-raised); }
.ax-stacktrace__fn { color: var(--text-body); flex: none; }
.ax-stacktrace__loc { color: var(--text-faint); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: right; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-stacktrace-css")) {
  const s = document.createElement("style");
  s.id = "ax-stacktrace-css";
  s.textContent = AX_STACKTRACE_CSS;
  document.head.appendChild(s);
}

const Bug = <svg className="ax-stacktrace__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6M3 13h3M18 13h3M3 18l3-2M18 16l3 2M3 8l3 2M18 10l3-2"></path></svg>;

export function StackTrace({ type = "Error", message, frames = [], className = "", ...rest }) {
  return (
    <div className={["ax-stacktrace", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-stacktrace__head">
        {Bug}
        <div>
          <div className="ax-stacktrace__type">{type}</div>
          {message ? <div className="ax-stacktrace__msg">{message}</div> : null}
        </div>
      </div>
      <div className="ax-stacktrace__frames">
        {frames.map((f, i) => {
          const frame = typeof f === "string" ? { fn: f } : f;
          return (
            <div key={i} className={"ax-stacktrace__frame" + (frame.app ? " ax-stacktrace__frame--app" : "")}>
              <span className="ax-stacktrace__fn">{frame.fn}</span>
              {frame.location ? <span className="ax-stacktrace__loc">{frame.location}</span> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
