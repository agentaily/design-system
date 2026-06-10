import React, { useRef, useState, useEffect } from "react";

const AX_INPUTGROUP_CSS = `
.ax-inputgroup { display: flex; align-items: stretch; border: 1px solid var(--border-default); border-radius: var(--radius-2); background: var(--surface-card); overflow: hidden; transition: border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-1) var(--ease-out); }
.ax-inputgroup:focus-within { border-color: var(--fg-2); box-shadow: 0 0 0 3px var(--focus-soft); }
.ax-inputgroup__input { flex: 1; min-width: 0; height: 36px; padding: 0 12px; background: none; border: none; outline: none; color: var(--text-body); font-family: var(--font-body); font-size: var(--text-sm); }
.ax-inputgroup__input::placeholder { color: var(--text-faint); }
.ax-inputgroup__addon { display: inline-flex; align-items: center; gap: 6px; padding: 0 12px; color: var(--text-faint); font-family: var(--font-mono); font-size: var(--text-sm); background: var(--surface-raised); white-space: nowrap; }
.ax-inputgroup__addon--start { border-right: 1px solid var(--border-default); }
.ax-inputgroup__addon--end { border-left: 1px solid var(--border-default); }
.ax-inputgroup__addon svg { width: 15px; height: 15px; }
.ax-inputgroup__btn { display: inline-flex; align-items: center; gap: 6px; padding: 0 12px; cursor: pointer; border: none; background: var(--accent); color: var(--accent-fg); font-family: var(--font-body); font-size: var(--text-sm); font-weight: var(--weight-medium); }
.ax-inputgroup__btn:hover { background: var(--accent-hover); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-inputgroup-css")) {
  const s = document.createElement("style");
  s.id = "ax-inputgroup-css";
  s.textContent = AX_INPUTGROUP_CSS;
  document.head.appendChild(s);
}

export function InputGroup({ prefix, suffix, button, onButtonClick, className = "", inputProps = {}, ...rest }) {
  return (
    <div className={["ax-inputgroup", className].filter(Boolean).join(" ")} {...rest}>
      {prefix ? <span className="ax-inputgroup__addon ax-inputgroup__addon--start">{prefix}</span> : null}
      <input className="ax-inputgroup__input" {...inputProps} />
      {suffix ? <span className="ax-inputgroup__addon ax-inputgroup__addon--end">{suffix}</span> : null}
      {button ? <button type="button" className="ax-inputgroup__btn" onClick={onButtonClick}>{button}</button> : null}
    </div>
  );
}
