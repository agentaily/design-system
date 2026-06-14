import React, { useState } from "react";
import { Icon } from "../utilities/Icon.jsx";

const AX_FIELD_CSS = `
.ax-field { display: flex; flex-direction: column; gap: 6px; }
.ax-field__label {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-mono); font-size: var(--text-xs);
  font-weight: var(--weight-medium); letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--text-faint);
}
.ax-field__req { color: var(--danger); }
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
  /* Outline (not just border-color) so the error ring is robust: it survives
     overlay/instrumentation layers that repaint control borders, and never
     shifts layout. Offset -1px parks it exactly on the border edge. */
  .ax-input--error { border-color: var(--danger); outline: 1px solid var(--danger); outline-offset: -1px; }
  .ax-input--error:focus { box-shadow: 0 0 0 3px var(--danger-dim); outline-color: var(--danger); }
}
@layer ax-disabled {
  .ax-input:disabled { opacity: 0.4; cursor: not-allowed; border-color: var(--border-default); }
}
.ax-field__hint { font-size: var(--text-xs); color: var(--text-faint); }
.ax-field__hint--error { color: var(--danger); }
/* Show/hide affordance for masked fields — mirrors SecretField's eye button so
   password reveal looks identical wherever it appears. */
.ax-field__control { position: relative; display: block; }
.ax-field__control .ax-input { padding-right: 40px; }
.ax-field__reveal {
  position: absolute; right: 6px; bottom: 6px; width: 24px; height: 24px; padding: 0;
  display: flex; align-items: center; justify-content: center;
  border: none; background: none; cursor: pointer; color: var(--text-faint);
  border-radius: var(--radius-1);
  transition: color var(--dur-1) var(--ease-out), background var(--dur-1) var(--ease-out);
}
.ax-field__reveal:hover { color: var(--text-body); background: var(--surface-raised); }
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
  required = false,
  mono = false,
  reveal = false,
  className = "",
  type = "text",
  ...rest
}) {
  const [show, setShow] = useState(false);
  // Opt-in show/hide eye — only meaningful on a masked password field.
  const canReveal = reveal && type === "password";
  const inputType = canReveal && show ? "text" : type;
  const cls = ["ax-input", mono ? "ax-input--mono" : "", error ? "ax-input--error" : "", className]
    .filter(Boolean)
    .join(" ");
  const control = <input className={cls} required={required} type={inputType} {...rest} />;
  return (
    <label className="ax-field">
      {label ? (
        <span className="ax-field__label">
          {label}
          {required ? <span className="ax-field__req">*</span> : null}
        </span>
      ) : null}
      {canReveal ? (
        <span className="ax-field__control">
          {control}
          <button
            type="button"
            className="ax-field__reveal"
            tabIndex={-1}
            aria-label={show ? "隐藏密码" : "显示密码"}
            aria-pressed={show}
            title={show ? "隐藏密码" : "显示密码"}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setShow((s) => !s)}
          >
            <Icon name={show ? "eyeOff" : "eye"} size={15} />
          </button>
        </span>
      ) : (
        control
      )}
      {error ? (
        <span className="ax-field__hint ax-field__hint--error">{error}</span>
      ) : hint ? (
        <span className="ax-field__hint">{hint}</span>
      ) : null}
    </label>
  );
}
