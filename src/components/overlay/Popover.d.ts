/**
 * Click-triggered floating panel. Closes on outside-click and Escape.
 */
export interface PopoverProps {
  /** The clickable trigger element. */
  trigger: React.ReactNode;
  /** Panel content, or a render fn receiving { close }. */
  children?: React.ReactNode | ((api: { close: () => void }) => React.ReactNode);
  /** @default "bottom" */
  side?: "top" | "bottom";
  /** @default "start" */
  align?: "start" | "end";
  /** Roomier padding for prose content. @default false */
  padded?: boolean;
}
export declare function Popover(props: PopoverProps): JSX.Element;
