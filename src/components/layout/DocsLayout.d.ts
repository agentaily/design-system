/**
 * Three-pane documentation frame: left section nav, centered article, right
 * on-this-page TOC. The article is `children`; nav + TOC are data-driven and
 * controlled (via active/on props) or self-managed. Collapses to two panes < 1080px.
 */
export interface DocsSection {
  title: string;
  items: string[];
}
export interface DocsLayoutProps {
  /** Nav brand lockup. @default <BrandMark wordmark blink={false} /> */
  brand?: React.ReactNode;
  sections?: DocsSection[];
  activeItem?: string;
  onNavigate?: (item: string) => void;
  toc?: string[];
  activeToc?: string;
  onTocChange?: (item: string) => void;
  /** @default "On this page" */
  tocLabel?: string;
  /** Article content. */
  children?: React.ReactNode;
}
export declare function DocsLayout(props: DocsLayoutProps): JSX.Element;
