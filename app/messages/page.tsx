import Sidebar from "@/components/dashbord/sidebar";
import MessagesSection from "@/components/sections/MessagesSection";

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Sidebar */}
      <Sidebar/>
      {/* Main Content */}
      <MessagesSection />
    </div>
  );
}