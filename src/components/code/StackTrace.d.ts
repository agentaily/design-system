/** Error stack trace; app frames highlighted, vendor frames muted. */
export interface StackFrame { fn: string; location?: string; app?: boolean; }
export interface StackTraceProps { type?: string; message?: React.ReactNode; frames: Array<string | StackFrame>; }
export declare function StackTrace(props: StackTraceProps): JSX.Element;
