import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react"; // icône ⋮

const gameModes = [
    {
        name: "Solo",
        description: "Affronte tous les joueurs seul",
        img: "/modes/solo.png",
        badge: "Populaire",
        // gradient: "from-[#6C5CE7] to-[#A29BFE]",
        players: "125k joueurs",
    },
    {
        name: "Classé",
        description: "Monte dans le classement mondial",
        img: "/modes/rankend.png",
        badge: "Compétitif",
        // gradient: "from-[#FDCB6E] to-[#F39C12]",
        players: "89k joueurs",
    },
    {
        name: "1v1",
        description: "Défie tes amis en duel",
        img: "/modes/1v1.png",
        badge: "Rapide",
        // gradient: "from-[#E17055] to-[#D63031]",
        players: "42k joueurs",
    },
];

export default function GameModes() {
    return (
        <div className="space-y-8">
            <h2 className="text-4xl font-bold text-left text-gray-900">Modes de jeu</h2>

            <div className="grid grid-cols-3 gap-6">
                {gameModes.map((mode, index) => (
                    <Card
                        key={index}
                    className="group relative bg-transparent border-0 shadow-xl rounded-3xl overflow-hidden text-white sm:h-[22rem] h-[14rem]"
                        style={{
                            backgroundImage: `url(${mode.img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        {/* Overlay sombre */}
                        {/*<div className="absolute inset-0 bg-black/40" />*/}

                        {/* Three dots */}
                        <button
                            className="absolute top-3 right-3 text-white/70 hover:text-white transition-opacity opacity-0 group-hover:opacity-100 z-20"
                            aria-label="Options"
                        >
                            <MoreVertical className="w-6 h-6" />
                        </button>

                        {/* Badge joueurs en bas à gauche */}
                        <Badge className="absolute bottom-3 left-3 bg-[#101014] text-white border-0 z-20">
                            {mode.players}
                        </Badge>


                        <CardContent className="relative z-10 flex flex-col items-center justify-center text-center h-full space-y-3">
                            {/*<h3 className="font-bold text-2xl">{mode.name}</h3>*/}
                            {/*<p className="text-white/80">{mode.description}</p>*/}
                            {/*<Badge className="bg-white/20 text-white border-0">*/}
                            {/*    {mode.badge}*/}
                            {/*</Badge>*/}
                        </CardContent>

                        <Badge className="absolute bottom-3 right-3 bg-[#101014] text-white border-0 z-20 h-8">
                            {mode.badge}
                        </Badge>

                    </Card>
                ))}
            </div>
        </div>
    );
}
