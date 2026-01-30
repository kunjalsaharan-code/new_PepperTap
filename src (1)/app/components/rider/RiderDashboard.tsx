import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { Package, MapPin, DollarSign, Clock, TrendingUp, Zap, Users } from "lucide-react";

export function RiderDashboard() {
  const navigate = useNavigate();

  const stats = {
    activeDeliveries: 3,
    todayDeliveries: 12,
    todayEarnings: 840,
    avgTime: 18, // minutes
    rating: 4.8,
    batchDeliveries: 5, // number of batch deliveries today
  };

  const upcomingDeliveries = [
    {
      id: "DEL001",
      store: "Fresh Mart Express",
      customer: "Rahul M.",
      address: "123 Main St, Apt 4B",
      distance: 1.2,
      eta: "12 min",
      priority: "high",
      batchWith: ["DEL002"],
    },
    {
      id: "DEL002",
      store: "Fresh Mart Express",
      customer: "Sneha K.",
      address: "126 Main St, Apt 2A",
      distance: 1.3,
      eta: "14 min",
      priority: "high",
      batchWith: ["DEL001"],
    },
    {
      id: "DEL003",
      store: "Green Grocery",
      customer: "Amit P.",
      address: "789 Garden Rd",
      distance: 2.5,
      eta: "20 min",
      priority: "medium",
      batchWith: [],
    },
  ];

  const goals = [
    { title: "Daily Deliveries", current: 12, target: 15 },
    { title: "Earnings Goal", current: 840, target: 1000, prefix: "₹" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Rider Dashboard</h1>
          <p className="text-gray-600">Welcome back, Rajesh!</p>
        </div>
        <Badge className="bg-green-600 text-lg px-4 py-2">Available</Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-orange-100 p-3 rounded-full">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.activeDeliveries}</h3>
            <p className="text-sm text-gray-600">Active Now</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-3 rounded-full">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.todayDeliveries}</h3>
            <p className="text-sm text-gray-600">Today's Trips</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">₹{stats.todayEarnings}</h3>
            <p className="text-sm text-gray-600">Today's Earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.batchDeliveries}</h3>
            <p className="text-sm text-gray-600">Batch Deliveries</p>
          </CardContent>
        </Card>
      </div>

      {/* Batch Optimization Info */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Batch Optimization Active</h3>
              <p className="text-sm text-gray-600 mb-3">
                Your next 2 deliveries are batched together from the same store and nearby locations. 
                Complete both to earn bonus: <span className="font-bold text-purple-600">₹50 extra!</span>
              </p>
              <Badge className="bg-purple-600">Smart Batching Enabled</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Deliveries */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Deliveries</CardTitle>
              <Button onClick={() => navigate("/rider/active")} variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeliveries.map((delivery, idx) => (
                  <div
                    key={delivery.id}
                    className={`p-4 rounded-lg border-2 ${
                      delivery.batchWith.length > 0
                        ? "bg-purple-50 border-purple-300"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold">{delivery.id}</h4>
                          <Badge
                            className={
                              delivery.priority === "high"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }
                          >
                            {delivery.priority}
                          </Badge>
                          {delivery.batchWith.length > 0 && (
                            <Badge className="bg-purple-600">
                              <Users className="w-3 h-3 mr-1" />
                              Batched
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{delivery.store}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-orange-600">{delivery.eta}</p>
                        <p className="text-xs text-gray-500">{delivery.distance} km</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 mb-3">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">{delivery.customer}</p>
                        <p className="text-sm text-gray-600">{delivery.address}</p>
                      </div>
                    </div>
                    {delivery.batchWith.length > 0 && (
                      <div className="bg-purple-100 p-2 rounded text-xs text-purple-800">
                        💡 Batched with {delivery.batchWith.join(", ")} - Complete both for bonus!
                      </div>
                    )}
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                        Start Delivery
                      </Button>
                      <Button size="sm" variant="outline">
                        View Route
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance & Goals */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((goal, idx) => {
                const percentage = (goal.current / goal.target) * 100;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{goal.title}</span>
                      <span className="text-gray-600">
                        {goal.prefix || ""}{goal.current} / {goal.prefix || ""}{goal.target}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Avg Delivery Time</span>
                </div>
                <span className="font-bold">{stats.avgTime} min</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Rating</span>
                </div>
                <span className="font-bold">{stats.rating}/5.0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">Completion Rate</span>
                </div>
                <span className="font-bold">99%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span>Earnings Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Base Earnings</span>
                <span className="font-semibold">₹720</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Batch Bonuses</span>
                <span className="font-semibold text-purple-600">₹100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tips</span>
                <span className="font-semibold">₹20</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-bold">Total Today</span>
                <span className="font-bold text-green-600">₹{stats.todayEarnings}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={() => navigate("/rider/active")} className="bg-orange-600 hover:bg-orange-700">
              <Package className="w-4 h-4 mr-2" />
              Active Deliveries
            </Button>
            <Button onClick={() => navigate("/rider/routes")} className="bg-blue-600 hover:bg-blue-700">
              <MapPin className="w-4 h-4 mr-2" />
              View Routes
            </Button>
            <Button onClick={() => navigate("/rider/history")} className="bg-purple-600 hover:bg-purple-700">
              <Clock className="w-4 h-4 mr-2" />
              History
            </Button>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              My Stats
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
