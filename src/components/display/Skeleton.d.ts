/**
 * Shimmering loading placeholder.
 */
export interface SkeletonProps {
  /** @default "block" */
  variant?: "block" | "text" | "circle";
  width?: string | number;
  height?: string | number;
  /** For variant="text": render N stacked lines (last is shorter). @default 1 */
  lines?: number;
}
export declare function Skeleton(props: SkeletonProps): JSX.Element;
