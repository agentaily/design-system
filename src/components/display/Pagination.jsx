import React from "react";

const AX_PAGINATION_CSS = `
.ax-pagination { display: flex; align-items: center; gap: 4px; }
.ax-pagination__btn {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 32px; height: 32px; padding: 0 8px; cursor: pointer;
  background: transparent; color: var(--text-muted);
  border: 1px solid var(--border-default); border-radius: var(--radius-2);
  font-family: var(--font-mono); font-size: var(--text-sm);
  transition: background var(--dur-1) var(--ease-out), color var(--dur-1) var(--ease-out), border-color var(--dur-1) var(--ease-out);
}
.ax-pagination__btn:hover:not(:disabled) { background: var(--surface-raised); color: var(--text-body); border-color: var(--border-strong); }
.ax-pagination__btn:focus-visible { outline: none; box-shadow: var(--ring); }
.ax-pagination__btn:disabled { opacity: 0.35; cursor: not-allowed; }
.ax-pagination__btn--active { background: var(--accent); color: var(--accent-fg); border-color: var(--accent); }
.ax-pagination__ellipsis { min-width: 24px; text-align: center; color: var(--text-faint); font-family: var(--font-mono); font-size: var(--text-sm); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-pagination-css")) {
  const s = document.createElement("style");
  s.id = "ax-pagination-css";
  s.textContent = AX_PAGINATION_CSS;
  document.head.appendChild(s);
}

function range(start, end) {
  const out = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

export function Pagination({ page = 1, total = 1, onChange, className = "", ...rest }) {
  let pages;
  if (total <= 7) {
    pages = range(1, total);
  } else if (page <= 4) {
    pages = [...range(1, 5), "…", total];
  } else if (page >= total - 3) {
    pages = [1, "…", ...range(total - 4, total)];
  } else {
    pages = [1, "…", page - 1, page, page + 1, "…", total];
  }
  const go = (p) => { if (p >= 1 && p <= total && p !== page && onChange) onChange(p); };
  return (
    <nav className={["ax-pagination", className].filter(Boolean).join(" ")} aria-label="Pagination" {...rest}>
      <button className="ax-pagination__btn" disabled={page <= 1} onClick={() => go(page - 1)} aria-label="Previous">‹</button>
      {pages.map((p, i) => p === "…"
        ? <span key={"e" + i} className="ax-pagination__ellipsis">…</span>
        : <button key={p} className={"ax-pagination__btn" + (p === page ? " ax-pagination__btn--active" : "")} onClick={() => go(p)} aria-current={p === page ? "page" : undefined}>{p}</button>
      )}
      <button className="ax-pagination__btn" disabled={page >= total} onClick={() => go(page + 1)} aria-label="Next">›</button>
    </nav>
  );
}
