/** Generic list row: media slot, title + description, actions slot; optionally interactive/flush. */
export interface ItemProps { media?: React.ReactNode; mediaBox?: boolean; title?: React.ReactNode; description?: React.ReactNode; actions?: React.ReactNode; interactive?: boolean; flush?: boolean; children?: React.ReactNode; }
export declare function Item(props: ItemProps): JSX.Element;
