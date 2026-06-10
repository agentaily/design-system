/** Env var table with masked secret values and a reveal toggle. */
export interface EnvVar { key: string; value: string; secret?: boolean; }
export interface EnvironmentVariablesProps { title?: string; vars: Array<EnvVar | [string, string]>; }
export declare function EnvironmentVariables(props: EnvironmentVariablesProps): JSX.Element;
