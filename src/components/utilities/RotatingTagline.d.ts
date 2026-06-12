/**
 * RotatingTagline — the brand's signature animated headline. A fixed prefix
 * (e.g. "聊天，") followed by a phrase that types in, holds, deletes, and
 * advances. The rotating phrase wears the flowing geek-rainbow gradient; a
 * block cursor trails it and blinks only at rest. Font size/weight inherit
 * from the parent — size it by styling the container. Respects
 * prefers-reduced-motion (whole-phrase swap, no gradient flow).
 */
export interface RotatingTaglineProps {
  /** Static text shown before the rotating phrase. @default "聊天，" */
  prefix?: string;
  /** Phrases cycled through, in order. @default ["构建万物","生成万物","设计万物","学习万物"] */
  phrases?: string[];
  /** Paint the rotating phrase with the flowing rainbow gradient. @default true */
  gradient?: boolean;
  /** Show the trailing block cursor. @default true */
  cursor?: boolean;
  /** Put a <br/> between prefix and phrase (two-line tagline). @default false */
  breakAfterPrefix?: boolean;
  /** Per-character type-in delay, ms. @default 140 */
  typeSpeed?: number;
  /** Per-character delete delay, ms. @default 70 */
  deleteSpeed?: number;
  /** Hold time on the full phrase before deleting, ms. @default 1700 */
  hold?: number;
  /** Gradient flow loop duration (CSS time). @default "1.2s" */
  flowDuration?: string;
  className?: string;
}
export declare function RotatingTagline(props: RotatingTaglineProps): JSX.Element;
