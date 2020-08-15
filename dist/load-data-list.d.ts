import { UfologyData } from "./types.js";
export declare function loadDataList({ dataNames, dataDirectory, updateProgress, }: {
    dataNames: string[];
    dataDirectory: string;
    updateProgress: (progress: number) => void;
}): Promise<UfologyData[]>;
