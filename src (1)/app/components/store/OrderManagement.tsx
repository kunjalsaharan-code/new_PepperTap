import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Clock, CheckCircle2, XCircle, Package, User, MapPin } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  totalAmount: number;
  status: "new" | "preparing" | "ready" | "picked" | "cancelled";
  deliveryType: "instant" | "scheduled";
  scheduledTime?: string;
  createdAt: string;
}

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD1234",
      customer: "Rahul Mehta",
      phone: "+91 9876543210",
      address: "123 Main Street, Apartment 4B",
      items: [
        { name: "Fresh Milk (1L)", quantity: 2, price: 65 },
        { name: "Organic Bananas", quantity: 1, price: 40 },
        { name: "Whole Wheat Bread", quantity: 2, price: 45 },
      ],
      totalAmount: 260,
      status: "new",
      deliveryType: "instant",
      createdAt: "2 min ago",
    },
    {
      id: "ORD1235",
      customer: "Sneha Kumar",
      phone: "+91 9988776655",
      address: "456 Park Avenue, Floor 3",
      items: [
        { name: "Farm Fresh Eggs", quantity: 2, price: 80 },
        { name: "Greek Yogurt", quantity: 3, price: 120 },
        { name: "Fresh Tomatoes", quantity: 2, price: 35 },
      ],
      totalAmount: 550,
      status: "preparing",
      deliveryType: "instant",
      createdAt: "5 min ago",
    },
    {
      id: "ORD1236",
      customer: "Amit Patel",
      phone: "+91 9123456789",
      address: "789 Garden Road",
      items: [
        { name: "Premium Coffee Beans", quantity: 1, price: 350 },
        { name: "Basmati Rice (5kg)", quantity: 1, price: 450 },
      ],
      totalAmount: 800,
      status: "ready",
      deliveryType: "scheduled",
      scheduledTime: "Today, 6:00 PM",
      createdAt: "15 min ago",
    },
    {
      id: "ORD1237",
      customer: "Priya Sharma",
      phone: "+91 9234567890",
      address: "321 Lake View, Building A",
      items: [
        { name: "Fresh Milk (1L)", quantity: 3, price: 65 },
        { name: "Whole Wheat Bread", quantity: 2, price: 45 },
      ],
      totalAmount: 285,
      status: "picked",
      deliveryType: "instant",
      createdAt: "25 min ago",
    },
  ]);

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order))
    );
    toast.success(`Order ${orderId} marked as ${newStatus}`);
  };

  const getOrdersByStatus = (status: Order["status"]) => {
    return orders.filter((order) => order.status === status);
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{order.id}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{order.createdAt}</p>
          </div>
          <div className="flex items-center space-x-2">
            {order.deliveryType === "instant" ? (
              <Badge className="bg-green-600">Instant</Badge>
            ) : (
              <Badge variant="outline">Scheduled</Badge>
            )}
            <Badge
              className={
                order.status === "new"
                  ? "bg-blue-100 text-blue-700"
                  : order.status === "preparing"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "ready"
                  ? "bg-green-100 text-green-700"
                  : order.status === "picked"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-red-100 text-red-700"
              }
            >
              {order.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <p className="text-sm text-gray-600 flex items-center space-x-2 mb-1">
              <User className="w-4 h-4" />
              <span>Customer</span>
            </p>
            <p className="font-semibold">{order.customer}</p>
            <p className="text-sm text-gray-600">{order.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 flex items-center space-x-2 mb-1">
              <MapPin className="w-4 h-4" />
              <span>Delivery Address</span>
            </p>
            <p className="font-semibold text-sm">{order.address}</p>
            {order.scheduledTime && (
              <p className="text-sm text-blue-600 mt-1">
                <Clock className="w-3 h-3 inline mr-1" />
                {order.scheduledTime}
              </p>
            )}
          </div>
        </div>

        {/* Items */}
        <div>
          <p className="text-sm font-semibold mb-2 flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Items ({order.items.length})</span>
          </p>
          <div className="space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-gray-700">
                  {item.name} x {item.quantity}
                </span>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <span className="text-blue-600">₹{order.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          {order.status === "new" && (
            <Button
              onClick={() => updateOrderStatus(order.id, "preparing")}
              className="bg-yellow-600 hover:bg-yellow-700 flex-1"
            >
              Start Preparing
            </Button>
          )}
          {order.status === "preparing" && (
            <Button
              onClick={() => updateOrderStatus(order.id, "ready")}
              className="bg-green-600 hover:bg-green-700 flex-1"
            >
              Mark as Ready
            </Button>
          )}
          {order.status === "ready" && (
            <Button
              onClick={() => updateOrderStatus(order.id, "picked")}
              className="bg-purple-600 hover:bg-purple-700 flex-1"
            >
              Mark as Picked Up
            </Button>
          )}
          {order.status !== "picked" && order.status !== "cancelled" && (
            <Button
              variant="outline"
              onClick={() => updateOrderStatus(order.id, "cancelled")}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel Order
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const newOrders = getOrdersByStatus("new");
  const preparingOrders = getOrdersByStatus("preparing");
  const readyOrders = getOrdersByStatus("ready");
  const completedOrders = [...getOrdersByStatus("picked"), ...getOrdersByStatus("cancelled")];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Order Management</h1>
          <p className="text-gray-600">Process and track customer orders</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{newOrders.length}</p>
            <p className="text-sm text-gray-600">New Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">{preparingOrders.length}</p>
            <p className="text-sm text-gray-600">Preparing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{readyOrders.length}</p>
            <p className="text-sm text-gray-600">Ready</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{completedOrders.length}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="new">
            New ({newOrders.length})
          </TabsTrigger>
          <TabsTrigger value="preparing">
            Preparing ({preparingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="ready">
            Ready ({readyOrders.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="mt-6">
          {newOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No new orders</p>
              </CardContent>
            </Card>
          ) : (
            newOrders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>

        <TabsContent value="preparing" className="mt-6">
          {preparingOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No orders being prepared</p>
              </CardContent>
            </Card>
          ) : (
            preparingOrders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>

        <TabsContent value="ready" className="mt-6">
          {readyOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No orders ready for pickup</p>
              </CardContent>
            </Card>
          ) : (
            readyOrders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          {completedOrders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No completed orders yet</p>
              </CardContent>
            </Card>
          ) : (
            completedOrders.map((order) => <OrderCard key={order.id} order={order} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
