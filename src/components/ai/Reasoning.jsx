import React, { useState } from "react";

const AX_REASONING_CSS = `
.ax-reasoning { border: 1px solid var(--border-default); border-radius: var(--radius-3); background: var(--surface-card); overflow: hidden; }
.ax-reasoning__head {
  display: flex; align-items: center; gap: 10px; width: 100%;
  appearance: none; background: none; border: none; cursor: pointer; text-align: left;
  padding: 11px 14px; color: var(--text-muted);
}
.ax-reasoning__head:hover { color: var(--text-body); }
.ax-reasoning__head:focus-visible { outline: none; box-shadow: var(--ring); }
.ax-reasoning__glyph { width: 14px; height: 14px; flex: none; color: var(--text-faint); }
.ax-reasoning__title { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; }
.ax-reasoning__dur { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }
.ax-reasoning__spacer { flex: 1; }
.ax-reasoning__chev { width: 12px; height: 12px; flex: none; color: var(--text-faint); transition: transform var(--dur-2) var(--ease-out); }
.ax-reasoning--open .ax-reasoning__chev { transform: rotate(180deg); }
.ax-reasoning__cursor { display: inline-block; width: 0.5em; height: 1em; background: currentColor; vertical-align: text-bottom; margin-left: 4px; animation: ax-rsn-blink 1.1s steps(1) infinite; }
@keyframes ax-rsn-blink { 50% { opacity: 0; } }
.ax-reasoning__panel { overflow: hidden; display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur-2) var(--ease-out); }
.ax-reasoning--open .ax-reasoning__panel { grid-template-rows: 1fr; }
.ax-reasoning__panel-inner { min-height: 0; }
.ax-reasoning__steps { padding: 4px 16px 16px 16px; border-top: 1px solid var(--border-default); margin-top: 2px; }
.ax-reasoning__step { position: relative; padding: 8px 0 8px 22px; font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-snug); }
.ax-reasoning__step::before { content: ""; position: absolute; left: 4px; top: 13px; width: 5px; height: 5px; border-radius: 1px; background: var(--text-faint); }
.ax-reasoning__step:not(:last-child)::after { content: ""; position: absolute; left: 6px; top: 18px; bottom: -4px; width: 1px; background: var(--border-strong); }
.ax-reasoning__step strong { color: var(--text-body); font-weight: var(--weight-medium); }
@media (prefers-reduced-motion: reduce) { .ax-reasoning__panel { transition: none; } .ax-reasoning__cursor { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-reasoning-css")) {
  const s = document.createElement("style");
  s.id = "ax-reasoning-css";
  s.textContent = AX_REASONING_CSS;
  document.head.appendChild(s);
}

const Chev = (
  <svg className="ax-reasoning__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>
);
const Brain = (
  <svg className="ax-reasoning__glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path></svg>
);

export function Reasoning({ steps = [], duration, streaming = false, defaultOpen = false, title = "Reasoning", className = "", ...rest }) {
  const [open, setOpen] = useState(defaultOpen || streaming);
  return (
    <div className={["ax-reasoning", open ? "ax-reasoning--open" : "", className].filter(Boolean).join(" ")} {...rest}>
      <button className="ax-reasoning__head" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {Brain}
        <span className="ax-reasoning__title">{streaming ? "Thinking" : title}{streaming ? <span className="ax-reasoning__cursor"></span> : null}</span>
        {duration && !streaming ? <span className="ax-reasoning__dur">{duration}</span> : null}
        <span className="ax-reasoning__spacer"></span>
        {Chev}
      </button>
      <div className="ax-reasoning__panel">
        <div className="ax-reasoning__panel-inner">
          <div className="ax-reasoning__steps">
            {steps.map((st, i) => (
              <div className="ax-reasoning__step" key={i}>{st}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
