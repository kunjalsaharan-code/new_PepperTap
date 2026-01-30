import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { CheckCircle2, Package, Bike, Home, MapPin } from "lucide-react";

export function OrderTracking() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(25);
  const [currentStatus, setCurrentStatus] = useState(0);

  const statuses = [
    { label: "Order Placed", icon: CheckCircle2, time: "Just now" },
    { label: "Preparing", icon: Package, time: "In 2 mins" },
    { label: "Out for Delivery", icon: Bike, time: "In 15 mins" },
    { label: "Delivered", icon: Home, time: "In 25 mins" },
  ];

  useEffect(() => {
    // Simulate order progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
      setCurrentStatus((prev) => {
        if (prev >= 3) return 3;
        if (progress >= 75) return 3;
        if (progress >= 50) return 2;
        if (progress >= 25) return 1;
        return 0;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Track Order</h1>
          <p className="text-gray-600">Order ID: {orderId}</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/customer")}>
          Back to Home
        </Button>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-4">
            {statuses.map((status, idx) => {
              const Icon = status.icon;
              const isCompleted = idx < currentStatus;
              const isCurrent = idx === currentStatus;

              return (
                <div
                  key={idx}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                    isCurrent
                      ? "bg-green-50 border-2 border-green-500"
                      : isCompleted
                      ? "bg-gray-50"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCurrent
                        ? "bg-green-600"
                        : isCompleted
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold ${
                        isCurrent ? "text-green-900" : isCompleted ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {status.label}
                    </h3>
                    <p className="text-sm text-gray-600">{status.time}</p>
                  </div>
                  {isCompleted && (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  )}
                  {isCurrent && (
                    <Badge className="bg-green-600">In Progress</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>Delivery Address</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">123 Main Street, Apartment 4B</p>
            <p className="text-gray-700">Downtown</p>
            <p className="text-gray-700 mt-2">+91 9876543210</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bike className="w-5 h-5" />
              <span>Delivery Partner</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold">Rajesh Kumar</p>
            <p className="text-gray-600">+91 9988776655</p>
            <p className="text-sm text-gray-500 mt-2">Vehicle: Bike - MH12AB3456</p>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Fresh Milk (1L) x 2</span>
              <span className="font-semibold">₹130</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Organic Bananas x 1</span>
              <span className="font-semibold">₹40</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="font-bold">Total</span>
              <span className="font-bold text-green-600">₹210</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
