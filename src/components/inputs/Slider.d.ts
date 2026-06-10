/**
 * Single-value range slider with a square thumb and mono value readout.
 */
export interface SliderProps {
  /** Mono uppercase label; shows the live value on the right when set. */
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  /** Unit appended to the readout, e.g. "%" or "k". */
  suffix?: string;
  onChange?: (value: number) => void;
  disabled?: boolean;
}
export declare function Slider(props: SliderProps): JSX.Element;
