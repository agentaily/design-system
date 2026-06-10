/**
 * Agentaily button. Mono-inverted primary; hairline secondary; quiet ghost.
 */
export interface ButtonProps {
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /** Control height: 28 / 36 / 44px. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Stretch to container width. @default false */
  full?: boolean;
  /** Optional leading icon (16px svg element). */
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
