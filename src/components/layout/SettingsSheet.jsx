import React, { useState } from "react";
import { Icon } from "../utilities/Icon.jsx";
import { PanelSheet } from "./PanelSheet.jsx";

// SettingsSheet — a floating SETTINGS PAGE built on top of <PanelSheet>. It is
// the middle layer in the chain:
//
//   PanelSheet        ← floating layout shell (holds any content)
//     SettingsSheet   ← THIS — a settings page based on PanelSheet
//       <PageSection> / other sections      ← dropped into the content slot
//         <DeepSeekCard/> …                  ← composed-in connection cards
//
// Layout (when `nav` is given): a FIXED full-height left rail + an independently
// SCROLLING content pane. The header (PanelSheet bar) and the rail stay put;
// only the content scrolls. The `footer` is scoped to the CONTENT PANE — its
// left edge stops at the rail, not under it — and is justified (status left /
// actions right). With no `nav`, it falls back to a single column and a
// full-width PanelSheet footer.
//
// Floats over everything via PanelSheet (vs an in-flow settings frame that lives
// inside an AppShell region and never floats).
const AX_SSHEET_CSS = `
.ax-ssheet { display: grid; grid-template-columns: 208px 1fr; height: 100%; min-height: 0; }
.ax-ssheet__nav { border-right: 1px solid var(--border-default); padding: 26px 14px; display: flex; flex-direction: column; gap: 2px; overflow-y: auto; }
.ax-ssheet__navlabel { padding: 0 10px 12px; color: var(--text-faint); }
.ax-ssheet__navitem { display: flex; align-items: center; gap: 10px; width: 100%; padding: 8px 10px; border: none; background: none;
  font: inherit; font-size: var(--text-sm); color: var(--text-muted); text-align: left; cursor: pointer; border-radius: var(--radius-2);
  transition: background var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out); }
.ax-ssheet__navitem:hover { background: var(--surface-raised); color: var(--text-body); }
.ax-ssheet__navitem[data-on="true"] { background: var(--surface-raised); color: var(--text-body); }
.ax-ssheet__navitem svg { flex: none; color: var(--text-faint); }
.ax-ssheet__navitem:hover svg, .ax-ssheet__navitem[data-on="true"] svg { color: var(--text-body); }

/* content pane = scrolling content + a sticky footer that stops at the rail */
.ax-ssheet__main { min-width: 0; min-height: 0; display: flex; flex-direction: column; }
.ax-ssheet__content { flex: 1; min-height: 0; overflow-y: auto; padding: 40px 32px 36px; }
.ax-ssheet__col { max-width: 760px; margin: 0 auto; }
.ax-ssheet__foot { flex: none; border-top: 1px solid var(--border-default); background: var(--surface-panel); }
.ax-ssheet__foot-inner { display: flex; align-items: center; gap: 16px; padding: 12px 32px; }

/* no-nav fallback: a plain centered column scrolled by the PanelSheet body */
.ax-ssheet__solo { max-width: 760px; margin: 0 auto; padding: 40px 28px 48px; }

@media (max-width: 720px) {
  .ax-ssheet { grid-template-columns: 1fr; grid-template-rows: auto 1fr; }
  .ax-ssheet__nav { flex-direction: row; gap: 4px; border-right: none; border-bottom: 1px solid var(--border-default);
    padding: 10px 12px; overflow-x: auto; overflow-y: visible; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
  .ax-ssheet__nav::-webkit-scrollbar { display: none; }
  .ax-ssheet__navlabel { display: none; }
  .ax-ssheet__navitem { flex: none; width: auto; white-space: nowrap; }
  .ax-ssheet__content { padding: 24px 18px 32px; }
  .ax-ssheet__foot-inner { padding: 12px 18px; }
  .ax-ssheet__solo { padding: 24px 16px 36px; }
}
`;

if (typeof document !== "undefined" && !document.getElementById("ax-ssheet-css")) {
  const s = document.createElement("style");
  s.id = "ax-ssheet-css";
  s.textContent = AX_SSHEET_CSS;
  document.head.appendChild(s);
}

export function SettingsSheet({
  open = true,
  onClose,
  crumb = "Settings",
  actions,
  footer,
  nav = [],
  navLabel = "Settings",
  active,
  onNavigate,
  label,
  children,
  ...rest
}) {
  const firstId = nav[0] && (nav[0].id || nav[0]);
  const [internal, setInternal] = useState(active !== undefined ? active : firstId);
  const act = active !== undefined ? active : internal;
  const go = (id) => {
    if (onNavigate) onNavigate(id);
    else setInternal(id);
  };

  const hasNav = nav.length > 0;

  return (
    <PanelSheet
      open={open}
      crumb={crumb}
      label={label || (typeof crumb === "string" ? crumb : "Settings")}
      onClose={onClose}
      actions={actions}
      wrap={false}
      bodyScroll={!hasNav}
      footer={hasNav ? undefined : footer}
      {...rest}
    >
      {hasNav ? (
        <div className="ax-ssheet">
          <nav className="ax-ssheet__nav" aria-label={navLabel}>
            {navLabel ? <div className="ax-label ax-ssheet__navlabel">{navLabel}</div> : null}
            {nav.map((n) => {
              const id = n.id || n;
              const text = n.label || n;
              return (
                <button
                  key={id}
                  className="ax-ssheet__navitem"
                  data-on={act === id}
                  onClick={() => go(id)}
                >
                  {n.icon ? <Icon name={n.icon} size={16} /> : null}
                  {text}
                </button>
              );
            })}
          </nav>
          <div className="ax-ssheet__main">
            <div className="ax-ssheet__content">
              <div className="ax-ssheet__col">{children}</div>
            </div>
            {footer ? (
              <div className="ax-ssheet__foot">
                <div className="ax-ssheet__foot-inner">{footer}</div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="ax-ssheet__solo">{children}</div>
      )}
    </PanelSheet>
  );
}
