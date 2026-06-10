/** TTS voice picker dropdown with swatch initials and preview affordance. */
export interface VoiceSelectorProps { voices: Array<string | { value: string; label: string; tag?: string }>; value?: string; onChange?: (value: string) => void; }
export declare function VoiceSelector(props: VoiceSelectorProps): JSX.Element;
