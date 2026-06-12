/**
 * FeishuCard — a **pure-display** connection card for a Feishu (Lark) Bitable
 * data sink.
 *
 * It renders one card (header · App ID · App Secret · share link · parsed
 * App-Token/table read-out · security note · optional field-mapping table ·
 * help · TestRow) and nothing else. **No state, no localStorage, no save bar, no
 * gating** — props in, events out. The caller owns the config object,
 * persistence, the Save button, backend-error display, and the "both connected?"
 * gate. The only thing the card derives locally is the App-Token / table read-out
 * parsed from the share link (pure display).
 *
 * `status` / `result` are caller-controlled: run your probe on `onTest`, then
 * push `status` + `result` back. Reset `status` to `"idle"` from your change
 * handlers to clear a green pill after an edit.
 */
import type { ConnectionHelp } from "./DeepSeekCard";
export interface FeishuFieldMapRow {
  /** Source field label, or null for an auto-filled column. */
  from: string | null;
  /** Destination Bitable column. */
  to: string;
  /** Small mono tag after the column, e.g. "单选" | "自动". */
  tag?: string | null;
}
export interface FeishuCardProps {
  /** Feishu app id (public). */
  appId?: string;
  onAppIdChange?: (value: string) => void;
  /** Feishu app secret. Empty while a stored secret is `masked` + untouched. */
  secret?: string;
  onSecretChange?: (value: string) => void;
  /** Bitable share URL — App Token + table id are auto-parsed for the read-out. */
  link?: string;
  onLinkChange?: (value: string) => void;
  /** Connection status — caller-controlled; drives the StatusPill, card tint, and TestRow. @default "idle" */
  status?: "idle" | "testing" | "ok" | "error";
  /** Result line shown in the TestRow for ok / error. */
  result?: string;
  /** Fires when the user clicks Test — run your probe and push `status`/`result` back. */
  onTest?: () => void;
  /**
   * A secret is already stored server-side. While true and `secret` is empty, the
   * field shows a masked placeholder and still counts as present for the Test
   * button. Typing overrides. @default false
   */
  masked?: boolean;
  /** Field-level errors (e.g. backend 400s) under the matching inputs. */
  appIdError?: string;
  secretError?: string;
  linkError?: string;
  /** Rows for the auto field-mapping table. @default a 7-row RSVP sample */
  fieldMap?: FeishuFieldMapRow[];
  /** Show the field-mapping table. @default true once `status === "ok"` */
  showMapping?: boolean;
  /** Override the "如何获取…" guide — a `{title, steps, link}` object or a ready React node. */
  help?: ConnectionHelp | React.ReactNode;
  /** Override the derived Test-enabled state. Default: App ID + (secret or masked) + a parseable link. */
  canTest?: boolean;
  /** Idle hint in the TestRow before the first test. */
  idleHint?: string;
}
export declare function FeishuCard(props: FeishuCardProps): JSX.Element;
/** Parse `{ token, table }` out of a Bitable share URL (table may be ""). Returns null if no app_token. */
export declare function parseFeishuLink(url: string): { token: string; table: string } | null;
