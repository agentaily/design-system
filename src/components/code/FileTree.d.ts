/** Collapsible file tree with folder/file icons and git status badges (add/mod/del). */
export interface FileNode { name: string; type?: "dir" | "file"; path?: string; status?: "add" | "mod" | "del"; defaultOpen?: boolean; children?: FileNode[]; }
export interface FileTreeProps { tree: FileNode[]; activePath?: string; onSelect?: (path: string) => void; }
export declare function FileTree(props: FileTreeProps): JSX.Element;
