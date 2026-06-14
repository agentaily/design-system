/**
 * SettingsSaveBar — the per-tab bottom save bar for a settings page (GitHub
 * model: one bar at the bottom of each tab, committing ALL fields in that tab).
 * Goes in a `PanelSheet` / `SettingsSheet` `footer` slot. Explicit commit, not
 * auto-save: edits stay local until 保存 is clicked.
 *
 * Pairs with `Form.useForm` — pass `form` and it reads `isDirty / isValid /
 * isSubmitting`, gates Save on dirty+valid, validates-then-commits on click, and
 * the reset button calls `form.reset()`. For non-useForm content (e.g. the
 * connection cards), pass explicit `dirty` / `saving` / `status` / `onSave` / `onReset`.
 *
 * Renders only the footer status + actions (via `<PanelFooter>`); the sticky
 * band comes from the sheet.
 */
/**
 * User-facing strings, merged over the English defaults. DS is locale-agnostic —
 * pass `copy` to localize. The explicit label props (`saveLabel` / `resetLabel` /
 * `cleanHint` / `dirtyHint` / `error`) still win over the matching copy field.
 */
export interface SettingsSaveBarCopy {
  /** Save button. @default "Save" */
  save?: string;
  /** Reset/discard button. @default "Discard changes" */
  reset?: string;
  /** Left status while saving. @default "Saving…" */
  saving?: string;
  /** Left status after a successful save. @default "Saved" */
  saved?: string;
  /** Default error text when `status === "error"` and no `error` prop. @default "Couldn’t save — please retry" */
  error?: string;
  /** Left status when clean. @default "All changes saved" */
  cleanHint?: string;
  /** Left status when dirty. @default "Unsaved changes" */
  dirtyHint?: string;
}
export interface SettingsSaveBarProps {
  /** A `Form.useForm()` return. When given, dirty/valid/submitting + reset + validated submit are wired automatically. */
  form?: {
    isDirty: boolean;
    isValid: boolean;
    isSubmitting: boolean;
    reset: () => void;
    handleSubmit: (onValid: (values: any) => void | Promise<void>) => (e?: any) => void;
  };
  /** Explicit dirty flag (overrides `form.isDirty`). */
  dirty?: boolean;
  /** Explicit validity gate (overrides `form.isValid`). @default true */
  valid?: boolean;
  /** Explicit saving flag (overrides `form.isSubmitting`). */
  saving?: boolean;
  /** Explicit status for the left text. @default derived */
  status?: "idle" | "saving" | "saved" | "error";
  /** Error text shown when `status === "error"`. Overrides `copy.error`. */
  error?: string;
  /** Commit handler. With `form` it receives validated `values`; otherwise called bare. */
  onSave?: (values?: any) => void | Promise<void>;
  /** Revert handler (runs in addition to `form.reset()` when `form` is present). */
  onReset?: () => void;
  /** Save button label. Overrides `copy.save`. @default copy.save ("Save") */
  saveLabel?: string;
  /** Reset button label. Overrides `copy.reset`. @default copy.reset ("Discard changes") */
  resetLabel?: string;
  /** Left text when clean. Overrides `copy.cleanHint`. @default copy.cleanHint ("All changes saved") */
  cleanHint?: string;
  /** Left text when dirty. Overrides `copy.dirtyHint`. @default copy.dirtyHint ("Unsaved changes") */
  dirtyHint?: string;
  /** Localizable strings, merged over the English defaults. */
  copy?: SettingsSaveBarCopy;
  /** Render nothing while clean (the bar only appears once the tab is dirty/saving/errored). @default false */
  hideWhenClean?: boolean;
  /** Show the reset/discard button. @default true (when `form` or `onReset` is available) */
  showReset?: boolean;
}
export declare function SettingsSaveBar(props: SettingsSaveBarProps): JSX.Element | null;
