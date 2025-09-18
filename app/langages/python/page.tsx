"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Code, Trophy, Star, Target, Play, Lock, CheckCircle, BookOpen, Clock, Award } from "lucide-react"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"

const skillsData = [
    { subject: "Syntaxe", A: 95, fullMark: 100 },
    { subject: "Logique", A: 87, fullMark: 100 },
    { subject: "Debugging", A: 92, fullMark: 100 },
    { subject: "Algorithmes", A: 78, fullMark: 100 },
    { subject: "Projets", A: 85, fullMark: 100 },
]

const missions = [
    {
        level: 1,
        title: "Variables & Types",
        description: "Découvre les fondamentaux de Python",
        xp: 100,
        completed: true,
        challenges: 8,
        duration: "45 min",
        difficulty: "Débutant",
    },
    {
        level: 2,
        title: "Conditions & Boucles",
        description: "Maîtrise le contrôle de flux",
        xp: 150,
        completed: true,
        challenges: 12,
        duration: "1h 20min",
        difficulty: "Débutant",
    },
    {
        level: 3,
        title: "Fonctions",
        description: "Organise ton code efficacement",
        xp: 200,
        completed: false,
        challenges: 10,
        duration: "1h 45min",
        difficulty: "Intermédiaire",
    },
    {
        level: 4,
        title: "Listes & Dictionnaires",
        description: "Manipule les structures de données",
        xp: 250,
        completed: false,
        challenges: 15,
        duration: "2h 10min",
        difficulty: "Intermédiaire",
    },
    {
        level: 5,
        title: "Classes & Objets",
        description: "Plonge dans la programmation orientée objet",
        xp: 300,
        completed: false,
        challenges: 18,
        duration: "2h 45min",
        difficulty: "Avancé",
    },
    {
        level: 6,
        title: "Projet Final",
        description: "Crée ton premier vrai programme Python",
        xp: 500,
        completed: false,
        challenges: 6,
        duration: "3h 30min",
        difficulty: "Expert",
    },
]

const achievements = [
    { name: "Premier Pas", description: "Première mission complétée", earned: true },
    { name: "Série de 5", description: "5 défis d'affilée réussis", earned: true },
    { name: "Pythonista", description: "Maîtrise des bases Python", earned: false },
    { name: "Code Master", description: "Toutes les missions complétées", earned: false },
]

const statsData = [
    { name: "Défis réussis", value: 20 },
    { name: "Temps total", value: "12h" },
    { name: "Série actuelle", value: 7 },
    { name: "Rang Python", value: "#89" },
]

