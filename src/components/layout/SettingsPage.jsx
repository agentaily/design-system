import React, { useState } from "react";
import { BrandMark } from "../utilities/BrandMark.jsx";

// SettingsPage — centered single-column settings frame: sticky bar (brand +
// actions), heading, optional tabs, and section cards in `children`.
const AX_SPAGE_CSS = `
.ax-spage { height: 100%; overflow-y: auto; background: var(--surface-page); }
.ax-spage__bar { position: sticky; top: 0; z-index: 2; display: flex; align-items: center; gap: 12px; height: 56px; padding: 0 22px;
  border-bottom: 1px solid var(--border-default); background: var(--bg-overlay); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
.ax-spage__sp { flex: 1; }
.ax-spage__crumb { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: var(--text-sm); color: var(--text-faint); }
.ax-spage__crumb::before { content: "/"; color: var(--text-faint); opacity: 0.6; }
.ax-spage__col { max-width: 640px; margin: 0 auto; padding: 48px 28px 96px; }
.ax-spage__h { margin: 0; font-family: var(--font-display); font-size: var(--text-2xl); font-weight: var(--weight-bold); letter-spacing: var(--tracking-tight); color: var(--text-body); }
.ax-spage__sub { margin: 10px 0 0; font-size: var(--text-md); color: var(--text-muted); }
.ax-spage__tabs { display: flex; gap: 4px; margin: 26px 0 4px; border-bottom: 1px solid var(--border-default); }
.ax-spage__tab { padding: 9px 12px; font-size: var(--text-sm); color: var(--text-muted); cursor: pointer; border: none; background: none;
  font-family: inherit; border-bottom: 2px solid transparent; margin-bottom: -1px; }
.ax-spage__tab:hover { color: var(--text-body); }
.ax-spage__tab[data-on="true"] { color: var(--text-body); border-bottom-color: var(--accent); }
.ax-spage__card { border: 1px solid var(--border-default); border-radius: var(--radius-3); background: var(--surface-card); padding: 22px; margin-top: 22px; }
.ax-spage__cardh { margin: 0 0 4px; font-family: var(--font-display); font-size: var(--text-lg); font-weight: var(--weight-medium); color: var(--text-body); }
.ax-spage__cardd { margin: 0 0 18px; font-size: var(--text-sm); color: var(--text-muted); }
@media (max-width: 600px) {
  .ax-spage__bar { padding: 0 16px; }
  .ax-spage__col { padding: 32px 18px 72px; }
  .ax-spage__tabs { overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
  .ax-spage__tabs::-webkit-scrollbar { display: none; }
  .ax-spage__tab { white-space: nowrap; flex: none; }
}
`;

if (typeof document !== "undefined" && !document.getElementById("ax-spage-css")) {
  const s = document.createElement("style");
  s.id = "ax-spage-css";
  s.textContent = AX_SPAGE_CSS;
  document.head.appendChild(s);
}

export function SettingsPage({
  brand,
  word = "settings",
  title = "Settings",
  subtitle,
  tabs = [],
  activeTab,
  onTabChange,
  actions,
  children,
}) {
  const [internal, setInternal] = useState(activeTab || (tabs[0] && (tabs[0].id || tabs[0])));
  const active = activeTab !== undefined ? activeTab : internal;
  const go = (id) => {
    if (onTabChange) onTabChange(id);
    else setInternal(id);
  };

  return (
    <div className="ax-spage">
      <header className="ax-spage__bar">
        {brand || <BrandMark size={18} wordmark blink={false} />}
        {word ? <span className="ax-spage__crumb">{word}</span> : null}
        <span className="ax-spage__sp"></span>
        {actions}
      </header>

      <div className="ax-spage__col">
        <h1 className="ax-spage__h">{title}</h1>
        {subtitle ? <p className="ax-spage__sub">{subtitle}</p> : null}

        {tabs.length ? (
          <div className="ax-spage__tabs">
            {tabs.map((t) => {
              const id = t.id || t;
              const label = t.label || t;
              return (
                <button
                  key={id}
                  className="ax-spage__tab"
                  data-on={active === id}
                  onClick={() => go(id)}
                >
                  {label}
                </button>
              );
            })}
          </div>
        ) : null}

        {children}
      </div>
    </div>
  );
}

// convenience section card
function SettingsCard({ title, description, children }) {
  return (
    <div className="ax-spage__card">
      {title ? <h2 className="ax-spage__cardh">{title}</h2> : null}
      {description ? <p className="ax-spage__cardd">{description}</p> : null}
      {children}
    </div>
  );
}
SettingsPage.Card = SettingsCard;
