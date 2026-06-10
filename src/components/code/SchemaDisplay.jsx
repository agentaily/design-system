import React from "react";

const AX_SCHEMA_CSS = `
.ax-schema { border: 1px solid var(--border-default); border-radius: var(--radius-3); background: var(--surface-card); padding: 8px; font-family: var(--font-mono); font-size: var(--text-sm); }
.ax-schema__row { display: flex; align-items: baseline; gap: 8px; padding: 5px 8px; }
.ax-schema__key { color: var(--text-body); }
.ax-schema__req { color: var(--danger); margin-left: 1px; }
.ax-schema__type { color: var(--text-faint); font-size: var(--text-xs); border: 1px solid var(--border-default); border-radius: var(--radius-1); padding: 0 5px; }
.ax-schema__type--string { color: var(--ok); }
.ax-schema__type--number { color: var(--warn); }
.ax-schema__type--boolean { color: var(--text-muted); }
.ax-schema__type--object, .ax-schema__type--array { color: var(--text-body); }
.ax-schema__desc { color: var(--text-faint); font-family: var(--font-body); font-size: var(--text-xs); margin-left: auto; }
.ax-schema__children { margin-left: 14px; border-left: 1px solid var(--border-default); padding-left: 4px; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-schema-css")) {
  const s = document.createElement("style");
  s.id = "ax-schema-css";
  s.textContent = AX_SCHEMA_CSS;
  document.head.appendChild(s);
}

function Field({ name, field, depth }) {
  const f = typeof field === "string" ? { type: field } : field;
  const baseType = (f.type || "any").replace(/\[\]$/, "");
  return (
    <React.Fragment>
      <div className="ax-schema__row">
        <span className="ax-schema__key">{name}{f.required ? <span className="ax-schema__req">*</span> : null}</span>
        <span className={"ax-schema__type ax-schema__type--" + baseType}>{f.type || "any"}</span>
        {f.description ? <span className="ax-schema__desc">{f.description}</span> : null}
      </div>
      {f.fields ? (
        <div className="ax-schema__children">
          {Object.entries(f.fields).map(([k, v]) => <Field key={k} name={k} field={v} depth={depth + 1} />)}
        </div>
      ) : null}
    </React.Fragment>
  );
}

export function SchemaDisplay({ schema = {}, className = "", ...rest }) {
  return (
    <div className={["ax-schema", className].filter(Boolean).join(" ")} {...rest}>
      {Object.entries(schema).map(([k, v]) => <Field key={k} name={k} field={v} depth={0} />)}
    </div>
  );
}
