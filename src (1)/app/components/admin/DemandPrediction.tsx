import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { TrendingUp, MapPin, Clock, AlertCircle, Brain, Zap } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";

export function DemandPrediction() {
  const [selectedArea, setSelectedArea] = useState("downtown");
  const [timeRange, setTimeRange] = useState("today");

  const demandForecastData = [
    { time: "12 PM", predicted: 45, actual: 42 },
    { time: "1 PM", predicted: 52, actual: 48 },
    { time: "2 PM", predicted: 48, actual: 51 },
    { time: "3 PM", predicted: 55, actual: 53 },
    { time: "4 PM", predicted: 62, actual: null },
    { time: "5 PM", predicted: 78, actual: null },
    { time: "6 PM", predicted: 95, actual: null },
    { time: "7 PM", predicted: 124, actual: null },
    { time: "8 PM", predicted: 98, actual: null },
    { time: "9 PM", predicted: 76, actual: null },
  ];

  const areaDemandData = [
    { area: "Downtown", current: 89, predicted: 124, change: 39 },
    { area: "Suburbs", current: 56, predicted: 72, change: 29 },
    { area: "North Zone", current: 45, predicted: 48, change: 7 },
    { area: "East Side", current: 67, predicted: 85, change: 27 },
    { area: "West End", current: 52, predicted: 58, change: 12 },
  ];

  const topPredictedItems = [
    { name: "Fresh Milk", currentDemand: 145, predicted: 198, category: "Dairy" },
    { name: "Organic Bananas", currentDemand: 98, predicted: 134, category: "Fruits" },
    { name: "Whole Wheat Bread", currentDemand: 87, predicted: 115, category: "Bakery" },
    { name: "Farm Eggs", currentDemand: 76, predicted: 102, category: "Dairy" },
    { name: "Fresh Tomatoes", currentDemand: 102, predicted: 125, category: "Vegetables" },
  ];

  const insights = [
    {
      type: "peak",
      title: "Peak Hour Predicted",
      description: "Downtown area expected to see 124 orders at 7 PM (+39% from current)",
      action: "Recommend: Alert 3 additional riders, notify stores to prepare stock",
      priority: "high",
    },
    {
      type: "surge",
      title: "Dairy Products Surge",
      description: "36% increase in dairy product demand predicted for next 2 hours",
      action: "Recommend: Notify relevant stores to check inventory levels",
      priority: "medium",
    },
    {
      type: "opportunity",
      title: "Low Store Load in West End",
      description: "West End stores currently at 40% capacity while Downtown at 90%",
      action: "Recommend: Suggest nearby customers to order from West End stores",
      priority: "low",
    },
  ];

  const weeklyTrendData = [
    { day: "Mon", orders: 892 },
    { day: "Tue", orders: 945 },
    { day: "Wed", orders: 1023 },
    { day: "Thu", orders: 978 },
    { day: "Fri", orders: 1145 },
    { day: "Sat", orders: 1287 },
    { day: "Sun", orders: 1156 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Demand Prediction</h1>
          <p className="text-gray-600">Predictive analytics based on historical order patterns</p>
        </div>
        <Badge className="bg-purple-600 text-lg px-4 py-2 flex items-center space-x-2">
          <Brain className="w-5 h-5" />
          <span>AI Active</span>
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Area</label>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="downtown">Downtown</SelectItem>
                  <SelectItem value="suburbs">Suburbs</SelectItem>
                  <SelectItem value="north">North Zone</SelectItem>
                  <SelectItem value="east">East Side</SelectItem>
                  <SelectItem value="west">West End</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Zap className="w-4 h-4 mr-2" />
                Refresh Forecast
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-600" />
            <span>AI-Powered Insights & Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 ${
                insight.priority === "high"
                  ? "bg-red-50 border-red-300"
                  : insight.priority === "medium"
                  ? "bg-yellow-50 border-yellow-300"
                  : "bg-blue-50 border-blue-300"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>{insight.title}</span>
                </h4>
                <Badge
                  className={
                    insight.priority === "high"
                      ? "bg-red-600"
                      : insight.priority === "medium"
                      ? "bg-yellow-600"
                      : "bg-blue-600"
                  }
                >
                  {insight.priority}
                </Badge>
              </div>
              <p className="text-sm mb-2">{insight.description}</p>
              <p className="text-sm font-medium text-purple-700 bg-white/60 p-2 rounded">
                💡 {insight.action}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Demand Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Demand Forecast - {selectedArea}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={demandForecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Actual Orders" />
              <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" name="Predicted" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-gray-600 text-center">
            Dotted line shows AI prediction. Green line shows actual orders.
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area-wise Demand */}
        <Card>
          <CardHeader>
            <CardTitle>Area-wise Demand Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {areaDemandData.map((area, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="font-semibold">{area.area}</span>
                    </div>
                    <Badge
                      className={
                        area.change > 30
                          ? "bg-red-100 text-red-700"
                          : area.change > 15
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }
                    >
                      +{area.change}%
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div>
                      <span className="text-gray-600">Current: </span>
                      <span className="font-bold">{area.current}</span>
                    </div>
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <div>
                      <span className="text-gray-600">Predicted: </span>
                      <span className="font-bold text-purple-600">{area.predicted}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Predicted Items */}
        <Card>
          <CardHeader>
            <CardTitle>High Demand Items Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPredictedItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{item.currentDemand}</span>
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="font-bold text-purple-600">{item.predicted}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      +{Math.round(((item.predicted - item.currentDemand) / item.currentDemand) * 100)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Order Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* How AI Works */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle>How Demand Prediction Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Historical Analysis</h4>
              <p className="text-sm text-gray-600">
                Analyzes past order patterns by area, time, day, and season
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">AI Modeling</h4>
              <p className="text-sm text-gray-600">
                Machine learning models predict future demand with 85%+ accuracy
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Real-time Adjustment</h4>
              <p className="text-sm text-gray-600">
                Continuously updates predictions based on live order data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
