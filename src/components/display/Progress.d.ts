/**
 * Determinate or indeterminate progress bar.
 */
export interface ProgressProps {
  value?: number;
  max?: number;
  /** Mono uppercase label above the track. */
  label?: string;
  /** Show the percent readout. @default false */
  showValue?: boolean;
  /** Ignore value; show a looping sweep. @default false */
  indeterminate?: boolean;
}
export declare function Progress(props: ProgressProps): JSX.Element;
