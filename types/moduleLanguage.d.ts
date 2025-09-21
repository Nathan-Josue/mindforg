export type ModuleLanguage = {
    id: number;
    name: string;
    title: string;
    avatar: string;
    lessons: number;
    rating: number;
    isSubmodules: boolean;
    submodules?: string[];
};