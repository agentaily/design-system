/** Agent identity pill: square avatar, name, optional model tag, working/idle/error status. */
export interface AgentProps { name?: string; model?: string; status?: "working" | "idle" | "error"; task?: string; }
export declare function Agent(props: AgentProps): JSX.Element;
