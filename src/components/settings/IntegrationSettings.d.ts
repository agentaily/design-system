/**
 * Fullscreen integration modal: connect a DeepSeek key (conversation engine) and
 * a Feishu Bitable (data sink). Reports a 0/2 readiness state and gates Save until
 * both connect. Composes SecretField, StatusPill, TestRow, HelpSteps. The monthly
 * usage-cap block is opt-in.
 *
 * Two storage modes:
 * - **Uncontrolled (default):** self-persists the whole config to localStorage —
 *   the legacy behavior, unchanged when none of the seam props below are passed.
 * - **Controlled / backend-wired:** pass `value` + `onChange` to hold the config
 *   yourself (no localStorage writes), `onSave`/`onTest` to reach a real backend,
 *   `readiness` to reflect server-known connection state, and `masked` so stored
 *   secrets echo masked and are never re-submitted.
 */
export interface IntegrationConfig {
  /** DeepSeek API key. Empty when masked + untouched (caller keeps the stored one). */
  dsKey: string;
  /** Conversation model id, e.g. "deepseek-chat" | "deepseek-reasoner". */
  dsModel: string;
  /** Monthly usage-cap toggle. */
  capOn: boolean;
  /** Monthly cap amount (digits-only string). */
  cap: string;
  /** DeepSeek connection status. */
  dsStatus: "idle" | "testing" | "ok" | "error";
  /** DeepSeek test result line. */
  dsResult: string;
  /** Feishu app id (public). */
  appId: string;
  /** Feishu app secret. Empty when masked + untouched. */
  secret: string;
  /** Feishu Bitable share URL (app_token + table auto-parsed). */
  link: string;
  /** Feishu connection status. */
  fsStatus: "idle" | "testing" | "ok" | "error";
  /** Feishu test result line. */
  fsResult: string;
  /** Whether the last config was saved. */
  saved: boolean;
}
export interface IntegrationSettingsProps {
  /** Close handler (Esc + the × button + overlay). */
  onClose?: () => void;
  /** Show the DeepSeek monthly usage-cap warning + toggle. @default true */
  showUsageCap?: boolean;
  /** localStorage key for the persisted config (uncontrolled mode only). @default "agentaily.integrations.v1" */
  storageKey?: string;
  /**
   * Controlled config. When provided, this is the source of truth — the modal
   * stops reading/writing localStorage and every edit flows out via `onChange`.
   * Omit for the self-persisting default.
   */
  value?: IntegrationConfig;
  /** Fires with the next full config on every edit/test (controlled mode). */
  onChange?: (next: IntegrationConfig) => void;
  /**
   * Persist handler. Receives the current config (masked secrets stay empty —
   * treat empty as "keep the stored one"). Return a Promise: Save is disabled and
   * spins while it's pending, marks saved on resolve, and stays dirty on reject.
   * When omitted, Save just flips the in-component saved state.
   */
  onSave?: (value: IntegrationConfig) => void | Promise<void>;
  /**
   * Connection probe. `which` is "deepseek" | "feishu"; return
   * `Promise<{ ok, message }>` to drive that card's StatusPill + TestRow. When
   * omitted, a built-in mock probe runs (validates key shape / link parsing).
   */
  onTest?: (which: "deepseek" | "feishu") => Promise<{ ok: boolean; message?: string }>;
  /**
   * External readiness override. When set, these flags (not the in-app test
   * status) decide the 0/2 rail, Save gating, and the green pills — e.g. show
   * "connected" for credentials already verified server-side. Live testing/error
   * transitions still surface on the pill.
   */
  readiness?: { deepseek?: boolean; feishu?: boolean };
  /**
   * Masked-echo flags for already-stored secrets. When `deepseek`/`feishu` is
   * true and the field is untouched, it renders a masked placeholder, keeps its
   * value empty, and still counts as "present" for testing — so the mask is never
   * sent back as a new value. Typing overrides the mask for that field.
   */
  masked?: { deepseek?: boolean; feishu?: boolean };
}
export declare function IntegrationSettings(props: IntegrationSettingsProps): JSX.Element;
