/**
 * Icon — the single Lucide-geometry icon set for Agentaily product surfaces.
 * Stroke 2, round caps, currentColor, 24px grid. Color via `color`/`currentColor`,
 * size in px. Add icons by copying Lucide paths into the source — never freehand.
 */
export type IconName =
  | "send" | "arrow" | "arrowLeft" | "plus" | "x" | "menu" | "check" | "search"
  | "chevronDown" | "refresh" | "copy" | "trash" | "external" | "link"
  | "share" | "save" | "pen" | "target"
  | "warn" | "info" | "shield" | "zap" | "spark"
  | "key" | "table" | "plug" | "lock" | "user" | "mail" | "logout"
  | "message" | "settings" | "film" | "archive" | "folder" | "inbox" | "power" | "mic" | "code"
  | "layout" | "monitor" | "phone" | "qr"
  | "sun" | "moon" | "eye" | "eyeOff";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Icon name. Unknown names render nothing (warns once in dev). Accepts kebab aliases (eye-off, chevron-down). */
  name: IconName | string;
  /** Pixel size — sets both width and height. @default 16 */
  size?: number;
  /** Stroke width on the 24px grid. @default 2 */
  strokeWidth?: number;
}
export declare function Icon(props: IconProps): JSX.Element | null;
export declare namespace Icon {
  /** All available icon names. */
  const names: string[];
}
