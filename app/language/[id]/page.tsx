import DetailsLanguagesPage from "@/components/languages/details-languages-page"
import { LanguegesData } from "@/data/langueges.data"

export default function LanguagePage({ params }: { params: { id: string } }) {
    // récupérer le langage depuis tes données
    const language = LanguegesData.find(l => l.id === params.id)

    if (!language) {
        return <div className="p-8">⚠️ Langage introuvable</div>
    }

    return <DetailsLanguagesPage language={language} />
}
