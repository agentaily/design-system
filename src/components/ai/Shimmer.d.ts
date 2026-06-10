/**
 * Shimmering text — a moving highlight sweep across the glyphs. Use for
 * transient loading labels ("Searching the web…").
 */
export interface ShimmerProps {
  /** Element tag to render. @default "span" */
  as?: string;
  children?: React.ReactNode;
}
export declare function Shimmer(props: ShimmerProps): JSX.Element;
