/**
 * IntegrationSettings (alias: **ServiceConnections**) — the "集成 / Integrations"
 * SECTION of a settings page. It is content, NOT a panel: it does not own a
 * shell. Drop it into `<SettingsSheet>` (which floats it via `<PanelSheet>`).
 *
 *   <SettingsSheet>
 *     <IntegrationSettings ready={n} total={m}>   ← this section
 *       <DeepSeekCard/> <FeishuCard/>             ← composed-in cards
 *     </IntegrationSettings>
 *   </SettingsSheet>
 *
 * COMPOSITIONAL: slot connection cards in via `children`; the section wraps them
 * with the integration hero + a readiness rail (driven by `ready`/`total`). Pass
 * NO children and it renders the default DeepSeekCard + FeishuCard from `config`
 * and derives readiness itself, so it also works standalone. It owns NO save UI:
 * the container's `<SettingsSaveBar>` (SettingsSheet footer) is the commit point.
 */
export interface IntegrationConfig {
  dsKey?: string;
  dsModel?: string;
  dsStatus?: "idle" | "testing" | "ok" | "error";
  dsResult?: string;
  dsKeyError?: string;
  hasStoredKey?: boolean;
  appId?: string;
  secret?: string;
  link?: string;
  fsStatus?: "idle" | "testing" | "ok" | "error";
  fsResult?: string;
  appIdError?: string;
  secretError?: string;
  linkError?: string;
  hasStoredSecret?: boolean;
}
export interface IntegrationSettingsProps {
  /** Connection cards to compose into the section. Omit to render the default DeepSeek + Feishu pair from `config`. */
  children?: React.ReactNode;
  /** Connected count for the readiness rail (compositional mode). */
  ready?: number;
  /** Total connections for the readiness rail (compositional mode). */
  total?: number;
  /** Show the readiness rail. Hidden automatically when neither `ready`/`total` nor default cards give a total. @default true */
  showRail?: boolean;
  /** Controlled config for the DEFAULT cards (no children). Provide with `onConfigChange`. */
  config?: IntegrationConfig;
  /** Receives a partial patch on every default-card change. */
  onConfigChange?: (patch: Partial<IntegrationConfig>) => void;
  /** Seed for uncontrolled default-card state. */
  defaultConfig?: IntegrationConfig;
  /** Run your DeepSeek probe (default-card mode). Default: a mock that resolves "ok". */
  onTestDeepSeek?: () => void;
  /** Run your Feishu probe (default-card mode). Default: a mock. */
  onTestFeishu?: () => void;
  /** Extra props spread onto the default DeepSeekCard. */
  deepSeekProps?: Record<string, unknown>;
  /** Extra props spread onto the default FeishuCard. */
  feishuProps?: Record<string, unknown>;
  /** Hero eyebrow. @default "集成 · INTEGRATIONS" */
  kicker?: React.ReactNode;
  /** Hero heading. @default "连接你的服务" */
  title?: string;
  /** Hero paragraph. */
  intro?: React.ReactNode;
}
export declare function IntegrationSettings(props: IntegrationSettingsProps): JSX.Element;
/** Semantic alias for `IntegrationSettings` — identical component. */
export declare const ServiceConnections: typeof IntegrationSettings;
