import React from "react";
import { Collapsible } from "../display/Collapsible.jsx";
import { Icon } from "../utilities/Icon.jsx";

// HelpSteps — a collapsible "如何获取…" guide: numbered steps + an optional
// external link. Built on the DS Collapsible. Steps may contain <code> spans.
const AX_HELPSTEPS_CSS = `
.s-help { margin-top: 2px; }
.s-help__list { margin: 4px 0 6px; padding: 0; list-style: none; counter-reset: step; display: flex; flex-direction: column; gap: 11px; }
.s-help__item { display: flex; gap: 11px; font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-snug); }
.s-help__num { counter-increment: step; flex: none; width: 19px; height: 19px; border-radius: var(--radius-1);
  border: 1px solid var(--border-strong); font-family: var(--font-mono); font-size: 10px; color: var(--text-faint);
  display: flex; align-items: center; justify-content: center; }
.s-help__num::before { content: counter(step); }
.s-help__item code { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-body);
  background: var(--surface-raised); border: 1px solid var(--border-default); border-radius: var(--radius-1); padding: 1px 5px; }
.s-help__link { display: inline-flex; align-items: center; gap: 6px; font-size: var(--text-sm); color: var(--text-body);
  text-decoration: none; border-bottom: 1px solid var(--border-strong); padding-bottom: 1px; }
.s-help__link:hover { border-color: var(--text-body); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-helpsteps-css")) {
  const s = document.createElement("style");
  s.id = "ax-helpsteps-css";
  s.textContent = AX_HELPSTEPS_CSS;
  document.head.appendChild(s);
}

export function HelpSteps({ title, steps = [], link, defaultOpen = false }) {
  return (
    <div className="s-help">
      <Collapsible label={title} defaultOpen={defaultOpen}>
        <ol className="s-help__list">
          {steps.map((st, i) => (
            <li className="s-help__item" key={i}>
              <span className="s-help__num"></span>
              <span>{st}</span>
            </li>
          ))}
        </ol>
        {link ? (
          <a className="s-help__link" href={link.href} target="_blank" rel="noopener noreferrer">
            <Icon name="external" size={13} />
            {link.label}
          </a>
        ) : null}
      </Collapsible>
    </div>
  );
}
