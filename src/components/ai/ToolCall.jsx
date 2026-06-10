import React, { useState } from "react";

const AX_TOOLCALL_CSS = `
.ax-tool { border: 1px solid var(--border-default); border-radius: var(--radius-2); background: var(--bg-0); overflow: hidden; font-family: var(--font-mono); }
[data-theme="light"] .ax-tool { background: var(--bg-1); }
.ax-tool__head { display: flex; align-items: center; gap: 10px; width: 100%; appearance: none; background: none; border: none; cursor: pointer; text-align: left; padding: 9px 12px; }
.ax-tool__head:focus-visible { outline: none; box-shadow: var(--ring); }
.ax-tool__icon { width: 14px; height: 14px; flex: none; color: var(--text-faint); }
.ax-tool__name { font-size: var(--text-sm); color: var(--text-body); }
.ax-tool__name b { font-weight: var(--weight-medium); }
.ax-tool__paren { color: var(--text-faint); }
.ax-tool__spacer { flex: 1; }
.ax-tool__status { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; letter-spacing: var(--tracking-label); text-transform: uppercase; }
.ax-tool__dot { width: 6px; height: 6px; border-radius: 1px; }
.ax-tool--running .ax-tool__status { color: var(--warn); }
.ax-tool--running .ax-tool__dot { background: var(--warn); animation: ax-tool-pulse 1s var(--ease-out) infinite; }
.ax-tool--done .ax-tool__status { color: var(--ok); }
.ax-tool--done .ax-tool__dot { background: var(--ok); }
.ax-tool--error .ax-tool__status { color: var(--danger); }
.ax-tool--error .ax-tool__dot { background: var(--danger); }
.ax-tool__chev { width: 11px; height: 11px; color: var(--text-faint); transition: transform var(--dur-2) var(--ease-out); }
.ax-tool--open .ax-tool__chev { transform: rotate(180deg); }
.ax-tool__body { border-top: 1px solid var(--border-default); padding: 10px 12px; display: flex; flex-direction: column; gap: 10px; }
.ax-tool__block-label { font-size: 10px; letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); margin-bottom: 4px; }
.ax-tool__pre { margin: 0; font-size: var(--text-xs); line-height: 1.6; color: var(--text-body); white-space: pre-wrap; word-break: break-word; }
@keyframes ax-tool-pulse { 50% { opacity: 0.35; } }
@media (prefers-reduced-motion: reduce) { .ax-tool--running .ax-tool__dot { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-toolcall-css")) {
  const s = document.createElement("style");
  s.id = "ax-toolcall-css";
  s.textContent = AX_TOOLCALL_CSS;
  document.head.appendChild(s);
}

const Wrench = <svg className="ax-tool__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.1 2.1-2.4-.6-.6-2.4 2.1-2.1z"></path></svg>;
const Chev = <svg className="ax-tool__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>;

const STATUS_LABEL = { running: "Running", done: "Done", error: "Error" };

export function ToolCall({ name, args, result, status = "done", defaultOpen = false, className = "", ...rest }) {
  const [open, setOpen] = useState(defaultOpen);
  const fmt = (v) => typeof v === "string" ? v : JSON.stringify(v, null, 2);
  return (
    <div className={["ax-tool", "ax-tool--" + status, open ? "ax-tool--open" : "", className].filter(Boolean).join(" ")} {...rest}>
      <button className="ax-tool__head" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {Wrench}
        <span className="ax-tool__name"><b>{name}</b><span className="ax-tool__paren">()</span></span>
        <span className="ax-tool__spacer"></span>
        <span className="ax-tool__status"><span className="ax-tool__dot"></span>{STATUS_LABEL[status]}</span>
        {Chev}
      </button>
      <div className="ax-tool__body" style={{ display: open ? "flex" : "none" }}>
        {args != null ? (
          <div>
            <div className="ax-tool__block-label">Arguments</div>
            <pre className="ax-tool__pre">{fmt(args)}</pre>
          </div>
        ) : null}
        {result != null ? (
          <div>
            <div className="ax-tool__block-label">Result</div>
            <pre className="ax-tool__pre">{fmt(result)}</pre>
          </div>
        ) : null}
      </div>
    </div>
  );
}
