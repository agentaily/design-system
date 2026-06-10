/**
 * Underline tabs on a hairline rule. Optional mono count per tab.
 */
export interface TabsProps {
  /** Strings or { id, label, count? } objects. */
  items: Array<string | { id: string; label: string; count?: number }>;
  /** id of the active tab. */
  active: string;
  onChange?: (id: string) => void;
}
export declare function Tabs(props: TabsProps): JSX.Element;
