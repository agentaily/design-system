/**
 * Connection/health status chip built on Badge. Maps a status string to the
 * right variant + dot + label. idle→neutral, testing→neutral·dot, ok→ok·dot,
 * error→danger·dot.
 */
export interface StatusPillProps {
  /** @default "idle" */
  status?: "idle" | "testing" | "ok" | "error";
  /** Override the per-state label text. */
  labels?: Partial<Record<"idle" | "testing" | "ok" | "error", string>>;
}
export declare function StatusPill(props: StatusPillProps): JSX.Element;
