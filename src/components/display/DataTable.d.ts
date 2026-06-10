/** Sortable, optionally paginated table. Click headers to sort. */
export interface DataColumn { key: string; label?: string; numeric?: boolean; sortable?: boolean; render?: (value: any, row: any) => React.ReactNode; }
export interface DataTableProps { columns: Array<string | DataColumn>; rows: Array<Record<string, any>>; pageSize?: number; caption?: string; }
export declare function DataTable(props: DataTableProps): JSX.Element;
