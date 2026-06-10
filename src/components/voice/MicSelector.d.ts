/** Microphone device picker with a live input-level meter. */
export interface MicSelectorProps { devices: Array<string | { value: string; label: string }>; value?: string; level?: number; onChange?: (value: string) => void; }
export declare function MicSelector(props: MicSelectorProps): JSX.Element;
