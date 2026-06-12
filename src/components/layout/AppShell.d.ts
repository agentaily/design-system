/**
 * The standard product frame: fixed sidebar (brand · nav · account) + main
 * column (topbar · scrolling content). Every region is a slot. Nav is
 * controlled via activeId/onNavigate, or self-manages if you omit them.
 */
export interface AppShellNavItem {
  id: string;
  label: string;
  /** Leading icon node (e.g. <Icon name="layout" size={16} />). */
  icon?: React.ReactNode;
}
export interface AppShellProps {
  /** Sidebar brand lockup. @default <BrandMark wordmark blink={false} /> */
  brand?: React.ReactNode;
  nav?: AppShellNavItem[];
  /** Mono label above the nav. @default "Navigate" */
  navLabel?: string;
  /** Controlled active nav id; omit to let the shell manage it. */
  activeId?: string;
  onNavigate?: (id: string) => void;
  /** Sidebar footer slot — typically <AccountControl /> or an account chip. */
  account?: React.ReactNode;
  /** Left side of the topbar (breadcrumb / title). */
  crumb?: React.ReactNode;
  /** Right side of the topbar (search, primary action, etc.). */
  actions?: React.ReactNode;
  /** Main content. */
  children?: React.ReactNode;
}
export declare function AppShell(props: AppShellProps): JSX.Element;
