/** Rich hover preview card (open/close delays). For non-essential supplementary info. */
export interface HoverCardProps { trigger: React.ReactNode; side?: "top" | "bottom"; openDelay?: number; closeDelay?: number; children?: React.ReactNode; }
export declare function HoverCard(props: HoverCardProps): JSX.Element;
