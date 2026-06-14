/**
 * Test-connection footer for a connection card: an inline status result paired
 * with a test/re-test button. Drives off a single `status` string with four
 * states. Renders inside any card (it draws its own top border + panel fill).
 */
/**
 * User-facing strings, merged over the English defaults. DS is locale-agnostic;
 * pass `copy` (any subset) to localize. The explicit `idleHint` / `testLabel` /
 * `retestLabel` props, when given, take precedence over the matching copy field.
 */
export interface TestRowCopy {
  /** Idle-state text before the first test. @default "Not tested yet" */
  idle?: string;
  /** Text shown while testing. @default "Handshaking…" */
  testing?: string;
  /** Test button label (idle/error). @default "Test connection" */
  test?: string;
  /** Test button label when already connected. @default "Test again" */
  retest?: string;
}
export interface TestRowProps {
  /** @default "idle" */
  status?: "idle" | "testing" | "ok" | "error";
  /** Result text shown for the ok / error states. */
  result?: string;
  onTest?: () => void;
  /** Disable the button (e.g. required fields empty). Testing also disables it. */
  disabled?: boolean;
  /** Idle-state text. Overrides `copy.idle`. @default copy.idle ("Not tested yet") */
  idleHint?: string;
  /** Test button label. Overrides `copy.test`. @default copy.test ("Test connection") */
  testLabel?: string;
  /** Re-test button label. Overrides `copy.retest`. @default copy.retest ("Test again") */
  retestLabel?: string;
  /** Localizable strings, merged over the English defaults. */
  copy?: TestRowCopy;
}
export declare function TestRow(props: TestRowProps): JSX.Element;
