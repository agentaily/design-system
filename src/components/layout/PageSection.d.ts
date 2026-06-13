/**
 * PageSection — the standard content layout for one titled section of a page:
 * an eyebrow (锚点/kicker) + title + description header, then the section body
 * (`children`). Generic, not settings-specific — use it for any page content
 * block that wants the house heading rhythm. Pure layout, no state.
 *
 * Exported as `PageSection`; `SettingsSection` is a back-compat alias.
 */
export interface PageSectionProps {
  /** Mono eyebrow above the title (e.g. "集成 · INTEGRATIONS"). Rendered with the `ax-label` style. */
  eyebrow?: React.ReactNode;
  /** Section title. */
  title?: React.ReactNode;
  /** Description paragraph under the title. */
  description?: React.ReactNode;
  /** Right-aligned header actions, level with the title (e.g. a secondary button). */
  actions?: React.ReactNode;
  /** Smaller heading + tighter header spacing — for sub-sections / stacked blocks. @default false */
  tight?: boolean;
  /** Heading tag level for the title (1–6) for document outline / a11y. @default 1 */
  headingLevel?: number;
  className?: string;
  /** Section body. */
  children?: React.ReactNode;
}
export declare function PageSection(props: PageSectionProps): JSX.Element;
/** Back-compat alias for `PageSection`. */
export declare const SettingsSection: typeof PageSection;
