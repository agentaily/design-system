/**
 * Masked credential input with show/hide toggle. Mono by default (keys read
 * better in mono). Pairs with a mono ALL-CAPS label and an optional hint /
 * error line. Built on the bundle's `.ax-input`.
 */
export interface SecretFieldProps {
  /** Mono ALL-CAPS label above the field. */
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Helper line below the field (hidden when `error` is set). */
  hint?: React.ReactNode;
  /** Error line below the field; also flags the input red. */
  error?: string;
  /** Mono input font. @default true */
  mono?: boolean;
  /** @default "off" */
  autoComplete?: string;
}
export declare function SecretField(props: SecretFieldProps): JSX.Element;
