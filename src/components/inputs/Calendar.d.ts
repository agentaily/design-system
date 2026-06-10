/** Month calendar grid (Monday-first), single-date selection, today marker. */
export interface CalendarProps { value?: Date; onChange?: (date: Date) => void; month?: Date; }
export declare function Calendar(props: CalendarProps): JSX.Element;
