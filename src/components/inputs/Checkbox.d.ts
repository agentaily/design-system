/**
 * 16px square checkbox with mono-inverted checked state.
 */
export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: any) => void;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
