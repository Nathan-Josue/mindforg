import {BaseQuestion} from "@/interfaces/base-question";

export interface MultipleChoiceQuestion extends BaseQuestion {
    type: "multiple-choice"
    options: string[]
    correctAnswer: number
}