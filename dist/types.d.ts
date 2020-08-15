export interface ImageData {
    link: string;
    attribution: {
        link: string;
        source: string;
    };
}
export interface UfologyData {
    shortname: string;
    title: string;
    subtitle: string;
    summary: string;
    grade: number;
    poster?: ImageData;
    writeup?: string;
    labels?: string[];
    bullets?: string[];
    persuasive?: string[];
    dissuasive?: string[];
}
