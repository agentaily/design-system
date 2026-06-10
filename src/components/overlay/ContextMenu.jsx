import React, { useState, useRef, useEffect, useCallback } from "react";

const AX_CTXMENU_CSS = `
.ax-ctxmenu-trigger { display: contents; }
.ax-ctxmenu { position: fixed; z-index: 80; min-width: 190px; background: var(--surface-panel); border: 1px solid var(--border-strong); border-radius: var(--radius-3); box-shadow: var(--shadow-2); padding: var(--space-1); animation: ax-ctxmenu-in var(--dur-1) var(--ease-out); }
.ax-ctxmenu__item { display: flex; align-items: center; gap: 10px; width: 100%; appearance: none; background: none; border: none; text-align: left; cursor: pointer; padding: 7px 10px; border-radius: var(--radius-2); color: var(--text-body); font-family: var(--font-body); font-size: var(--text-sm); }
.ax-ctxmenu__item:hover { background: var(--surface-raised); }
.ax-ctxmenu__item--danger { color: var(--danger); }
.ax-ctxmenu__item svg { width: 15px; height: 15px; flex: none; color: var(--text-faint); }
.ax-ctxmenu__item--danger svg { color: var(--danger); }
.ax-ctxmenu__shortcut { margin-left: auto; font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); }
.ax-ctxmenu__sep { height: 1px; background: var(--border-default); margin: var(--space-1) 0; }
.ax-ctxmenu__label { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); padding: 8px 10px 4px; }
@keyframes ax-ctxmenu-in { from { opacity: 0; transform: scale(0.97); } }
@media (prefers-reduced-motion: reduce) { .ax-ctxmenu { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-ctxmenu-css")) {
  const s = document.createElement("style");
  s.id = "ax-ctxmenu-css";
  s.textContent = AX_CTXMENU_CSS;
  document.head.appendChild(s);
}

export function ContextMenu({ items = [], children, className = "", ...rest }) {
  const [menu, setMenu] = useState(null); // {x,y}
  const ref = useRef(null);

  const onContext = (e) => { e.preventDefault(); setMenu({ x: e.clientX, y: e.clientY }); };
  const close = useCallback(() => setMenu(null), []);
  useEffect(() => {
    if (menu) {
      const onDoc = () => close();
      const onKey = (e) => { if (e.key === "Escape") close(); };
      document.addEventListener("mousedown", onDoc);
      document.addEventListener("keydown", onKey);
      document.addEventListener("scroll", onDoc, true);
      return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); document.removeEventListener("scroll", onDoc, true); };
    }
  }, [menu, close]);

  return (
    <React.Fragment>
      <div className="ax-ctxmenu-trigger" onContextMenu={onContext} ref={ref} {...rest}>{children}</div>
      {menu ? (
        <div className={["ax-ctxmenu", className].filter(Boolean).join(" ")} style={{ left: menu.x, top: menu.y }} onClick={(e) => e.stopPropagation()}>
          {items.map((it, i) => {
            if (it.type === "separator") return <div key={i} className="ax-ctxmenu__sep"></div>;
            if (it.type === "label") return <div key={i} className="ax-ctxmenu__label">{it.label}</div>;
            return (
              <button key={i} className={"ax-ctxmenu__item" + (it.danger ? " ax-ctxmenu__item--danger" : "")} onClick={() => { close(); it.onSelect && it.onSelect(); }}>
                {it.icon}<span>{it.label}</span>{it.shortcut ? <span className="ax-ctxmenu__shortcut">{it.shortcut}</span> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </React.Fragment>
  );
}
