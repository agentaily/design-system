/** Live or final speech transcript; supports speaker labels and an interim (greyed) tail. */
export interface TranscriptSegment { text: string; speaker?: string; }
export interface TranscriptionProps { live?: boolean; segments?: Array<string | TranscriptSegment>; text?: string; interim?: string; }
export declare function Transcription(props: TranscriptionProps): JSX.Element;
