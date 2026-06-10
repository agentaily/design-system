/**
 * Notification card with a thin status bar. Presentational — position it yourself.
 */
export interface ToastProps {
  /** @default "neutral" */
  variant?: "neutral" | "ok" | "warn" | "danger";
  title: string;
  description?: string;
  /** Renders a ✕ button when provided. */
  onClose?: () => void;
}
export declare function Toast(props: ToastProps): JSX.Element;
