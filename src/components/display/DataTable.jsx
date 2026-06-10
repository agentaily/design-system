import React, { useState, useMemo } from "react";

const AX_DATATABLE_CSS = `
.ax-datatable-wrap { width: 100%; overflow-x: auto; border: 1px solid var(--border-default); border-radius: var(--radius-3); }
.ax-datatable { width: 100%; border-collapse: collapse; font-size: var(--text-sm); }
.ax-datatable thead th { text-align: left; padding: 10px 14px; background: var(--surface-card); border-bottom: 1px solid var(--border-strong); white-space: nowrap; font-family: var(--font-mono); font-size: var(--text-xs); font-weight: var(--weight-medium); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); }
.ax-datatable th--sortable { cursor: pointer; user-select: none; }
.ax-datatable th--sortable:hover { color: var(--text-body); }
.ax-datatable__sort { display: inline-flex; flex-direction: column; margin-left: 6px; vertical-align: middle; }
.ax-datatable__sort span { font-size: 7px; line-height: 6px; color: var(--border-strong); }
.ax-datatable__sort span.on { color: var(--text-body); }
.ax-datatable tbody td { padding: 11px 14px; border-bottom: 1px solid var(--border-default); color: var(--text-body); }
.ax-datatable tbody tr:last-child td { border-bottom: none; }
.ax-datatable tbody tr:hover { background: var(--surface-raised); }
.ax-datatable__num { font-family: var(--font-mono); text-align: right; }
.ax-datatable__foot { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-top: 1px solid var(--border-default); font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-faint); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-datatable-css")) {
  const s = document.createElement("style");
  s.id = "ax-datatable-css";
  s.textContent = AX_DATATABLE_CSS;
  document.head.appendChild(s);
}

export function DataTable({ columns = [], rows = [], pageSize, caption, className = "", ...rest }) {
  const [sort, setSort] = useState({ key: null, dir: 1 });
  const [page, setPage] = useState(0);

  const norm = (c) => (typeof c === "string" ? { key: c, label: c } : c);
  const cols = columns.map(norm);

  const sorted = useMemo(() => {
    if (!sort.key) return rows;
    const copy = rows.slice();
    copy.sort((a, b) => {
      const av = a[sort.key], bv = b[sort.key];
      if (av === bv) return 0;
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * sort.dir;
      return String(av).localeCompare(String(bv)) * sort.dir;
    });
    return copy;
  }, [rows, sort]);

  const paged = pageSize ? sorted.slice(page * pageSize, (page + 1) * pageSize) : sorted;
  const totalPages = pageSize ? Math.ceil(sorted.length / pageSize) : 1;

  const toggleSort = (key) => setSort((s) => s.key === key ? { key, dir: -s.dir } : { key, dir: 1 });

  return (
    <div className={className} {...rest}>
      <div className="ax-datatable-wrap">
        <table className="ax-datatable">
          <thead>
            <tr>
              {cols.map((c) => (
                <th key={c.key} className={(c.sortable !== false ? "th--sortable " : "") + (c.numeric ? "ax-datatable__num" : "")} onClick={() => c.sortable !== false && toggleSort(c.key)}>
                  {c.label}
                  {c.sortable !== false ? (
                    <span className="ax-datatable__sort">
                      <span className={sort.key === c.key && sort.dir === 1 ? "on" : ""}>▲</span>
                      <span className={sort.key === c.key && sort.dir === -1 ? "on" : ""}>▼</span>
                    </span>
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((row, ri) => (
              <tr key={ri}>
                {cols.map((c) => <td key={c.key} className={c.numeric ? "ax-datatable__num" : ""}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        {pageSize && totalPages > 1 ? (
          <div className="ax-datatable__foot">
            <span>{page * pageSize + 1}–{Math.min((page + 1) * pageSize, sorted.length)} of {sorted.length}</span>
            <span style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontFamily: "inherit" }}>‹ prev</button>
              <button onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontFamily: "inherit" }}>next ›</button>
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
