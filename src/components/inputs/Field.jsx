import React from "react";

const AX_FIELD_GRP_CSS = `
.ax-field-group { display: flex; flex-direction: column; gap: 18px; }
.ax-field2 { display: flex; flex-direction: column; gap: 6px; }
.ax-field2__label { font-family: var(--font-mono); font-size: var(--text-xs); font-weight: var(--weight-medium); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); display: flex; align-items: center; gap: 6px; }
.ax-field2__req { color: var(--danger); }
.ax-field2__hint { font-size: var(--text-xs); color: var(--text-faint); }
.ax-field2__error { font-size: var(--text-xs); color: var(--danger); }
.ax-field2--row { flex-direction: row; align-items: center; justify-content: space-between; gap: 16px; }
.ax-field2--row .ax-field2__control { flex: none; }
.ax-fieldset { border: 1px solid var(--border-default); border-radius: var(--radius-3); padding: 16px; display: flex; flex-direction: column; gap: 16px; }
.ax-fieldset__legend { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-muted); padding: 0 4px; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-field-grp-css")) {
  const s = document.createElement("style");
  s.id = "ax-field-grp-css";
  s.textContent = AX_FIELD_GRP_CSS;
  document.head.appendChild(s);
}

export function Field({ label, required, hint, error, row = false, children, className = "", ...rest }) {
  return (
    <div className={["ax-field2", row ? "ax-field2--row" : "", className].filter(Boolean).join(" ")} {...rest}>
      {label ? <span className="ax-field2__label">{label}{required ? <span className="ax-field2__req">*</span> : null}</span> : null}
      <div className="ax-field2__control">{children}</div>
      {error ? <span className="ax-field2__error">{error}</span> : hint ? <span className="ax-field2__hint">{hint}</span> : null}
    </div>
  );
}

export function FieldGroup({ legend, children, className = "", ...rest }) {
  if (legend) {
    return (
      <fieldset className={["ax-fieldset", className].filter(Boolean).join(" ")} {...rest}>
        <legend className="ax-fieldset__legend">{legend}</legend>
        {children}
      </fieldset>
    );
  }
  return <div className={["ax-field-group", className].filter(Boolean).join(" ")} {...rest}>{children}</div>;
}
