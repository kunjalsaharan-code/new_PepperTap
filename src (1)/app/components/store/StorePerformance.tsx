import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { TrendingUp, TrendingDown, DollarSign, Package, Clock, Star, AlertTriangle } from "lucide-react";

export function StorePerformance() {
  const metrics = {
    revenue: {
      today: 12450,
      yesterday: 10500,
      thisWeek: 75200,
      lastWeek: 68400,
    },
    orders: {
      today: 45,
      yesterday: 38,
      thisWeek: 298,
      lastWeek: 275,
    },
    fulfillmentRate: 98,
    avgPreparationTime: 8.5, // minutes
    rating: 4.5,
    penalties: {
      thisMonth: 0,
      lastMonth: 1,
      total: 1,
      amount: 500,
    },
  };

  const revenueChange = ((metrics.revenue.today - metrics.revenue.yesterday) / metrics.revenue.yesterday) * 100;
  const ordersChange = ((metrics.orders.today - metrics.orders.yesterday) / metrics.orders.yesterday) * 100;

  const topProducts = [
    { name: "Fresh Milk (1L)", sold: 145, revenue: 9425 },
    { name: "Organic Bananas", sold: 98, revenue: 3920 },
    { name: "Whole Wheat Bread", sold: 87, revenue: 3915 },
    { name: "Farm Fresh Eggs", sold: 76, revenue: 6080 },
    { name: "Basmati Rice (5kg)", sold: 42, revenue: 18900 },
  ];

  const performanceGoals = [
    { title: "Fulfillment Rate", current: 98, target: 95, unit: "%" },
    { title: "Avg Prep Time", current: 8.5, target: 10, unit: "min", inverse: true },
    { title: "Customer Rating", current: 4.5, target: 4.0, unit: "/5" },
    { title: "Stock Availability", current: 92, target: 90, unit: "%" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Store Performance</h1>
          <p className="text-gray-600">Track your metrics and performance</p>
        </div>
        <Badge className="bg-green-600 text-lg px-4 py-2">Excellent Performance</Badge>
      </div>

      {/* Revenue & Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span>Revenue</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-end space-x-2 mb-2">
                <p className="text-4xl font-bold">₹{metrics.revenue.today.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mb-2">
                  {revenueChange > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      revenueChange > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {revenueChange.toFixed(1)}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Today's revenue</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-xl font-bold">₹{metrics.revenue.thisWeek.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Week</p>
                <p className="text-xl font-bold">₹{metrics.revenue.lastWeek.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-600" />
              <span>Orders Fulfilled</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-end space-x-2 mb-2">
                <p className="text-4xl font-bold">{metrics.orders.today}</p>
                <div className="flex items-center space-x-1 mb-2">
                  {ordersChange > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      ordersChange > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {ordersChange.toFixed(1)}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Today's orders</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-xl font-bold">{metrics.orders.thisWeek}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Week</p>
                <p className="text-xl font-bold">{metrics.orders.lastWeek}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceGoals.map((goal, idx) => {
              const percentage = goal.inverse
                ? ((goal.target / goal.current) * 100)
                : ((goal.current / goal.target) * 100);
              const isExceeding = percentage >= 100;

              return (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">{goal.title}</h4>
                    {isExceeding ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-orange-600" />
                    )}
                  </div>
                  <div className="flex items-end space-x-2">
                    <p className="text-3xl font-bold">{goal.current}</p>
                    <p className="text-sm text-gray-600 mb-1">{goal.unit}</p>
                  </div>
                  <Progress value={Math.min(percentage, 100)} className="h-2" />
                  <p className="text-xs text-gray-600">
                    Target: {goal.target}{goal.unit}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Avg Preparation Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold mb-2">{metrics.avgPreparationTime} min</p>
            <Badge className="bg-green-100 text-green-700">Under target</Badge>
            <p className="text-sm text-gray-600 mt-3">Target: 10 minutes or less</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-600" />
              <span>Customer Rating</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold mb-2">{metrics.rating}/5</p>
            <div className="flex space-x-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= metrics.rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">Based on 234 reviews</p>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span>Penalties</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold mb-2 text-red-600">{metrics.penalties.thisMonth}</p>
            <Badge className="bg-green-100 text-green-700">This month</Badge>
            <div className="mt-3 text-sm text-gray-600 space-y-1">
              <p>Last month: {metrics.penalties.lastMonth}</p>
              <p>Total penalties: ₹{metrics.penalties.amount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products (This Week)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.sold} units sold</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-green-600">₹{product.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
