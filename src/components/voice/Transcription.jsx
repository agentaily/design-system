import React from "react";

const AX_TRANSCRIPTION_CSS = `
.ax-transcription { border: 1px solid var(--border-default); border-radius: var(--radius-3); background: var(--surface-card); padding: 14px 16px; }
.ax-transcription__head { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
.ax-transcription__live { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 10px; letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--danger); }
.ax-transcription__livedot { width: 7px; height: 7px; border-radius: 1px; background: var(--danger); animation: ax-trans-pulse 1s var(--ease-out) infinite; }
.ax-transcription__text { font-size: var(--text-md); line-height: var(--leading-body); color: var(--text-body); }
.ax-transcription__seg { color: var(--text-body); }
.ax-transcription__interim { color: var(--text-faint); }
.ax-transcription__cursor { display: inline-block; width: 0.5em; height: 1em; background: var(--text-body); vertical-align: text-bottom; margin-left: 2px; animation: ax-trans-blink 1.1s steps(1) infinite; }
.ax-transcription__speaker { font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); margin-right: 8px; }
@keyframes ax-trans-pulse { 50% { opacity: 0.3; } }
@keyframes ax-trans-blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .ax-transcription__livedot, .ax-transcription__cursor { animation: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-transcription-css")) {
  const s = document.createElement("style");
  s.id = "ax-transcription-css";
  s.textContent = AX_TRANSCRIPTION_CSS;
  document.head.appendChild(s);
}

export function Transcription({ live = false, segments = [], text, interim, className = "", ...rest }) {
  return (
    <div className={["ax-transcription", className].filter(Boolean).join(" ")} {...rest}>
      {live ? (
        <div className="ax-transcription__head">
          <span className="ax-transcription__live"><span className="ax-transcription__livedot"></span>Transcribing</span>
        </div>
      ) : null}
      <div className="ax-transcription__text">
        {segments.length ? segments.map((seg, i) => {
          const s = typeof seg === "string" ? { text: seg } : seg;
          return (
            <span key={i}>
              {s.speaker ? <span className="ax-transcription__speaker">{s.speaker}</span> : null}
              <span className="ax-transcription__seg">{s.text} </span>
            </span>
          );
        }) : <span className="ax-transcription__seg">{text}</span>}
        {interim ? <span className="ax-transcription__interim">{interim}</span> : null}
        {live ? <span className="ax-transcription__cursor"></span> : null}
      </div>
    </div>
  );
}
