import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const characters = [
    {
        name: "Tesla",
        badge: "Nouveau",
        img: "/fortnite-purple-character-skin.jpg",
        rightImg: "/ranked/rank/cyberknight.png",
        number: "#125",
        gradient: "from-[#6C5CE7] to-[#A29BFE]",
    },
    {
        name: "Midas",
        badge: "Populaire",
        img: "/fortnite-golden-character-skin.jpg",
        rightImg: "/ranked/rank/overlord.png",
        number: "#1",
        gradient: "from-[#FDCB6E] to-[#F39C12]",
    },
    {
        name: "Molten",
        badge: "Limité",
        img: "/fortnite-red-character-skin.jpg",
        rightImg: "/ranked/rank/hacker.png",
        number: "#255",
        gradient: "from-[#E17055] to-[#D63031]",
    },
];

export default function CharacterCards() {
    return (
        <div className="space-y-8">
            {/* Titre principal */}
            <h2 className="text-3xl text-gray-900 font-bold text-left ">
                Rang Global
            </h2>

            {/* Grille de cartes */}
            <div className="grid grid-cols-3 gap-6">
                {characters.map((char, index) => (
                    <Card
                        key={index}
                        className={`bg-gradient-to-br ${char.gradient} border-0 shadow-xl rounded-3xl overflow-hidden text-white`}
                    >
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                {/* Partie gauche : image + texte */}
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={char.img}
                                        alt={char.name}
                                        className="w-20 h-20 rounded-2xl object-cover"
                                    />
                                    <div>
                                        <h3 className="font-bold text-xl">{char.name}</h3>
                                        <Badge className="bg-white/20 text-white border-0 mt-2">
                                            {char.badge}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Partie droite optionnelle */}
                                <div className="flex flex-col items-center space-y-2">
                                    {char.rightImg && (
                                        <img
                                            src={char.rightImg}
                                            alt="Image droite"
                                            className="w-16 h-16 rounded-xl object-cover"
                                        />
                                    )}
                                    {char.number && (
                                        <span className="font-semibold text-lg">{char.number}</span>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
