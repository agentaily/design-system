import React from "react";

const AX_FIELD_CSS = `
.ax-field { display: flex; flex-direction: column; gap: 6px; }
.ax-field__label {
  font-family: var(--font-mono); font-size: var(--text-xs);
  font-weight: var(--weight-medium); letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--text-faint);
}
/* State priority is declared explicitly via layer order, low -> high.
   This frees each state rule from fighting specificity, so no :not() chains
   are needed and source order is no longer load-bearing. Add a new state by
   slotting a layer, not by patching every other rule. */
@layer ax-base, ax-hover, ax-focus, ax-error, ax-disabled;

@layer ax-base {
  .ax-input {
    height: 36px; padding: 0 12px; width: 100%;
    background: var(--surface-card); color: var(--text-body);
    border: 1px solid var(--border-default); border-radius: var(--radius-2);
    font-family: var(--font-body); font-size: var(--text-sm);
    transition: border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-1) var(--ease-out), background var(--dur-1) var(--ease-out);
  }
  .ax-input::placeholder { color: var(--text-faint); }
  .ax-input--mono { font-family: var(--font-mono); }
}
@layer ax-hover {
  .ax-input:hover { border-color: var(--border-strong); }
}
@layer ax-focus {
  .ax-input:focus { outline: none; border-color: var(--fg-2); box-shadow: 0 0 0 3px var(--focus-soft); }
}
@layer ax-error {
  .ax-input--error { border-color: var(--danger); }
  .ax-input--error:focus { box-shadow: 0 0 0 3px var(--danger-dim); }
}
@layer ax-disabled {
  .ax-input:disabled { opacity: 0.4; cursor: not-allowed; border-color: var(--border-default); }
}
.ax-field__hint { font-size: var(--text-xs); color: var(--text-faint); }
.ax-field__hint--error { color: var(--danger); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-field-css")) {
  const s = document.createElement("style");
  s.id = "ax-field-css";
  s.textContent = AX_FIELD_CSS;
  document.head.appendChild(s);
}

export function Input({
  label,
  hint,
  error,
  mono = false,
  className = "",
  ...rest
}) {
  const cls = [
    "ax-input",
    mono ? "ax-input--mono" : "",
    error ? "ax-input--error" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <label className="ax-field">
      {label ? <span className="ax-field__label">{label}</span> : null}
      <input className={cls} {...rest} />
      {error ? <span className="ax-field__hint ax-field__hint--error">{error}</span> :
        hint ? <span className="ax-field__hint">{hint}</span> : null}
    </label>
  );
}
