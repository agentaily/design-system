import React, { useState } from "react";
import { BrandMark } from "../utilities/BrandMark.jsx";
import { Icon } from "../utilities/Icon.jsx";

// AppShell — the standard product frame: fixed sidebar (brand · nav · account)
// + main column (topbar · content). All regions are slots; nav can be
// controlled or self-managed. Content goes in `children`.
const AX_APPSHELL_CSS = `
.ax-appshell { display: grid; grid-template-columns: 240px 1fr; height: 100%; background: var(--surface-page); overflow: hidden; }
.ax-appshell__sb { display: flex; flex-direction: column; background: var(--surface-panel); border-right: 1px solid var(--border-default); min-height: 0; }
.ax-appshell__brand { display: flex; align-items: center; gap: 9px; padding: 18px 18px 14px; }
.ax-appshell__group { padding: 10px 12px 4px; }
.ax-appshell__nav { display: flex; flex-direction: column; gap: 2px; padding: 0 10px; }
.ax-appshell__item { display: flex; align-items: center; gap: 11px; padding: 8px 10px; border-radius: var(--radius-2);
  color: var(--text-muted); cursor: pointer; font-size: var(--text-sm); border: none; background: none; text-align: left;
  font-family: inherit; transition: background var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out); }
.ax-appshell__item:hover { background: var(--bg-3); color: var(--text-body); }
.ax-appshell__item[data-on="true"] { background: var(--accent); color: var(--accent-fg); }
.ax-appshell__foot { margin-top: auto; padding: 12px; border-top: 1px solid var(--border-default); }
.ax-appshell__main { display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
.ax-appshell__top { display: flex; align-items: center; gap: 12px; height: 56px; flex: none; padding: 0 22px; border-bottom: 1px solid var(--border-default); }
.ax-appshell__crumb { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--text-muted); }
.ax-appshell__crumb b { color: var(--text-body); font-weight: var(--weight-medium); }
.ax-appshell__sp { flex: 1; }
.ax-appshell__body { flex: 1; padding: 22px; overflow-y: auto; }
.ax-appshell__burger { display: none; }
.ax-appshell__scrim { display: none; }
@media (max-width: 860px) {
  .ax-appshell { grid-template-columns: 1fr; }
  .ax-appshell__sb { position: fixed; top: 0; left: 0; bottom: 0; width: 264px; z-index: 40;
    transform: translateX(-100%); transition: transform var(--dur-2) var(--ease-out); box-shadow: var(--shadow-3); }
  .ax-appshell__sb[data-open="true"] { transform: none; }
  .ax-appshell__scrim { display: block; position: fixed; inset: 0; z-index: 39; background: var(--bg-overlay);
    opacity: 0; pointer-events: none; transition: opacity var(--dur-2) var(--ease-out); }
  .ax-appshell__scrim[data-open="true"] { opacity: 1; pointer-events: auto; }
  .ax-appshell__burger { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px;
    flex: none; margin-left: -6px; border: 1px solid var(--border-default); border-radius: var(--radius-2);
    background: none; color: var(--text-muted); cursor: pointer; }
  .ax-appshell__burger:hover { color: var(--text-body); border-color: var(--border-strong); }
  .ax-appshell__top { padding: 0 16px; }
  .ax-appshell__body { padding: 18px 16px; }
}
`;

if (typeof document !== "undefined" && !document.getElementById("ax-appshell-css")) {
  const s = document.createElement("style");
  s.id = "ax-appshell-css";
  s.textContent = AX_APPSHELL_CSS;
  document.head.appendChild(s);
}

export function AppShell({
  brand,
  nav = [],
  navLabel = "Navigate",
  activeId,
  onNavigate,
  account,
  crumb,
  actions,
  children,
}) {
  const [internal, setInternal] = useState(nav[0] && nav[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = activeId !== undefined ? activeId : internal;
  const go = (id) => {
    if (onNavigate) onNavigate(id);
    else setInternal(id);
    setMenuOpen(false);
  };

  return (
    <div className="ax-appshell">
      <div
        className="ax-appshell__scrim"
        data-open={menuOpen}
        onClick={() => setMenuOpen(false)}
      ></div>
      <aside className="ax-appshell__sb" data-open={menuOpen}>
        <div className="ax-appshell__brand">
          {brand || <BrandMark size={20} wordmark blink={false} />}
        </div>
        {nav.length ? (
          <React.Fragment>
            <div className="ax-appshell__group">
              <span className="ax-label">{navLabel}</span>
            </div>
            <nav className="ax-appshell__nav">
              {nav.map((n) => (
                <button
                  key={n.id}
                  className="ax-appshell__item"
                  data-on={active === n.id}
                  onClick={() => go(n.id)}
                >
                  {n.icon || null}
                  {n.label}
                </button>
              ))}
            </nav>
          </React.Fragment>
        ) : null}
        {account ? <div className="ax-appshell__foot">{account}</div> : null}
      </aside>

      <main className="ax-appshell__main">
        <header className="ax-appshell__top">
          <button
            className="ax-appshell__burger"
            aria-label="Menu"
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" size={17} />
          </button>
          {crumb ? <span className="ax-appshell__crumb">{crumb}</span> : null}
          <span className="ax-appshell__sp"></span>
          {actions}
        </header>
        <div className="ax-appshell__body">{children}</div>
      </main>
    </div>
  );
}
