import { District, Suburb } from './user';
export declare const jobCategoryList: readonly ["car", "computer", "boat", "housekeeping", "language", "repair", "etc"];
export declare type JobCategory = typeof jobCategoryList[number];
export declare type RequestValues = {
    title: string;
    district: District;
    suburb: Suburb;
    category: JobCategory;
    detail: string;
    images: string[];
};
export declare type RequestErrorValues = {
    title?: string;
    detail?: string;
};
