/**
 * Empty-state block: framed icon, title, description, optional actions.
 */
export interface EmptyProps {
  /** Icon element (rendered in a 44px bordered square). */
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Action buttons row. */
  actions?: React.ReactNode;
  /** Dashed border frame. @default false */
  bordered?: boolean;
}
export declare function Empty(props: EmptyProps): JSX.Element;
