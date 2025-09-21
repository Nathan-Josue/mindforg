"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image"
import { doyouknow } from "@/data/doyouknow.data";

function LoadingContent() {
    const imagebg = [
        "/bg/uhd/bg_1.svg",
        "/bg/uhd/bg_2.svg",
        "/bg/uhd/bg_3.svg",
        "/bg/uhd/bg_4.svg",
        "/bg/uhd/bg_5.svg",
        "/bg/uhd/bg_6.svg",
        "/bg/uhd/bg_7.svg",
        "/bg/uhd/bg_8.svg",
    ]

    const characters = [
        "/perso/nexo.png",
        "/perso/Synthia.png",
        "/perso/Synthia2.png",
        "/perso/vortex-7.png",
        "/perso/key.png",
        "/perso/dash.png",
        "/perso/zeyra.png",
        "/perso/mia.png",
        "/perso/strix-2.png",
        "/perso/strix-1.png",
        "/perso/strix.png",
    ]

    const [randomBg, setRandomBg] = useState("")
    const [randomChar, setRandomChar] = useState("")
    const [randomText, setRandomText] = useState("")

    const router = useRouter();
    const searchParams = useSearchParams();
    const moduleId = searchParams.get("moduleId");

    const pickRandom = () => {
        const bgIndex = Math.floor(Math.random() * imagebg.length)
        const charIndex = Math.floor(Math.random() * characters.length)
        const textIndex = Math.floor(Math.random() * doyouknow.length)

        setRandomBg(imagebg[bgIndex])
        setRandomChar(characters[charIndex])
        setRandomText(doyouknow[textIndex])
    }
    const playSound = (src: string, loop = false) => {
        const audio = new Audio(src)
        audio.loop = loop
        audio.play().catch(err => console.warn("Erreur audio :", err))
        return audio
    }
// 🎵 1er effet : joue le son en boucle une seule fois
    useEffect(() => {
        const audio = new Audio("/sounds/loading.mp3")
        audio.loop = true
        audio.play().catch(err => console.warn("Erreur audio :", err))

        return () => {
            audio.pause()
            audio.currentTime = 0
        }
    }, [])
    useEffect(() => {
        pickRandom()

        const interval = setInterval(() => {
            pickRandom();
        }, 5000)

        const timer = setTimeout(() => {
            router.replace(`/quiz/${moduleId}`);
        }, 10999)

        return () => {
            clearInterval(interval)
            clearTimeout(timer)
        }
    }, [router, moduleId])

    return (
        <div
            className="min-h-screen flex flex-col justify-between p-4 sm:p-8 text-gray-900 bg-fixed bg-center"
            style={{
                backgroundImage: `url(${randomBg})`,
                backgroundSize: "cover",
                imageRendering: "crisp-edges",
            }}
        >
            {/* Bloc principal */}
            <div className="bg-black/50 backdrop-blur-sm flex flex-col md:flex-row items-center justify-center rounded-2xl py-6 px-6 sm:px-12 gap-6 flex-grow">
                {/* Image du personnage */}
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-[28rem] flex-shrink-0">
                    {randomChar && (
                        <Image
                            src={randomChar}
                            alt="Personnage"
                            fill
                            className="object-contain rounded-xl"
                        />
                    )}
                </div>

                {/* Texte à droite (ou en dessous sur mobile) */}
                <div className="flex flex-col justify-center text-white text-center md:text-left max-w-lg">
                    <h1 className="text-2xl sm:text-3xl font-bold drop-shadow-lg mb-2">
                        Le saviez-vous ?
                    </h1>
                    <p className="text-base sm:text-lg opacity-90">{randomText}</p>
                </div>
            </div>

            {/* Loader */}
            <div className="mt-4 md:mt-8 flex items-center justify-center md:justify-start">
                <div className="flex w-48 sm:w-64 h-12 rounded-2xl items-center ">
                    <div className="loader-glitch glitch text-sm sm:text-base md:text-lg" data-text="LOADING">
                        LOADING
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Lording() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoadingContent />
        </Suspense>
    )
}
