import React from "react";

const AX_LABEL_CSS = `
.ax-lbl {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-mono); font-size: var(--text-xs);
  font-weight: var(--weight-medium); letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--text-faint);
}
.ax-lbl--plain {
  font-family: var(--font-body); font-size: var(--text-sm);
  letter-spacing: 0; text-transform: none; color: var(--text-body); font-weight: var(--weight-medium);
}
.ax-lbl__req { color: var(--danger); }
.ax-lbl--disabled { opacity: 0.4; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-label-css")) {
  const s = document.createElement("style");
  s.id = "ax-label-css";
  s.textContent = AX_LABEL_CSS;
  document.head.appendChild(s);
}

export function Label({ plain = false, required = false, disabled = false, children, className = "", ...rest }) {
  const cls = ["ax-lbl", plain ? "ax-lbl--plain" : "", disabled ? "ax-lbl--disabled" : "", className].filter(Boolean).join(" ");
  return (
    <label className={cls} {...rest}>
      {children}
      {required ? <span className="ax-lbl__req">*</span> : null}
    </label>
  );
}
