"use client"

import {Card, CardContent} from "@/components/ui/card"
import {Target, TrendingUp} from "lucide-react"
import {
    Line,
    LineChart,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from "recharts"
import Sidebar from "@/components/dashbord/sidebar";
import RightSidebar from "@/components/dashbord/right-sidebar";
import HeaderSection from "@/components/dashbord/header-section";
import CharacterCards from "@/components/dashbord/character-cards";
import GameModes from "@/components/dashbord/game-modes";
import AppStore from "@/components/app-store";
import Language from "@/components/dashbord/language";

const radarData = [
    {subject: "Eliminations", A: 120, fullMark: 150},
    {subject: "Wins", A: 98, fullMark: 150},
    {subject: "Accuracy", A: 86, fullMark: 150},
    {subject: "Building", A: 99, fullMark: 150},
    {subject: "Survival", A: 85, fullMark: 150},
    {subject: "Team Play", A: 65, fullMark: 150},
]

const lineData = [
    {name: "Jan", value: 400},
    {name: "Feb", value: 300},
    {name: "Mar", value: 600},
    {name: "Apr", value: 800},
    {name: "May", value: 500},
    {name: "Jun", value: 900},
]



export default function FortniteDashboard() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Sidebar */}
            <Sidebar/>
            {/* Main Content */}
            <div className="ml-24 min-h-screen overflow-y-auto">
                <div className="p-8">
                    <div className="flex w-full gap-6">
                        {/* Main Section */}
                        <div className="space-y-6 w-full transition-all duration-300 ease-in-out">
                            {/* Header Section */}
                            <HeaderSection/>
                            <Language/>

                            <GameModes/>
                            {/* Character Cards */}
                            <CharacterCards/>

                            {/* Charts Section */}
                            <div className="grid grid-cols-2 gap-6">
                                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                                    <CardContent className="p-6">
                                        <div className="flex items-center space-x-2 mb-4">
                                            <Target className="w-5 h-5 text-[#6C5CE7]"/>
                                            <h3 className="font-semibold text-gray-900">Statistiques</h3>
                                        </div>
                                        <ResponsiveContainer width="100%" height={200}>
                                            <RadarChart data={radarData}>
                                                <PolarGrid/>
                                                <PolarAngleAxis dataKey="subject" className="text-xs"/>
                                                <PolarRadiusAxis angle={90} domain={[0, 150]} className="text-xs"/>
                                                <Radar
                                                    name="Performance"
                                                    dataKey="A"
                                                    stroke="#6C5CE7"
                                                    fill="#6C5CE7"
                                                    fillOpacity={0.2}
                                                    strokeWidth={2}
                                                />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl">
                                    <CardContent className="p-6">
                                        <div className="flex items-center space-x-2 mb-4">
                                            <TrendingUp className="w-5 h-5 text-[#FDCB6E]"/>
                                            <h3 className="font-semibold text-gray-900">Progression</h3>
                                        </div>
                                        <ResponsiveContainer width="100%" height={200}>
                                            <LineChart data={lineData}>
                                                <XAxis dataKey="name" className="text-xs"/>
                                                <YAxis className="text-xs"/>
                                                <Line
                                                    type="monotone"
                                                    dataKey="value"
                                                    stroke="#FDCB6E"
                                                    strokeWidth={3}
                                                    dot={{fill: "#FDCB6E", strokeWidth: 2, r: 4}}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </div>

                            {/*<AppStore/>*/}
                        </div>

                        {/* Right Sidebar */}
                        {/*<RightSidebar/>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}
