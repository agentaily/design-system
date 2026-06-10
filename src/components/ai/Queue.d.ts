/** Queued-prompts list; the running item is highlighted, pending items removable. */
export interface QueueItem { text: React.ReactNode; status?: "running" | "pending"; }
export interface QueueProps { title?: string; items: Array<string | QueueItem>; onRemove?: (index: number) => void; }
export declare function Queue(props: QueueProps): JSX.Element;
