import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Play} from "lucide-react";

export default function HeaderSection(){
    return(
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
            <CardContent className="p-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-4">
                        <div>
                            <h1 className="text-[6rem] font-black text-gray-900 tracking-tight">MINDFORG</h1>
                            <h2 className="text-4xl font-black text-gray-800 tracking-tight">Saison 1 : <span className="glitch">GLITCH</span> </h2>
                            <p className="text-gray-600 text-lg mt-2 max-w-md break-words">
                                Progresse à travers des quiz de programmation, gagne de l’XP et débloque ton rang légendaire.
                            </p>
                            <div className="my-6 flex items-start space-x-6">
                                {/* Novice */}
                                <div className="flex flex-col items-center">
                                    <Image src="/ranked/rank/novice.png" alt="Rang NOVICE" width={70} height={60} />
                                    <span className="mt-2 text-sm font-medium text-gray-700">NOVICE</span>
                                </div>

                                {/* Hacker */}
                                <div className="flex flex-col items-center">
                                    <Image src="/ranked/rank/hacker.png" alt="Rang HACKER" width={70} height={60} />
                                    <span className="mt-2 text-sm font-medium text-gray-700">HACKER</span>
                                </div>

                                {/* Cyberknight */}
                                <div className="flex flex-col items-center">
                                    <Image src="/ranked/rank/cyberknight.png" alt="Rang CYBERKNIGHT" width={70} height={60} />
                                    <span className="mt-2 text-sm font-medium text-gray-700">CYBERKNIGHT</span>
                                </div>

                                {/* Overlord */}
                                <div className="flex flex-col items-center">
                                    <Image src="/ranked/rank/overlord.png" alt="Rang OVERLORD" width={70} height={60} />
                                    <span className="mt-2 text-sm font-medium text-gray-700">OVERLORD</span>
                                </div>
                            </div>


                        </div>
                        <Button
                            className="bg-[#6C5CE7] hover:bg-[#5B4BD6] text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all ">
                            <span>JOUER</span>
                            <Play size={68} strokeWidth={3} className={"border-"}/>
                        </Button>

                        <Button
                            className="bg-[#6C5CE7] hover:bg-[#5B4BD6] text-white px-8 py-6 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all ml-4">
                            En Savoir plus
                        </Button>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <img src="/images/full_bg_glitch.png" alt="MINDFORG character"
                             className="h-[20rem]object-contain"/>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}