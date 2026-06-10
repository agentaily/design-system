/**
 * Mechanical square spinner — rotates in 8 ticks, not smoothly.
 */
export interface SpinnerProps {
  /** 14 / 20 / 28px. @default "md" */
  size?: "sm" | "md" | "lg";
}
export declare function Spinner(props: SpinnerProps): JSX.Element;
