/**
 * Two-pane AI-designer frame: a chat column + a live preview, separated by a
 * draggable divider, collapsing to one pane with a segmented switcher on phones.
 * Pure frame — pass `chat` / `preview` / top-bar slots and mount your own
 * overlays (AuthDialog, IntegrationSettings, MarkupLayer) as siblings. The
 * preview pane is position:relative so a MarkupLayer can fill it.
 */
export interface DesignerShellProps {
  /** Top-bar brand lockup. @default <BrandMark wordmark blink={false} /> */
  brand?: React.ReactNode;
  /** Breadcrumb after the brand. @default "设计器" */
  crumb?: React.ReactNode;
  /** Centered top-bar title slot. */
  title?: React.ReactNode;
  /** Top-bar actions (before the account control). */
  actions?: React.ReactNode;
  /** Account control, pinned to the far right (auto-separated from actions). */
  account?: React.ReactNode;
  /** Left pane content (thread + composer). */
  chat?: React.ReactNode;
  /** Right pane content (preview); the pane is position:relative. */
  preview?: React.ReactNode;
  /** Controlled chat-pane width fraction (0–1). Omit for uncontrolled (uses defaultSplit). */
  split?: number;
  /** Fires with the new fraction on divider drag — wire to a slider/Tweak so drag writes back. */
  onSplitChange?: (fraction: number) => void;
  /** Initial chat-pane width fraction when uncontrolled. @default 0.42 */
  defaultSplit?: number;
  /** Min/max chat-pane fraction while dragging. @default 0.28 / 0.7 */
  minSplit?: number;
  maxSplit?: number;
  /** Phone segmented-switcher labels — any node (icon + count badge ok; use class `ax-dshell__mcount` for a count). @default { chat: "对话", preview: "预览" } */
  mobileLabels?: { chat: React.ReactNode; preview: React.ReactNode };
  /** Controlled phone pane: "chat" | "preview". Omit for uncontrolled (starts on chat). */
  mobileView?: "chat" | "preview";
  /** Fires when the phone switcher changes — set it to auto-jump to preview after generating. */
  onMobileViewChange?: (view: "chat" | "preview") => void;
}
export declare function DesignerShell(props: DesignerShellProps): JSX.Element;
