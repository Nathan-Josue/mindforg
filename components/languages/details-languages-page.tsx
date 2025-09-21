"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {ChevronLeft, Gift} from "lucide-react"
import ModulesList from "@/components/languages/modules-list";
import {Language} from "@/types/language";
import {ModuleLanguage} from "@/types/moduleLanguage";
import {useRouter} from "next/navigation";

function LeftSection(props: { src: string; alt: string; moduleLanguages: ModuleLanguage[]; language: Language; quests: Array<{title: string; description: string; xp: number; difficulty: string; icon?: string; currentStep: number; totalSteps: number}> }) {
    const router = useRouter()

    return (
        <div className="col-span-2">
            {/* Back Button */}
            <div className="mb-6">
                <Button
                    onClick={() => router.back()}
                    variant="ghost"
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 text-xl border"
                >
                    <ChevronLeft  className="w-6 h-6" />
                    retoure
                </Button>
            </div>

            {/* Hero Section */}
            <div className="relative flex flex-col mb-12 rounded-xl p-6">
                <div className="flex items-center gap-6">
                    <img
                        src={props.src}
                        alt={props.alt}
                        className="w-40 h-40 rounded-xl"
                    />
                    <div>
                        <p className="text-blue-500 text-sm font-medium mb-2">PROGRAMMATION</p>
                        <h1 className="text-5xl font-extrabold mb-5 uppercase glitch">
                            {props.alt}
                        </h1>
                        <Button className="bg-[#6C5CE7] hover:bg-[#5B4BD6] text-white">
                            <Gift className="w-4 h-4 mr-2" />
                            Send as a Gift
                        </Button>
                    </div>
                </div>
            </div>
            <div className={"max-h-[25rem] overflow-y-auto pr-2 no-scrollbar"}>
                {/* A propos */}
                <div className="mb-8 rounded-xl">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-3">À propos</h3>
                        <p className="text-gray-700 text-md leading-relaxed">
                            {props.language.description} Créé par {props.language.creator} en {props.language.year}.
                        </p>
                    </div>
                </div>

                {/* Quêtes */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Quêtes</h3>
                    <div className="space-y-3">
                        {props.quests.map((quest, index) => {
                            const progressPercent = quest.totalSteps
                                ? Math.round((quest.currentStep / quest.totalSteps) * 100)
                                : 0

                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 bg-white shadow-md rounded-xl border border-gray-200"
                                >
                                    <Avatar className="w-10 h-10">
                                        <AvatarImage src={quest.icon || "/placeholder.svg"} alt="Quest"/>
                                        <AvatarFallback>Q</AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{quest.title}</p>
                                        <p className="text-xs text-gray-600 mb-1">{quest.description}</p>

                                        <div className="flex items-center justify-between mt-1">
                                            <Badge variant="outline" className="text-xs">
                                                {quest.difficulty}
                                            </Badge>
                                            <div className="flex items-center gap-1">
                                                <img src="/icons/xp.png" alt="xp" className="w-ful h-6 rounded-xl"/>
                                                <span
                                                    className="text-ld font-semibold text-yellow-600">{quest.xp} XP</span>
                                            </div>
                                        </div>

                                        {/* Barre de progression */}
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="bg-[#6C5CE7] h-2 rounded-full transition-all duration-300"
                                                    style={{width: `${progressPercent}%`}}
                                                ></div>
                                            </div>
                                            <span className="ml-3 text-xs font-medium text-gray-600">
                                                  {quest.currentStep}/{quest.totalSteps}
                                                </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}

function RigthSection(props: {moduleLanguages: ModuleLanguage[] }) {

    return (
        <div className="col-span-2 max-h-screen overflow-y-auto pr-2 no-scrollbar">
            {/* Modules Section */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold">Modules</h2>
                        <Badge className="bg-[#6C5CE7] hover:bg-[#5B4BD6] font-bold text-white">
                            {props.moduleLanguages.length}
                        </Badge>
                    </div>
                    <p className="text-gray-500 text-sm cursor-pointer hover:underline">Filters</p>
                </div>

                <section>
                    <ModulesList Modules={props.moduleLanguages} />
                </section>
            </div>
        </div>
    )
}

export default function DetailsLanguagesPage({ language }: { language: Language }) {
    // Exemple de quêtes
    const Quests = [
        {
            title: "Maîtriser les Variables",
            description: "Créer et manipuler différents types de variables",
            xp: 150,
            difficulty: "Débutant",
            icon: "/badge/forgeron-de-paquets.png",
            currentStep: 3,
            totalSteps: 5,
        },
        {
            title: "Conquérant des Boucles",
            description: "Utiliser les boucles pour résoudre des problèmes",
            xp: 2500,
            difficulty: "Intermédiaire",
            icon: "/placeholder-operations.png",
            currentStep: 7,
            totalSteps: 10,
        },
    ]

    return (
        <div className="min-h-[85vh] px-8 pt-8 bg-gradient-to-br from-gray-50 to-white text-gray-900">
            <div className="grid grid-cols-4 gap-8 px-8">
                {/* Left Section */}
                <LeftSection src={language.logo} alt={language.name} moduleLanguages={language.modules} language={language} quests={Quests}/>

                {/* Rigth Section */}
                <RigthSection moduleLanguages={language.modules}/>

            </div>
        </div>
    )
}
