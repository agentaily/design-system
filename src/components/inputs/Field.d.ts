/** Field wrapper (label + control + hint/error) and FieldGroup (stack or bordered fieldset). */
export interface FieldProps { label?: React.ReactNode; required?: boolean; hint?: React.ReactNode; error?: React.ReactNode; row?: boolean; children?: React.ReactNode; }
export declare function Field(props: FieldProps): JSX.Element;
export interface FieldGroupProps { legend?: React.ReactNode; children?: React.ReactNode; }
export declare function FieldGroup(props: FieldGroupProps): JSX.Element;
