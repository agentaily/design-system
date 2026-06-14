/**
 * DeepSeekCard — a **pure-display** connection card for a DeepSeek LLM key.
 *
 * It renders one card (header · masked key field · help ·
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
export interface ConnectionHelp {
  title: string;
  steps: React.ReactNode[];
  link?: { href: string; label: string };
  defaultOpen?: boolean;
}
/**
 * Every user-facing string in the card, merged over the English defaults. DS is
 * locale-agnostic — pass `copy` (any subset) to localize; it is forwarded down
 * to the ConnectionCard shell + its TestRow, so one object covers the whole card.
 * The explicit `help` / `idleHint` props still win over `copy.help` / `copy.idleHint`.
 */
export interface DeepSeekCardCopy {
  /** Card title. @default "DeepSeek" */
  title?: React.ReactNode;
  /** Body description. @default English blurb */
  desc?: React.ReactNode;
  /** Collapsed summary when connected. @default "Connected" */
  connected?: string;
  /** Collapsed summary when not connected. @default "Not connected" */
  disconnected?: string;
  /** aria-label for the collapse toggle. @default "Collapse" */
  collapse?: string;
  /** Label for the API key field. @default "API KEY" */
  apiKeyLabel?: React.ReactNode;
  /** Placeholder when the field is empty. @default "sk-xxxx…" */
  keyPlaceholder?: string;
  /** Placeholder when a key is stored + masked. @default "Saved … leave blank to keep" */
  maskedPlaceholder?: string;
  /** Hint under the field when a key is stored + masked. @default English hint */
  maskedHint?: string;
  /** TestRow idle hint before the first test. @default "Enter a key, then test the connection" */
  idleHint?: string;
  /** TestRow text while testing. @default "Handshaking…" */
  testing?: string;
  /** Test button label. @default "Test connection" */
  test?: string;
  /** Re-test button label (when connected). @default "Test again" */
  retest?: string;
  /** Default "how to get a key" guide. @default English steps. Overridden by the `help` prop. */
  help?: ConnectionHelp | React.ReactNode;
}
export interface DeepSeekCardProps {
  /** API key value (controlled). Empty while a stored key is `masked` + untouched. */
  apiKey?: string;
  onApiKeyChange?: (value: string) => void;
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
  /** Override the "how to get a key" guide — a `{title, steps, link}` object or a ready React node. Wins over `copy.help`. */
  help?: ConnectionHelp | React.ReactNode;
  /** Override the derived Test-enabled state. Default: enabled when a key is present or `masked`. */
  canTest?: boolean;
  /** Idle hint in the TestRow before the first test. Overrides `copy.idleHint`. */
  idleHint?: string;
  /** Collapse to a one-line summary when connected (`status === "ok"`); expands on click. @default true */
  collapsible?: boolean;
  /** Controlled expanded state (overrides the connected-collapses-by-default behavior). */
  expanded?: boolean;
  onExpandedChange?: (open: boolean) => void;
  /** All user-facing strings, merged over the English defaults + forwarded to the shell/TestRow. */
  copy?: DeepSeekCardCopy;
}
export declare function DeepSeekCard(props: DeepSeekCardProps): JSX.Element;
