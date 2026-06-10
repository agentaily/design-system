/** JSON-schema / type tree with colored type tags and nested fields. */
export interface SchemaField { type?: string; required?: boolean; description?: string; fields?: Record<string, SchemaField | string>; }
export interface SchemaDisplayProps { schema: Record<string, SchemaField | string>; }
export declare function SchemaDisplay(props: SchemaDisplayProps): JSX.Element;
