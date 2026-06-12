import React from "react";

// BrandMark — the agentaily mark (cursor block inside corner ticks) and optional
// typed wordmark. Monochrome, drawn in currentColor so it inverts with the theme.
// Used in auth modals, settings headers, top bars. Never recolor with a hue.
const AX_BRANDMARK_CSS = `
.ax-brandmark { display: inline-flex; align-items: center; gap: 9px; color: var(--text-body); }
.ax-brandmark__mark { display: inline-flex; flex: none; }
.ax-brandmark__word {
  font-family: var(--font-mono); font-weight: var(--weight-medium);
  letter-spacing: -0.02em; color: var(--text-body);
  display: inline-flex; align-items: baseline; line-height: 1;
}
.ax-brandmark__word .ax-cursor { margin-left: 1px; width: 0.42em; height: 0.92em; }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-brandmark-css")) {
  const s = document.createElement("style");
  s.id = "ax-brandmark-css";
  s.textContent = AX_BRANDMARK_CSS;
  document.head.appendChild(s);
}

export function BrandMark({
  size = 20,
  wordmark = false,
  cursor = true,
  blink = true,
  className = "",
  ...rest
}) {
  const stroke = Math.max(2, Math.round((size / 32) * 2.4 * 10) / 10);
  return (
    <span className={["ax-brandmark", className].filter(Boolean).join(" ")} {...rest}>
      <span className="ax-brandmark__mark" aria-hidden="true">
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path d="M2 10 V2 H10" stroke="currentColor" strokeWidth={stroke} />
          <path d="M22 30 H30 V22" stroke="currentColor" strokeWidth={stroke} />
          <rect x="12" y="9" width="8" height="14" fill="currentColor" />
        </svg>
      </span>
      {wordmark ? (
        <span className="ax-brandmark__word" style={{ fontSize: Math.round(size * 0.75) }}>
          agentaily
          {cursor ? (
            <i className="ax-cursor" style={blink ? undefined : { animation: "none" }}></i>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}
