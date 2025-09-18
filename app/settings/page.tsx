import Sidebar from "@/components/dashbord/sidebar";
import SettingsSection from "@/components/sections/SettingsSection";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <Sidebar/>
      {/* Main Content */}
      <div className="ml-24 min-h-screen overflow-y-auto">
        <SettingsSection />
      </div>
    </div>
  );
}
