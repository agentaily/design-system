import React, { createContext, useContext, useState } from "react";

const AX_SIDEBAR_CSS = `
.ax-sidebar { display: flex; flex-direction: column; width: var(--sidebar-w); flex: none; height: 100%; background: var(--surface-panel); border-right: 1px solid var(--border-default); transition: width var(--dur-2) var(--ease-out); overflow: hidden; }
.ax-sidebar--collapsed { width: 56px; }
.ax-sidebar__header { padding: 16px; display: flex; align-items: center; gap: 10px; min-height: 56px; }
.ax-sidebar__content { flex: 1; overflow-y: auto; padding: 8px; }
.ax-sidebar__footer { padding: 12px 16px; border-top: 1px solid var(--border-default); }
.ax-sidebar__group { margin-bottom: 16px; }
.ax-sidebar__group-label { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); padding: 6px 10px; white-space: nowrap; }
.ax-sidebar--collapsed .ax-sidebar__group-label { opacity: 0; }
.ax-sidebar__item { display: flex; align-items: center; gap: 10px; width: 100%; appearance: none; background: none; border: none; text-align: left; cursor: pointer; padding: 8px 10px; border-radius: var(--radius-2); color: var(--text-muted); font-family: var(--font-body); font-size: var(--text-sm); position: relative; transition: background var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out); white-space: nowrap; }
.ax-sidebar__item:hover { background: var(--surface-raised); color: var(--text-body); }
.ax-sidebar__item--active { background: var(--surface-raised); color: var(--text-body); }
.ax-sidebar__item--active::before { content: ""; position: absolute; left: 0; top: 7px; bottom: 7px; width: 2px; border-radius: 1px; background: var(--accent); }
.ax-sidebar__item-icon { width: 18px; height: 18px; flex: none; display: inline-flex; align-items: center; justify-content: center; }
.ax-sidebar__item-icon svg { width: 16px; height: 16px; }
.ax-sidebar__item-label { flex: 1; overflow: hidden; text-overflow: ellipsis; }
.ax-sidebar--collapsed .ax-sidebar__item-label { opacity: 0; }
.ax-sidebar__item-badge { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); }
.ax-sidebar--collapsed .ax-sidebar__item-badge { display: none; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-sidebar-css")) {
  const s = document.createElement("style");
  s.id = "ax-sidebar-css";
  s.textContent = AX_SIDEBAR_CSS;
  document.head.appendChild(s);
}

export function Sidebar({ groups = [], activeId, onSelect, header, footer, collapsed = false, className = "", ...rest }) {
  return (
    <aside className={["ax-sidebar", collapsed ? "ax-sidebar--collapsed" : "", className].filter(Boolean).join(" ")} {...rest}>
      {header ? <div className="ax-sidebar__header">{header}</div> : null}
      <nav className="ax-sidebar__content">
        {groups.map((g, gi) => (
          <div className="ax-sidebar__group" key={gi}>
            {g.label ? <div className="ax-sidebar__group-label">{g.label}</div> : null}
            {g.items.map((it) => (
              <button
                key={it.id}
                className={"ax-sidebar__item" + (it.id === activeId ? " ax-sidebar__item--active" : "")}
                onClick={() => onSelect && onSelect(it.id)}
                title={collapsed ? it.label : undefined}
              >
                {it.icon ? <span className="ax-sidebar__item-icon">{it.icon}</span> : null}
                <span className="ax-sidebar__item-label">{it.label}</span>
                {it.badge != null ? <span className="ax-sidebar__item-badge">{it.badge}</span> : null}
              </button>
            ))}
          </div>
        ))}
      </nav>
      {footer ? <div className="ax-sidebar__footer">{footer}</div> : null}
    </aside>
  );
}
