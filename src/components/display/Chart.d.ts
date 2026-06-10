/** Minimal mono charts. BarChart + LineChart. */
export interface BarDatum { value: number; label?: string; muted?: boolean; }
export interface BarChartProps { data: Array<number | BarDatum>; title?: string; }
export declare function BarChart(props: BarChartProps): JSX.Element;
export interface LineDatum { value: number; label?: string; }
export interface LineChartProps { data: Array<number | LineDatum>; title?: string; height?: number; }
export declare function LineChart(props: LineChartProps): JSX.Element;
