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
  children?: React.ReactNode;
}
export declare function Message(props: MessageProps): JSX.Element;
