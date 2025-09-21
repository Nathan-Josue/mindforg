import {ModuleLanguage} from "@/types/moduleLanguage";

export interface Language {
    id: string
    name: string
    logo: string
    creator: string
    year: number
    description: string
    modules: ModuleLanguage[]
}