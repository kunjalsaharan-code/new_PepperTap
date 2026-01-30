import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { Store, AlertTriangle, CheckCircle2, Clock, Package, TrendingUp } from "lucide-react";

export function StoreLoadMonitor() {
  const stores = [
    {
      id: "1",
      name: "Fresh Mart Express",
      location: "Downtown",
      activeOrders: 18,
      capacity: 20,
      loadPercentage: 90,
      avgPrepTime: 9,
      pendingOrders: 5,
      rating: 4.5,
      inventory: "medium",
    },
    {
      id: "2",
      name: "Green Grocery",
      location: "Suburbs",
      activeOrders: 16,
      capacity: 20,
      loadPercentage: 80,
      avgPrepTime: 8,
      pendingOrders: 3,
      rating: 4.7,
      inventory: "high",
    },
    {
      id: "3",
      name: "Quick Stop",
      location: "North Zone",
      activeOrders: 7,
      capacity: 15,
      loadPercentage: 47,
      avgPrepTime: 7,
      pendingOrders: 2,
      rating: 4.3,
      inventory: "low",
    },
    {
      id: "4",
      name: "Super Bazaar",
      location: "East Side",
      activeOrders: 12,
      capacity: 20,
      loadPercentage: 60,
      avgPrepTime: 10,
      pendingOrders: 4,
      rating: 4.6,
      inventory: "high",
    },
    {
      id: "5",
      name: "Metro Mart",
      location: "West End",
      activeOrders: 5,
      capacity: 15,
      loadPercentage: 33,
      avgPrepTime: 8,
      pendingOrders: 1,
      rating: 4.4,
      inventory: "medium",
    },
  ];

  const getLoadStatus = (percentage: number) => {
    if (percentage >= 80) return { label: "High Load", color: "bg-red-100 text-red-700", alert: true };
    if (percentage >= 60) return { label: "Medium Load", color: "bg-yellow-100 text-yellow-700", alert: false };
    return { label: "Low Load", color: "bg-green-100 text-green-700", alert: false };
  };

  const highLoadStores = stores.filter((s) => s.loadPercentage >= 80);
  const lowLoadStores = stores.filter((s) => s.loadPercentage < 50);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Store Load Monitoring</h1>
          <p className="text-gray-600">Real-time capacity and workload distribution</p>
        </div>
        <Badge className="bg-blue-600 text-lg px-4 py-2">
          {stores.length} Stores Active
        </Badge>
      </div>

      {/* Load Distribution Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1 text-red-700">{highLoadStores.length}</h3>
            <p className="text-sm text-gray-700 mb-2">High Load Stores</p>
            <p className="text-xs text-gray-600">≥80% capacity - needs attention</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1 text-green-700">{lowLoadStores.length}</h3>
            <p className="text-sm text-gray-700 mb-2">Low Load Stores</p>
            <p className="text-xs text-gray-600">&lt;50% capacity - available</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Store className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1 text-blue-700">
              {Math.round(stores.reduce((sum, s) => sum + s.loadPercentage, 0) / stores.length)}%
            </h3>
            <p className="text-sm text-gray-700 mb-2">Avg System Load</p>
            <p className="text-xs text-gray-600">Across all stores</p>
          </CardContent>
        </Card>
      </div>

      {/* Load Balancing Recommendations */}
      {highLoadStores.length > 0 && lowLoadStores.length > 0 && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Load Balancing Recommendation</h3>
                <p className="text-sm text-gray-700 mb-3">
                  {highLoadStores.map((s) => s.name).join(", ")} {highLoadStores.length === 1 ? "is" : "are"} at 
                  high capacity while {lowLoadStores.map((s) => s.name).join(", ")} {lowLoadStores.length === 1 ? "has" : "have"} 
                  available capacity.
                </p>
                <div className="bg-white p-3 rounded-lg text-sm">
                  <p className="font-medium text-yellow-900 mb-1">💡 Suggested Actions:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Redirect new orders from high-load stores to nearby low-load stores</li>
                    <li>Notify customers of alternate store options with similar delivery times</li>
                    <li>Alert store managers to optimize order preparation workflow</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Store Details */}
      <Card>
        <CardHeader>
          <CardTitle>Store Capacity & Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stores.map((store) => {
              const loadStatus = getLoadStatus(store.loadPercentage);
              return (
                <div
                  key={store.id}
                  className={`p-5 rounded-lg border-2 ${
                    loadStatus.alert
                      ? "bg-red-50 border-red-300"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold">{store.name}</h3>
                        <Badge className={loadStatus.color}>
                          {loadStatus.label}
                        </Badge>
                        {loadStatus.alert && (
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{store.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-purple-600">
                        {store.loadPercentage}%
                      </p>
                      <p className="text-sm text-gray-600">Capacity</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Active Orders: {store.activeOrders} / {store.capacity}</span>
                    </div>
                    <Progress value={store.loadPercentage} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-white p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-gray-600">Prep Time</span>
                      </div>
                      <p className="text-lg font-bold">{store.avgPrepTime} min</p>
                    </div>

                    <div className="bg-white p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Package className="w-4 h-4 text-orange-600" />
                        <span className="text-xs text-gray-600">Pending</span>
                      </div>
                      <p className="text-lg font-bold">{store.pendingOrders}</p>
                    </div>

                    <div className="bg-white p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-gray-600">Rating</span>
                      </div>
                      <p className="text-lg font-bold">{store.rating}</p>
                    </div>

                    <div className="bg-white p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Store className="w-4 h-4 text-purple-600" />
                        <span className="text-xs text-gray-600">Inventory</span>
                      </div>
                      <Badge
                        className={
                          store.inventory === "high"
                            ? "bg-green-100 text-green-700"
                            : store.inventory === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }
                      >
                        {store.inventory}
                      </Badge>
                    </div>

                    <div className="bg-white p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-gray-600">Status</span>
                      </div>
                      <p className="text-sm font-semibold">
                        {store.loadPercentage >= 80 ? "⚠️ Alert" : "✅ Good"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Load Prevention Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle>Store Load-Aware Assignment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚖️</span>
              </div>
              <h4 className="font-semibold mb-2">Smart Assignment</h4>
              <p className="text-sm text-gray-600">
                Orders automatically routed to stores with available capacity
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🚨</span>
              </div>
              <h4 className="font-semibold mb-2">Overload Prevention</h4>
              <p className="text-sm text-gray-600">
                Alerts sent to prevent stores from exceeding optimal capacity
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="font-semibold mb-2">Real-time Monitoring</h4>
              <p className="text-sm text-gray-600">
                Continuous tracking ensures balanced workload distribution
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
