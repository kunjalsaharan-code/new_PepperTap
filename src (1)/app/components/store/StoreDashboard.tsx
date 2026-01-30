import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";
import { 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  DollarSign,
  Users 
} from "lucide-react";

export function StoreDashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Active Orders",
      value: "12",
      change: "+3 from yesterday",
      icon: ShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Low Stock Items",
      value: "8",
      change: "Needs attention",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Today's Revenue",
      value: "₹12,450",
      change: "+18% from yesterday",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Fulfilled Orders",
      value: "45",
      change: "98% success rate",
      icon: CheckCircle2,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const recentOrders = [
    { id: "ORD1234", customer: "Rahul M.", items: 5, amount: 450, status: "preparing", time: "2 min ago" },
    { id: "ORD1235", customer: "Sneha K.", items: 8, amount: 680, status: "ready", time: "5 min ago" },
    { id: "ORD1236", customer: "Amit P.", items: 3, amount: 275, status: "preparing", time: "8 min ago" },
    { id: "ORD1237", customer: "Priya S.", items: 12, amount: 1250, status: "preparing", time: "12 min ago" },
  ];

  const lowStockItems = [
    { name: "Fresh Milk (1L)", current: 8, minimum: 20, unit: "units" },
    { name: "Organic Bananas", current: 5, minimum: 15, unit: "dozens" },
    { name: "Whole Wheat Bread", current: 3, minimum: 10, unit: "units" },
    { name: "Farm Fresh Eggs", current: 6, minimum: 20, unit: "trays" },
  ];

  const penaltyInfo = {
    thisMonth: 0,
    lastMonth: 1,
    total: 1,
    amount: 500,
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Store Dashboard</h1>
          <p className="text-gray-600">Fresh Mart Express</p>
        </div>
        <Badge className="bg-green-600 text-lg px-4 py-2">Open</Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-full`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button onClick={() => navigate("/store/orders")} variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{order.id}</h4>
                        <Badge
                          className={
                            order.status === "ready"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{order.customer} • {order.items} items</p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {order.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{order.amount}</p>
                      <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                        {order.status === "ready" ? "Mark Picked" : "Mark Ready"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Penalties */}
        <div className="space-y-6">
          {/* Low Stock Alert */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <span>Low Stock Alert</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockItems.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-600">
                        {item.current}/{item.minimum}
                      </span>
                    </div>
                    <Progress
                      value={(item.current / item.minimum) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
              <Button
                onClick={() => navigate("/store/inventory")}
                className="w-full mt-4 bg-orange-600 hover:bg-orange-700"
                size="sm"
              >
                Update Inventory
              </Button>
            </CardContent>
          </Card>

          {/* Penalty Tracker */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span>Penalty Tracker</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-red-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-bold text-red-600">{penaltyInfo.thisMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Month</span>
                  <span className="font-bold">{penaltyInfo.lastMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Penalties</span>
                  <span className="font-bold">{penaltyInfo.total}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-red-200">
                  <span className="text-sm font-semibold">Total Amount</span>
                  <span className="font-bold text-red-600">₹{penaltyInfo.amount}</span>
                </div>
              </div>
              <div className="text-xs text-gray-600 bg-yellow-50 p-3 rounded">
                <p className="font-semibold mb-1">⚠️ Penalty Policy:</p>
                <p>Stores are fined for failing to fulfill confirmed orders due to inventory issues. Keep inventory updated to avoid penalties!</p>
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
            <Button onClick={() => navigate("/store/orders")} className="bg-blue-600 hover:bg-blue-700">
              <ShoppingBag className="w-4 h-4 mr-2" />
              View Orders
            </Button>
            <Button onClick={() => navigate("/store/inventory")} className="bg-orange-600 hover:bg-orange-700">
              <Package className="w-4 h-4 mr-2" />
              Update Stock
            </Button>
            <Button onClick={() => navigate("/store/performance")} className="bg-purple-600 hover:bg-purple-700">
              <TrendingUp className="w-4 h-4 mr-2" />
              Performance
            </Button>
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Customer Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
