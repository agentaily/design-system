import React, { useState, useRef, useEffect, useCallback } from "react";

const AX_MODELSEL_CSS = `
.ax-modelsel { position: relative; display: inline-flex; }
.ax-modelsel__trigger {
  display: inline-flex; align-items: center; gap: 8px; cursor: pointer;
  background: transparent; color: var(--text-body);
  border: 1px solid var(--border-default); border-radius: var(--radius-2);
  padding: 6px 10px; font-family: var(--font-mono); font-size: var(--text-sm);
  transition: border-color var(--dur-1) var(--ease-out), background var(--dur-1) var(--ease-out);
}
.ax-modelsel__trigger:hover { border-color: var(--border-strong); background: var(--surface-raised); }
.ax-modelsel__trigger:focus-visible { outline: none; box-shadow: var(--ring); }
.ax-modelsel__glyph { color: var(--text-faint); }
.ax-modelsel__chev { width: 12px; height: 12px; color: var(--text-faint); transition: transform var(--dur-2) var(--ease-out); }
.ax-modelsel--open .ax-modelsel__chev { transform: rotate(180deg); }
.ax-modelsel__panel {
  position: absolute; z-index: 60; top: calc(100% + 6px); left: 0; min-width: 280px;
  background: var(--surface-panel); border: 1px solid var(--border-strong);
  border-radius: var(--radius-3); box-shadow: var(--shadow-2); padding: var(--space-1);
  animation: ax-modelsel-in var(--dur-2) var(--ease-out);
}
.ax-modelsel__panel--end { left: auto; right: 0; }
.ax-modelsel__item { display: flex; align-items: flex-start; gap: 10px; width: 100%; appearance: none; background: none; border: none; text-align: left; cursor: pointer; padding: 9px 10px; border-radius: var(--radius-2); transition: background var(--dur-1) var(--ease-out); }
.ax-modelsel__item:hover { background: var(--surface-raised); }
.ax-modelsel__check { width: 16px; flex: none; color: var(--accent); padding-top: 2px; }
.ax-modelsel__check svg { width: 14px; height: 14px; display: block; }
.ax-modelsel__body { flex: 1; min-width: 0; }
.ax-modelsel__name { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--text-body); display: flex; align-items: center; gap: 8px; }
.ax-modelsel__desc { font-size: var(--text-xs); color: var(--text-faint); margin-top: 2px; line-height: var(--leading-snug); }
.ax-modelsel__tag { font-family: var(--font-mono); font-size: 9px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-faint); border: 1px solid var(--border-default); border-radius: var(--radius-1); padding: 1px 4px; }
@keyframes ax-modelsel-in { from { opacity: 0; transform: translateY(-4px); } }
@media (prefers-reduced-motion: reduce) { .ax-modelsel__panel { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-modelsel-css")) {
  const s = document.createElement("style");
  s.id = "ax-modelsel-css";
  s.textContent = AX_MODELSEL_CSS;
  document.head.appendChild(s);
}

const Check = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>;
const Chev = <svg className="ax-modelsel__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>;

export function ModelSelector({ value, models = [], onChange, align = "start", className = "", ...rest }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = models.find((m) => (typeof m === "string" ? m : m.value) === value);
  const currentLabel = current ? (typeof current === "string" ? current : current.value) : value;

  const onDoc = useCallback((e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }, []);
  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", onDoc);
      const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
      document.addEventListener("keydown", onKey);
      return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
    }
  }, [open, onDoc]);

  return (
    <span className={["ax-modelsel", open ? "ax-modelsel--open" : "", className].filter(Boolean).join(" ")} ref={ref} {...rest}>
      <button className="ax-modelsel__trigger" onClick={() => setOpen((o) => !o)}>
        <span className="ax-modelsel__glyph">▣</span>
        {currentLabel}
        {Chev}
      </button>
      {open ? (
        <div className={"ax-modelsel__panel" + (align === "end" ? " ax-modelsel__panel--end" : "")} role="listbox">
          {models.map((m) => {
            const model = typeof m === "string" ? { value: m } : m;
            const selected = model.value === value;
            return (
              <button key={model.value} role="option" aria-selected={selected} className="ax-modelsel__item" onClick={() => { onChange && onChange(model.value); setOpen(false); }}>
                <span className="ax-modelsel__check">{selected ? Check : null}</span>
                <span className="ax-modelsel__body">
                  <span className="ax-modelsel__name">{model.value}{model.tag ? <span className="ax-modelsel__tag">{model.tag}</span> : null}</span>
                  {model.description ? <span className="ax-modelsel__desc">{model.description}</span> : null}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </span>
  );
}
