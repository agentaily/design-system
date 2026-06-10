import React from "react";

const AX_SWITCH_CSS = `
.ax-switch { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; }
.ax-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.ax-switch__track {
  width: 36px; height: 20px; flex: none; position: relative;
  background: var(--surface-raised); border: 1px solid var(--border-strong);
  border-radius: var(--radius-1);
  transition: background var(--dur-2) var(--ease-out), border-color var(--dur-2) var(--ease-out);
}
.ax-switch__thumb {
  position: absolute; top: 2px; left: 2px; width: 14px; height: 14px;
  background: var(--text-muted); border-radius: 1px;
  transition: transform var(--dur-2) var(--ease-out), background var(--dur-2) var(--ease-out);
}
.ax-switch input:checked + .ax-switch__track { background: var(--accent); border-color: var(--accent); }
.ax-switch input:checked + .ax-switch__track .ax-switch__thumb { transform: translateX(16px); background: var(--accent-fg); }
.ax-switch input:focus-visible + .ax-switch__track { box-shadow: var(--ring); }
.ax-switch input:disabled + .ax-switch__track { opacity: 0.4; }
.ax-switch__label { font-size: var(--text-sm); color: var(--text-body); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-switch-css")) {
  const s = document.createElement("style");
  s.id = "ax-switch-css";
  s.textContent = AX_SWITCH_CSS;
  document.head.appendChild(s);
}

export function Switch({ label, className = "", ...rest }) {
  return (
    <label className={["ax-switch", className].filter(Boolean).join(" ")}>
      <input type="checkbox" role="switch" {...rest} />
      <span className="ax-switch__track"><span className="ax-switch__thumb"></span></span>
      {label ? <span className="ax-switch__label">{label}</span> : null}
    </label>
  );
}
