/**
 * Inline alert with a status bar (or icon) and optional title.
 */
export interface AlertProps {
  /** @default "neutral" */
  variant?: "neutral" | "ok" | "warn" | "danger";
  /** Optional leading icon (replaces the status bar). */
  icon?: React.ReactNode;
  title?: React.ReactNode;
  children?: React.ReactNode;
}
export declare function Alert(props: AlertProps): JSX.Element;
