import React from "react";
import { Input } from "./Input.jsx"; // ensures shared .ax-field CSS is injected

const AX_SELECT_CSS = `
.ax-select-wrap { position: relative; display: flex; }
@layer ax-base {
  .ax-select {
    appearance: none; height: 36px; padding: 0 32px 0 12px; width: 100%;
    background: var(--surface-card); color: var(--text-body);
    border: 1px solid var(--border-default); border-radius: var(--radius-2);
    font-family: var(--font-body); font-size: var(--text-sm); cursor: pointer;
    transition: border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-1) var(--ease-out);
  }
}
@layer ax-hover {
  .ax-select:hover { border-color: var(--border-strong); }
}
@layer ax-focus {
  .ax-select:focus { outline: none; border-color: var(--fg-2); box-shadow: 0 0 0 3px var(--focus-soft); }
}
@layer ax-disabled {
  .ax-select:disabled { opacity: 0.4; cursor: not-allowed; border-color: var(--border-default); }
}
.ax-select-wrap::after {
  content: ""; position: absolute; right: 12px; top: 50%;
  width: 7px; height: 7px; pointer-events: none;
  border-right: 1.5px solid var(--text-faint);
  border-bottom: 1.5px solid var(--text-faint);
  transform: translateY(-70%) rotate(45deg);
}
`;

if (typeof document !== "undefined" && !document.getElementById("ax-select-css")) {
  const s = document.createElement("style");
  s.id = "ax-select-css";
  s.textContent = AX_SELECT_CSS;
  document.head.appendChild(s);
}

export function Select({ label, options = [], className = "", ...rest }) {
  return (
    <label className="ax-field">
      {label ? <span className="ax-field__label">{label}</span> : null}
      <span className="ax-select-wrap">
        <select className={["ax-select", className].filter(Boolean).join(" ")} {...rest}>
          {options.map((opt) => {
            const o = typeof opt === "string" ? { value: opt, label: opt } : opt;
            return <option key={o.value} value={o.value}>{o.label}</option>;
          })}
        </select>
      </span>
    </label>
  );
}
