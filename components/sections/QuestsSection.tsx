"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Calendar,
    Star,
    Zap,
    Target,
    Clock,
    Gift,
    Sword,
    Shield,
    Code,
    Database,
    Trophy,
    CheckCircle,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

const questStats = [
    { name: "Quotidiennes", completed: 12, total: 15, color: "#6C5CE7" },
    { name: "Hebdomadaires", completed: 3, total: 5, color: "#FDCB6E" },
    { name: "Spéciales", completed: 8, total: 10, color: "#E17055" },
    { name: "Événements", completed: 2, total: 3, color: "#00B894" },
]

const dailyQuests = [
    {
        id: 1,
        title: "Débogueur du Matin",
        description: "Résoudre 3 erreurs de syntaxe en Python",
        progress: 2,
        total: 3,
        reward: "50 XP + Badge Python",
        timeLeft: "6h 23m",
        difficulty: "facile",
        category: "Python",
        icon: Code,
        completed: false,
        background: "/perso/reyna.png",

    },
    {
        id: 2,
        title: "Maître des Requêtes",
        description: "Exécuter 5 requêtes SQL SELECT",
        progress: 5,
        total: 5,
        reward: "75 XP + Skin Database",
        timeLeft: "6h 23m",
        difficulty: "moyen",
        category: "SQL",
        icon: Database,
        completed: true,
        background: "/perso/Synthia.png"
    },
    {
        id: 3,
        title: "Codeur Rapide",
        description: "Écrire 100 lignes de code en moins de 30 minutes",
        progress: 67,
        total: 100,
        reward: "100 XP + Emote Vitesse",
        timeLeft: "6h 23m",
        difficulty: "difficile",
        category: "Général",
        icon: Zap,
        completed: false,
        background: "/perso/vortex-7.png"
    },
]

const weeklyQuests = [
    {
        id: 4,
        title: "Architecte de Données",
        description: "Créer 3 schémas de base de données complexes",
        progress: 1,
        total: 3,
        reward: "300 XP + Titre 'Architecte'",
        timeLeft: "4j 12h",
        difficulty: "épique",
        category: "Architecture",
        icon: Shield,
        completed: false,
        // background: "/perso/vortex-7.png"

    },
    {
        id: 5,
        title: "Guerrier du Code",
        description: "Compléter 20 défis de programmation",
        progress: 15,
        total: 20,
        reward: "500 XP + Skin Légendaire",
        timeLeft: "4j 12h",
        difficulty: "légendaire",
        category: "Défis",
        icon: Sword,
        completed: false,
    },
]

const specialQuests = [
    {
        id: 6,
        title: "Événement Fortnite x Code",
        description: "Recréer un mini-jeu Fortnite en JavaScript",
        progress: 0,
        total: 1,
        reward: "1000 XP + Skin Fortnite Exclusif",
        timeLeft: "14j 5h",
        difficulty: "légendaire",
        category: "Événement",
        icon: Trophy,
        completed: false,
        isEvent: true,
    },
]

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case "légendaire":
            return "from-yellow-400 to-orange-500"
        case "épique":
            return "from-purple-400 to-pink-500"
        case "difficile":
            return "from-red-400 to-red-600"
        case "moyen":
            return "from-blue-400 to-cyan-500"
        case "facile":
            return "from-green-400 to-green-600"
        default:
            return "from-gray-400 to-gray-500"
    }
}

const getDifficultyTextColor = (difficulty: string) => {
    switch (difficulty) {
        case "légendaire":
            return "text-yellow-600"
        case "épique":
            return "text-purple-600"
        case "difficile":
            return "text-red-600"
        case "moyen":
            return "text-blue-600"
        case "facile":
            return "text-green-600"
        default:
            return "text-gray-600"
    }
}

