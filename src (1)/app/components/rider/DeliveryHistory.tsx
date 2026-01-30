import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { CheckCircle2, DollarSign, Clock, Package } from "lucide-react";

export function DeliveryHistory() {
  const completedDeliveries = [
    {
      id: "DEL098",
      orderId: "ORD1220",
      date: "Today, 2:30 PM",
      customer: "Neha Gupta",
      address: "567 Lake View",
      items: 6,
      amount: 520,
      earnings: 70,
      time: 15,
      rating: 5,
    },
    {
      id: "DEL097",
      orderId: "ORD1219",
      date: "Today, 1:45 PM",
      customer: "Vikram Singh",
      address: "234 Hill Road",
      items: 4,
      amount: 340,
      earnings: 60,
      time: 12,
      rating: 5,
    },
    {
      id: "DEL096",
      orderId: "ORD1218",
      date: "Today, 12:20 PM",
      customer: "Kavita Rao",
      address: "890 Beach Street",
      items: 9,
      amount: 780,
      earnings: 80,
      time: 18,
      rating: 4,
    },
    {
      id: "DEL095",
      orderId: "ORD1217",
      date: "Today, 11:10 AM",
      customer: "Rohan Desai",
      address: "123 Park Lane",
      items: 3,
      amount: 210,
      earnings: 50,
      time: 14,
      rating: 5,
      batched: true,
      batchBonus: 50,
    },
    {
      id: "DEL094",
      orderId: "ORD1216",
      date: "Today, 10:30 AM",
      customer: "Anita Sharma",
      address: "456 Market Square",
      items: 7,
      amount: 620,
      earnings: 75,
      time: 16,
      rating: 5,
      batched: true,
      batchBonus: 50,
    },
    {
      id: "DEL093",
      orderId: "ORD1215",
      date: "Today, 9:15 AM",
      customer: "Suresh Kumar",
      address: "789 River Road",
      items: 5,
      amount: 450,
      earnings: 65,
      time: 13,
      rating: 5,
    },
  ];

  const todayStats = {
    totalDeliveries: completedDeliveries.length + 6, // Including active
    completedDeliveries: completedDeliveries.length,
    totalEarnings: completedDeliveries.reduce((sum, d) => sum + d.earnings + (d.batchBonus || 0), 0),
    avgTime: Math.round(
      completedDeliveries.reduce((sum, d) => sum + d.time, 0) / completedDeliveries.length
    ),
    avgRating:
      completedDeliveries.reduce((sum, d) => sum + d.rating, 0) / completedDeliveries.length,
    batchDeliveries: completedDeliveries.filter((d) => d.batched).length,
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Delivery History</h1>
          <p className="text-gray-600">Your completed deliveries and earnings</p>
        </div>
      </div>

      {/* Today's Stats */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle>Today's Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-3xl font-bold">{todayStats.completedDeliveries}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-3xl font-bold">₹{todayStats.totalEarnings}</p>
              <p className="text-sm text-gray-600">Earned</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-3xl font-bold">{todayStats.avgTime}</p>
              <p className="text-sm text-gray-600">Avg Time (min)</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-3xl font-bold">{todayStats.batchDeliveries}</p>
              <p className="text-sm text-gray-600">Batched</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery List */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Deliveries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className={`p-4 rounded-lg border ${
                  delivery.batched
                    ? "bg-purple-50 border-purple-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">{delivery.id}</h4>
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Delivered
                      </Badge>
                      {delivery.batched && (
                        <Badge className="bg-purple-600">Batched</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{delivery.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">
                      ₹{delivery.earnings + (delivery.batchBonus || 0)}
                    </p>
                    {delivery.batchBonus && (
                      <p className="text-xs text-purple-600">
                        +₹{delivery.batchBonus} batch bonus
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-600">Customer</p>
                    <p className="font-medium">{delivery.customer}</p>
                    <p className="text-sm text-gray-600">{delivery.address}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Order Details</p>
                    <p className="font-medium">{delivery.orderId}</p>
                    <p className="text-sm text-gray-600">
                      {delivery.items} items • ₹{delivery.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Performance</p>
                    <p className="font-medium">{delivery.time} min delivery time</p>
                    <p className="text-sm text-gray-600">
                      Rating: {"⭐".repeat(delivery.rating)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle>This Week Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Deliveries</p>
              <p className="text-3xl font-bold">45</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
              <p className="text-3xl font-bold text-green-600">₹3,150</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Batch Bonuses</p>
              <p className="text-3xl font-bold text-purple-600">₹450</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Rating</p>
              <p className="text-3xl font-bold">{todayStats.avgRating.toFixed(1)}/5.0</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
