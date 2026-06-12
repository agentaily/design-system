/**
 * Test-connection footer for a connection card: an inline status result paired
 * with a test/re-test button. Drives off a single `status` string with four
 * states. Renders inside any card (it draws its own top border + panel fill).
 */
export interface TestRowProps {
  /** @default "idle" */
  status?: "idle" | "testing" | "ok" | "error";
  /** Result text shown for the ok / error states. */
  result?: string;
  onTest?: () => void;
  /** Disable the button (e.g. required fields empty). Testing also disables it. */
  disabled?: boolean;
  /** Text shown in the idle state. @default "尚未测试" */
  idleHint?: string;
  /** @default "测试连接" */
  testLabel?: string;
  /** @default "重新测试" */
  retestLabel?: string;
}
export declare function TestRow(props: TestRowProps): JSX.Element;
