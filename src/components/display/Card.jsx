import React from "react";

const AX_CARD_CSS = `
.ax-card {
  position: relative;
  background: var(--surface-card);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-3);
}
.ax-card--pad-md { padding: var(--space-5); }
.ax-card--pad-lg { padding: var(--space-8); }
.ax-card--pad-none { padding: 0; }
.ax-card__eyebrow {
  font-family: var(--font-mono); font-size: var(--text-xs);
  font-weight: var(--weight-medium); letter-spacing: var(--tracking-label);
  text-transform: uppercase; color: var(--text-faint);
  margin: 0 0 var(--space-2);
}
.ax-card__title {
  font-family: var(--font-display); font-size: var(--text-lg);
  font-weight: var(--weight-medium); letter-spacing: var(--tracking-tight);
  color: var(--text-body); margin: 0 0 var(--space-3);
}
.ax-card--ticks::before, .ax-card--ticks::after {
  content: ""; position: absolute; width: 9px; height: 9px;
  border-color: var(--text-faint); border-style: solid;
}
.ax-card--ticks::before { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
.ax-card--ticks::after { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-card-css")) {
  const s = document.createElement("style");
  s.id = "ax-card-css";
  s.textContent = AX_CARD_CSS;
  document.head.appendChild(s);
}

export function Card({
  eyebrow,
  title,
  padding = "md",
  ticks = false,
  children,
  className = "",
  ...rest
}) {
  const cls = [
    "ax-card",
    `ax-card--pad-${padding}`,
    ticks ? "ax-card--ticks" : "",
    className,
  ].filter(Boolean).join(" ");
  return (
    <div className={cls} {...rest}>
      {eyebrow ? <p className="ax-card__eyebrow">{eyebrow}</p> : null}
      {title ? <h3 className="ax-card__title">{title}</h3> : null}
      {children}
    </div>
  );
}
