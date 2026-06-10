import React from "react";

const AX_PLAN_CSS = `
.ax-plan { display: flex; flex-direction: column; }
.ax-plan__step { display: flex; gap: 12px; }
.ax-plan__rail { display: flex; flex-direction: column; align-items: center; flex: none; }
.ax-plan__node {
  width: 22px; height: 22px; flex: none; border-radius: var(--radius-1);
  border: 1px solid var(--border-strong); background: var(--surface-card);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-mono); font-size: 11px; color: var(--text-faint);
}
.ax-plan__step--done .ax-plan__node { background: var(--accent); border-color: var(--accent); color: var(--accent-fg); }
.ax-plan__step--active .ax-plan__node { border-color: var(--text-body); color: var(--text-body); }
.ax-plan__connector { width: 1px; flex: 1; min-height: 14px; background: var(--border-strong); margin: 2px 0; }
.ax-plan__step--done .ax-plan__connector { background: var(--accent); }
.ax-plan__body { padding-bottom: 16px; padding-top: 1px; }
.ax-plan__step:last-child .ax-plan__body { padding-bottom: 0; }
.ax-plan__title { font-size: var(--text-sm); font-weight: var(--weight-medium); color: var(--text-body); margin: 0; }
.ax-plan__step--pending .ax-plan__title { color: var(--text-faint); }
.ax-plan__desc { font-size: var(--text-xs); color: var(--text-muted); margin: 3px 0 0; line-height: var(--leading-snug); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-plan-css")) {
  const s = document.createElement("style");
  s.id = "ax-plan-css";
  s.textContent = AX_PLAN_CSS;
  document.head.appendChild(s);
}

const Check = <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"></path></svg>;

export function Plan({ steps = [], className = "", ...rest }) {
  return (
    <div className={["ax-plan", className].filter(Boolean).join(" ")} {...rest}>
      {steps.map((st, i) => {
        const status = st.status || "pending";
        const last = i === steps.length - 1;
        return (
          <div key={i} className={"ax-plan__step ax-plan__step--" + status}>
            <div className="ax-plan__rail">
              <span className="ax-plan__node">{status === "done" ? Check : i + 1}</span>
              {!last ? <span className="ax-plan__connector"></span> : null}
            </div>
            <div className="ax-plan__body">
              <p className="ax-plan__title">{st.title}</p>
              {st.description ? <p className="ax-plan__desc">{st.description}</p> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
