import React, { useState, useRef, useEffect, useCallback } from "react";

const AX_MENU_CSS = `
.ax-menu { position: relative; display: inline-flex; }
.ax-menu__panel {
  position: absolute; z-index: 60; min-width: 200px; top: calc(100% + 6px);
  background: var(--surface-panel); border: 1px solid var(--border-strong);
  border-radius: var(--radius-3); box-shadow: var(--shadow-2); padding: var(--space-1);
  animation: ax-menu-in var(--dur-2) var(--ease-out);
}
.ax-menu__panel--end { right: 0; }
.ax-menu__panel--start { left: 0; }
.ax-menu__item {
  display: flex; align-items: center; gap: 10px; width: 100%;
  appearance: none; background: none; border: none; text-align: left; cursor: pointer;
  padding: 7px 10px; border-radius: var(--radius-2); color: var(--text-body);
  font-family: var(--font-body); font-size: var(--text-sm);
  transition: background var(--dur-1) var(--ease-out);
}
.ax-menu__item:hover { background: var(--surface-raised); }
.ax-menu__item:focus-visible { outline: none; background: var(--surface-raised); }
.ax-menu__item--danger { color: var(--danger); }
.ax-menu__item:disabled { opacity: 0.4; cursor: not-allowed; }
.ax-menu__item svg { width: 15px; height: 15px; flex: none; color: var(--text-faint); }
.ax-menu__item--danger svg { color: var(--danger); }
.ax-menu__shortcut { margin-left: auto; font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); letter-spacing: 0.04em; }
.ax-menu__label { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); padding: 8px 10px 4px; }
.ax-menu__sep { height: 1px; background: var(--border-default); margin: var(--space-1) 0; }
@keyframes ax-menu-in { from { opacity: 0; transform: translateY(-4px); } }
@media (prefers-reduced-motion: reduce) { .ax-menu__panel { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-menu-css")) {
  const s = document.createElement("style");
  s.id = "ax-menu-css";
  s.textContent = AX_MENU_CSS;
  document.head.appendChild(s);
}

export function DropdownMenu({ trigger, items = [], align = "start", className = "", ...rest }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const onDoc = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", onDoc);
      const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
      document.addEventListener("keydown", onKey);
      return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
    }
  }, [open, onDoc]);

  return (
    <span className={["ax-menu", className].filter(Boolean).join(" ")} ref={ref} {...rest}>
      <span onClick={() => setOpen((o) => !o)}>{trigger}</span>
      {open ? (
        <div className={"ax-menu__panel ax-menu__panel--" + align} role="menu">
          {items.map((it, i) => {
            if (it.type === "separator") return <div key={i} className="ax-menu__sep"></div>;
            if (it.type === "label") return <div key={i} className="ax-menu__label">{it.label}</div>;
            return (
              <button
                key={i}
                role="menuitem"
                disabled={it.disabled}
                className={"ax-menu__item" + (it.danger ? " ax-menu__item--danger" : "")}
                onClick={() => { setOpen(false); it.onSelect && it.onSelect(); }}
              >
                {it.icon}
                <span>{it.label}</span>
                {it.shortcut ? <span className="ax-menu__shortcut">{it.shortcut}</span> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </span>
  );
}
