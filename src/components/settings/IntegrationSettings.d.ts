/**
 * Fullscreen integration modal: connect a DeepSeek key (conversation engine) and
 * a Feishu Bitable (data sink). Self-persists to localStorage, reports a 0/2
 * readiness state, and gates Save until both connect. Composes SecretField,
 * StatusPill, TestRow, HelpSteps. The monthly usage-cap block is opt-in.
 */
export interface IntegrationSettingsProps {
  /** Close handler (Esc + the × button + overlay). */
  onClose?: () => void;
  /** Show the DeepSeek monthly usage-cap warning + toggle. @default true */
  showUsageCap?: boolean;
  /** localStorage key for the persisted config. @default "agentaily.integrations.v1" */
  storageKey?: string;
}
export declare function IntegrationSettings(props: IntegrationSettingsProps): JSX.Element;
