/** Right-click context menu; items support icons, shortcuts, danger, separators, labels. */
export interface ContextMenuItem { label?: React.ReactNode; icon?: React.ReactNode; shortcut?: string; danger?: boolean; onSelect?: () => void; type?: "separator" | "label"; }
export interface ContextMenuProps { items: ContextMenuItem[]; children?: React.ReactNode; }
export declare function ContextMenu(props: ContextMenuProps): JSX.Element;
