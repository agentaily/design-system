/** Two resizable panels with a draggable divider. */
export interface ResizableProps { orientation?: "horizontal" | "vertical"; defaultSize?: number; min?: number; max?: number; first?: React.ReactNode; second?: React.ReactNode; height?: number; }
export declare function Resizable(props: ResizableProps): JSX.Element;
