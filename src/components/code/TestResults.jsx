import React from "react";

const AX_TESTRESULTS_CSS = `
.ax-testresults { border: 1px solid var(--border-default); border-radius: var(--radius-3); overflow: hidden; background: var(--surface-card); font-family: var(--font-mono); }
.ax-testresults__head { display: flex; align-items: center; gap: 12px; padding: 11px 14px; border-bottom: 1px solid var(--border-default); }
.ax-testresults__summary { display: flex; gap: 12px; flex: 1; }
.ax-testresults__stat { font-size: var(--text-xs); letter-spacing: 0.04em; }
.ax-testresults__stat--pass { color: var(--ok); }
.ax-testresults__stat--fail { color: var(--danger); }
.ax-testresults__stat--skip { color: var(--text-faint); }
.ax-testresults__dur { font-size: 10px; color: var(--text-faint); }
.ax-testresults__list { padding: 4px; }
.ax-testresults__row { display: flex; align-items: center; gap: 10px; padding: 6px 8px; font-size: var(--text-xs); }
.ax-testresults__mark { width: 14px; flex: none; text-align: center; }
.ax-testresults__row--pass .ax-testresults__mark { color: var(--ok); }
.ax-testresults__row--fail .ax-testresults__mark { color: var(--danger); }
.ax-testresults__row--skip .ax-testresults__mark { color: var(--text-faint); }
.ax-testresults__name { flex: 1; color: var(--text-body); }
.ax-testresults__row--skip .ax-testresults__name { color: var(--text-faint); }
.ax-testresults__t { color: var(--text-faint); font-size: 10px; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-testresults-css")) {
  const s = document.createElement("style");
  s.id = "ax-testresults-css";
  s.textContent = AX_TESTRESULTS_CSS;
  document.head.appendChild(s);
}

const MARK = { pass: "✓", fail: "✕", skip: "○" };

export function TestResults({ tests = [], duration, className = "", ...rest }) {
  const pass = tests.filter((t) => t.status === "pass").length;
  const fail = tests.filter((t) => t.status === "fail").length;
  const skip = tests.filter((t) => t.status === "skip").length;
  return (
    <div className={["ax-testresults", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-testresults__head">
        <div className="ax-testresults__summary">
          <span className="ax-testresults__stat ax-testresults__stat--pass">{pass} passed</span>
          {fail > 0 ? <span className="ax-testresults__stat ax-testresults__stat--fail">{fail} failed</span> : null}
          {skip > 0 ? <span className="ax-testresults__stat ax-testresults__stat--skip">{skip} skipped</span> : null}
        </div>
        {duration ? <span className="ax-testresults__dur">{duration}</span> : null}
      </div>
      <div className="ax-testresults__list">
        {tests.map((t, i) => (
          <div key={i} className={"ax-testresults__row ax-testresults__row--" + t.status}>
            <span className="ax-testresults__mark">{MARK[t.status]}</span>
            <span className="ax-testresults__name">{t.name}</span>
            {t.time ? <span className="ax-testresults__t">{t.time}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