export default function PythonCoursePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
            <div
                className="absolute top-0 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
                style={{ animationDelay: "2s" }}
            />

            <div className="relative z-10 p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header with Back Button */}
                    <div className="flex items-center justify-between">
                        <Button variant="ghost" className="text-white hover:bg-white/10">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Retour aux langages
                        </Button>
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-3 mb-2">
                                <span className="text-6xl">🐍</span>
                                <h1 className="text-5xl font-black bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Python
                                </h1>
                            </div>
                            <p className="text-xl text-slate-300">Bienvenue dans l&#39;univers Python, jeune Codeur</p>
                        </div>
                        <div className="w-24" /> {/* Spacer for centering */}
                    </div>

                    {/* User Progress Card */}
                    <Card className="glassmorphism border-white/20 shadow-2xl">
                        <CardContent className="p-8">
                            <div className="flex justify-between space-x-8">
                                <div className="flex items-start space-x-8">
                                    <div className="relative">
                                        <Avatar className="w-32 h-32 border-4 border-green-400/30">
                                            <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white text-4xl font-bold">
                                                CF
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">12</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <h2 className="text-4xl font-black text-white">CodeForge</h2>
                                            <p className="text-slate-300 text-lg">Apprenti Python • Niveau 12</p>
                                        </div>
                                        <div className="flex items-center space-x-6 text-sm text-slate-400">
                                            <div className="flex items-center space-x-2">
                                                <Clock className="w-4 h-4" />
                                                <span>12h de code</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Target className="w-4 h-4" />
                                                <span>20/38 défis</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Star className="w-4 h-4 text-yellow-500" />
                                                <span>85% de réussite</span>
                                            </div>
                                        </div>
                                        <div className="flex space-x-3">
                                            <Badge className="bg-green-500/20 text-green-400 border-green-400/30">Premier Pas</Badge>
                                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-400/30">Série de 5</Badge>
                                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-400/30">Code Warrior</Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center space-y-4">
                                    <div className="text-6xl">🏆</div>
                                    <div className="space-y-1">
                                        <div className="text-3xl font-bold text-green-400">1,250 XP</div>
                                        <div className="text-sm text-slate-400">Rang: Apprenti</div>
                                        <Progress value={65} className="w-32 h-2" />
                                        <div className="text-xs text-slate-500">750 XP jusqu&#39;à Hacker</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-6">
                        {statsData.map((stat, index) => (
                            <Card key={index} className="glassmorphism border-white/20 shadow-xl">
                                <CardContent className="p-6 text-center">
                                    <div className="text-3xl font-black text-green-400 mb-2">{stat.value}</div>
                                    <div className="text-slate-300 font-medium">{stat.name}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Skills and Achievements */}
                    <div className="grid grid-cols-2 gap-6">
                        <Card className="glassmorphism border-white/20 shadow-xl">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
                                    <Code className="w-6 h-6 text-green-400" />
                                    Compétences Python
                                </h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <RadarChart data={skillsData}>
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey="subject" className="text-sm fill-slate-300" />
                                        <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs fill-slate-400" />
                                        <Radar
                                            name="Niveau"
                                            dataKey="A"
                                            stroke="#10b981"
                                            fill="#10b981"
                                            fillOpacity={0.3}
                                            strokeWidth={3}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="glassmorphism border-white/20 shadow-xl">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-xl text-white mb-6 flex items-center gap-2">
                                    <Award className="w-6 h-6 text-yellow-400" />
                                    Succès Débloqués
                                </h3>
                                <div className="space-y-4">
                                    {achievements.map((achievement, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center space-x-4 p-4 rounded-2xl ${
                                                achievement.earned ? "bg-green-500/20" : "bg-slate-700/30"
                                            }`}
                                        >
                                            <div
                                                className={`w-3 h-3 rounded-full ${achievement.earned ? "bg-green-500" : "bg-slate-500"}`}
                                            ></div>
                                            <div className="flex-1">
                                                <p className={`font-medium ${achievement.earned ? "text-white" : "text-slate-400"}`}>
                                                    {achievement.name}
                                                </p>
                                                <p className="text-sm text-slate-500">{achievement.description}</p>
                                            </div>
                                            {achievement.earned && <Trophy className="w-5 h-5 text-yellow-400" />}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Missions */}
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                            <BookOpen className="w-8 h-8 text-green-400" />
                            Parcours d&#39;Apprentissage
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {missions.map((mission, index) => (
                                <Card
                                    key={index}
                                    className={`glassmorphism border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                                        mission.completed || index <= 2 ? "hover:scale-105 cursor-pointer" : "opacity-60"
                                    }`}
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                                        mission.completed ? "bg-green-500" : index <= 2 ? "bg-green-600" : "bg-slate-600"
                                                    }`}
                                                >
                                                    {mission.completed ? (
                                                        <CheckCircle className="w-6 h-6 text-white" />
                                                    ) : index <= 2 ? (
                                                        <Play className="w-6 h-6 text-white" />
                                                    ) : (
                                                        <Lock className="w-6 h-6 text-slate-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold text-white">{mission.title}</h4>
                                                    <p className="text-slate-300">{mission.description}</p>
                                                </div>
                                            </div>
                                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">+{mission.xp} XP</Badge>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm text-slate-400">
                                                <span>{mission.challenges} défis</span>
                                                <span>{mission.duration}</span>
                                                <Badge
                                                    variant="outline"
                                                    className={`text-xs ${
                                                        mission.difficulty === "Débutant"
                                                            ? "border-green-400 text-green-400"
                                                            : mission.difficulty === "Intermédiaire"
                                                                ? "border-yellow-400 text-yellow-400"
                                                                : mission.difficulty === "Avancé"
                                                                    ? "border-orange-400 text-orange-400"
                                                                    : "border-red-400 text-red-400"
                                                    }`}
                                                >
                                                    {mission.difficulty}
                                                </Badge>
                                            </div>

                                            <Button
                                                className={`w-full ${
                                                    mission.completed
                                                        ? "bg-green-600 hover:bg-green-700"
                                                        : index <= 2
                                                            ? "bg-green-600 hover:bg-green-700"
                                                            : "bg-slate-600 cursor-not-allowed"
                                                }`}
                                                disabled={!mission.completed && index > 2}
                                            >
                                                {mission.completed ? "Revoir" : index <= 2 ? "Commencer" : "Verrouillé"}
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
