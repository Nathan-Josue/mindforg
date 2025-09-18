"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const languages = [
    { name: "Python", logo: "/langage/python.svg" },
    { name: "JavaScript", logo: "/langage/javascript.svg" },
    { name: "TypeScript", logo: "/langage/typescript.svg" },
    { name: "Java", logo: "/langage/java.svg" },
    { name: "C#", logo: "/langage/csharp.svg" },
    { name: "C++", logo: "/langage/cpp.svg" },
    { name: "Go", logo: "/langage/go.svg" },
    { name: "Rust", logo: "/langage/rust.svg" },
    { name: "Ruby", logo: "/langage/ruby.svg" },
    { name: "PHP", logo: "/langage/php.svg" },
    { name: "Kotlin", logo: "/langage/kotlin.svg" },
    { name: "Swift", logo: "/langage/swift.svg" },
    { name: "Scala", logo: "/langage/scala.svg" },
    { name: "Dart", logo: "/langage/dart.svg" },
    { name: "Elixir", logo: "/langage/elixir.svg" },
    { name: "Haskell", logo: "/langage/haskell.svg" },
    { name: "Lua", logo: "/langage/lua.svg" },
    { name: "Clojure", logo: "/langage/clojure.svg" },
    { name: "F#", logo: "/langage/fsharp.svg" },
    { name: "R", logo: "/langage/r.svg" },
]

export default function Language() {
    const hoverSound = useRef<HTMLAudioElement | null>(null)
    const scrollRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        hoverSound.current = new Audio("/sounds/click.mp3")
        hoverSound.current.preload = "auto"
        hoverSound.current.volume = 0.5
    }, [])

    const handleHover = () => {
        hoverSound.current?.play().catch(console.log)
    }

    const handleClick = () => {
        hoverSound.current?.play().catch(console.log)
    }

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })
    }

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })
    }

    return (
        <div className="relative py-4 px-4">
            <h2 className="ml-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Langages</h2>

            <div className="relative">
                {/* Boutons de navigation fixés à l'intérieur */}
                <button
                    onClick={scrollLeft}
                    className="
                    ml-2 absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600 h-10 w-10
                    hover:ring-3 hover:ring-white hover:ring-offset-2 hover:ring-offset-[#27262A] hover:scale-105 transition-all duration-300 cursor-pointer
                    "
                >
                    <ChevronLeft />
                </button>
                <button
                    onClick={scrollRight}
                    className="
                    mr-2 absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600 h-10 w-10
                    hover:ring-3 hover:ring-white hover:ring-offset-2 hover:ring-offset-[#27262A] hover:scale-105 transition-all duration-300 cursor-pointer
                    "
                >
                    <ChevronRight />
                </button>

                {/* Scroll horizontal */}
                <div ref={scrollRef} className="overflow-x-auto no-scrollbar flex flex-nowrap gap-4 py-4">
                    {languages.map((lang, index) => (
                        <button
                            key={`${lang.name}-${index}`}
                            onMouseEnter={handleHover}
                            onClick={handleClick}
                            className="relative flex items-center gap-3 h-28 min-w-[13rem] bg-[#27262A] text-white text-2xl font-bold py-3 px-4 rounded-xl glitch
                    hover:bg-[#2a2a30] hover:ring-4 hover:ring-[#6C5CE7] hover:ring-offset-3 hover:ring-offset-gray-50 hover:scale-105 transition-all duration-300 cursor-pointer"
                        >
                            <div className="relative h-10 w-10 flex-shrink-0">
                                <Image src={lang.logo} alt={lang.name} fill className="object-contain" />
                            </div>
                            {lang.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
