import React, { useState } from "react";
import { Icon } from "../utilities/Icon.jsx";

// SecretField — masked credential input with show/hide and an optional
// "never exposed" hint line. Builds on the bundle's .ax-input. Owns the
// shared field-level chrome (.s-secret / .s-field__label / .s-field__hint)
// used across the settings surfaces.
const AX_SECRETFIELD_CSS = `
.s-field__label { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.s-field__hint { font-size: var(--text-xs); color: var(--text-faint); margin: 6px 0 0; line-height: var(--leading-snug); }
.s-field__hint--err { color: var(--danger); }
.s-secret { position: relative; }
.s-secret .ax-input { padding-right: 42px; font-family: var(--font-mono); letter-spacing: 0.02em; }
.s-secret__eye { position: absolute; right: 6px; bottom: 6px; width: 24px; height: 24px; padding: 0;
  display: flex; align-items: center; justify-content: center; border: none; background: none; cursor: pointer;
  color: var(--text-faint); border-radius: var(--radius-1); transition: color var(--dur-1) var(--ease-out), background var(--dur-1) var(--ease-out); }
.s-secret__eye:hover { color: var(--text-body); background: var(--surface-raised); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-secretfield-css")) {
  const s = document.createElement("style");
  s.id = "ax-secretfield-css";
  s.textContent = AX_SECRETFIELD_CSS;
  document.head.appendChild(s);
}

export function SecretField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  error,
  mono = true,
  autoComplete = "off",
  ...rest
}) {
  const [show, setShow] = useState(false);
  const inputId =
    "secret-" +
    String(label || "")
      .replace(/\s+/g, "-")
      .toLowerCase();
  return (
    <div {...rest}>
      {label ? (
        <label className="s-field__label ax-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div className="s-secret">
        <input
          id={inputId}
          type={show ? "text" : "password"}
          className={
            "ax-input" + (mono ? " ax-input--mono" : "") + (error ? " ax-input--error" : "")
          }
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          spellCheck="false"
          onChange={(e) => onChange && onChange(e.target.value)}
        />
        <button
          type="button"
          className="s-secret__eye"
          onClick={() => setShow((v) => !v)}
          onMouseDown={(e) => e.preventDefault()}
          aria-label={show ? "隐藏" : "显示"}
          title={show ? "隐藏" : "显示"}
          tabIndex={-1}
        >
          <Icon name={show ? "eyeOff" : "eye"} size={15} />
        </button>
      </div>
      {error ? (
        <p className="s-field__hint s-field__hint--err">{error}</p>
      ) : hint ? (
        <p className="s-field__hint">{hint}</p>
      ) : null}
    </div>
  );
}
