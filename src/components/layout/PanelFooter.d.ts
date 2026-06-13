/**
 * PanelFooter — optional content for a PanelSheet / SettingsSheet `footer` slot.
 *
 * Lays out a `status` region (left, fills) + an `actions` region (right, pinned
 * to the trailing edge), aligned to the sheet's gutters. It renders only these
 * slots — the sticky band, border and background come from the sheet's own
 * footer band. Use it as `footer={<PanelFooter status=… actions=… />}`.
 *
 * Everything is optional: a status-only footer (e.g. a hint or sync indicator) is
 * valid — don't add action buttons that duplicate the sheet's ✕ close.
 */
export interface PanelFooterProps {
  /** Left region — fills the row (e.g. a hint or status). */
  status?: React.ReactNode;
  /** Right region — pinned to the trailing edge (e.g. action buttons). */
  actions?: React.ReactNode;
  /** Freeform content rendered between status and actions. */
  children?: React.ReactNode;
}
export declare function PanelFooter(props: PanelFooterProps): JSX.Element;
