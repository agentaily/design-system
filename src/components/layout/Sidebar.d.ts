/** Generic app sidebar: grouped nav items with icons, badges, active accent bar; collapsible to icons. */
export interface SidebarItem { id: string; label: string; icon?: React.ReactNode; badge?: React.ReactNode; }
export interface SidebarGroup { label?: string; items: SidebarItem[]; }
export interface SidebarProps { groups: SidebarGroup[]; activeId?: string; onSelect?: (id: string) => void; header?: React.ReactNode; footer?: React.ReactNode; collapsed?: boolean; }
export declare function Sidebar(props: SidebarProps): JSX.Element;
