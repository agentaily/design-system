/** npm-style package card: name, version, description, stat grid. */
export interface PackageInfoProps { name: string; version?: string; description?: React.ReactNode; stats?: Array<{ value: React.ReactNode; label: string }>; }
export declare function PackageInfo(props: PackageInfoProps): JSX.Element;
