import React, { useState } from "react";

const AX_COLLAPSIBLE_CSS = `
.ax-collapsible { border: 1px solid var(--border-default); border-radius: var(--radius-3); background: var(--surface-card); }
.ax-collapsible__trigger { display: flex; align-items: center; gap: 10px; width: 100%; appearance: none; background: none; border: none; cursor: pointer; text-align: left; padding: 12px 14px; color: var(--text-body); font-family: var(--font-body); font-size: var(--text-sm); font-weight: var(--weight-medium); }
.ax-collapsible__trigger:focus-visible { outline: none; box-shadow: var(--ring); border-radius: var(--radius-3); }
.ax-collapsible__label { flex: 1; }
.ax-collapsible__chev { width: 14px; height: 14px; color: var(--text-faint); transition: transform var(--dur-2) var(--ease-out); }
.ax-collapsible--open .ax-collapsible__chev { transform: rotate(180deg); }
.ax-collapsible__panel { overflow: hidden; display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur-2) var(--ease-out); }
.ax-collapsible--open .ax-collapsible__panel { grid-template-rows: 1fr; }
.ax-collapsible__inner { min-height: 0; }
.ax-collapsible__body { padding: 0 14px 14px; font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-body); }
@media (prefers-reduced-motion: reduce) { .ax-collapsible__panel { transition: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-collapsible-css")) {
  const s = document.createElement("style");
  s.id = "ax-collapsible-css";
  s.textContent = AX_COLLAPSIBLE_CSS;
  document.head.appendChild(s);
}

const Chev = <svg className="ax-collapsible__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>;

export function Collapsible({ label, defaultOpen = false, children, className = "", ...rest }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={["ax-collapsible", open ? "ax-collapsible--open" : "", className].filter(Boolean).join(" ")} {...rest}>
      <button className="ax-collapsible__trigger" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span className="ax-collapsible__label">{label}</span>
        {Chev}
      </button>
      <div className="ax-collapsible__panel">
        <div className="ax-collapsible__inner">
          <div className="ax-collapsible__body">{children}</div>
        </div>
      </div>
    </div>
  );
}
