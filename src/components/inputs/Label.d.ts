/**
 * Form label. Defaults to the mono ALL-CAPS motif; `plain` for sentence-case.
 */
export interface LabelProps {
  /** Sentence-case body label instead of mono uppercase. @default false */
  plain?: boolean;
  /** Append a red required asterisk. @default false */
  required?: boolean;
  disabled?: boolean;
  htmlFor?: string;
  children?: React.ReactNode;
}
export declare function Label(props: LabelProps): JSX.Element;
