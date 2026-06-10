/**
 * Hairline divider — horizontal, vertical, or with a centered mono label.
 */
export interface SeparatorProps {
  /** @default "horizontal" */
  orientation?: "horizontal" | "vertical";
  /** Centered mono uppercase label (forces horizontal). */
  label?: string;
}
export declare function Separator(props: SeparatorProps): JSX.Element;
