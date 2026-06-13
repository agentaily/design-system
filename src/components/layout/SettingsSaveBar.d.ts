/**
 * SettingsSaveBar — the per-tab bottom save bar for a settings page (GitHub
 * model: one bar at the bottom of each tab, committing ALL fields in that tab).
 * Goes in a `PanelSheet` / `SettingsSheet` `footer` slot. Explicit commit, not
 * auto-save: edits stay local until 保存 is clicked.
 *
 * Pairs with `Form.useForm` — pass `form` and it reads `isDirty / isValid /
 * isSubmitting`, gates 保存 on dirty+valid, validates-then-commits on click, and
 * 放弃更改 calls `form.reset()`. For non-useForm content (e.g. the connection
 * cards), pass explicit `dirty` / `saving` / `status` / `onSave` / `onReset`.
 *
 * Renders only the footer status + actions (via `<PanelFooter>`); the sticky
 * band comes from the sheet.
 */
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
  /** Error text shown when `status === "error"`. */
  error?: string;
  /** Commit handler. With `form` it receives validated `values`; otherwise called bare. */
  onSave?: (values?: any) => void | Promise<void>;
  /** Revert handler (runs in addition to `form.reset()` when `form` is present). */
  onReset?: () => void;
  /** @default "保存" */
  saveLabel?: string;
  /** @default "放弃更改" */
  resetLabel?: string;
  /** Left text when clean. @default "全部更改已保存" */
  cleanHint?: string;
  /** Left text when dirty. @default "有未保存的更改" */
  dirtyHint?: string;
  /** Render nothing while clean (the bar only appears once the tab is dirty/saving/errored). @default false */
  hideWhenClean?: boolean;
  /** Show the 放弃更改 button. @default true (when `form` or `onReset` is available) */
  showReset?: boolean;
}
export declare function SettingsSaveBar(props: SettingsSaveBarProps): JSX.Element | null;
