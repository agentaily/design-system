import React from "react";

const AX_OPENINCHAT_CSS = `
.ax-openinchat { display: inline-flex; align-items: center; gap: 7px; cursor: pointer; background: var(--surface-card); color: var(--text-body); border: 1px solid var(--border-default); border-radius: var(--radius-2); padding: 6px 11px; font-family: var(--font-body); font-size: var(--text-sm); text-decoration: none; transition: border-color var(--dur-1) var(--ease-out), background var(--dur-1) var(--ease-out); }
.ax-openinchat:hover { border-color: var(--border-strong); background: var(--surface-raised); }
.ax-openinchat__mark { width: 16px; height: 16px; flex: none; }
.ax-openinchat__arrow { width: 13px; height: 13px; color: var(--text-faint); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-openinchat-css")) {
  const s = document.createElement("style");
  s.id = "ax-openinchat-css";
  s.textContent = AX_OPENINCHAT_CSS;
  document.head.appendChild(s);
}

const Arrow = <svg className="ax-openinchat__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8"></path></svg>;

export function OpenInChat({ label = "Open in agentaily", href = "#", logoSrc = "../../assets/logo/agentaily-mark-white.svg", onClick, className = "", ...rest }) {
  return (
    <a className={["ax-openinchat", className].filter(Boolean).join(" ")} href={href} onClick={onClick} {...rest}>
      {logoSrc ? <img className="ax-openinchat__mark" src={logoSrc} alt="" /> : null}
      {label}
      {Arrow}
    </a>
  );
}
