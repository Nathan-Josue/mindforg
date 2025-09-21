"use client"

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Play, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image"
import {ModuleLanguage} from "@/types/moduleLanguage";
import { useRouter } from "next/navigation";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

type Props = {
    Modules: ModuleLanguage[];
};

export default function ModulesList({ Modules }: Props) {
    const [openModules, setOpenModules] = useState<{ [key: number]: boolean }>({});
    const router = useRouter();

    const toggleModule = (id: number) => {
        setOpenModules(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const handleStart = (moduleId: number) => {
        // Redirige d'abord vers une page de chargement
        router.push(`/loading?moduleId=${moduleId}`);
    };

    return (
        <div className="space-y-4 max-h-[41.5rem] overflow-y-auto pr-2 no-scrollbar">
            {Modules.map((module) => (
                <Card
                    key={module.id}
                    className="bg-white p-4 rounded-xl shadow-md border border-gray-200"
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4 w-full md:w-auto">
                            <Avatar className="w-16 h-16">
                                <AvatarImage
                                    src={module.avatar || "/placeholder.svg"}
                                    alt={module.name}
                                    className="object-contain"
                                />
                                <AvatarFallback>{module.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">{module.name}</h3>
                                <p className="text-gray-500 text-sm">{module.title}</p>

                                {/* Lessons + Rating */}
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-sm text-gray-600">{module.lessons} Lessons</span>

                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <Image
                                                key={index}
                                                src={index < module.rating ? "/icons/star_.png" : "/icons/star_desactive.png"}
                                                alt="star"
                                                width={20}
                                                height={20}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Sous-modules avec animation */}
                                {module.isSubmodules && (
                                    <div className="mt-2 relative">
                                        <Button
                                            onClick={() => toggleModule(module.id)}
                                            className="bg-[#6C5CE7] hover:bg-[#5B4BD6] text-white px-7 py-3 rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center mt-2"
                                        >
                                            <span>{openModules[module.id] ? "Masquer les leçons" : "Voir les leçons"}</span>
                                            {openModules[module.id] ? (
                                                <ChevronUp className="h-5 w-5 ml-2 transition-transform duration-300" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5 ml-2 transition-transform duration-300" />
                                            )}
                                        </Button>

                                        <div
                                            className={`mt-2 relative overflow-hidden transition-all duration-500 ease-out ${
                                                openModules[module.id]
                                                    ? "max-h-96 opacity-100 translate-y-0"
                                                    : "max-h-0 opacity-0 -translate-y-2"
                                            }`}
                                        >
                                            {/* Ligne verticale */}
                                            <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gray-300 via-gray-200 to-transparent" />

                                            <div className="mx-12 my-8 space-y-2">
                                                {module.submodules?.map((subItem, index) => (
                                                    <Card
                                                        key={index}
                                                        className="relative flex items-center justify-between p-3 rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
                                                    >
                                                        {/* Ligne horizontale + angle arrondi */}
                                                        <div className="absolute left-[-20px] top-1/2 w-5 h-px bg-gradient-to-r from-gray-300 to-gray-200">
                                                            <div className="absolute -left-[12px] -top-[11px] w-3 h-3 border-l border-b border-gray-300 rounded-bl-md transform rotate-0"></div>
                                                        </div>

                                                        {/* Marqueur rond */}
                                                        <span className="absolute left-[-21px] top-1/2 w-3 h-3 rounded-full bg-white border-2 border-gray-300 -translate-y-1/2 shadow-sm" />

                                                        <span className="text-gray-700 text-sm">{subItem}</span>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bouton centré */}
                        <div className="flex justify-center items-center w-full md:w-auto mt-4 md:mt-0">
                            <Button
                                onClick={() => handleStart(module.id)}
                                className="bg-[#6C5CE7] hover:bg-[#5B4BD6] text-white px-7 py-5 rounded-2xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center justify-center"
                            >
                                <span>COMMENCER</span>
                                <Play size={24} strokeWidth={3} className="ml-2" />
                            </Button>
                        </div>

                    </div>
                </Card>
            ))}
            {/*<ProgressiveBlur position="bottom" height="20%" />*/}
        </div>
    );
}
