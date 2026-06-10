/**
 * Native select styled to match Input, with a drawn chevron.
 */
export interface SelectProps {
  label?: string;
  /** Strings or { value, label } objects. */
  options: Array<string | { value: string; label: string }>;
  value?: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
}
export declare function Select(props: SelectProps): JSX.Element;
