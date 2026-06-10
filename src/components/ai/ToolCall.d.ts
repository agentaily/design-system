/**
 * Tool / function-call display: mono name(), status pill, expandable args + result.
 */
export interface ToolCallProps {
  /** Function name, rendered mono as name(). */
  name: string;
  /** Arguments — object (pretty-printed JSON) or string. */
  args?: any;
  /** Result — object or string. */
  result?: any;
  /** @default "done" */
  status?: "running" | "done" | "error";
  /** Expanded on mount. @default false */
  defaultOpen?: boolean;
}
export declare function ToolCall(props: ToolCallProps): JSX.Element;
