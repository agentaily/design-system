/**
 * Pure-render chat surface. State lives OUTSIDE: the caller holds the queue
 * (`const q = Queue.useQueue({ onFirst, onBatch })`) and injects it as
 * `controller`. The composer enqueues into it; the buffer list + busy state read
 * from it; the caller can also enqueue programmatically and read `controller.busy`
 * elsewhere. The component never owns chat state.
 */
export interface ThreadMessage {
  id?: string | number;
  role: "user" | "assistant";
  /** Plain text for the default renderer; optional when you supply renderTurn. */
  text?: string;
  /** Optional mono timestamp on assistant turns. */
  time?: string;
  /** Per-message streaming flag (read by renderTurn via ctx.streaming). */
  streaming?: boolean;
  /** Free-form turn kind for renderTurn dispatch, e.g. "reasoning" | "tool" | "text". */
  kind?: string;
  /** Any extra fields your renderTurn needs (steps, duration, name, args, result, status, suggestions, …). */
  [key: string]: any;
}
export interface TurnContext {
  /** Whether this turn is currently streaming. */
  streaming: boolean;
  /** Whether this is the last turn in the thread. */
  isLast: boolean;
}
export interface ConversationThreadProps {
  /** @default "New chat" */
  title?: string;
  /** Model chip + Composer model label. @default "agentaily-2" */
  model?: string;
  /** Header right-side actions (share/settings…). */
  actions?: React.ReactNode;
  messages?: ThreadMessage[];
  draft?: string;
  onDraftChange?: (value: string) => void;
  /** The queue that drives this thread: a Queue.useQueue(...) return value held by the caller. */
  controller?: import("../ai/Queue").UseQueueReturn;
  /** Buffer list title. @default "缓冲区 · 下一轮一起发" */
  queueTitle?: string;
  disabled?: boolean;
  /** Empty-state hint chips. */
  hints?: string[];
  /** Hint-click handler; defaults to sending the hint. */
  onHint?: (hint: string) => void;
  /** @default "有什么要解决的？" */
  emptyTitle?: string;
  /** Composer placeholder when idle. */
  placeholder?: string;
  /** Composer placeholder while the queue is draining (busy). */
  busyPlaceholder?: string;
  /** Mono footer disclaimer; pass "" to hide. */
  note?: string;
  /** Show a Copy tool under assistant turns. */
  onCopy?: (message: ThreadMessage, index: number) => void;
  /** Show a Regenerate tool under assistant turns. */
  onRegenerate?: (message: ThreadMessage, index: number) => void;
  /**
   * Custom turn renderer. When provided, each turn is rendered by this instead of
   * the default plain-text <Message>. Use it for rich turns with Reasoning /
   * ToolCall / Suggestions / Message. Per-message `streaming` is surfaced via
   * ctx.streaming. Omit for the plain-text default.
   */
  renderTurn?: (message: ThreadMessage, index: number, ctx: TurnContext) => React.ReactNode;
}
export declare function ConversationThread(props: ConversationThreadProps): JSX.Element;
