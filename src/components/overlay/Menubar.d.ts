/** Desktop-style menubar; hover to move between open menus. */
export interface MenubarMenu { label: string; items: Array<{ label?: React.ReactNode; shortcut?: string; onSelect?: () => void; type?: "separator" }>; }
export interface MenubarProps { menus: MenubarMenu[]; }
export declare function Menubar(props: MenubarProps): JSX.Element;
