import React, { useState } from "react";

const AX_ACCORDION_CSS = `
.ax-accordion { border-top: 1px solid var(--border-default); }
.ax-accordion__item { border-bottom: 1px solid var(--border-default); }
.ax-accordion__trigger {
  display: flex; align-items: center; gap: 12px; width: 100%;
  appearance: none; background: none; border: none; cursor: pointer; text-align: left;
  padding: 16px 4px; color: var(--text-body);
  font-family: var(--font-body); font-size: var(--text-md); font-weight: var(--weight-medium);
}
.ax-accordion__trigger:hover { color: var(--text-body); }
.ax-accordion__trigger:focus-visible { outline: none; box-shadow: var(--ring); border-radius: var(--radius-1); }
.ax-accordion__label { flex: 1; }
.ax-accordion__icon {
  width: 14px; height: 14px; flex: none; position: relative; color: var(--text-faint);
  transition: transform var(--dur-2) var(--ease-out);
}
.ax-accordion__item--open .ax-accordion__icon { transform: rotate(45deg); }
.ax-accordion__icon::before, .ax-accordion__icon::after { content: ""; position: absolute; background: currentColor; }
.ax-accordion__icon::before { left: 0; right: 0; top: 6px; height: 2px; }
.ax-accordion__icon::after { top: 0; bottom: 0; left: 6px; width: 2px; }
.ax-accordion__panel { overflow: hidden; display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--dur-2) var(--ease-out); }
.ax-accordion__item--open .ax-accordion__panel { grid-template-rows: 1fr; }
.ax-accordion__panel-inner { min-height: 0; }
.ax-accordion__body { padding: 0 4px 18px; font-size: var(--text-sm); color: var(--text-muted); line-height: var(--leading-body); max-width: 64ch; }
@media (prefers-reduced-motion: reduce) { .ax-accordion__panel { transition: none; } }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-accordion-css")) {
  const s = document.createElement("style");
  s.id = "ax-accordion-css";
  s.textContent = AX_ACCORDION_CSS;
  document.head.appendChild(s);
}

export function Accordion({ items = [], multiple = false, defaultOpen = [], className = "", ...rest }) {
  const [open, setOpen] = useState(new Set(defaultOpen));
  const toggle = (id) => {
    setOpen((prev) => {
      const next = new Set(multiple ? prev : []);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  return (
    <div className={["ax-accordion", className].filter(Boolean).join(" ")} {...rest}>
      {items.map((it, i) => {
        const id = it.id || String(i);
        const isOpen = open.has(id);
        return (
          <div key={id} className={"ax-accordion__item" + (isOpen ? " ax-accordion__item--open" : "")}>
            <button className="ax-accordion__trigger" aria-expanded={isOpen} onClick={() => toggle(id)}>
              <span className="ax-accordion__label">{it.title}</span>
              <span className="ax-accordion__icon"></span>
            </button>
            <div className="ax-accordion__panel">
              <div className="ax-accordion__panel-inner">
                <div className="ax-accordion__body">{it.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
