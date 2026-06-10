import React from "react";

const AX_CHART_CSS = `
.ax-chart { font-family: var(--font-mono); }
.ax-chart__title { font-size: var(--text-xs); letter-spacing: var(--tracking-label); text-transform: uppercase; color: var(--text-faint); margin-bottom: 12px; }
.ax-barchart { display: flex; align-items: flex-end; gap: 8px; height: 140px; }
.ax-barchart__col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; justify-content: flex-end; }
.ax-barchart__bar { width: 100%; background: var(--text-body); border-radius: var(--radius-1) var(--radius-1) 0 0; transition: height var(--dur-3) var(--ease-out); min-height: 2px; }
.ax-barchart__col--accent .ax-barchart__bar { background: var(--text-faint); }
.ax-barchart__val { font-size: 10px; color: var(--text-muted); }
.ax-barchart__label { font-size: 10px; color: var(--text-faint); white-space: nowrap; }
.ax-linechart { position: relative; }
.ax-linechart svg { width: 100%; display: block; overflow: visible; }
.ax-linechart__labels { display: flex; justify-content: space-between; margin-top: 8px; }
.ax-linechart__label { font-size: 10px; color: var(--text-faint); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-chart-css")) {
  const s = document.createElement("style");
  s.id = "ax-chart-css";
  s.textContent = AX_CHART_CSS;
  document.head.appendChild(s);
}

export function BarChart({ data = [], title, className = "", ...rest }) {
  const max = Math.max(...data.map((d) => (typeof d === "number" ? d : d.value)), 1);
  return (
    <div className={["ax-chart", className].filter(Boolean).join(" ")} {...rest}>
      {title ? <div className="ax-chart__title">{title}</div> : null}
      <div className="ax-barchart">
        {data.map((d, i) => {
          const item = typeof d === "number" ? { value: d } : d;
          return (
            <div key={i} className={"ax-barchart__col" + (item.muted ? " ax-barchart__col--accent" : "")}>
              <span className="ax-barchart__val">{item.value}</span>
              <span className="ax-barchart__bar" style={{ height: (item.value / max) * 100 + "%" }}></span>
              {item.label ? <span className="ax-barchart__label">{item.label}</span> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function LineChart({ data = [], title, height = 120, className = "", ...rest }) {  const values = data.map((d) => (typeof d === "number" ? d : d.value));
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const w = 100, h = height;
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1 || 1)) * w;
    const y = h - ((v - min) / range) * h;
    return [x, y];
  });
  const path = pts.map((p, i) => (i === 0 ? "M" : "L") + p[0].toFixed(2) + " " + p[1].toFixed(2)).join(" ");
  const area = path + ` L ${w} ${h} L 0 ${h} Z`;
  return (
    <div className={["ax-chart ax-linechart", className].filter(Boolean).join(" ")} {...rest}>
      {title ? <div className="ax-chart__title">{title}</div> : null}
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height }}>
        <path d={area} fill="var(--surface-raised)" opacity="0.6"></path>
        <path d={path} fill="none" stroke="var(--text-body)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></path>
        {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2" fill="var(--surface-page)" stroke="var(--text-body)" strokeWidth="1.5" vectorEffect="non-scaling-stroke"></circle>)}
      </svg>
      <div className="ax-linechart__labels">
        {data.map((d, i) => <span key={i} className="ax-linechart__label">{typeof d === "number" ? "" : d.label}</span>)}
      </div>
    </div>
  );
}

/** Namesake convenience: <Chart type="bar|line" …>. BarChart / LineChart remain the primary exports. */
export function Chart({ type = "bar", ...props }) {
  return type === "line" ? <LineChart {...props} /> : <BarChart {...props} />;
}
