/**
 * Action menu. Items support icons, shortcuts, danger styling, separators and labels.
 */
export interface MenuItem {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  /** "separator" | "label" for structural rows. */
  type?: "separator" | "label";
}
export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  /** @default "start" */
  align?: "start" | "end";
}
export declare function DropdownMenu(props: DropdownMenuProps): JSX.Element;
