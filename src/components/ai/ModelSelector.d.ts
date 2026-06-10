/**
 * Model picker dropdown with the ▣ glyph, descriptions, tags and a check on the active model.
 */
export interface ModelOption {
  value: string;
  description?: string;
  /** Small uppercase tag, e.g. "NEW" or "FAST". */
  tag?: string;
}
export interface ModelSelectorProps {
  /** Selected model id. */
  value: string;
  /** Strings or ModelOption objects. */
  models: Array<string | ModelOption>;
  onChange?: (value: string) => void;
  /** Panel alignment. @default "start" */
  align?: "start" | "end";
}
export declare function ModelSelector(props: ModelSelectorProps): JSX.Element;
