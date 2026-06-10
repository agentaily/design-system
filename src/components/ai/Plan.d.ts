/** Numbered, connected step plan (vertical). Steps carry done/active/pending state. */
export interface PlanStep { title: React.ReactNode; description?: React.ReactNode; status?: "pending" | "active" | "done"; }
export interface PlanProps { steps: PlanStep[]; }
export declare function Plan(props: PlanProps): JSX.Element;
