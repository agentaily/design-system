/**
 * Vertically stacked disclosure sections. Plus-icon rotates to a cross when open.
 */
export interface AccordionProps {
  /** { id?, title, content }. */
  items: Array<{ id?: string; title: React.ReactNode; content: React.ReactNode }>;
  /** Allow multiple open at once. @default false */
  multiple?: boolean;
  /** ids open on mount. */
  defaultOpen?: string[];
}
export declare function Accordion(props: AccordionProps): JSX.Element;
