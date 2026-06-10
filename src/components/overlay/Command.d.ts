/**
 * @startingPoint section="Overlay" subtitle="⌘K command palette — search + keyboard nav" viewport="600x420"
 * Command palette: fuzzy filter, ↑/↓/↵ keyboard nav, grouped results.
 */
export interface CommandItem {
  id?: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
}
export interface CommandProps {
  /** @default true */
  open?: boolean;
  /** Render without the fixed overlay (docs/specimens). @default false */
  inline?: boolean;
  /** Grouped commands: { label, items }. */
  groups: Array<{ label?: string; items: CommandItem[] }>;
  placeholder?: string;
  onClose?: () => void;
  onSelect?: (item: CommandItem) => void;
}
export declare function Command(props: CommandProps): JSX.Element;
