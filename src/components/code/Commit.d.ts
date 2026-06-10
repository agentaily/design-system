/** Git commit row: graph node, message, hash, author, +/- stat. */
export interface CommitProps { message: React.ReactNode; hash?: string; author?: string; time?: string; additions?: number; deletions?: number; connected?: boolean; }
export declare function Commit(props: CommitProps): JSX.Element;
