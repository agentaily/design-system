import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";

const AX_COMBOBOX_CSS = `
.ax-combobox { position: relative; display: inline-flex; flex-direction: column; min-width: 220px; }
.ax-combobox__trigger { display: flex; align-items: center; gap: 8px; height: 36px; padding: 0 10px 0 12px; cursor: pointer; background: var(--surface-card); border: 1px solid var(--border-default); border-radius: var(--radius-2); color: var(--text-body); font-family: var(--font-body); font-size: var(--text-sm); transition: border-color var(--dur-1) var(--ease-out); }
.ax-combobox__trigger:hover { border-color: var(--border-strong); }
.ax-combobox__trigger:focus-visible { outline: none; box-shadow: var(--ring); }
.ax-combobox__value { flex: 1; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ax-combobox__value--empty { color: var(--text-faint); }
.ax-combobox__chev { width: 14px; height: 14px; color: var(--text-faint); }
.ax-combobox__panel { position: absolute; z-index: 60; top: calc(100% + 6px); left: 0; right: 0; background: var(--surface-panel); border: 1px solid var(--border-strong); border-radius: var(--radius-3); box-shadow: var(--shadow-2); overflow: hidden; animation: ax-combobox-in var(--dur-2) var(--ease-out); }
.ax-combobox__search { width: 100%; height: 38px; padding: 0 12px; background: none; border: none; border-bottom: 1px solid var(--border-default); outline: none; color: var(--text-body); font-family: var(--font-body); font-size: var(--text-sm); }
.ax-combobox__search::placeholder { color: var(--text-faint); }
.ax-combobox__list { max-height: 200px; overflow-y: auto; padding: var(--space-1); }
.ax-combobox__opt { display: flex; align-items: center; gap: 8px; width: 100%; appearance: none; background: none; border: none; text-align: left; cursor: pointer; padding: 8px 10px; border-radius: var(--radius-2); color: var(--text-body); font-family: var(--font-body); font-size: var(--text-sm); }
.ax-combobox__opt--active { background: var(--surface-raised); }
.ax-combobox__check { width: 14px; flex: none; color: var(--accent); }
.ax-combobox__empty { padding: 20px; text-align: center; color: var(--text-faint); font-size: var(--text-sm); }
@keyframes ax-combobox-in { from { opacity: 0; transform: translateY(-4px); } }
@media (prefers-reduced-motion: reduce) { .ax-combobox__panel { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-combobox-css")) {
  const s = document.createElement("style");
  s.id = "ax-combobox-css";
  s.textContent = AX_COMBOBOX_CSS;
  document.head.appendChild(s);
}

const Chev = <svg className="ax-combobox__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 15 5 5 5-5M7 9l5-5 5 5"></path></svg>;
const Check = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>;

export function Combobox({ value, options = [], placeholder = "Select…", searchPlaceholder = "Search…", onChange, className = "", ...rest }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const searchRef = useRef(null);

  const norm = (o) => (typeof o === "string" ? { value: o, label: o } : o);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return options.map(norm).filter((o) => !q || o.label.toLowerCase().includes(q));
  }, [options, query]);

  const current = options.map(norm).find((o) => o.value === value);

  const onDoc = useCallback((e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }, []);
  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", onDoc);
      if (searchRef.current) searchRef.current.focus();
      return () => document.removeEventListener("mousedown", onDoc);
    } else { setQuery(""); setActive(0); }
  }, [open, onDoc]);

  const choose = (o) => { onChange && onChange(o.value); setOpen(false); };
  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (filtered[active]) choose(filtered[active]); }
    else if (e.key === "Escape") setOpen(false);
  };

  return (
    <div className={["ax-combobox", className].filter(Boolean).join(" ")} ref={ref} {...rest}>
      <button className="ax-combobox__trigger" onClick={() => setOpen((o) => !o)}>
        <span className={"ax-combobox__value" + (current ? "" : " ax-combobox__value--empty")}>{current ? current.label : placeholder}</span>
        {Chev}
      </button>
      {open ? (
        <div className="ax-combobox__panel">
          <input ref={searchRef} className="ax-combobox__search" placeholder={searchPlaceholder} value={query} onChange={(e) => { setQuery(e.target.value); setActive(0); }} onKeyDown={onKey} />
          <div className="ax-combobox__list">
            {filtered.length === 0 ? <div className="ax-combobox__empty">No match.</div> : null}
            {filtered.map((o, i) => (
              <button key={o.value} className={"ax-combobox__opt" + (i === active ? " ax-combobox__opt--active" : "")} onMouseEnter={() => setActive(i)} onClick={() => choose(o)}>
                <span className="ax-combobox__check">{o.value === value ? Check : null}</span>
                {o.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
