import React from "react";

// PageSection — the standard content layout for ONE titled section of a page:
// an eyebrow (锚点/kicker) + title + description header, then the section body.
// Generic, not settings-specific — use it for any page content block that wants
// the house heading rhythm (settings tabs, an onboarding step, a docs section,
// a dashboard panel header…). Pure layout, no state.
//
//   ┌ eyebrow            集成 · INTEGRATIONS
//   │ title  ········· (optional actions, right)
//   │ description
//   ├───────────────────────────────────────────
//   └ body (children)   form / cards / rail …
//
// Exported as PageSection; `SettingsSection` is kept as a back-compat alias.
const AX_PSEC_CSS = `
.ax-psec__head { margin-bottom: 26px; }
.ax-psec__eyebrow { color: var(--text-faint); margin-bottom: 12px; }
.ax-psec__titlerow { display: flex; align-items: flex-start; gap: 16px; }
.ax-psec__title { flex: 1; min-width: 0; font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 500;
  letter-spacing: var(--tracking-tight); line-height: var(--leading-tight); color: var(--text-body); margin: 0; }
.ax-psec__actions { flex: none; display: flex; align-items: center; gap: 10px; padding-top: 2px; }
.ax-psec__desc { font-size: var(--text-md); color: var(--text-muted); line-height: var(--leading-body); margin: 10px 0 0; max-width: 62ch; }
.ax-psec__body { display: flex; flex-direction: column; gap: 22px; }
.ax-psec--tight .ax-psec__head { margin-bottom: 18px; }
.ax-psec--tight .ax-psec__title { font-size: var(--text-xl); }
`;

if (typeof document !== "undefined" && !document.getElementById("ax-psec-css")) {
  const s = document.createElement("style");
  s.id = "ax-psec-css";
  s.textContent = AX_PSEC_CSS;
  document.head.appendChild(s);
}

export function PageSection({
  eyebrow,
  title,
  description,
  actions,
  tight = false,
  headingLevel = 1,
  className = "",
  children,
  ...rest
}) {
  const H = "h" + Math.min(Math.max(headingLevel, 1), 6);
  const hasHead = eyebrow || title || description || actions;

  return (
    <section
      className={["ax-psec", tight ? "ax-psec--tight" : "", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {hasHead ? (
        <header className="ax-psec__head">
          {eyebrow ? <div className="ax-label ax-psec__eyebrow">{eyebrow}</div> : null}
          {title || actions ? (
            <div className="ax-psec__titlerow">
              {title ? (
                <H className="ax-psec__title">{title}</H>
              ) : (
                <span style={{ flex: 1 }}></span>
              )}
              {actions ? <div className="ax-psec__actions">{actions}</div> : null}
            </div>
          ) : null}
          {description ? <p className="ax-psec__desc">{description}</p> : null}
        </header>
      ) : null}
      {children ? <div className="ax-psec__body">{children}</div> : null}
    </section>
  );
}

// Back-compat alias — same component under the old settings-flavoured name.
export const SettingsSection = PageSection;
