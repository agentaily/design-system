/**
 * Modal dialog on a blurred overlay. inline renders without the overlay (for docs).
 */
export interface DialogProps {
  /** @default true */
  open?: boolean;
  /** Render without fixed overlay. @default false */
  inline?: boolean;
  /** Mono uppercase header label. */
  title?: string;
  /** Footer actions (right-aligned). */
  footer?: React.ReactNode;
  /** Called on overlay click / close button. */
  onClose?: () => void;
  children?: React.ReactNode;
}
export declare function Dialog(props: DialogProps): JSX.Element;
