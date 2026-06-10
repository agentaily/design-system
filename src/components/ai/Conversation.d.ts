/** Auto-scrolling chat thread container; sticks to bottom unless the user scrolls up (shows a "jump to latest" pill). */
export interface ConversationProps { autoStick?: boolean; children?: React.ReactNode; }
export declare function Conversation(props: ConversationProps): JSX.Element;
