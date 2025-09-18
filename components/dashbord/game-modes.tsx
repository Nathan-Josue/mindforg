"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreVertical } from "lucide-react"; // icône ⋮
import { useRef, useEffect } from "react";

const gameModes = [
    {
        name: "Solo",
        description: "Affronte tous les joueurs seul",
        img: "/modes/solo_v1.png",
        badge: "Populaire",
        players: "125k joueurs",
    },
    {
        name: "Classé",
        description: "Monte dans le classement mondial",
        img: "/modes/ranked_v1.png",
        badge: "Compétitif",
        players: "89k joueurs",
    },
    {
        name: "1v1",
        description: "Défie tes amis en duel",
        img: "/modes/1v1_v1.png",
        badge: "Rapide",
        players: "42k joueurs",
    },
];

export default function GameModes() {
    const hoverSound = useRef<HTMLAudioElement | null>(null);

    // Initialiser l'audio seulement côté client
    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                hoverSound.current = new Audio("/sounds/click.mp3");
                hoverSound.current.preload = 'auto';
                hoverSound.current.volume = 0.5; // Volume plus audible
                
                // Test de chargement
                hoverSound.current.addEventListener('canplaythrough', () => {
                    console.log('Audio loaded successfully');
                });
                
                hoverSound.current.addEventListener('error', (e) => {
                    console.error('Audio loading error:', e);
                });
            } catch (error) {
                console.error('Error creating audio:', error);
            }
        }
    }, []);

    const handleHover = () => {
        if (hoverSound.current) {
            console.log('Playing hover sound'); // Debug
            hoverSound.current.currentTime = 0; // restart si déjà joué
            hoverSound.current.play().catch((error) => {
                console.log('Audio play failed:', error); // Debug
            });
        } else {
            console.log('No audio element found'); // Debug
        }
    };

    const handleClick = () => {
        if (hoverSound.current) {
            console.log('Playing click sound'); // Debug
            hoverSound.current.currentTime = 0;
            hoverSound.current.play().catch((error) => {
                console.log('Audio play failed:', error);
            });
        }
    };

    return (
        <div className="space-y-8 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left text-gray-900">
                    Modes de jeu
                </h2>
                <button 
                    onClick={handleClick}
                    className="px-4 py-2 bg-[#6C5CE7] text-white rounded-lg hover:bg-[#5A4FCF] transition-colors"
                >
                    Test Audio
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gameModes.map((mode, index) => (
                    <Card
                        key={index}
                        onMouseEnter={handleHover}
                        onClick={handleClick}
                        className="group relative bg-transparent border-0 shadow-xl rounded-3xl overflow-hidden text-white h-[11rem]
                         hover:ring-4 hover:ring-[#6C5CE7] hover:ring-offset-3 hover:ring-offset-gray-50 hover:scale-110 transition-all duration-300 cursor-pointer mx-2"
                        style={{
                            backgroundImage: `url(${mode.img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        {/* Overlay sombre au hover */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                        {/* Three dots */}
                        <button
                            className="absolute top-3 right-3 text-white/70 hover:text-white transition-opacity opacity-0 group-hover:opacity-100 z-20"
                            aria-label="Options"
                        >
                            <MoreVertical className="w-6 h-6" />
                        </button>

                        {/* Badge joueurs en bas à gauche */}
                        <Badge className="absolute bottom-3 left-3 bg-[#101014] text-white border-0 z-20 text-xs sm:text-sm h-6 sm:h-7 px-2 sm:px-3">
                            {mode.players}
                        </Badge>

                        {/* CardContent qui apparaît uniquement au hover */}
                        <CardContent className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-20">
                            <h3 className="font-bold text-lg sm:text-xl lg:text-2xl">
                                {mode.name}
                            </h3>
                            <p className="text-white/80 text-sm sm:text-base">
                                {mode.description}
                            </p>
                        </CardContent>

                        {/* Badge mode en bas à droite */}
                        <Badge className="absolute bottom-3 right-3 bg-[#101014] text-white border-0 z-20 text-xs sm:text-sm h-6 sm:h-7 px-2 sm:px-3">
                            {mode.badge}
                        </Badge>
                    </Card>
                ))}
            </div>
        </div>
    );
}
