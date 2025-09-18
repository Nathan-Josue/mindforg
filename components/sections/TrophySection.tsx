"use client"

import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Crown, Target} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

import Image from "next/image";

const achievementsData = [
    { name: "Combat", value: 85, color: "#6C5CE7" },
    { name: "Construction", value: 72, color: "#FDCB6E" },
    { name: "Survie", value: 91, color: "#E17055" },
    { name: "Équipe", value: 68, color: "#00B894" },
]

const obtainedBadges = [
    {
        id: 1,
        name: "Unreal Mind Database",
        description: "Maîtrise des bases de données avancées",
        rarity: "legendary",
        icon: "/badge/unreal-mind-database.png",
        dateObtained: "15 Mars 2024",
        category: "Base de données",
    },
    {
        id: 2,
        name: "Unreal Mind",
        description: "Éveil de l’esprit ultime",
        rarity: "legendary",
        icon: "/badge/unreal-mind.png",
        dateObtained: "12 Mars 2024",
        category: "Mental",
    },
    {
        id: 3,
        name: "Table Forger",
        description: "Création et gestion de tables experte",
        rarity: "epic",
        icon: "/badge/table-forger.png",
        dateObtained: "10 Mars 2024",
        category: "Base de données",
    },
    {
        id: 4,
        name: "SQL Apprenti",
        description: "Premiers pas avec SQL",
        rarity: "common",
        icon: "/badge/sql-apprenti.png",
        dateObtained: "8 Mars 2024",
        category: "SQL",
    },
    {
        id: 5,
        name: "Schema Architect",
        description: "Conception de schémas relationnels",
        rarity: "epic",
        icon: "/badge/schema-architect.png",
        dateObtained: "5 Mars 2024",
        category: "Architecture",
    },
    {
        id: 6,
        name: "Keeper of Knowledge",
        description: "Gardien du savoir numérique",
        rarity: "rare",
        icon: "/badge/keeper-of-knowledge.png",
        dateObtained: "3 Mars 2024",
        category: "Savoir",
    },
    {
        id: 7,
        name: "Forgeron de Paquets",
        description: "Maîtrise des paquets réseaux",
        rarity: "rare",
        icon: "/badge/forgeron-de-paquets.png",
        dateObtained: "1 Mars 2024",
        category: "Réseau",
    },
    {
        id: 8,
        name: "Digital Blacksmith",
        description: "Forge numérique accomplie",
        rarity: "epic",
        icon: "/badge/digital-blacksmith.png",
        dateObtained: "28 Février 2024",
        category: "Forge",
    },
    {
        id: 9,
        name: "DBMS Master",
        description: "Expert des systèmes de gestion de bases de données",
        rarity: "legendary",
        icon: "/badge/dbms-master.png",
        dateObtained: "25 Février 2024",
        category: "Base de données",
    },
    {
        id: 10,
        name: "Data Guardian",
        description: "Protection et sauvegarde des données",
        rarity: "epic",
        icon: "/badge/data-guardian.png",
        dateObtained: "20 Février 2024",
        category: "Sécurité",
    },
    {
        id: 11,
        name: "Code Apprenti (C)",
        description: "Initiation au langage C",
        rarity: "common",
        icon: "/badge/c.png",
        dateObtained: "15 Février 2024",
        category: "Programmation",
    },
    {
        id: 12,
        name: "Apprenti du Câblage",
        description: "Premiers pas dans le câblage réseau",
        rarity: "common",
        icon: "/badge/apprenti-du-cablage.png",
        dateObtained: "10 Février 2024",
        category: "Réseau",
    },
];

const trophies = [
    {
        title: "Victoire Royale",
        description: "Remporter 100 parties",
        progress: 127,
        total: 100,
        completed: true,
        rarity: "legendary",
        icon: Crown,
        reward: "1000 XP + Skin Légendaire",
    },
    {
        title: "Maître Constructeur",
        description: "Construire 10,000 structures",
        progress: 8543,
        total: 10000,
        completed: false,
        rarity: "epic",
        icon: Target,
        reward: "500 XP + Emote Rare",
    },
    {
        title: "Sniper Elite",
        description: "200 éliminations à distance",
        progress: 156,
        total: 200,
        completed: false,
        rarity: "rare",
        icon: Target,
        reward: "300 XP + Wrap d'arme",
    },
    {
        title: "Survivant",
        description: "Survivre 500 minutes",
        progress: 500,
        total: 500,
        completed: true,
        rarity: "epic",
        icon: Award,
        reward: "750 XP + Planeur Épique",
    },
]

