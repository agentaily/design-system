/** Terminal window with traffic-light bar, green prompt, command/output/error lines, copy + optional cursor. */
export interface TerminalLine { type?: "command" | "output" | "error"; text: string; }
export interface TerminalProps { title?: string; lines: Array<string | TerminalLine>; prompt?: string; cursor?: boolean; }
export declare function Terminal(props: TerminalProps): JSX.Element;
