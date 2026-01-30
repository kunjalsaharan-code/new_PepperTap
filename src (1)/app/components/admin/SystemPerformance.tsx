import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import { Clock, CheckCircle2, TrendingUp, Users, Bike, Store, Package, DollarSign } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

export function SystemPerformance() {
  const performanceMetrics = {
    orderFulfillmentRate: 98.5,
    avgDeliveryTime: 22, // minutes
    customerSatisfaction: 4.6,
    riderEfficiency: 94,
    storeResponseTime: 8.5, // minutes
    batchOptimizationRate: 35, // percentage of orders batched
  };

  const deliveryTimeData = [
    { time: "9 AM", avgTime: 18 },
    { time: "12 PM", avgTime: 22 },
    { time: "3 PM", avgTime: 20 },
    { time: "6 PM", avgTime: 25 },
    { time: "9 PM", avgTime: 19 },
  ];

  const orderStatusDistribution = [
    { name: "Delivered", value: 1145, color: "#10b981" },
    { name: "In Progress", value: 67, color: "#f59e0b" },
    { name: "Pending", value: 23, color: "#3b82f6" },
    { name: "Cancelled", value: 12, color: "#ef4444" },
  ];

  const weeklyPerformance = [
    { day: "Mon", fulfillment: 97, satisfaction: 4.5 },
    { day: "Tue", fulfillment: 98, satisfaction: 4.6 },
    { day: "Wed", fulfillment: 96, satisfaction: 4.4 },
    { day: "Thu", fulfillment: 99, satisfaction: 4.7 },
    { day: "Fri", fulfillment: 98, satisfaction: 4.6 },
    { day: "Sat", fulfillment: 99, satisfaction: 4.8 },
    { day: "Sun", fulfillment: 97, satisfaction: 4.5 },
  ];

  const riderPerformance = [
    { name: "Rajesh K.", deliveries: 45, rating: 4.9, earnings: 3150, batchRate: 42 },
    { name: "Amit S.", deliveries: 42, rating: 4.8, earnings: 2940, batchRate: 38 },
    { name: "Vikram P.", deliveries: 38, rating: 4.7, earnings: 2660, batchRate: 35 },
    { name: "Suresh M.", deliveries: 35, rating: 4.6, earnings: 2450, batchRate: 32 },
  ];

  const systemHealth = [
    { name: "Inventory Sync", status: 99.8, target: 99 },
    { name: "Order Processing", status: 99.5, target: 98 },
    { name: "Payment Gateway", status: 99.9, target: 99.5 },
    { name: "Notification System", status: 98.2, target: 98 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Performance</h1>
          <p className="text-gray-600">Real-time metrics and efficiency tracking</p>
        </div>
        <Badge className="bg-green-600 text-lg px-4 py-2">Excellent Performance</Badge>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{performanceMetrics.orderFulfillmentRate}%</p>
            <p className="text-xs text-gray-600">Fulfillment Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{performanceMetrics.avgDeliveryTime}</p>
            <p className="text-xs text-gray-600">Avg Delivery (min)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{performanceMetrics.customerSatisfaction}</p>
            <p className="text-xs text-gray-600">Customer Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Bike className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{performanceMetrics.riderEfficiency}%</p>
            <p className="text-xs text-gray-600">Rider Efficiency</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Store className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{performanceMetrics.storeResponseTime}</p>
            <p className="text-xs text-gray-600">Store Response (min)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold">{performanceMetrics.batchOptimizationRate}%</p>
            <p className="text-xs text-gray-600">Batch Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Time Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Average Delivery Time Today</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={deliveryTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgTime" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={orderStatusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" domain={[90, 100]} />
              <YAxis yAxisId="right" orientation="right" domain={[4, 5]} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="fulfillment" fill="#10b981" name="Fulfillment Rate %" />
              <Bar yAxisId="right" dataKey="satisfaction" fill="#8b5cf6" name="Customer Rating" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Riders */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Riders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riderPerformance.map((rider, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{rider.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{rider.deliveries} deliveries</span>
                      <span>⭐ {rider.rating}</span>
                      <Badge className="bg-purple-100 text-purple-700">
                        {rider.batchRate}% batched
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600 flex items-center">
                    <DollarSign className="w-4 h-4" />
                    {rider.earnings}
                  </p>
                  <p className="text-xs text-gray-500">This week</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {systemHealth.map((system, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{system.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-green-600">{system.status}%</span>
                    {system.status >= system.target ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                    )}
                  </div>
                </div>
                <Progress value={system.status} className="h-2" />
                <p className="text-xs text-gray-600">Target: {system.target}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle>Overall Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="font-semibold mb-1">Excellent Delivery</h3>
              <p className="text-sm text-gray-600">
                98.5% fulfillment rate exceeds industry standard of 95%
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-1">High Satisfaction</h3>
              <p className="text-sm text-gray-600">
                4.6/5.0 customer rating shows strong service quality
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-1">Smart Optimization</h3>
              <p className="text-sm text-gray-600">
                35% batch rate reduces delivery costs and environmental impact
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
