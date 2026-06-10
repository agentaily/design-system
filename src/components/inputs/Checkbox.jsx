import React from "react";

const AX_CHECKBOX_CSS = `
.ax-check { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
.ax-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.ax-check__box {
  width: 16px; height: 16px; flex: none; position: relative;
  background: var(--surface-card); border: 1px solid var(--border-strong);
  border-radius: var(--radius-1);
  transition: background var(--dur-1) var(--ease-out), border-color var(--dur-1) var(--ease-out);
}
.ax-check__box::after {
  content: ""; position: absolute; left: 4.5px; top: 1.5px;
  width: 4px; height: 8px; opacity: 0;
  border-right: 2px solid var(--accent-fg);
  border-bottom: 2px solid var(--accent-fg);
  transform: rotate(45deg);
  transition: opacity var(--dur-1) var(--ease-out);
}
.ax-check input:checked + .ax-check__box { background: var(--accent); border-color: var(--accent); }
.ax-check input:checked + .ax-check__box::after { opacity: 1; }
.ax-check input:focus-visible + .ax-check__box { box-shadow: var(--ring); }
.ax-check input:disabled + .ax-check__box { opacity: 0.4; }
.ax-check__label { font-size: var(--text-sm); color: var(--text-body); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-checkbox-css")) {
  const s = document.createElement("style");
  s.id = "ax-checkbox-css";
  s.textContent = AX_CHECKBOX_CSS;
  document.head.appendChild(s);
}

export function Checkbox({ label, className = "", ...rest }) {
  return (
    <label className={["ax-check", className].filter(Boolean).join(" ")}>
      <input type="checkbox" {...rest} />
      <span className="ax-check__box"></span>
      {label ? <span className="ax-check__label">{label}</span> : null}
    </label>
  );
}
