import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { MapPin, Navigation, Zap, Users, TrendingUp, Clock } from "lucide-react";

export function RouteOptimization() {
  const optimizedRoute = {
    totalDistance: 4.8,
    estimatedTime: 35,
    deliveries: 3,
    batchedDeliveries: 2,
    savings: {
      distance: 1.2,
      time: 15,
    },
  };

  const stops = [
    {
      order: 1,
      type: "pickup" as const,
      location: "Fresh Mart Express",
      address: "45 Market Street",
      items: 2,
      arriivalTime: "Now",
      status: "pending" as const,
    },
    {
      order: 2,
      type: "delivery" as const,
      location: "Rahul Mehta",
      address: "123 Main Street, Apt 4B",
      items: 1,
      arriivalTime: "+8 min",
      status: "pending" as const,
      orderId: "ORD1234",
    },
    {
      order: 3,
      type: "delivery" as const,
      location: "Sneha Kumar",
      address: "126 Main Street, Apt 2A",
      items: 1,
      arriivalTime: "+12 min",
      status: "pending" as const,
      orderId: "ORD1235",
      batched: true,
    },
    {
      order: 4,
      type: "pickup" as const,
      location: "Green Grocery",
      address: "78 Garden Avenue",
      items: 1,
      arriivalTime: "+18 min",
      status: "pending" as const,
    },
    {
      order: 5,
      type: "delivery" as const,
      location: "Amit Patel",
      address: "789 Garden Road",
      items: 1,
      arriivalTime: "+35 min",
      status: "pending" as const,
      orderId: "ORD1236",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Smart Route Optimization</h1>
          <p className="text-gray-600">AI-optimized delivery route for maximum efficiency</p>
        </div>
      </div>

      {/* Route Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Navigation className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl font-bold">{optimizedRoute.totalDistance}</p>
              <p className="text-sm text-gray-600">Total km</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-3xl font-bold">{optimizedRoute.estimatedTime}</p>
              <p className="text-sm text-gray-600">Minutes</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-3xl font-bold">{optimizedRoute.deliveries}</p>
              <p className="text-sm text-gray-600">Deliveries</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-3xl font-bold">{optimizedRoute.batchedDeliveries}</p>
              <p className="text-sm text-gray-600">Batched</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Savings */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Route Optimized!</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Distance Saved</p>
                  <p className="text-2xl font-bold text-green-600">{optimizedRoute.savings.distance} km</p>
                  <p className="text-xs text-gray-500">Compared to individual trips</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Time Saved</p>
                  <p className="text-2xl font-bold text-green-600">{optimizedRoute.savings.time} min</p>
                  <p className="text-xs text-gray-500">More efficient batching</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route Steps */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Optimized Route ({stops.length} stops)</CardTitle>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Navigation className="w-4 h-4 mr-2" />
              Start Navigation
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stops.map((stop, idx) => (
              <div key={idx} className="relative">
                {/* Connection Line */}
                {idx < stops.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-12 bg-gray-300"></div>
                )}

                <div
                  className={`flex items-start space-x-4 p-4 rounded-lg ${
                    stop.batched
                      ? "bg-purple-50 border-2 border-purple-300"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  {/* Stop Number */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                      stop.type === "pickup"
                        ? "bg-blue-600 text-white"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {stop.order}
                  </div>

                  {/* Stop Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge
                        className={
                          stop.type === "pickup"
                            ? "bg-blue-600"
                            : "bg-green-600"
                        }
                      >
                        {stop.type === "pickup" ? "Pickup" : "Delivery"}
                      </Badge>
                      {stop.batched && (
                        <Badge className="bg-purple-600">
                          <Users className="w-3 h-3 mr-1" />
                          Batched
                        </Badge>
                      )}
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        {stop.arriivalTime}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-lg">{stop.location}</h4>
                    <p className="text-sm text-gray-600 mb-2">{stop.address}</p>
                    {stop.orderId && (
                      <p className="text-xs text-gray-500">Order: {stop.orderId}</p>
                    )}
                    {stop.batched && (
                      <div className="bg-purple-100 p-2 rounded text-xs text-purple-800 mt-2">
                        💡 Part of batch delivery - same area, optimal routing
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    <Button size="sm" variant="outline">
                      <MapPin className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    {stop.type === "delivery" && (
                      <Button size="sm" variant="outline">
                        Call
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimization Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-600" />
            <span>How Smart Routing Works</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🗺️</span>
              </div>
              <h4 className="font-semibold mb-2">AI Route Planning</h4>
              <p className="text-sm text-gray-600">
                Analyzes all delivery locations and calculates the most efficient path
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📦</span>
              </div>
              <h4 className="font-semibold mb-2">Batch Optimization</h4>
              <p className="text-sm text-gray-600">
                Groups nearby deliveries from same store to minimize trips
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold mb-2">Real-time Updates</h4>
              <p className="text-sm text-gray-600">
                Adjusts route dynamically based on traffic and new orders
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
