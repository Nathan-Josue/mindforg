import {Card, CardContent} from "@/components/ui/card";
import {BarChart3} from "lucide-react";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
const activity = [
    {name: "MonsterGamer", status: "En ligne", avatar: "MG", color: "bg-green-500", time: "2m"},
    {name: "DragonSlayer", status: "Partie en cours", avatar: "DS", color: "bg-blue-500", time: "5m"},
    {name: "NightHawk", status: "Hors ligne", avatar: "NH", color: "bg-gray-400", time: "1h"},
    {name: "FireStorm", status: "En attente", avatar: "FS", color: "bg-yellow-500", time: "3m"},
    {name: "IceQueen", status: "En ligne", avatar: "IQ", color: "bg-purple-500", time: "7m"},
]
export default function RightSidebar(){
    return(
        <div className="group w-40 hover:w-[21rem] transition-all duration-300 ease-in-out">
            <Card
                className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl h-full overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-6">
                        <BarChart3 className="w-5 h-5 text-[#6C5CE7]"/>
                        <h3 className="font-semibold text-gray-900">Activité</h3>
                    </div>
                    <div className="space-y-4">
                        {activity.map((act, index) => (
                            <div
                                key={index}
                                className="flex items-center space-x-3 p-3 rounded-2xl
                                            transition-all duration-300 ease-in-out
                                             hover:bg-gray-50/80 hover:scale-[1.02] hover:translate-x-1"
                            >
                                <Avatar
                                    className="w-12 h-12 transition-transform duration-300 group-hover:scale-110">
                                    <AvatarFallback
                                        className={`${act.color} text-white font-semibold`}
                                    >
                                        {act.avatar}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{act.name}</p>
                                    <p className="text-sm text-gray-500 truncate">{act.status}</p>
                                </div>
                                <span className="text-xs text-gray-400">{act.time}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}