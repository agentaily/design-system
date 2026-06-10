/** Marketing nav with hover mega-menu dropdowns (1 or 2 columns). */
export interface NavMenuLink { title: string; description?: string; href?: string; }
export interface NavMenuItem { label: string; href?: string; links?: NavMenuLink[]; }
export interface NavigationMenuProps { items: NavMenuItem[]; }
export declare function NavigationMenu(props: NavigationMenuProps): JSX.Element;
