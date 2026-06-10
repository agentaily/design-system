/**
 * Mono uppercase breadcrumb trail; last item is the current page.
 */
export interface BreadcrumbProps {
  /** Strings or { id?, label }. */
  items: Array<string | { id?: string; label: string }>;
  /** Separator glyph. @default "/" */
  separator?: string;
  onNavigate?: (id: string) => void;
}
export declare function Breadcrumb(props: BreadcrumbProps): JSX.Element;
