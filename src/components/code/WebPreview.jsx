import React from "react";

const AX_WEBPREVIEW_CSS = `
.ax-webpreview { border: 1px solid var(--border-strong); border-radius: var(--radius-3); overflow: hidden; background: var(--surface-card); }
.ax-webpreview__bar { display: flex; align-items: center; gap: 8px; padding: 8px 10px; border-bottom: 1px solid var(--border-default); }
.ax-webpreview__nav { display: flex; gap: 4px; }
.ax-webpreview__navbtn { width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; color: var(--text-faint); border-radius: var(--radius-1); }
.ax-webpreview__url { flex: 1; display: flex; align-items: center; gap: 6px; height: 26px; padding: 0 10px; background: var(--bg-1); border: 1px solid var(--border-default); border-radius: var(--radius-1); font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-muted); overflow: hidden; }
[data-theme="dark"] .ax-webpreview__url { background: var(--bg-0); }
.ax-webpreview__lock { color: var(--ok); flex: none; }
.ax-webpreview__urltext { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ax-webpreview__refresh { appearance: none; background: none; border: none; cursor: pointer; color: var(--text-faint); padding: 4px; border-radius: var(--radius-1); flex: none; }
.ax-webpreview__refresh:hover { color: var(--text-body); }
.ax-webpreview__viewport { background: #fff; min-height: 160px; }
[data-theme="dark"] .ax-webpreview__viewport { background: var(--bg-0); }
.ax-webpreview__viewport iframe { width: 100%; height: 100%; min-height: 160px; border: none; display: block; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-webpreview-css")) {
  const s = document.createElement("style");
  s.id = "ax-webpreview-css";
  s.textContent = AX_WEBPREVIEW_CSS;
  document.head.appendChild(s);
}

const Lock = (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);
const Refresh = (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8M21 3v5h-5"></path>
  </svg>
);

export function WebPreview({
  url = "localhost:3000",
  height = 200,
  src,
  srcDoc,
  children,
  className = "",
  ...rest
}) {
  return (
    <div className={["ax-webpreview", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-webpreview__bar">
        <span className="ax-webpreview__nav">
          <span className="ax-webpreview__navbtn">‹</span>
          <span className="ax-webpreview__navbtn">›</span>
        </span>
        <span className="ax-webpreview__url">
          <span className="ax-webpreview__lock">{Lock}</span>
          <span className="ax-webpreview__urltext">{url}</span>
        </span>
        <button className="ax-webpreview__refresh">{Refresh}</button>
      </div>
      <div className="ax-webpreview__viewport" style={{ height }}>
        {children ? (
          children
        ) : (
          <iframe src={src} srcDoc={srcDoc} title={url} sandbox="allow-scripts"></iframe>
        )}
      </div>
    </div>
  );
}
