/** Prose wrapper (styles raw HTML headings/lists/code) + Text helper with variants. */
export interface ProseProps { children?: React.ReactNode; }
export declare function Prose(props: ProseProps): JSX.Element;
export interface TextProps { as?: string; variant?: "mono" | "muted" | "faint" | "label" | "display"; children?: React.ReactNode; }
export declare function Text(props: TextProps): JSX.Element;
