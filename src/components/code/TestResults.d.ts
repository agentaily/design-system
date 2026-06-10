/** Test run summary + per-test pass/fail/skip list. */
export interface TestItem { name: string; status: "pass" | "fail" | "skip"; time?: string; }
export interface TestResultsProps { tests: TestItem[]; duration?: string; }
export declare function TestResults(props: TestResultsProps): JSX.Element;
