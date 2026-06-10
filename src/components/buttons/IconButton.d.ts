/**
 * Square icon-only button. Pass an svg as children and always set label.
 */
export interface IconButtonProps {
  /** Visual style. @default "ghost" */
  variant?: "ghost" | "outline" | "solid";
  /** 28 / 36 / 44px square. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Accessible name (becomes aria-label + title). Required. */
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  /** The icon svg element. */
  children?: React.ReactNode;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