const getRarityColor = (rarity: string) => {
    switch (rarity) {
        case "legendary":
            return "from-yellow-400 to-orange-500"
        case "epic":
            return "from-purple-400 to-pink-500"
        case "rare":
            return "from-blue-400 to-cyan-500"
        default:
            return "from-gray-400 to-gray-500"
    }
}

const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
        case "legendary":
            return "text-yellow-600"
        case "epic":
            return "text-purple-600"
        case "rare":
            return "text-blue-600"
        case "uncommon":
            return "text-green-600"
        case "common":
            return "text-gray-600"
        default:
            return "text-gray-600"
    }
}
export default function TrophySection() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex">

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Header */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-4xl font-black text-gray-900">Trophées & Succès</h1>
                                    <p className="text-gray-600 text-lg mt-2">Débloquez des récompenses en accomplissant des défis</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-black text-[#6C5CE7]">127/200</div>
                                    <div className="text-gray-600">Trophées débloqués</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 gap-6">
                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-xl text-gray-900 mb-6">Progression par Catégorie</h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={achievementsData}>
                                        <XAxis dataKey="name" className="text-sm" />
                                        <YAxis className="text-sm" />
                                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                            {achievementsData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-xl text-gray-900 mb-6">Répartition des Trophées</h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={achievementsData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {achievementsData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-2xl text-gray-900">Badges Obtenus</h3>
                                <Badge className="bg-[#6C5CE7] text-white border-0 px-4 py-2">{obtainedBadges.length} badges</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {obtainedBadges.map((badge) => {
                                    return (
                                        <div
                                            key={badge.id}
                                            className="group relative p-6 bg-white rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                                        >
                                            <div className="text-center space-y-4">
                                                <div
                                                    className={` relative w-20 h-20 mx-auto rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                                >
                                                        <Image
                                                            src={badge.icon}
                                                            alt={badge.name}
                                                            fill
                                                            className="object-contain"
                                                        />
                                                </div>


                                                <div>
                                                    <h4 className="font-bold text-lg text-gray-900 mb-1">{badge.name}</h4>
                                                    <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                                                    <div
                                                        className={`text-xs font-semibold uppercase tracking-wide ${getRarityTextColor(badge.rarity)} mb-2`}
                                                    >
                                                        {badge.rarity}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Obtenu le {badge.dateObtained}</div>
                                                </div>
                                            </div>

                                            {/* Rarity glow effect */}
                                            <div
                                                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getRarityColor(badge.rarity)} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                            ></div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Trophies List */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                        <CardContent className="p-8">
                            <h3 className="font-bold text-2xl text-gray-900 mb-6">Défis Actifs</h3>
                            <div className="grid gap-6">
                                {trophies.map((trophy, index) => {
                                    const IconComponent = trophy.icon
                                    const progressPercent = Math.min((trophy.progress / trophy.total) * 100, 100)

                                    return (
                                        <div
                                            key={index}
                                            className={`relative p-6 rounded-3xl border-2 ${
                                                trophy.completed
                                                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                                                    : "bg-white border-gray-200"
                                            }`}
                                        >
                                            <div className="flex items-center space-x-6">
                                                <div
                                                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getRarityColor(trophy.rarity)} flex items-center justify-center shadow-lg`}
                                                >
                                                    <IconComponent className="w-8 h-8 text-white" />
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <h4 className="font-bold text-xl text-gray-900">{trophy.title}</h4>
                                                        {trophy.completed && <Badge className="bg-green-500 text-white border-0">Terminé</Badge>}
                                                    </div>
                                                    <p className="text-gray-600 mb-3">{trophy.description}</p>

                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-1">
                                                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>
                                  {trophy.progress.toLocaleString()}/{trophy.total.toLocaleString()}
                                </span>
                                                                <span>{Math.round(progressPercent)}%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div
                                                                    className="bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] h-2 rounded-full transition-all duration-300"
                                                                    style={{ width: `${progressPercent}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>

                                                        <div className="text-right">
                                                            <div className="text-sm font-medium text-gray-900">Récompense</div>
                                                            <div className="text-xs text-gray-600">{trophy.reward}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
