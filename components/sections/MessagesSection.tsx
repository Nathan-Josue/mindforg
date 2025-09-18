"use client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Home, User, Settings, MessageCircle, Trophy, Send, Search, Phone, Video, MoreVertical } from "lucide-react"

const conversations = [
    {
        id: 1,
        name: "DragonSlayer",
        lastMessage: "GG pour la partie !",
        time: "2m",
        avatar: "DS",
        color: "bg-blue-600", // darker blue for better contrast
        online: true,
        unread: 2,
    },
    {
        id: 2,
        name: "NightHawk",
        lastMessage: "On refait une partie ?",
        time: "15m",
        avatar: "NH",
        color: "bg-purple-600", // darker purple for better contrast
        online: false,
        unread: 0,
    },
    {
        id: 3,
        name: "FireStorm",
        lastMessage: "J'ai trouvé un nouveau spot !",
        time: "1h",
        avatar: "FS",
        color: "bg-red-600", // darker red for better contrast
        online: true,
        unread: 1,
    },
    {
        id: 4,
        name: "IceQueen",
        lastMessage: "Merci pour les conseils",
        time: "3h",
        avatar: "IQ",
        color: "bg-cyan-600", // darker cyan for better contrast
        online: true,
        unread: 0,
    },
]

const messages = [
    {
        id: 1,
        sender: "DragonSlayer",
        content: "Salut ! Tu es dispo pour une partie ?",
        time: "14:30",
        isMe: false,
    },
    {
        id: 2,
        sender: "Moi",
        content: "Oui, je lance le jeu !",
        time: "14:32",
        isMe: true,
    },
    {
        id: 3,
        sender: "DragonSlayer",
        content: "Perfect ! On fait du duo ?",
        time: "14:33",
        isMe: false,
    },
    {
        id: 4,
        sender: "Moi",
        content: "Carrément ! J'ai hâte de tester la nouvelle map",
        time: "14:35",
        isMe: true,
    },
    {
        id: 5,
        sender: "DragonSlayer",
        content: "GG pour la partie ! On a bien joué ensemble 🎉",
        time: "15:42",
        isMe: false,
    },
]

export default function MessagesSection() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 flex">
            {/* Main Content */}
            <div className="flex-1 flex">
                {/* Conversations List */}
                <div className="w-80 bg-white/80 backdrop-blur-sm border-r border-gray-200/50 p-6">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 mb-4">Messages</h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input placeholder="Rechercher une conversation..." className="pl-10 bg-gray-50 border-0 rounded-2xl" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            {conversations.map((conversation) => (
                                <div
                                    key={conversation.id}
                                    className={`flex items-center space-x-3 p-4 rounded-2xl cursor-pointer transition-colors ${
                                        conversation.id === 1 ? "bg-[#6C5CE7]/10" : "hover:bg-gray-50"
                                    }`}
                                >
                                    <div className="relative">
                                        <Avatar className="w-12 h-12">
                                            <AvatarFallback className={`${conversation.color} text-white font-semibold`}>
                                                {conversation.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        {conversation.online && (
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className="font-semibold text-gray-900 truncate">{conversation.name}</p>
                                            <span className="text-xs text-gray-500">{conversation.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                                    </div>
                                    {conversation.unread > 0 && (
                                        <Badge className="bg-[#6C5CE7] text-white border-0 text-xs">{conversation.unread}</Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Avatar className="w-12 h-12">
                                    <AvatarFallback className="bg-blue-600 text-white font-semibold">DS</AvatarFallback>{" "}
                                    {/* darker blue for better contrast */}
                                </Avatar>
                                <div>
                                    <h3 className="font-bold text-gray-900">DragonSlayer</h3>
                                    <p className="text-sm text-green-500">En ligne</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-2xl">
                                    <Phone className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-2xl">
                                    <Video className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-2xl">
                                    <MoreVertical className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div key={message.id} className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                                            message.isMe ? "bg-[#6C5CE7] text-white" : "bg-white shadow-sm border border-gray-200"
                                        }`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                        <p className={`text-xs mt-1 ${message.isMe ? "text-white/70" : "text-gray-500"}`}>{message.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 p-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 relative">
                                <Input placeholder="Tapez votre message..." className="pr-12 bg-gray-50 border-0 rounded-2xl" />
                                <Button
                                    size="icon"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-[#6C5CE7] hover:bg-[#5B4BD6] rounded-xl"
                                >
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
