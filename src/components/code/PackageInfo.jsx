import React from "react";

const AX_PKGINFO_CSS = `
.ax-pkginfo { border: 1px solid var(--border-default); border-radius: var(--radius-3); background: var(--surface-card); padding: 14px; font-family: var(--font-mono); }
.ax-pkginfo__top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.ax-pkginfo__icon { width: 28px; height: 28px; flex: none; border-radius: var(--radius-2); border: 1px solid var(--border-default); display: flex; align-items: center; justify-content: center; color: var(--text-faint); }
.ax-pkginfo__name { font-size: var(--text-md); color: var(--text-body); }
.ax-pkginfo__version { font-size: var(--text-xs); color: var(--text-faint); margin-top: 1px; }
.ax-pkginfo__desc { font-family: var(--font-body); font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-snug); margin: 0 0 12px; }
.ax-pkginfo__stats { display: flex; gap: 18px; padding-top: 12px; border-top: 1px solid var(--border-default); }
.ax-pkginfo__stat { display: flex; flex-direction: column; gap: 2px; }
.ax-pkginfo__stat-val { font-size: var(--text-sm); color: var(--text-body); }
.ax-pkginfo__stat-label { font-size: 10px; letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-pkginfo-css")) {
  const s = document.createElement("style");
  s.id = "ax-pkginfo-css";
  s.textContent = AX_PKGINFO_CSS;
  document.head.appendChild(s);
}

const Cube = <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><path d="m3.3 7 8.7 5 8.7-5M12 22V12"></path></svg>;

export function PackageInfo({ name, version, description, stats = [], className = "", ...rest }) {
  return (
    <div className={["ax-pkginfo", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-pkginfo__top">
        <span className="ax-pkginfo__icon">{Cube}</span>
        <div>
          <div className="ax-pkginfo__name">{name}</div>
          {version ? <div className="ax-pkginfo__version">v{version}</div> : null}
        </div>
      </div>
      {description ? <p className="ax-pkginfo__desc">{description}</p> : null}
      {stats.length ? (
        <div className="ax-pkginfo__stats">
          {stats.map((s, i) => (
            <div className="ax-pkginfo__stat" key={i}>
              <span className="ax-pkginfo__stat-val">{s.value}</span>
              <span className="ax-pkginfo__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
