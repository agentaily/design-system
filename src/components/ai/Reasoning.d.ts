/**
 * Collapsible chain-of-thought block. Shows a "Thinking…" header with a blinking
 * cursor while streaming, then a duration and expandable step list.
 */
export interface ReasoningProps {
  /** Reasoning steps (strings or nodes), shown as a connected vertical list. */
  steps?: React.ReactNode[];
  /** Mono duration shown when not streaming, e.g. "3.2s". */
  duration?: string;
  /** Live: header reads "Thinking" + cursor, auto-expanded. @default false */
  streaming?: boolean;
  /** Expanded on mount. @default false */
  defaultOpen?: boolean;
  /** Header label when settled. @default "Reasoning" */
  title?: string;
}
export declare function Reasoning(props: ReasoningProps): JSX.Element;
