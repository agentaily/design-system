/**
 * BrandMark — the agentaily mark (cursor block inside corner ticks), optionally
 * followed by the typed lowercase wordmark. Monochrome in currentColor; inverts
 * with the theme. Never recolor with a hue.
 */
export interface BrandMarkProps {
  /** Mark size in px (stroke scales with it). @default 20 */
  size?: number;
  /** Render the "agentaily" wordmark after the mark. @default false */
  wordmark?: boolean;
  /** Show the block cursor after the wordmark. Off by default in lockups; opt in for the liveness motif. @default false */
  cursor?: boolean;
  /** Animate the cursor (blink). Set false for a solid, static cursor. @default true */
  blink?: boolean;
  className?: string;
}
export declare function BrandMark(props: BrandMarkProps): JSX.Element;
