import React, { useState, Children } from "react";

const AX_CAROUSEL_CSS = `
.ax-carousel { position: relative; }
.ax-carousel__viewport { overflow: hidden; border-radius: var(--radius-3); }
.ax-carousel__track { display: flex; transition: transform var(--dur-3) var(--ease-out); }
.ax-carousel__slide { flex: 0 0 100%; min-width: 0; }
.ax-carousel__btn { position: absolute; top: 50%; transform: translateY(-50%); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; background: var(--surface-panel); border: 1px solid var(--border-strong); border-radius: var(--radius-2); color: var(--text-body); box-shadow: var(--shadow-1); transition: background var(--dur-1) var(--ease-out); }
.ax-carousel__btn:hover:not(:disabled) { background: var(--surface-raised); }
.ax-carousel__btn:disabled { opacity: 0.3; cursor: not-allowed; }
.ax-carousel__btn--prev { left: 10px; }
.ax-carousel__btn--next { right: 10px; }
.ax-carousel__dots { display: flex; justify-content: center; gap: 6px; margin-top: 12px; }
.ax-carousel__dot { width: 6px; height: 6px; border-radius: 1px; background: var(--border-strong); border: none; cursor: pointer; padding: 0; transition: background var(--dur-1) var(--ease-out), width var(--dur-1) var(--ease-out); }
.ax-carousel__dot--active { background: var(--text-body); width: 16px; }
@media (prefers-reduced-motion: reduce) { .ax-carousel__track { transition: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-carousel-css")) {
  const s = document.createElement("style");
  s.id = "ax-carousel-css";
  s.textContent = AX_CAROUSEL_CSS;
  document.head.appendChild(s);
}

export function Carousel({ children, dots = true, arrows = true, className = "", ...rest }) {
  const slides = Children.toArray(children);
  const [idx, setIdx] = useState(0);
  const go = (i) => setIdx(Math.max(0, Math.min(slides.length - 1, i)));
  return (
    <div className={["ax-carousel", className].filter(Boolean).join(" ")} {...rest}>
      <div className="ax-carousel__viewport">
        <div className="ax-carousel__track" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {slides.map((s, i) => <div className="ax-carousel__slide" key={i}>{s}</div>)}
        </div>
      </div>
      {arrows && slides.length > 1 ? (
        <React.Fragment>
          <button className="ax-carousel__btn ax-carousel__btn--prev" disabled={idx === 0} onClick={() => go(idx - 1)} aria-label="Previous">‹</button>
          <button className="ax-carousel__btn ax-carousel__btn--next" disabled={idx === slides.length - 1} onClick={() => go(idx + 1)} aria-label="Next">›</button>
        </React.Fragment>
      ) : null}
      {dots && slides.length > 1 ? (
        <div className="ax-carousel__dots">
          {slides.map((_, i) => <button key={i} className={"ax-carousel__dot" + (i === idx ? " ax-carousel__dot--active" : "")} onClick={() => go(i)} aria-label={"Go to slide " + (i + 1)}></button>)}
        </div>
      ) : null}
    </div>
  );
}
