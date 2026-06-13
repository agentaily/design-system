/**
 * One chat turn. User turns are right-aligned cards; assistant turns are
 * full-width prose under a mono name label.
 */
export interface MessageProps {
  /** @default "assistant" */
  role?: "user" | "assistant";
  /** Assistant label. @default "Agentaily" */
  name?: string;
  /** Mono timestamp next to the name. */
  time?: string;
  /** Append a blinking block cursor (response in progress). @default false */
  streaming?: boolean;
  /**
   * Markdown source for the body, rendered through <Markdown>. Overrides
   * `children`. (A plain string passed as `children` is also auto-rendered
   * as markdown; React-node children render unchanged for back-compat.)
   */
  markdown?: string;
  children?: React.ReactNode;
}
export declare function Message(props: MessageProps): JSX.Element;
