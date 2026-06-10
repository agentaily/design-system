/**
 * Hover/focus tooltip — inverted mono bubble, CSS only.
 */
export interface TooltipProps {
  label: string;
  /** @default "top" */
  side?: "top" | "bottom";
  /** The trigger element. */
  children?: React.ReactNode;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