const QuestCard = ({ quest, type }: { quest: any; type: string }) => {
    const IconComponent = quest.icon;
    const progressPercent = Math.min((quest.progress / quest.total) * 100, 100);

    return (
        <div
            className={`relative p-6 rounded-3xl border-2 transition-all duration-300 hover:shadow-lg ${
                quest.completed
                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
                    : quest.isEvent
                        ? "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200"
                        : "bg-white border-gray-200 hover:border-gray-300"
            }`}
            // Note: on supprime overflow-hidden pour permettre le dépassement
        >
            {/* Image à droite qui dépasse */}
            {quest.background && (
                <div
                    className="absolute -top-7 right-0 h-70 w-[80%] z-20 pointer-events-none"
                    style={{
                        backgroundImage: `url(${quest.background})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right center",
                        backgroundSize: "contain",
                        // transform: "translateX(0%)", // dépassement vers la droite
                    }}
                />
            )}

            {/* Contenu principal */}
            <div className="relative z-30 flex items-start space-x-4 w-[52rem]">
                <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getDifficultyColor(
                        quest.difficulty
                    )} flex items-center justify-center shadow-lg flex-shrink-0`}
                >
                    <IconComponent className="w-8 h-8 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                    {/* Titre et description */}
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-1">
                                <h4 className="font-bold text-lg text-gray-900">{quest.title}</h4>
                                {quest.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                                {quest.isEvent && <Star className="w-5 h-5 text-purple-500" />}
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{quest.description}</p>

                            <div className="flex items-center space-x-3 mb-3">
                                <Badge className={`${getDifficultyTextColor(quest.difficulty)} bg-transparent border-current`}>
                                    {quest.difficulty}
                                </Badge>
                                <Badge variant="outline" className="text-gray-600">
                                    {quest.category}
                                </Badge>
                            </div>
                        </div>

                        <div className="text-right flex-shrink-0 ml-4">
                            <div className="flex items-center text-orange-600 mb-1">
                                <Clock className="w-4 h-4 mr-1" />
                                <span className="text-sm font-medium">{quest.timeLeft}</span>
                            </div>
                            <div className="text-xs text-gray-500">Temps restant</div>
                        </div>
                    </div>

                    {/* Progression et récompense */}
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Progression</span>
                                <span>{quest.progress}/{quest.total}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-[#6C5CE7] to-[#A29BFE] h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progressPercent}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center text-green-600">
                                <Gift className="w-4 h-4 mr-2" />
                                <span className="text-sm font-medium">{quest.reward}</span>
                            </div>

                            {!quest.completed && (
                                <Button
                                    size="sm"
                                    className="bg-[#6C5CE7] hover:bg-[#5A4FCF] text-white"
                                    disabled={quest.progress === 0}
                                >
                                    {quest.progress === quest.total ? "Réclamer" : "Continuer"}
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function QuestsSection() {
    const totalCompleted = questStats.reduce((acc, stat) => acc + stat.completed, 0)
    const totalQuests = questStats.reduce((acc, stat) => acc + stat.total, 0)

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="flex-1 p-8">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Header */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-4xl font-black text-gray-900">Centre des Quêtes</h1>
                                    <p className="text-gray-600 text-lg mt-2">
                                        Accomplissez des missions pour gagner de l'XP et des récompenses
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-black text-[#6C5CE7]">
                                        {totalCompleted}/{totalQuests}
                                    </div>
                                    <div className="text-gray-600">Quêtes terminées</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Overview */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                        <CardContent className="p-6">
                            <h3 className="font-bold text-xl text-gray-900 mb-6">Progression par Type</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={questStats}>
                                    <XAxis dataKey="name" className="text-sm" />
                                    <YAxis className="text-sm" />
                                    <Bar dataKey="completed" radius={[8, 8, 0, 0]} fill="#6C5CE7" />
                                    <Bar dataKey="total" radius={[8, 8, 0, 0]} fill="#E5E7EB" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Daily Quests */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <Calendar className="w-6 h-6 text-[#6C5CE7]" />
                                    <h3 className="font-bold text-2xl text-gray-900">Quêtes Quotidiennes</h3>
                                </div>
                                <Badge className="bg-[#6C5CE7] text-white border-0 px-4 py-2">
                                    {dailyQuests.filter((q) => q.completed).length}/{dailyQuests.length} terminées
                                </Badge>
                            </div>
                            <div className="grid gap-14">
                                {dailyQuests.map((quest) => (
                                    <QuestCard key={quest.id} quest={quest} type="daily" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Weekly Quests */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <Target className="w-6 h-6 text-purple-600" />
                                    <h3 className="font-bold text-2xl text-gray-900">Quêtes Hebdomadaires</h3>
                                </div>
                                <Badge className="bg-purple-600 text-white border-0 px-4 py-2">
                                    {weeklyQuests.filter((q) => q.completed).length}/{weeklyQuests.length} terminées
                                </Badge>
                            </div>
                            <div className="grid gap-8">
                                {weeklyQuests.map((quest) => (
                                    <QuestCard key={quest.id} quest={quest} type="weekly" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Special/Event Quests */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <Star className="w-6 h-6 text-yellow-600" />
                                    <h3 className="font-bold text-2xl text-gray-900">Événements Spéciaux</h3>
                                </div>
                                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-4 py-2">
                                    Temps limité !
                                </Badge>
                            </div>
                            <div className="grid gap-4">
                                {specialQuests.map((quest) => (
                                    <QuestCard key={quest.id} quest={quest} type="special" />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
