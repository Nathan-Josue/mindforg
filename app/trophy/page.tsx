import Sidebar from "@/components/dashbord/sidebar";
import TrophySection from "@/components/sections/TrophySection";

export default function TrophyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar */}
      <Sidebar/>
      {/* Main Content */}
      <TrophySection />
    </div>
  );
}