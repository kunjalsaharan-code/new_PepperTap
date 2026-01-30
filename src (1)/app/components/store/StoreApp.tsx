import { Routes, Route } from "react-router";
import { StoreDashboard } from "@/app/components/store/StoreDashboard";
import { InventoryManagement } from "@/app/components/store/InventoryManagement";
import { OrderManagement } from "@/app/components/store/OrderManagement";
import { StorePerformance } from "@/app/components/store/StorePerformance";
import { StoreHeader } from "@/app/components/store/StoreHeader";

export function StoreApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <StoreHeader />
      <Routes>
        <Route path="/" element={<StoreDashboard />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/performance" element={<StorePerformance />} />
      </Routes>
    </div>
  );
}
