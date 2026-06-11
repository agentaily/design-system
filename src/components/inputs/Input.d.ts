/**
 * Single-line text field with optional mono ALL-CAPS label, hint and error.
 */
export interface InputProps {
  /** Field label, rendered as a mono uppercase eyebrow. */
  label?: string;
  /** Helper text below the field. */
  hint?: string;
  /** Error message; also paints the border red. */
  error?: string;
  /** Marks the field required: appends a red asterisk to the label and sets the input's required attribute. @default false */
  required?: boolean;
  /** Use the mono font for the value (ids, keys, code). @default false */
  mono?: boolean;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  type?: string;
  onChange?: (e: any) => void;
}
export declare function Input(props: InputProps): JSX.Element;
