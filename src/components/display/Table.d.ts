/**
 * Data table inside a bordered, horizontally-scrollable frame. Mono headers.
 */
export interface TableColumn {
  key: string;
  label?: string;
  /** Right-align + mono the cells (use for figures). */
  numeric?: boolean;
  align?: "left" | "right";
  /** Custom cell renderer: (value, row) => node. */
  render?: (value: any, row: any) => React.ReactNode;
}
export interface TableProps {
  /** Strings or TableColumn objects. */
  columns: Array<string | TableColumn>;
  rows: Array<Record<string, any>>;
  /** Row hover highlight. @default true */
  hover?: boolean;
}
export declare function Table(props: TableProps): JSX.Element;
