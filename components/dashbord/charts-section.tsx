import {Card, CardContent} from "@/components/ui/card";
import {Target, TrendingUp} from "lucide-react";
import {
    Line,
    LineChart,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    XAxis, YAxis
} from "recharts";

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
export default function ChartsSection(){
    return(
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

    )
}