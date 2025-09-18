"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Home, User, Settings, MessageCircle, Trophy, Edit, Star, Calendar, MapPin } from "lucide-react"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"
import Image from "next/image";

const skillsData = [
    { subject: "Combat", A: 95, fullMark: 100 },
    { subject: "Construction", A: 87, fullMark: 100 },
    { subject: "Survie", A: 92, fullMark: 100 },
    { subject: "Stratégie", A: 78, fullMark: 100 },
    { subject: "Équipe", A: 85, fullMark: 100 },
]

const statsData = [
    { name: "Victoires", value: 127 },
    { name: "Top 10", value: 342 },
    { name: "Éliminations", value: 1250 },
    { name: "Parties", value: 890 },
]

export default function UserSection() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Profile Header */}
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
                        <CardContent className="p-8">
                            <div className="flex justify-between space-x-8">
                                <div className={"flex items-start space-x-8"}>
                                    <div className="relative">
                                        <Avatar className="w-32 h-32 border-4 border-[#6C5CE7]/20">
                                            <AvatarFallback className="bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] text-white text-4xl font-bold">
                                                MG
                                            </AvatarFallback>
                                        </Avatar>
                                        <Button
                                            size="icon"
                                            className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-[#6C5CE7] hover:bg-[#5B4BD6] shadow-lg"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <h1 className="text-4xl font-black text-gray-900">MonsterGamer</h1>
                                            <p className="text-gray-600 text-lg">Joueur Légendaire • Niveau 87</p>
                                        </div>
                                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>Membre depuis Mars 2021</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>France</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Star className="w-4 h-4 text-yellow-500" />
                                                <span>4.8/5 (234 avis)</span>
                                            </div>
                                        </div>
                                        <div className="flex space-x-3">
                                            <Badge className="bg-[#6C5CE7]/10 text-[#6C5CE7] border-0">Battle Royale Master</Badge>
                                            <Badge className="bg-[#FDCB6E]/10 text-[#FDCB6E] border-0">Top Builder</Badge>
                                            <Badge className="bg-[#E17055]/10 text-[#E17055] border-0">Squad Leader</Badge>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex flex-col items-center">
                                        <Image src="/ranked/rank/overlord.png" alt="Rang OVERLORD" width={100} height={100} />
                                        <span className="mt-2 text-sm font-medium text-gray-700
    bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
    bg-clip-text text-transparent
    animate-glitch glitch">
  OVERLORD
</span>
                                    </div>
                                    <div className={"flex flex-row"}>
                                        <Image src="/icons/star_.png" alt="Rang OVERLORD" width={30} height={30} />
                                        <Image src="/icons/star_.png" alt="Rang OVERLORD" width={30} height={30} />
                                        <Image src="/icons/star_.png" alt="Rang OVERLORD" width={30} height={30} />
                                        <Image src="/icons/star_.png" alt="Rang OVERLORD" width={30} height={30} />
                                        <Image src="/icons/star_.png" alt="Rang OVERLORD" width={30} height={30} />

                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-6">
                        {statsData.map((stat, index) => (
                            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                                <CardContent className="p-6 text-center">
                                    <div className="text-3xl font-black text-[#6C5CE7] mb-2">{stat.value.toLocaleString()}</div>
                                    <div className="text-gray-600 font-medium">{stat.name}</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Skills and Recent Activity */}
                    <div className="grid grid-cols-2 gap-6">
                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-xl text-gray-900 mb-6">Compétences</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <RadarChart data={skillsData}>
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey="subject" className="text-sm" />
                                        <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
                                        <Radar
                                            name="Niveau"
                                            dataKey="A"
                                            stroke="#6C5CE7"
                                            fill="#6C5CE7"
                                            fillOpacity={0.3}
                                            strokeWidth={3}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-xl text-gray-900 mb-6">Activité Récente</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-2xl">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">Victoire Royale</p>
                                            <p className="text-sm text-gray-500">Il y a 2 heures</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-2xl">
                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">Nouveau record d&apos;éliminations</p>
                                            <p className="text-sm text-gray-500">Il y a 5 heures</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-2xl">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">Niveau 87 atteint</p>
                                            <p className="text-sm text-gray-500">Hier</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
