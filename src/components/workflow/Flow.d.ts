/**
 * Node-graph workflow primitives. Canvas holds Nodes (absolute x/y) and an SVG
 * edge layer; Edge/Connection draw bezier links; Controls/Panel/Toolbar are canvas chrome.
 */
export interface CanvasProps { edges?: React.ReactNode; children?: React.ReactNode; }
export declare function Canvas(props: CanvasProps): JSX.Element;
export interface NodeProps { x?: number; y?: number; title?: React.ReactNode; status?: "ok" | "warn"; ports?: boolean; selected?: boolean; children?: React.ReactNode; }
export declare function Node(props: NodeProps): JSX.Element;
export interface Point { x: number; y: number; }
export interface EdgeProps { from: Point; to: Point; animated?: boolean; label?: string; }
/** Static bezier edge (render inside Canvas's edges slot). */
export declare function Edge(props: EdgeProps): JSX.Element;
/** Animated (flowing dashes) edge — for in-progress links. */
export declare function Connection(props: { from: Point; to: Point; label?: string }): JSX.Element;
export interface ControlsProps { orientation?: "vertical" | "horizontal"; onZoomIn?: () => void; onZoomOut?: () => void; onFit?: () => void; }
export declare function Controls(props: ControlsProps): JSX.Element;
export interface PanelProps { position?: "top-right" | "top-left" | "bottom-right"; children?: React.ReactNode; }
export declare function Panel(props: PanelProps): JSX.Element;
export interface ToolbarProps { children?: React.ReactNode; }
export declare function Toolbar(props: ToolbarProps): JSX.Element;
