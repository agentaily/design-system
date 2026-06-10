/** Image frame with ratio lock, placeholder fallback, optional caption + border. */
export interface ImageProps { src?: string; alt?: string; ratio?: number | string; caption?: React.ReactNode; bordered?: boolean; width?: number | string; height?: number | string; }
export declare function Image(props: ImageProps): JSX.Element;
