import React, { useState } from "react";
import { Card } from "../display/Card.jsx";
import { Icon } from "../utilities/Icon.jsx";
import { StatusPill } from "../display/StatusPill.jsx";
import { TestRow } from "./TestRow.jsx";

// ConnectionCard — the shared shell for a service connection card (L3 organism),
// built on the base <Card> primitive. It owns ONE source of the connection-card
// anatomy that DeepSeekCard (and any future connector) compose:
//
//   ┌ header  ── icon · title · summary(collapsed) ·········· status · ⌄ ┐
//   │ body    ── the connector's own fields (children)                   │
//   └ TestRow ── test-connection footer                                  ┘
//
// It is PURE-DISPLAY + presentational-only state: the single bit of local state
// is the collapse toggle (connected cards start collapsed to the header row;
// collapsed → whole row expands, expanded → the chevron button collapses). All
// connection data/status is the caller's. Outer surface (bg/border/radius) comes
// from <Card padding="none">; this component adds overflow + status tint + the
// header/body/footer bands.
const AX_CONNCARD_CSS = `
.ax-conncard { overflow: hidden; transition: border-color var(--dur-2) var(--ease-out); }
.ax-conncard.is-ok { border-color: rgba(62, 207, 142, 0.4); }
.ax-conncard.is-error { border-color: rgba(229, 72, 77, 0.4); }
/* header row (not clickable as a whole when expanded); a chevron button toggles */
.ax-conncard__head { display: flex; align-items: center; gap: 12px; width: 100%; padding: 16px 22px; }
.ax-conncard__icon { flex: none; width: 28px; height: 28px; border-radius: var(--radius-2);
  border: 1px solid var(--border-strong); background: var(--surface-raised); color: var(--text-body);
  display: flex; align-items: center; justify-content: center; }
.ax-conncard__htext { flex: 1 1 auto; min-width: 0; display: flex; align-items: baseline; gap: 8px; }
.ax-conncard__title { flex: none; font-family: var(--font-display); font-size: var(--text-lg); font-weight: 500;
  letter-spacing: var(--tracking-tight); line-height: var(--leading-tight); color: var(--text-body); }
.ax-conncard__sub { flex: 0 1 auto; min-width: 0; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ax-conncard__hright { margin-left: auto; display: flex; align-items: center; gap: 8px; flex: none; }
.ax-conncard__toggle { flex: none; appearance: none; border: none; background: none; cursor: pointer; color: var(--text-faint);
  width: 30px; height: 30px; border-radius: var(--radius-2); display: inline-flex; align-items: center; justify-content: center;
  transition: color var(--dur-1) var(--ease-out), background var(--dur-1) var(--ease-out); }
.ax-conncard__toggle:hover { color: var(--text-body); background: var(--surface-raised); }
.ax-conncard__toggle svg { transition: transform var(--dur-2) var(--ease-out); }
.ax-conncard__toggle[data-open="true"] svg { transform: rotate(180deg); }
.ax-conncard__head--clickable { border: none; background: none; font: inherit; text-align: left; cursor: pointer; transition: background var(--dur-1) var(--ease-out); }
.ax-conncard__head--clickable:hover { background: var(--surface-raised); }
.ax-conncard__toggle--ind { pointer-events: none; }
.ax-conncard__desc { font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-snug); margin: 0; max-width: 58ch; }
.ax-conncard__body { padding: 2px 22px 20px; display: flex; flex-direction: column; gap: 18px; }
.ax-conncard__row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 560px) { .ax-conncard__row2 { grid-template-columns: 1fr; } .ax-conncard__htext { flex-direction: column; align-items: stretch; gap: 2px; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-conncard-css")) {
  const s = document.createElement("style");
  s.id = "ax-conncard-css";
  s.textContent = AX_CONNCARD_CSS;
  document.head.appendChild(s);
}

// Self-consistent English baseline for this shell's own chrome. DS is
// locale-agnostic — pass `copy` (any subset) to localize. The footer TestRow's
// strings are localized separately via `testCopy` (forwarded as its `copy`).
const DEFAULT_COPY = {
  connected: "Connected",
  disconnected: "Not connected",
  collapse: "Collapse",
};

export function ConnectionCard({
  icon,
  title,
  desc,
  status = "idle",
  result,
  summary,
  onTest,
  testDisabled = false,
  idleHint,
  showTest = true,
  collapsible = true,
  expanded,
  onExpandedChange,
  copy,
  testCopy,
  children,
}) {
  const c = { ...DEFAULT_COPY, ...copy };
  const [exp, setExp] = useState(undefined);
  const open = !collapsible
    ? true
    : expanded !== undefined
      ? expanded
      : exp !== undefined
        ? exp
        : status !== "ok";
  const setOpen = (v) => {
    if (expanded !== undefined) {
      onExpandedChange && onExpandedChange(v);
    } else setExp(v);
  };

  const tint = status === "ok" ? " is-ok" : status === "error" ? " is-error" : "";
  const summary_ =
    summary != null ? summary : result || (status === "ok" ? c.connected : c.disconnected);
  const iconNode = typeof icon === "string" ? <Icon name={icon} size={16} /> : icon;

  const Head = collapsible && !open ? "button" : "div";
  const headClickable = collapsible && !open;

  return (
    <Card padding="none" className={"ax-conncard" + tint}>
      <Head
        type={headClickable ? "button" : undefined}
        className={"ax-conncard__head" + (headClickable ? " ax-conncard__head--clickable" : "")}
        onClick={headClickable ? () => setOpen(true) : undefined}
        aria-expanded={headClickable ? false : undefined}
      >
        <div className="ax-conncard__icon">{iconNode}</div>
        <div className="ax-conncard__htext">
          <span className="ax-conncard__title">{title}</span>
          {!open ? <span className="ax-conncard__sub">{summary_}</span> : null}
        </div>
        <div className="ax-conncard__hright">
          <StatusPill status={status} />
          {collapsible && open ? (
            <button
              type="button"
              className="ax-conncard__toggle"
              data-open="true"
              aria-label={c.collapse}
              onClick={() => setOpen(false)}
            >
              <Icon name="chevronDown" size={16} />
            </button>
          ) : collapsible ? (
            <span
              className="ax-conncard__toggle ax-conncard__toggle--ind"
              data-open="false"
              aria-hidden="true"
            >
              <Icon name="chevronDown" size={16} />
            </span>
          ) : null}
        </div>
      </Head>

      {open ? (
        <React.Fragment>
          <div className="ax-conncard__body">
            {desc ? <p className="ax-conncard__desc">{desc}</p> : null}
            {children}
          </div>
          {showTest ? (
            <TestRow
              status={status}
              result={result}
              onTest={onTest}
              disabled={testDisabled}
              idleHint={idleHint}
              copy={testCopy}
            />
          ) : null}
        </React.Fragment>
      ) : null}
    </Card>
  );
}
