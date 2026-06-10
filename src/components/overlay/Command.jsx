import React, { useState, useMemo, useEffect, useRef } from "react";

const AX_COMMAND_CSS = `
.ax-cmd-overlay {
  position: fixed; inset: 0; z-index: 100; display: flex; align-items: flex-start; justify-content: center;
  padding-top: 14vh; background: var(--bg-overlay);
  backdrop-filter: blur(var(--blur-overlay)); -webkit-backdrop-filter: blur(var(--blur-overlay));
  animation: ax-cmd-fade var(--dur-2) var(--ease-out);
}
.ax-cmd {
  width: min(560px, calc(100vw - 48px)); max-height: 60vh; display: flex; flex-direction: column;
  background: var(--surface-panel); border: 1px solid var(--border-strong);
  border-radius: var(--radius-3); box-shadow: var(--shadow-3); overflow: hidden;
  animation: ax-cmd-rise var(--dur-3) var(--ease-out);
}
.ax-cmd--inline { position: relative; animation: none; max-height: 340px; }
.ax-cmd__head { display: flex; align-items: center; gap: 10px; padding: 0 14px; border-bottom: 1px solid var(--border-default); }
.ax-cmd__icon { color: var(--text-faint); flex: none; }
.ax-cmd__input { flex: 1; height: 48px; background: none; border: none; outline: none; color: var(--text-body); font-family: var(--font-body); font-size: var(--text-md); }
.ax-cmd__input::placeholder { color: var(--text-faint); }
.ax-cmd__esc { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); border: 1px solid var(--border-default); border-radius: var(--radius-1); padding: 2px 5px; }
.ax-cmd__list { overflow-y: auto; padding: var(--space-1); }
.ax-cmd__group-label { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); padding: 8px 10px 4px; }
.ax-cmd__item {
  display: flex; align-items: center; gap: 10px; width: 100%; appearance: none; background: none; border: none;
  text-align: left; cursor: pointer; padding: 9px 10px; border-radius: var(--radius-2);
  color: var(--text-body); font-family: var(--font-body); font-size: var(--text-sm);
}
.ax-cmd__item svg { width: 15px; height: 15px; flex: none; color: var(--text-faint); }
.ax-cmd__item--active { background: var(--surface-raised); }
.ax-cmd__item-shortcut { margin-left: auto; font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }
.ax-cmd__empty { padding: 28px; text-align: center; color: var(--text-faint); font-size: var(--text-sm); }
@keyframes ax-cmd-fade { from { opacity: 0; } }
@keyframes ax-cmd-rise { from { opacity: 0; transform: translateY(-8px); } }
@media (prefers-reduced-motion: reduce) { .ax-cmd-overlay, .ax-cmd { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-command-css")) {
  const s = document.createElement("style");
  s.id = "ax-command-css";
  s.textContent = AX_COMMAND_CSS;
  document.head.appendChild(s);
}

export function Command({ open = true, inline = false, groups = [], placeholder = "Type a command or search…", onClose, onSelect, className = "", ...rest }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  const flat = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = [];
    for (const g of groups) {
      const matched = g.items.filter((it) => !q || it.label.toLowerCase().includes(q));
      if (matched.length) out.push({ label: g.label, items: matched });
    }
    return out;
  }, [groups, query]);

  const flatItems = useMemo(() => flat.flatMap((g) => g.items), [flat]);

  useEffect(() => { setActive(0); }, [query]);
  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);

  if (!open) return null;

  const choose = (it) => { onSelect && onSelect(it); onClose && onClose(); };

  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, flatItems.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (flatItems[active]) choose(flatItems[active]); }
    else if (e.key === "Escape") { onClose && onClose(); }
  };

  let idx = -1;
  const panel = (
    <div className={["ax-cmd", inline ? "ax-cmd--inline" : "", className].filter(Boolean).join(" ")} onClick={(e) => e.stopPropagation()} {...rest}>
      <div className="ax-cmd__head">
        <svg className="ax-cmd__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
        <input ref={inputRef} className="ax-cmd__input" placeholder={placeholder} value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={onKey} />
        <span className="ax-cmd__esc">ESC</span>
      </div>
      <div className="ax-cmd__list">
        {flatItems.length === 0 ? <div className="ax-cmd__empty">No results.</div> : null}
        {flat.map((g) => (
          <div key={g.label}>
            {g.label ? <div className="ax-cmd__group-label">{g.label}</div> : null}
            {g.items.map((it) => {
              idx++;
              const myIdx = idx;
              return (
                <button
                  key={it.id || it.label}
                  className={"ax-cmd__item" + (myIdx === active ? " ax-cmd__item--active" : "")}
                  onMouseEnter={() => setActive(myIdx)}
                  onClick={() => choose(it)}
                >
                  {it.icon}
                  <span>{it.label}</span>
                  {it.shortcut ? <span className="ax-cmd__item-shortcut">{it.shortcut}</span> : null}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  if (inline) return panel;
  return <div className="ax-cmd-overlay" onClick={onClose}>{panel}</div>;
}
