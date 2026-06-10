/** Context-window usage meter (tokens). Optionally splits input vs output; warns near the cap. */
export interface ContextProps { used?: number; max?: number; input?: number; output?: number; label?: string; }
export declare function Context(props: ContextProps): JSX.Element;
