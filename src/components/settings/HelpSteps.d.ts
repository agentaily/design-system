/**
 * Collapsible "how to get this credential" guide — auto-numbered steps and an
 * optional external link. Built on the DS Collapsible. Steps accept rich nodes
 * (e.g. <code> spans).
 */
export interface HelpStepsLink {
  href: string;
  label: string;
}
export interface HelpStepsProps {
  /** Collapsible trigger label. */
  title: string;
  /** Ordered steps; each may be a string or rich node. */
  steps: React.ReactNode[];
  /** Optional external link rendered under the steps. */
  link?: HelpStepsLink;
  /** @default false */
  defaultOpen?: boolean;
}
export declare function HelpSteps(props: HelpStepsProps): JSX.Element;
