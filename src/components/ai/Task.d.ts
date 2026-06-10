/** Agent sub-task checklist with pending / active / done states and a done/total count. */
export interface TaskItem { label: React.ReactNode; status?: "pending" | "active" | "done"; meta?: string; }
export interface TaskProps { title?: string; items: TaskItem[]; }
export declare function Task(props: TaskProps): JSX.Element;
