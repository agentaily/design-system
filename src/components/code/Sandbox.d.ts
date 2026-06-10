/** Execution sandbox frame with running/booting/stopped status and optional body. */
export interface SandboxProps { id?: string; status?: "running" | "booting" | "stopped"; region?: string; children?: React.ReactNode; }
export declare function Sandbox(props: SandboxProps): JSX.Element;
