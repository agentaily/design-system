/**
 * Centered single-column settings frame: sticky bar (brand + actions), heading,
 * optional tab row, and section cards as `children`. Use the bundled
 * `SettingsPage.Card` for consistent section cards.
 */
export interface SettingsTab {
  id: string;
  label: string;
}
export interface SettingsPageProps {
  /** Bar brand lockup. @default <BrandMark wordmark blink={false} /> */
  brand?: React.ReactNode;
  /** Mono breadcrumb word shown after the brand (rendered as "/ <word>"). @default "settings" */
  word?: string;
  /** @default "Settings" */
  title?: string;
  subtitle?: string;
  /** Tab row — strings or {id,label}. */
  tabs?: (SettingsTab | string)[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  /** Right side of the sticky bar (Cancel / Save). */
  actions?: React.ReactNode;
  /** Section cards (ideally SettingsPage.Card). */
  children?: React.ReactNode;
}
export declare function SettingsPage(props: SettingsPageProps): JSX.Element;
export declare namespace SettingsPage {
  interface CardProps { title?: string; description?: string; children?: React.ReactNode; }
  function Card(props: CardProps): JSX.Element;
}
