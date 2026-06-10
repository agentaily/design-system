/** Push-to-talk control: record button, animated bars while recording, timer/hint. */
export interface SpeechInputProps { recording?: boolean; time?: string; onToggle?: () => void; }
export declare function SpeechInput(props: SpeechInputProps): JSX.Element;
