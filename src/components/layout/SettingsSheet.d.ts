/**
 * SettingsSheet — a floating SETTINGS PAGE built on top of `<PanelSheet>`. The
 * middle layer in the chain:
 *
 *   PanelSheet (floating shell)
 *     └ SettingsSheet (settings page) ← this
 *         └ PageSection / other section  (content slot)
 *             └ DeepSeekCard …            (composed-in connection cards)
 *
 * It wraps PanelSheet and adds an optional left section nav (集成 / 通用 / 账户…)
 * + a centered content column for the active section's content (`children`).
 * Shell chrome — bar, rise animation, Esc, sticky footer — all come from
 * PanelSheet.
 *
 * Floats over everything via PanelSheet (vs an in-flow settings frame that lives
 * inside an AppShell region and never floats).
 */
export interface SettingsNavItem {
  id: string;
  label: string;
  /** Icon name from the bundled Icon set (e.g. "plug", "settings", "user"). */
  icon?: string;
}
export interface SettingsSheetProps {
  /** Mounted only while true. @default true */
  open?: boolean;
  /** Close handler — forwarded to PanelSheet (renders ✕ + wires Esc). */
  onClose?: () => void;
  /** Mono breadcrumb in the shell bar. @default "设置" */
  crumb?: React.ReactNode;
  /** Right-of-bar slot (before ✕). */
  actions?: React.ReactNode;
  /** Sticky footer bar (e.g. a save bar). With `nav`, it is scoped to the content pane (left edge stops at the rail, justified status-left / actions-right); with no `nav`, it becomes a full-width PanelSheet footer. */
  footer?: React.ReactNode;
  /** Section list for the left nav — strings or {id,label,icon}. Omit for a nav-less single column. */
  nav?: (SettingsNavItem | string)[];
  /** Mono label above the nav. @default "设置" */
  navLabel?: string;
  /** Controlled active section id. Omit to let the component track it internally. */
  active?: string;
  /** Fires with the chosen section id when a nav item is clicked. */
  onNavigate?: (id: string) => void;
  /** Accessible dialog label (falls back to `crumb`). */
  label?: string;
  /** Content for the active section (e.g. a `<PageSection>` of connection cards). */
  children?: React.ReactNode;
}
export declare function SettingsSheet(props: SettingsSheetProps): JSX.Element | null;
