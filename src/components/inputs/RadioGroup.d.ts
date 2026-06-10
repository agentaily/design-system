/**
 * Square-marked radio group. Options can carry a description line.
 */
export interface RadioGroupProps {
  /** Shared input name. */
  name: string;
  /** Selected value. */
  value?: string;
  /** Strings or { value, label, description?, disabled? }. */
  options: Array<string | { value: string; label: string; description?: string; disabled?: boolean }>;
  onChange?: (value: string) => void;
  /** Lay options out horizontally. @default false */
  row?: boolean;
}
export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
