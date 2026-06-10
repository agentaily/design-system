/**
 * Mono uppercase status chip. Semantic colors are used sparingly.
 */
export interface BadgeProps {
  /** @default "neutral" */
  variant?: "neutral" | "solid" | "outline" | "ok" | "warn" | "danger";
  /** Leading 6px square status dot. @default false */
  dot?: boolean;
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): JSX.Element;
