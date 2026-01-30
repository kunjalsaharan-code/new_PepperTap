import { Routes, Route } from "react-router";
import { AdminDashboard } from "@/app/components/admin/AdminDashboard";
import { DemandPrediction } from "@/app/components/admin/DemandPrediction";
import { SystemPerformance } from "@/app/components/admin/SystemPerformance";
import { StoreLoadMonitor } from "@/app/components/admin/StoreLoadMonitor";
import { AdminHeader } from "@/app/components/admin/AdminHeader";

export function AdminApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/demand" element={<DemandPrediction />} />
        <Route path="/performance" element={<SystemPerformance />} />
        <Route path="/store-load" element={<StoreLoadMonitor />} />
      </Routes>
    </div>
  );
}
