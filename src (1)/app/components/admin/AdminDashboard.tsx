import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { 
  Users, 
  Store, 
  Bike, 
  ShoppingCart, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Package,
  AlertTriangle
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function AdminDashboard() {
  const navigate = useNavigate();

  const systemStats = {
    totalOrders: 1247,
    ordersChange: 18.5,
    activeStores: 24,
    storesChange: 2,
    activeRiders: 42,
    ridersChange: 5,
    revenue: 245670,
    revenueChange: 22.3,
  };

  const hourlyOrdersData = [
    { hour: "6am", orders: 12 },
    { hour: "9am", orders: 45 },
    { hour: "12pm", orders: 89 },
    { hour: "3pm", orders: 67 },
    { hour: "6pm", orders: 124 },
    { hour: "9pm", orders: 78 },
  ];

  const storePerformance = [
    { name: "Fresh Mart", orders: 145, revenue: 45200, rating: 4.5, load: "medium" },
    { name: "Green Grocery", orders: 132, revenue: 41800, rating: 4.7, load: "high" },
    { name: "Quick Stop", orders: 98, revenue: 28900, rating: 4.3, load: "low" },
    { name: "Super Bazaar", orders: 87, revenue: 32100, rating: 4.6, load: "medium" },
  ];

  const alerts = [
    { type: "warning", message: "Green Grocery at 90% capacity - consider load balancing", time: "5 min ago" },
    { type: "info", message: "Demand spike predicted for Downtown area at 7 PM", time: "15 min ago" },
    { type: "success", message: "System inventory sync completed successfully", time: "1 hour ago" },
  ];

  const revenueData = [
    { day: "Mon", revenue: 32000 },
    { day: "Tue", revenue: 35500 },
    { day: "Wed", revenue: 38200 },
    { day: "Thu", revenue: 36800 },
    { day: "Fri", revenue: 42100 },
    { day: "Sat", revenue: 45670 },
    { day: "Sun", revenue: 41200 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Dashboard</h1>
          <p className="text-gray-600">Real-time platform analytics and monitoring</p>
        </div>
        <Badge className="bg-green-600 text-lg px-4 py-2">All Systems Operational</Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              {systemStats.ordersChange > 0 ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
            </div>
            <h3 className="text-3xl font-bold mb-1">{systemStats.totalOrders}</h3>
            <p className="text-sm text-gray-600 mb-2">Total Orders Today</p>
            <p className={`text-sm font-semibold ${systemStats.ordersChange > 0 ? "text-green-600" : "text-red-600"}`}>
              {systemStats.ordersChange > 0 ? "+" : ""}{systemStats.ordersChange}% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Store className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{systemStats.activeStores}</h3>
            <p className="text-sm text-gray-600 mb-2">Active Stores</p>
            <p className="text-sm font-semibold text-green-600">
              +{systemStats.storesChange} new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Bike className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{systemStats.activeRiders}</h3>
            <p className="text-sm text-gray-600 mb-2">Active Riders</p>
            <p className="text-sm font-semibold text-green-600">
              +{systemStats.ridersChange} more than usual
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold mb-1">₹{(systemStats.revenue / 1000).toFixed(1)}K</h3>
            <p className="text-sm text-gray-600 mb-2">Revenue Today</p>
            <p className="text-sm font-semibold text-green-600">
              +{systemStats.revenueChange}% from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Order Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={hourlyOrdersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Store Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <span>System Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg ${
                    alert.type === "warning"
                      ? "bg-yellow-50 border border-yellow-200"
                      : alert.type === "success"
                      ? "bg-green-50 border border-green-200"
                      : "bg-blue-50 border border-blue-200"
                  }`}
                >
                  <p className="text-sm font-medium mb-1">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Store Performance */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Store Performance</CardTitle>
            <Button onClick={() => navigate("/admin/store-load")} variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {storePerformance.map((store, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold">{store.name}</h4>
                      <p className="text-sm text-gray-600">
                        {store.orders} orders • ⭐ {store.rating}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{(store.revenue / 1000).toFixed(1)}K</p>
                    <Badge
                      className={
                        store.load === "high"
                          ? "bg-red-100 text-red-700"
                          : store.load === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }
                    >
                      {store.load} load
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={() => navigate("/admin/demand")} className="bg-purple-600 hover:bg-purple-700">
              <TrendingUp className="w-4 h-4 mr-2" />
              Demand Forecast
            </Button>
            <Button onClick={() => navigate("/admin/performance")} className="bg-blue-600 hover:bg-blue-700">
              <Package className="w-4 h-4 mr-2" />
              Performance
            </Button>
            <Button onClick={() => navigate("/admin/store-load")} className="bg-green-600 hover:bg-green-700">
              <Store className="w-4 h-4 mr-2" />
              Store Monitoring
            </Button>
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              User Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
