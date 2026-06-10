import React from "react";
import { Input } from "./Input.jsx"; // ensures shared .ax-field CSS is injected

const AX_TEXTAREA_CSS = `
@layer ax-base {
  .ax-textarea {
    min-height: 88px; padding: 10px 12px; width: 100%; resize: vertical;
    background: var(--surface-card); color: var(--text-body);
    border: 1px solid var(--border-default); border-radius: var(--radius-2);
    font-family: var(--font-body); font-size: var(--text-sm);
    line-height: var(--leading-body);
    transition: border-color var(--dur-1) var(--ease-out), box-shadow var(--dur-1) var(--ease-out);
  }
  .ax-textarea::placeholder { color: var(--text-faint); }
}
@layer ax-hover {
  .ax-textarea:hover { border-color: var(--border-strong); }
}
@layer ax-focus {
  .ax-textarea:focus { outline: none; border-color: var(--fg-2); box-shadow: 0 0 0 3px var(--focus-soft); }
}
@layer ax-disabled {
  .ax-textarea:disabled { opacity: 0.4; cursor: not-allowed; border-color: var(--border-default); }
}
`;

if (typeof document !== "undefined" && !document.getElementById("ax-textarea-css")) {
  const s = document.createElement("style");
  s.id = "ax-textarea-css";
  s.textContent = AX_TEXTAREA_CSS;
  document.head.appendChild(s);
}

export function Textarea({ label, hint, className = "", ...rest }) {
  return (
    <label className="ax-field">
      {label ? <span className="ax-field__label">{label}</span> : null}
      <textarea className={["ax-textarea", className].filter(Boolean).join(" ")} {...rest}></textarea>
      {hint ? <span className="ax-field__hint">{hint}</span> : null}
    </label>
  );
}
