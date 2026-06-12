/** Queued-prompts list; the running item is highlighted, pending items removable. */
export interface QueueItem { text: React.ReactNode; status?: "running" | "pending"; }
export interface QueueProps { title?: string; items: Array<string | QueueItem>; onRemove?: (index: number) => void; }
export declare function Queue(props: QueueProps): JSX.Element;

export interface UseQueueOptions {
  /** Async handler for the very first prompt (bootstrap), run once. Falls back to onBatch([text]). */
  onFirst?: (text: string) => void | Promise<void>;
  /** Async handler for each drained buffer — every prompt that accumulated while busy, flushed together. */
  onBatch?: (texts: string[]) => void | Promise<void>;
}
export interface UseQueueReturn {
  /** Pending (not-yet-running) items: { id, text }. Feed to <Queue items={queue}/>. */
  queue: Array<{ id: number; text: string }>;
  /** True while a drain loop is running. */
  busy: boolean;
  /** Send a prompt — runs now if idle, otherwise buffers for the next drain. */
  enqueue: (text: string) => void;
  /** Remove a pending item by index. */
  remove: (index: number) => void;
  /** Clear the buffer and let the next prompt bootstrap again (e.g. new chat). */
  reset: () => void;
}
export declare namespace Queue {
  /** Headless "keep sending, buffer while busy" driver. Pairs with <Queue>. */
  function useQueue(options?: UseQueueOptions): UseQueueReturn;
}
