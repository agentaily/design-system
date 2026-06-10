import React from "react";

const AX_IMAGE_CSS = `
.ax-image { position: relative; overflow: hidden; border-radius: var(--radius-2); background: var(--surface-raised); display: block; }
.ax-image img { display: block; width: 100%; height: 100%; object-fit: cover; }
.ax-image__placeholder { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: var(--text-faint); }
.ax-image__placeholder svg { width: 28px; height: 28px; }
.ax-image__caption { position: absolute; left: 0; right: 0; bottom: 0; padding: 8px 10px; background: linear-gradient(transparent, rgba(0,0,0,0.7)); font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.04em; color: #F4F4F5; }
.ax-image--bordered { border: 1px solid var(--border-default); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-image-css")) {
  const s = document.createElement("style");
  s.id = "ax-image-css";
  s.textContent = AX_IMAGE_CSS;
  document.head.appendChild(s);
}

const Placeholder = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"></path></svg>;

export function Image({ src, alt = "", ratio, caption, bordered = false, width, height, className = "", style = {}, ...rest }) {
  const wrapStyle = { width, height, aspectRatio: ratio ? String(ratio) : undefined, ...style };
  return (
    <span className={["ax-image", bordered ? "ax-image--bordered" : "", className].filter(Boolean).join(" ")} style={wrapStyle} {...rest}>
      {src ? <img src={src} alt={alt} /> : <span className="ax-image__placeholder">{Placeholder}</span>}
      {caption ? <span className="ax-image__caption">{caption}</span> : null}
    </span>
  );
}
