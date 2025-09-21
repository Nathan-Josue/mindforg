"use client"

import { useEffect } from "react"

type Props = {
    params: { id: string }
}

export default function QuestionnairePage({ params }: Props) {
    const { id } = params

    useEffect(() => {
        // Vérifie si le son a déjà été joué
        const hasPlayed = sessionStorage.getItem("introSoundPlayed")

        if (!hasPlayed) {
            const audio = new Audio("/sounds/succes_1.mp3")
            audio.play().catch(err => console.warn("Erreur audio :", err))

            // Marque comme déjà joué
            sessionStorage.setItem("introSoundPlayed", "true")
        }
    }, [])

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">
                Questionnaire du module {id}
            </h1>
            {/* Ici tu charges les questions liées au module */}
        </div>
    )
}
