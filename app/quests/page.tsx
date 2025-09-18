import Sidebar from "@/components/dashbord/sidebar";
import QuestsSection from "@/components/sections/QuestsSection";

export default function TrophyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Sidebar */}
            <Sidebar/>
            {/* Main Content */}
            <div className="ml-24 overflow-y-auto">
                <QuestsSection />
            </div>
        </div>
    );
}