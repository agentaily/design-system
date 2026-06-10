import React from "react";

const AX_RADIO_CSS = `
.ax-radiogroup { display: flex; flex-direction: column; gap: 10px; }
.ax-radiogroup--row { flex-direction: row; gap: 18px; flex-wrap: wrap; }
.ax-radio { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
.ax-radio input { position: absolute; opacity: 0; width: 0; height: 0; }
.ax-radio__dot {
  width: 16px; height: 16px; flex: none; position: relative;
  background: var(--surface-card); border: 1px solid var(--border-strong);
  border-radius: var(--radius-1);
  transition: border-color var(--dur-1) var(--ease-out);
}
.ax-radio__dot::after {
  content: ""; position: absolute; inset: 3px; background: var(--accent);
  border-radius: 1px; opacity: 0; transform: scale(0.4);
  transition: opacity var(--dur-1) var(--ease-out), transform var(--dur-1) var(--ease-out);
}
.ax-radio input:checked + .ax-radio__dot { border-color: var(--accent); }
.ax-radio input:checked + .ax-radio__dot::after { opacity: 1; transform: scale(1); }
.ax-radio input:focus-visible + .ax-radio__dot { box-shadow: var(--ring); }
.ax-radio input:disabled + .ax-radio__dot { opacity: 0.4; }
.ax-radio__label { font-size: var(--text-sm); color: var(--text-body); }
.ax-radio__desc { display: block; font-size: var(--text-xs); color: var(--text-faint); margin-top: 1px; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-radio-css")) {
  const s = document.createElement("style");
  s.id = "ax-radio-css";
  s.textContent = AX_RADIO_CSS;
  document.head.appendChild(s);
}

export function RadioGroup({ name, value, options = [], onChange, row = false, className = "", ...rest }) {
  return (
    <div role="radiogroup" className={["ax-radiogroup", row ? "ax-radiogroup--row" : "", className].filter(Boolean).join(" ")} {...rest}>
      {options.map((opt) => {
        const o = typeof opt === "string" ? { value: opt, label: opt } : opt;
        return (
          <label className="ax-radio" key={o.value}>
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              disabled={o.disabled}
              onChange={() => onChange && onChange(o.value)}
            />
            <span className="ax-radio__dot"></span>
            <span className="ax-radio__label">
              {o.label}
              {o.description ? <span className="ax-radio__desc">{o.description}</span> : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}
