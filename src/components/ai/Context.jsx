import React from "react";

const AX_CONTEXT_CSS = `
.ax-context { display: flex; flex-direction: column; gap: 6px; min-width: 180px; }
.ax-context__top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.ax-context__label { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); }
.ax-context__val { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted); }
.ax-context__val b { color: var(--text-body); font-weight: var(--weight-medium); }
.ax-context__track { display: flex; height: 6px; border: 1px solid var(--border-default); border-radius: var(--radius-1); overflow: hidden; background: var(--surface-raised); }
.ax-context__seg { height: 100%; }
.ax-context__seg--in { background: var(--text-body); }
.ax-context__seg--out { background: var(--text-faint); }
.ax-context__seg--warn { background: var(--warn); }
.ax-context__legend { display: flex; gap: 14px; }
.ax-context__key { display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); }
.ax-context__dot { width: 7px; height: 7px; border-radius: 1px; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-context-css")) {
  const s = document.createElement("style");
  s.id = "ax-context-css";
  s.textContent = AX_CONTEXT_CSS;
  document.head.appendChild(s);
}

function fmt(n) {
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "k";
  return String(n);
}

export function Context({ used = 0, max = 128000, input, output, label = "Context", className = "", ...rest }) {
  const pct = Math.min(100, (used / max) * 100);
  const near = pct >= 85;
  const inPct = input != null ? (input / max) * 100 : pct;
  const outPct = output != null ? (output / max) * 100 : 0;
  return (
    <div className={["ax-context", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-context__top">
        <span className="ax-context__label">{label}</span>
        <span className="ax-context__val"><b>{fmt(used)}</b> / {fmt(max)}</span>
      </div>
      <div className="ax-context__track">
        {input != null ? (
          <React.Fragment>
            <span className={"ax-context__seg " + (near ? "ax-context__seg--warn" : "ax-context__seg--in")} style={{ width: inPct + "%" }}></span>
            <span className="ax-context__seg ax-context__seg--out" style={{ width: outPct + "%" }}></span>
          </React.Fragment>
        ) : (
          <span className={"ax-context__seg " + (near ? "ax-context__seg--warn" : "ax-context__seg--in")} style={{ width: pct + "%" }}></span>
        )}
      </div>
      {input != null ? (
        <div className="ax-context__legend">
          <span className="ax-context__key"><span className="ax-context__dot" style={{ background: near ? "var(--warn)" : "var(--text-body)" }}></span>Input {fmt(input)}</span>
          <span className="ax-context__key"><span className="ax-context__dot" style={{ background: "var(--text-faint)" }}></span>Output {fmt(output || 0)}</span>
        </div>
      ) : null}
    </div>
  );
}
