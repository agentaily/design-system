import React, { useEffect } from "react";
import { BrandMark } from "../utilities/BrandMark.jsx";
import { Icon } from "../utilities/Icon.jsx";

// PanelSheet — a full-screen "rises up over everything" panel shell (L4 page
// shell). It is NOT an edge drawer (that's <Sheet>, side/bottom ~420px over a
// blurred scrim) and NOT an in-flow page (a settings frame that lives inside an
// AppShell region, never floats). PanelSheet covers the whole viewport, fades
// the scrim, rises the panel, and gives you three horizontally-ALIGNED bands:
//
//   ┌ bar    ── brand · breadcrumb ······················ actions · ✕ ┐  ← header
//   │ body   ── scrolls; content capped to the same column            │
//   └ foot   ── status ································ Cancel · Save  ┘  ← sticky footer
//
// header / body / footer share one gutter + max-width (`--ax-psheet-gutter` /
// `--ax-psheet-max`), so the footer's actions line up with the close button and
// the footer's status lines up with the brand — the standard dialog anatomy
// (full-bleed bands, column-aligned content). Esc closes. role="dialog".
//
// SINGLE SOURCE of the overlay-shell CSS — downstream code that copied
// settings.css's `.s-overlay / .s-modal / s-rise / s-fade / .s-modal__bar /
// .s-modal__body / .s-wrap` should delete those copies and mount <PanelSheet>.
// Canonical namespace: `.ax-psheet*`.
const AX_PSHEET_CSS = `
.ax-psheet-overlay { position: fixed; inset: 0; z-index: 100; display: flex;
  animation: ax-psheet-fade var(--dur-2) var(--ease-out) both; }
.ax-psheet { position: relative; flex: 1; display: flex; flex-direction: column; min-height: 0;
  background: var(--surface-page); animation: ax-psheet-rise var(--dur-3) var(--ease-out) both;
  --ax-psheet-gutter: 24px; --ax-psheet-max: 768px; --_imax: var(--ax-psheet-max); }
.ax-psheet[data-wrap="false"] { --_imax: none; }
@keyframes ax-psheet-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes ax-psheet-rise { from { opacity: 0; transform: translateY(10px) scale(0.994); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .ax-psheet-overlay, .ax-psheet { animation: none; } }

/* full-bleed bands (border + bg span edge to edge) */
.ax-psheet__bar { flex: none; height: 52px; border-bottom: 1px solid var(--border-default); background: var(--surface-panel); }
.ax-psheet__foot { flex: none; border-top: 1px solid var(--border-default); background: var(--surface-panel); }
.ax-psheet__body { flex: 1; overflow-y: auto; min-height: 0; }
.ax-psheet[data-bodyscroll="false"] .ax-psheet__body { overflow: hidden; }

/* the three inners share ONE column → header / body / footer align */
.ax-psheet__bar-inner, .ax-psheet__foot-inner, .ax-psheet__wrap {
  width: 100%; max-width: var(--_imax); margin-inline: auto; }
.ax-psheet__bar-inner { height: 100%; display: flex; align-items: center; gap: 14px; padding-inline: var(--ax-psheet-gutter); }
.ax-psheet[data-bar="full"] .ax-psheet__bar-inner { max-width: none; }
.ax-psheet__foot-inner { display: flex; align-items: center; gap: 16px; padding: 12px var(--ax-psheet-gutter); }
.ax-psheet__wrap { padding: 40px var(--ax-psheet-gutter) 48px; }

.ax-psheet__brand { display: flex; align-items: center; gap: 10px; min-width: 0; }
.ax-psheet__div { color: var(--text-faint); opacity: 0.7; }
.ax-psheet__crumb { font-family: var(--font-mono); font-size: 13px; color: var(--text-body);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ax-psheet__actions { margin-left: auto; display: flex; align-items: center; gap: 10px; flex: none; }
.ax-psheet__close { appearance: none; background: none; border: none; cursor: pointer; flex: none;
  width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;
  color: var(--text-faint); border-radius: var(--radius-2);
  transition: color var(--dur-1) var(--ease-out), background var(--dur-1) var(--ease-out); }
.ax-psheet__close:hover { color: var(--text-body); background: var(--surface-raised); }

/* footer layout helpers: a left status that fills, actions pinned right */
.ax-psheet__foot-status { flex: 1; min-width: 0; display: flex; align-items: center; gap: 9px;
  font-size: var(--text-sm); color: var(--text-muted); }
.ax-psheet__foot-status svg { flex: none; }
.ax-psheet__foot-actions { margin-left: auto; display: flex; align-items: center; gap: 8px; flex: none; }

@media (max-width: 520px) {
  .ax-psheet { --ax-psheet-gutter: 16px; }
  .ax-psheet__wrap { padding-top: 24px; padding-bottom: 36px; }
  .ax-psheet__actions { gap: 6px; }
}
`;

if (typeof document !== "undefined" && !document.getElementById("ax-psheet-css")) {
  const s = document.createElement("style");
  s.id = "ax-psheet-css";
  s.textContent = AX_PSHEET_CSS;
  document.head.appendChild(s);
}

export function PanelSheet({
  open = true,
  brand,
  word = "agentaily",
  crumb,
  actions,
  footer,
  onClose,
  wrap = true,
  barFullWidth = false,
  bodyScroll = true,
  maxWidth,
  gutter,
  closeOnEsc = true,
  label,
  className = "",
  style,
  children,
  ...rest
}) {
  useEffect(() => {
    if (!open || !closeOnEsc || !onClose) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, closeOnEsc, onClose]);

  if (!open) return null;

  const ariaLabel = label || (typeof crumb === "string" ? crumb : "Panel");
  const sheetStyle = {
    ...(maxWidth !== undefined
      ? { "--ax-psheet-max": typeof maxWidth === "number" ? maxWidth + "px" : maxWidth }
      : null),
    ...(gutter !== undefined
      ? { "--ax-psheet-gutter": typeof gutter === "number" ? gutter + "px" : gutter }
      : null),
    ...style,
  };

  return (
    <div className="ax-psheet-overlay">
      <section
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        data-wrap={wrap ? "true" : "false"}
        data-bar={barFullWidth ? "full" : "column"}
        data-bodyscroll={bodyScroll ? "true" : "false"}
        className={["ax-psheet", className].filter(Boolean).join(" ")}
        style={sheetStyle}
        {...rest}
      >
        <header className="ax-psheet__bar">
          <div className="ax-psheet__bar-inner">
            <div className="ax-psheet__brand">
              {brand || <BrandMark size={18} wordmark={Boolean(word)} blink={false} />}
              {crumb ? (
                <React.Fragment>
                  <span className="ax-psheet__div" aria-hidden="true">
                    /
                  </span>
                  <span className="ax-psheet__crumb">{crumb}</span>
                </React.Fragment>
              ) : null}
            </div>
            {actions || onClose ? (
              <div className="ax-psheet__actions">
                {actions}
                {onClose ? (
                  <button className="ax-psheet__close" aria-label="关闭" onClick={onClose}>
                    <Icon name="x" size={17} />
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </header>

        <div className="ax-psheet__body">
          {wrap ? <div className="ax-psheet__wrap">{children}</div> : children}
        </div>

        {footer ? (
          <div className="ax-psheet__foot">
            <div className="ax-psheet__foot-inner">{footer}</div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
