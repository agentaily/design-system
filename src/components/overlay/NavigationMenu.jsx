import React, { useState } from "react";

const AX_NAVMENU_CSS = `
.ax-navmenu { display: inline-flex; gap: 4px; position: relative; }
.ax-navmenu__item { position: relative; }
.ax-navmenu__trigger { display: inline-flex; align-items: center; gap: 6px; appearance: none; background: none; border: none; cursor: pointer; padding: 8px 12px; border-radius: var(--radius-2); color: var(--text-muted); font-family: var(--font-body); font-size: var(--text-sm); text-decoration: none; transition: background var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out); }
.ax-navmenu__trigger:hover, .ax-navmenu__trigger--open { background: var(--surface-raised); color: var(--text-body); }
.ax-navmenu__chev { width: 12px; height: 12px; color: var(--text-faint); transition: transform var(--dur-2) var(--ease-out); }
.ax-navmenu__trigger--open .ax-navmenu__chev { transform: rotate(180deg); }
.ax-navmenu__panel { position: absolute; z-index: 60; top: calc(100% + 6px); left: 0; min-width: 280px; padding: var(--space-2); background: var(--surface-panel); border: 1px solid var(--border-strong); border-radius: var(--radius-3); box-shadow: var(--shadow-2); display: grid; gap: 2px; animation: ax-navmenu-in var(--dur-2) var(--ease-out); }
.ax-navmenu__panel--2col { grid-template-columns: 1fr 1fr; min-width: 440px; }
.ax-navmenu__link { display: flex; flex-direction: column; gap: 2px; padding: 9px 10px; border-radius: var(--radius-2); text-decoration: none; cursor: pointer; transition: background var(--dur-1) var(--ease-out); }
.ax-navmenu__link:hover { background: var(--surface-raised); }
.ax-navmenu__link-title { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-body); }
.ax-navmenu__link-desc { font-size: var(--text-xs); color: var(--text-faint); line-height: var(--leading-snug); }
@keyframes ax-navmenu-in { from { opacity: 0; transform: translateY(-4px); } }
@media (prefers-reduced-motion: reduce) { .ax-navmenu__panel { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-navmenu-css")) {
  const s = document.createElement("style");
  s.id = "ax-navmenu-css";
  s.textContent = AX_NAVMENU_CSS;
  document.head.appendChild(s);
}

const Chev = <svg className="ax-navmenu__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>;

export function NavigationMenu({ items = [], className = "", ...rest }) {
  const [open, setOpen] = useState(null);
  return (
    <nav className={["ax-navmenu", className].filter(Boolean).join(" ")} onMouseLeave={() => setOpen(null)} {...rest}>
      {items.map((item, i) => (
        <div className="ax-navmenu__item" key={i} onMouseEnter={() => item.links && setOpen(i)}>
          {item.links ? (
            <React.Fragment>
              <button className={"ax-navmenu__trigger" + (open === i ? " ax-navmenu__trigger--open" : "")}>{item.label}{Chev}</button>
              {open === i ? (
                <div className={"ax-navmenu__panel" + (item.links.length > 3 ? " ax-navmenu__panel--2col" : "")}>
                  {item.links.map((l, li) => (
                    <a key={li} className="ax-navmenu__link" href={l.href || "#"}>
                      <span className="ax-navmenu__link-title">{l.title}</span>
                      {l.description ? <span className="ax-navmenu__link-desc">{l.description}</span> : null}
                    </a>
                  ))}
                </div>
              ) : null}
            </React.Fragment>
          ) : (
            <a className="ax-navmenu__trigger" href={item.href || "#"}>{item.label}</a>
          )}
        </div>
      ))}
    </nav>
  );
}
