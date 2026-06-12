import React, { useState } from "react";
import { BrandMark } from "../utilities/BrandMark.jsx";
import { Icon } from "../utilities/Icon.jsx";

// DocsLayout — three-pane documentation frame: left section nav, centered
// article, right on-this-page TOC. Article goes in `children`; nav + TOC are
// data-driven and controlled-or-self-managed.
const AX_DOCS_CSS = `
.ax-docs { display: grid; grid-template-columns: 252px minmax(0,1fr) 220px; height: 100%; background: var(--surface-page); overflow: hidden; }
.ax-docs__nav { border-right: 1px solid var(--border-default); background: var(--surface-panel); overflow-y: auto; padding: 18px 0 32px; }
.ax-docs__brand { display: flex; align-items: center; gap: 9px; padding: 0 20px 16px; }
.ax-docs__sec { padding: 14px 20px 6px; }
.ax-docs__list { display: flex; flex-direction: column; padding: 0 12px; }
.ax-docs__item { padding: 7px 10px; border-radius: var(--radius-2); font-size: var(--text-sm); color: var(--text-muted); cursor: pointer;
  border: none; background: none; text-align: left; font-family: inherit; transition: background var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out); }
.ax-docs__item:hover { background: var(--bg-3); color: var(--text-body); }
.ax-docs__item[data-on="true"] { color: var(--text-body); font-weight: var(--weight-medium); background: var(--bg-3); }
.ax-docs__art { overflow-y: auto; }
.ax-docs__artinner { max-width: 680px; margin: 0 auto; padding: 56px 40px 96px; }
.ax-docs__toc { border-left: 1px solid var(--border-default); padding: 56px 22px; overflow-y: auto; }
.ax-docs__tochead { margin-bottom: 14px; }
.ax-docs__toclist { display: flex; flex-direction: column; gap: 9px; border-left: 1px solid var(--border-default); }
.ax-docs__toclink { padding-left: 14px; margin-left: -1px; font-size: var(--text-sm); color: var(--text-muted); cursor: pointer; border-left: 2px solid transparent; }
.ax-docs__toclink[data-on="true"] { color: var(--text-body); border-left-color: var(--accent); }
.ax-docs__mtop { display: none; }
.ax-docs__burger { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; flex: none;
  border: 1px solid var(--border-default); border-radius: var(--radius-2); background: none; color: var(--text-muted); cursor: pointer; }
.ax-docs__burger:hover { color: var(--text-body); border-color: var(--border-strong); }
.ax-docs__scrim { display: none; }
@media (max-width: 1080px) { .ax-docs { grid-template-columns: 252px 1fr; } .ax-docs__toc { display: none; } }
@media (max-width: 760px) {
  .ax-docs { grid-template-columns: 1fr; grid-template-rows: auto 1fr; }
  .ax-docs__mtop { display: flex; align-items: center; gap: 12px; height: 52px; flex: none; padding: 0 16px;
    border-bottom: 1px solid var(--border-default); background: var(--surface-panel); grid-column: 1; }
  .ax-docs__nav { position: fixed; top: 0; left: 0; bottom: 0; width: 264px; z-index: 40;
    transform: translateX(-100%); transition: transform var(--dur-2) var(--ease-out); box-shadow: var(--shadow-3); }
  .ax-docs__nav[data-open="true"] { transform: none; }
  .ax-docs__scrim { display: block; position: fixed; inset: 0; z-index: 39; background: var(--bg-overlay);
    opacity: 0; pointer-events: none; transition: opacity var(--dur-2) var(--ease-out); }
  .ax-docs__scrim[data-open="true"] { opacity: 1; pointer-events: auto; }
  .ax-docs__artinner { padding: 32px 18px 72px; }
}
`;

if (typeof document !== "undefined" && !document.getElementById("ax-docs-css")) {
  const s = document.createElement("style");
  s.id = "ax-docs-css";
  s.textContent = AX_DOCS_CSS;
  document.head.appendChild(s);
}

export function DocsLayout({
  brand,
  sections = [],
  activeItem,
  onNavigate,
  toc = [],
  activeToc,
  onTocChange,
  tocLabel = "On this page",
  children,
}) {
  const [navInt, setNavInt] = useState(activeItem);
  const [tocInt, setTocInt] = useState(activeToc || toc[0]);
  const [navOpen, setNavOpen] = useState(false);
  const active = activeItem !== undefined ? activeItem : navInt;
  const tocActive = activeToc !== undefined ? activeToc : tocInt;
  const go = (it) => {
    if (onNavigate) onNavigate(it);
    else setNavInt(it);
    setNavOpen(false);
  };
  const goToc = (t) => {
    if (onTocChange) onTocChange(t);
    else setTocInt(t);
  };

  return (
    <div className="ax-docs">
      <header className="ax-docs__mtop">
        <button className="ax-docs__burger" aria-label="Menu" onClick={() => setNavOpen(true)}>
          <Icon name="menu" size={17} />
        </button>
        {brand || <BrandMark size={18} wordmark blink={false} />}
      </header>
      <div className="ax-docs__scrim" data-open={navOpen} onClick={() => setNavOpen(false)}></div>
      <aside className="ax-docs__nav" data-open={navOpen}>
        <div className="ax-docs__brand">
          {brand || <BrandMark size={20} wordmark blink={false} />}
        </div>
        {sections.map((s) => (
          <div key={s.title}>
            <div className="ax-docs__sec">
              <span className="ax-label">{s.title}</span>
            </div>
            <div className="ax-docs__list">
              {s.items.map((it) => (
                <button
                  key={it}
                  className="ax-docs__item"
                  data-on={active === it}
                  onClick={() => go(it)}
                >
                  {it}
                </button>
              ))}
            </div>
          </div>
        ))}
      </aside>

      <article className="ax-docs__art">
        <div className="ax-docs__artinner">{children}</div>
      </article>

      <aside className="ax-docs__toc">
        <div className="ax-docs__tochead">
          <span className="ax-label">{tocLabel}</span>
        </div>
        <div className="ax-docs__toclist">
          {toc.map((t) => (
            <span
              key={t}
              className="ax-docs__toclink"
              data-on={tocActive === t}
              onClick={() => goToc(t)}
            >
              {t}
            </span>
          ))}
        </div>
      </aside>
    </div>
  );
}
