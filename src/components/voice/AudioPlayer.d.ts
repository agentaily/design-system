/** Voice-message player: play/pause, static waveform with played-progress fill, duration. */
export interface AudioPlayerProps { duration?: string; progress?: number; playing?: boolean; onToggle?: (playing: boolean) => void; }
export declare function AudioPlayer(props: AudioPlayerProps): JSX.Element;
