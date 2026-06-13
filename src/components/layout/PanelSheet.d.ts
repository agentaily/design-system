/**
 * PanelSheet — a full-screen "rises up over everything" panel shell (L4 page
 * shell). The single source of the overlay-shell CSS (`.ax-psheet*`).
 *
 * **Not to be confused with two neighbours:**
 * - `<Sheet>` (overlay/) — an EDGE drawer: slides in from right/left/bottom at
 *   ~420px over a blurred scrim. Partial-viewport, dismiss by scrim click.
 * - An IN-FLOW page: a settings frame that lives inside an AppShell
 *   region, scrolls in place, never floats over anything.
 *
 * PanelSheet covers the WHOLE viewport, fades the scrim + rises the panel
 * (`s-rise`-style), and exposes three horizontally-ALIGNED bands: a slim top bar
 * (brand + breadcrumb + actions + close), a scrollable body, and an optional
 * sticky footer bar. header / body / footer share one gutter + max-width
 * (`--ax-psheet-gutter` / `--ax-psheet-max`), so the footer's actions line up
 * with the close button and its status lines up with the brand — standard dialog
 * anatomy. Esc closes; `role="dialog"` + `aria-modal`.
 *
 * Reusable by ANY full-screen product panel — the integration/service-connection
 * screen, a "我的表单 / My forms" manager, a full-screen importer, etc. Downstream
 * code that copied settings.css's `.s-overlay/.s-modal/.s-wrap` shell should
 * delete those copies and mount this instead.
 */
export interface PanelSheetProps {
  /** Mounted only while true. @default true */
  open?: boolean;
  /** Brand lockup at the bar's left. @default <BrandMark size={18} wordmark blink={false} /> */
  brand?: React.ReactNode;
  /** Wordmark text used by the default BrandMark; pass "" to render the mark only. @default "agentaily" */
  word?: string;
  /** Mono breadcrumb shown after the brand as "/ <crumb>". */
  crumb?: React.ReactNode;
  /** Right-of-bar slot, left of the close button (e.g. a secondary action). */
  actions?: React.ReactNode;
  /** Sticky footer bar content (e.g. a save bar). Omit for no footer. The footer
   * aligns with the header — use the helper classes `ax-psheet__foot-status`
   * (fills left, aligns under the brand) and `ax-psheet__foot-actions` (pins
   * right, aligns under the ✕) for the canonical status-left / actions-right layout. */
  footer?: React.ReactNode;
  /** Close handler — renders the ✕ button and wires Esc. Omit to make the panel non-dismissable from the shell. */
  onClose?: () => void;
  /** Center + width-cap the body in the shared column. Set false for full-bleed bodies (the bands then run edge to edge with just the gutter). @default true */
  wrap?: boolean;
  /** Let the top bar span the full viewport width instead of aligning to the content column — e.g. when the bar carries a wide toolbar or a left rail sits below it. @default false */
  barFullWidth?: boolean;
  /** Let the body scroll. Set false when the child manages its own scroll regions (e.g. SettingsSheet's fixed rail + scrolling content pane). @default true */
  bodyScroll?: boolean;
  /** Column width the three bands align to (number → px). Sets `--ax-psheet-max`. @default 768 */
  maxWidth?: number | string;
  /** Horizontal gutter shared by header/body/footer (number → px). Sets `--ax-psheet-gutter`. @default 24 */
  gutter?: number | string;
  /** Close on the Escape key (when `onClose` is set). @default true */
  closeOnEsc?: boolean;
  /** Accessible dialog label. Falls back to `crumb` when it is a string, else "Panel". */
  label?: string;
  className?: string;
  /** Body content. */
  children?: React.ReactNode;
}
export declare function PanelSheet(props: PanelSheetProps): JSX.Element | null;
