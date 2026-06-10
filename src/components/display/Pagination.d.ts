/**
 * Page navigation with truncation (… ) for large ranges.
 */
export interface PaginationProps {
  /** Current page (1-indexed). */
  page: number;
  /** Total page count. */
  total: number;
  onChange?: (page: number) => void;
}
export declare function Pagination(props: PaginationProps): JSX.Element;
