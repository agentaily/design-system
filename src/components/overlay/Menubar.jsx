import React, { useState, useRef, useEffect, useCallback } from "react";

const AX_MENUBAR_CSS = `
.ax-menubar { display: inline-flex; gap: 2px; padding: 2px; background: var(--surface-panel); border: 1px solid var(--border-default); border-radius: var(--radius-2); }
.ax-menubar__menu { position: relative; }
.ax-menubar__trigger { appearance: none; background: none; border: none; cursor: pointer; padding: 5px 10px; border-radius: var(--radius-1); color: var(--text-muted); font-family: var(--font-body); font-size: var(--text-sm); transition: background var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out); }
.ax-menubar__trigger:hover, .ax-menubar__trigger--open { background: var(--surface-raised); color: var(--text-body); }
.ax-menubar__panel { position: absolute; z-index: 60; top: calc(100% + 4px); left: 0; min-width: 180px; background: var(--surface-panel); border: 1px solid var(--border-strong); border-radius: var(--radius-3); box-shadow: var(--shadow-2); padding: var(--space-1); }
.ax-menubar__item { display: flex; align-items: center; gap: 10px; width: 100%; appearance: none; background: none; border: none; text-align: left; cursor: pointer; padding: 7px 10px; border-radius: var(--radius-2); color: var(--text-body); font-family: var(--font-body); font-size: var(--text-sm); }
.ax-menubar__item:hover { background: var(--surface-raised); }
.ax-menubar__shortcut { margin-left: auto; font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }
.ax-menubar__sep { height: 1px; background: var(--border-default); margin: var(--space-1) 0; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-menubar-css")) {
  const s = document.createElement("style");
  s.id = "ax-menubar-css";
  s.textContent = AX_MENUBAR_CSS;
  document.head.appendChild(s);
}

export function Menubar({ menus = [], className = "", ...rest }) {
  const [open, setOpen] = useState(null);
  const ref = useRef(null);
  const onDoc = useCallback((e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(null); }, []);
  useEffect(() => {
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [onDoc]);
  return (
    <div className={["ax-menubar", className].filter(Boolean).join(" ")} ref={ref} {...rest}>
      {menus.map((menu, mi) => (
        <div className="ax-menubar__menu" key={mi}>
          <button
            className={"ax-menubar__trigger" + (open === mi ? " ax-menubar__trigger--open" : "")}
            onClick={() => setOpen(open === mi ? null : mi)}
            onMouseEnter={() => open != null && setOpen(mi)}
          >{menu.label}</button>
          {open === mi ? (
            <div className="ax-menubar__panel">
              {menu.items.map((it, i) => {
                if (it.type === "separator") return <div key={i} className="ax-menubar__sep"></div>;
                return (
                  <button key={i} className="ax-menubar__item" onClick={() => { setOpen(null); it.onSelect && it.onSelect(); }}>
                    {it.label}{it.shortcut ? <span className="ax-menubar__shortcut">{it.shortcut}</span> : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
