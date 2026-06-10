/** Input with prefix/suffix addons and an optional attached button. */
export interface InputGroupProps { prefix?: React.ReactNode; suffix?: React.ReactNode; button?: React.ReactNode; onButtonClick?: () => void; inputProps?: Record<string, any>; }
export declare function InputGroup(props: InputGroupProps): JSX.Element;
