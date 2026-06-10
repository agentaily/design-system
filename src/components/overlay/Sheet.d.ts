/**
 * Edge-anchored slide-in panel (drawer) on a blurred scrim.
 */
export interface SheetProps {
  /** @default true */
  open?: boolean;
  /** Edge to anchor to. @default "right" */
  side?: "right" | "left" | "bottom";
  title?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
}
export declare function Sheet(props: SheetProps): JSX.Element;
