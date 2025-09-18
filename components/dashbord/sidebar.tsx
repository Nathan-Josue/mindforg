"use client";

import {Button} from "@/components/ui/button";
import {Home, MessageCircle, ScrollText, Settings, Trophy, User} from "lucide-react";
import {useRouter, usePathname} from "next/navigation";

export default function Sidebar(){
    const router = useRouter();
    const pathname = usePathname();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const getButtonClass = (path: string) => {
        const isActive = pathname === path;
        return `w-12 h-12 rounded-2xl ${
            isActive 
                ? 'bg-[#6C5CE7]/10 text-[#6C5CE7] hover:bg-[#6C5CE7]/20' 
                : 'hover:bg-gray-100'
        }`;
    };

    return (
        <div className="fixed left-0 top-0 h-screen w-24 bg-white/80 backdrop-blur-sm border-r border-gray-200/50 flex flex-col items-center py-6 space-y-6 z-50">
            {/* Logo */}
            <div
                className="w-10 h-10 bg-gradient-to-br from-[#6C5CE7] to-[#A29BFE] rounded-2xl flex items-center justify-center shadow-lg">
                <div className="w-4 h-6 bg-white rounded-full"></div>
            </div>

            {/* Navigation Icons */}
            <div className="flex flex-col space-y-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className={getButtonClass('/')}
                    onClick={() => handleNavigation('/')}
                >
                    <Home className="w-5 h-5"/>
                </Button>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className={getButtonClass('/user')}
                    onClick={() => handleNavigation('/user')}
                >
                    <User className="w-5 h-5"/>
                </Button>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className={getButtonClass('/trophy')}
                    onClick={() => handleNavigation('/trophy')}
                >
                    <Trophy className="w-5 h-5"/>
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className={getButtonClass('/quests')}
                    onClick={() => handleNavigation('/quests')}
                >
                    <ScrollText className="w-5 h-5"/>
                </Button>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className={getButtonClass('/messages')}
                    onClick={() => handleNavigation('/messages')}
                >
                    <MessageCircle className="w-5 h-5"/>
                </Button>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className={getButtonClass('/settings')}
                    onClick={() => handleNavigation('/settings')}
                >
                    <Settings className="w-5 h-5"/>
                </Button>
            </div>
        </div>
    )
}