
import { Button } from "@/components/ui/button"
import {ChevronLeft, ChevronRight} from "lucide-react";
import {questions} from "@/data/questions.data";

export function Navigation(props: { onClick: () => void, currentQuestion: number, onClick1: () => void, answered: boolean }) {
    return <div className="flex justify-between">
        <Button variant="outline" onClick={props.onClick} disabled={props.currentQuestion === 0}
                className="bg-white text-[#6C5CE7] px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg transition-all min-w-35
                        hover:scale-105 active:scale-95 hover:bg-[#5B4BD6] hover:text-white
                        hover:ring-3 hover:ring-[#6C5CE7] hover:ring-offset-2 hover:ring-offset-white">
            <ChevronLeft size={68} strokeWidth={3} className={"border-"}/>
            <span>Précédent</span>
        </Button>
        <Button
            onClick={props.onClick1} disabled={!props.answered}
            className="bg-[#6C5CE7] text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg transition-all min-w-35
                        hover:scale-105 active:scale-95 hover:bg-[#5B4BD6]
                        hover:ring-3 hover:ring-[#6C5CE7] hover:ring-offset-2 hover:ring-offset-white">
                        <span>
                            {props.currentQuestion === questions.length - 1 ? "Terminer" : "Suivant"}
                        </span>
            <ChevronRight size={68} strokeWidth={3} className={"border-"}/>
        </Button>
    </div>;
}
