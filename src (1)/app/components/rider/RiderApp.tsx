import { Routes, Route } from "react-router";
import { RiderDashboard } from "@/app/components/rider/RiderDashboard";
import { ActiveDeliveries } from "@/app/components/rider/ActiveDeliveries";
import { DeliveryHistory } from "@/app/components/rider/DeliveryHistory";
import { RouteOptimization } from "@/app/components/rider/RouteOptimization";
import { RiderHeader } from "@/app/components/rider/RiderHeader";

export function RiderApp() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RiderHeader />
      <Routes>
        <Route path="/" element={<RiderDashboard />} />
        <Route path="/active" element={<ActiveDeliveries />} />
        <Route path="/routes" element={<RouteOptimization />} />
        <Route path="/history" element={<DeliveryHistory />} />
      </Routes>
    </div>
  );
}
