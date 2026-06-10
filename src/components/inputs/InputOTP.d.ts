/** One-time-code input: N single-char slots with auto-advance and backspace nav. */
export interface InputOTPProps { length?: number; value?: string; onChange?: (value: string) => void; groupSize?: number; }
export declare function InputOTP(props: InputOTPProps): JSX.Element;
