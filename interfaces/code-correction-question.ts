import {BaseQuestion} from "@/interfaces/base-question";

export interface CodeCorrectionQuestion extends BaseQuestion {
    type: "code-correction"
    buggyCode: string
    correctCode: string
    language: string
    hint?: string
}