/**
 * DeepSeekCard — a **pure-display** connection card for a DeepSeek LLM key.
 *
 * It renders one card (header · masked key field · model select · help ·
 * TestRow) and nothing else. It holds **no state**,
 * touches **no localStorage**, and has **no save bar / no readiness gating** —
 * props in, events out. The caller owns the config object, persistence, the Save
 * button, backend-error display, and any "both connected?" gate. This mirrors the
 * DS philosophy (state lives with the caller; components only render) and makes
 * the card reusable by any product wiring a DeepSeek key, not just one modal.
 *
 * `status` / `result` are driven entirely by the caller: run your probe in
 * response to `onTest`, then push `status: "testing" → "ok" | "error"` and a
 * `result` line back in. To clear a green pill when the key is edited, reset
 * `status` to `"idle"` from your `onApiKeyChange` handler.
 */
export interface DeepSeekModelOption {
  value: string;
  label: string;
}
export interface ConnectionHelp {
  title: string;
  steps: React.ReactNode[];
  link?: { href: string; label: string };
  defaultOpen?: boolean;
}
export interface DeepSeekCardProps {
  /** API key value (controlled). Empty while a stored key is `masked` + untouched. */
  apiKey?: string;
  onApiKeyChange?: (value: string) => void;
  /** Selected model id. @default "deepseek-chat" */
  model?: string;
  onModelChange?: (value: string) => void;
  /** Model `<Select>` options. @default deepseek-chat + deepseek-reasoner */
  models?: DeepSeekModelOption[];
  /** Connection status — caller-controlled; drives the StatusPill, card tint, and TestRow. @default "idle" */
  status?: "idle" | "testing" | "ok" | "error";
  /** Result line shown in the TestRow for ok / error. */
  result?: string;
  /** Fires when the user clicks Test — run your probe and push `status`/`result` back. */
  onTest?: () => void;
  /**
   * A key is already stored server-side. While true and `apiKey` is empty, the
   * field shows a masked placeholder + "leave blank to keep" hint and still
   * counts as present for the Test button. Typing (non-empty `apiKey`) overrides.
   * @default false
   */
  masked?: boolean;
  /** Field-level error under the key input (e.g. a backend 400 on the key). */
  keyError?: string;
  /** Override the "如何获取…" guide — a `{title, steps, link}` object or a ready React node. */
  help?: ConnectionHelp | React.ReactNode;
  /** Override the derived Test-enabled state. Default: enabled when a key is present or `masked`. */
  canTest?: boolean;
  /** Idle hint in the TestRow before the first test. */
  idleHint?: string;
  /** Collapse to a one-line summary when connected (`status === "ok"`); expands on click. @default true */
  collapsible?: boolean;
  /** Controlled expanded state (overrides the connected-collapses-by-default behavior). */
  expanded?: boolean;
  onExpandedChange?: (open: boolean) => void;
}
export declare function DeepSeekCard(props: DeepSeekCardProps): JSX.Element;
