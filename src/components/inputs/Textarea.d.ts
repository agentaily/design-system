/**
 * Multi-line text field, vertically resizable.
 */
export interface TextareaProps {
  label?: string;
  hint?: string;
  placeholder?: string;
  value?: string;
  rows?: number;
  disabled?: boolean;
  onChange?: (e: any) => void;
}
export declare function Textarea(props: TextareaProps): JSX.Element;
