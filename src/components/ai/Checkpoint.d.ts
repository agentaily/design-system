/** Inline conversation checkpoint divider with optional restore action. */
export interface CheckpointProps { label?: string; time?: string; onRestore?: () => void; }
export declare function Checkpoint(props: CheckpointProps): JSX.Element;
