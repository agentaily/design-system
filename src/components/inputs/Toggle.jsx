import React from "react";

const AX_TOGGLE_CSS = `
.ax-toggle {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  height: 32px; min-width: 32px; padding: 0 10px; cursor: pointer;
  background: transparent; color: var(--text-muted);
  border: 1px solid var(--border-default); border-radius: var(--radius-2);
  font-family: var(--font-body); font-size: var(--text-sm); font-weight: var(--weight-medium);
  transition: background var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out), border-color var(--dur-1) var(--ease-out);
}
.ax-toggle:hover:not(:disabled) { background: var(--surface-raised); color: var(--text-body); }
.ax-toggle:focus-visible { outline: none; box-shadow: var(--ring); }
.ax-toggle[aria-pressed="true"] { background: var(--accent); color: var(--accent-fg); border-color: var(--accent); }
.ax-toggle:disabled { opacity: 0.4; cursor: not-allowed; }
.ax-toggle svg { width: 15px; height: 15px; }

.ax-togglegroup { display: inline-flex; }
.ax-togglegroup .ax-toggle { border-radius: 0; margin-left: -1px; }
.ax-togglegroup .ax-toggle:first-child { border-radius: var(--radius-2) 0 0 var(--radius-2); margin-left: 0; }
.ax-togglegroup .ax-toggle:last-child { border-radius: 0 var(--radius-2) var(--radius-2) 0; }
.ax-togglegroup .ax-toggle[aria-pressed="true"] { position: relative; z-index: 1; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-toggle-css")) {
  const s = document.createElement("style");
  s.id = "ax-toggle-css";
  s.textContent = AX_TOGGLE_CSS;
  document.head.appendChild(s);
}

export function Toggle({ pressed = false, onPressedChange, children, className = "", disabled, ...rest }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      className={["ax-toggle", className].filter(Boolean).join(" ")}
      onClick={() => onPressedChange && onPressedChange(!pressed)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function ToggleGroup({ value, options = [], onChange, className = "", ...rest }) {
  return (
    <div className={["ax-togglegroup", className].filter(Boolean).join(" ")} role="group" {...rest}>
      {options.map((opt) => {
        const o = typeof opt === "string" ? { value: opt, label: opt } : opt;
        return (
          <Toggle key={o.value} pressed={value === o.value} onPressedChange={() => onChange && onChange(o.value)}>
            {o.icon}{o.label}
          </Toggle>
        );
      })}
    </div>
  );
}
