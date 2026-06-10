import React from "react";

const AX_TABLE_CSS = `
.ax-table-wrap { width: 100%; overflow-x: auto; border: 1px solid var(--border-default); border-radius: var(--radius-3); }
.ax-table { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
.ax-table thead th {
  text-align: left; padding: 10px 14px; background: var(--surface-card);
  border-bottom: 1px solid var(--border-strong); white-space: nowrap;
  font-family: var(--font-mono); font-size: var(--text-xs); font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint);
}
.ax-table tbody td { padding: 11px 14px; border-bottom: 1px solid var(--border-default); color: var(--text-body); vertical-align: middle; }
.ax-table tbody tr:last-child td { border-bottom: none; }
.ax-table tbody tr { transition: background var(--dur-1) var(--ease-out); }
.ax-table--hover tbody tr:hover { background: var(--surface-raised); }
.ax-table__num { font-family: var(--font-mono); text-align: right; color: var(--text-muted); }
.ax-table__align-right { text-align: right; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-table-css")) {
  const s = document.createElement("style");
  s.id = "ax-table-css";
  s.textContent = AX_TABLE_CSS;
  document.head.appendChild(s);
}

export function Table({ columns = [], rows = [], hover = true, className = "", ...rest }) {
  return (
    <div className="ax-table-wrap">
      <table className={["ax-table", hover ? "ax-table--hover" : "", className].filter(Boolean).join(" ")} {...rest}>
        <thead>
          <tr>
            {columns.map((c) => {
              const col = typeof c === "string" ? { key: c, label: c } : c;
              return <th key={col.key} className={col.align === "right" ? "ax-table__align-right" : ""}>{col.label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {columns.map((c) => {
                const col = typeof c === "string" ? { key: c } : c;
                const val = row[col.key];
                const cls = col.numeric ? "ax-table__num" : col.align === "right" ? "ax-table__align-right" : "";
                return <td key={col.key} className={cls}>{col.render ? col.render(val, row) : val}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
