import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { MapPin, Phone, Navigation, CheckCircle2, Users, Package as PackageIcon } from "lucide-react";
import { toast } from "sonner";

interface Delivery {
  id: string;
  orderId: string;
  store: string;
  storeAddress: string;
  customer: string;
  customerPhone: string;
  address: string;
  items: number;
  amount: number;
  distance: number;
  eta: string;
  status: "assigned" | "picked" | "in-transit" | "delivered";
  batchWith: string[];
}

export function ActiveDeliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: "DEL001",
      orderId: "ORD1234",
      store: "Fresh Mart Express",
      storeAddress: "45 Market St",
      customer: "Rahul Mehta",
      customerPhone: "+91 9876543210",
      address: "123 Main Street, Apartment 4B",
      items: 5,
      amount: 450,
      distance: 1.2,
      eta: "12 min",
      status: "assigned",
      batchWith: ["DEL002"],
    },
    {
      id: "DEL002",
      orderId: "ORD1235",
      store: "Fresh Mart Express",
      storeAddress: "45 Market St",
      customer: "Sneha Kumar",
      customerPhone: "+91 9988776655",
      address: "126 Main Street, Apartment 2A",
      items: 8,
      amount: 680,
      distance: 1.3,
      eta: "14 min",
      status: "assigned",
      batchWith: ["DEL001"],
    },
    {
      id: "DEL003",
      orderId: "ORD1236",
      store: "Green Grocery",
      storeAddress: "78 Garden Avenue",
      customer: "Amit Patel",
      customerPhone: "+91 9123456789",
      address: "789 Garden Road",
      items: 3,
      amount: 275,
      distance: 2.5,
      eta: "20 min",
      status: "picked",
      batchWith: [],
    },
  ]);

  const updateDeliveryStatus = (deliveryId: string, newStatus: Delivery["status"]) => {
    setDeliveries((prev) =>
      prev.map((delivery) =>
        delivery.id === deliveryId ? { ...delivery, status: newStatus } : delivery
      )
    );

    const statusMessages: Record<Delivery["status"], string> = {
      assigned: "Delivery assigned",
      picked: "Order picked up from store",
      "in-transit": "Delivery in progress",
      delivered: "Delivery completed!",
    };

    toast.success(statusMessages[newStatus]);
  };

  const getDeliveriesByStatus = (status: Delivery["status"]) => {
    return deliveries.filter((d) => d.status === status);
  };

  const DeliveryCard = ({ delivery }: { delivery: Delivery }) => {
    const isBatched = delivery.batchWith.length > 0;

    return (
      <Card className={`mb-4 ${isBatched ? "border-2 border-purple-300 bg-purple-50" : ""}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center space-x-2">
                <span>{delivery.id}</span>
                {isBatched && (
                  <Badge className="bg-purple-600">
                    <Users className="w-3 h-3 mr-1" />
                    Batched
                  </Badge>
                )}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">Order: {delivery.orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-orange-600">{delivery.eta}</p>
              <p className="text-xs text-gray-500">{delivery.distance} km</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Store Pickup Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm flex items-center space-x-2">
                <PackageIcon className="w-4 h-4 text-blue-600" />
                <span>Pickup Location</span>
              </h4>
              {delivery.status === "assigned" && (
                <Badge className="bg-blue-600">Pickup Pending</Badge>
              )}
            </div>
            <p className="font-medium">{delivery.store}</p>
            <p className="text-sm text-gray-600">{delivery.storeAddress}</p>
          </div>

          {/* Customer Delivery Info */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-sm flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-green-600" />
              <span>Delivery Location</span>
            </h4>
            <p className="font-medium">{delivery.customer}</p>
            <p className="text-sm text-gray-600 mb-2">{delivery.address}</p>
            <Button variant="outline" size="sm" className="w-full">
              <Phone className="w-3 h-3 mr-2" />
              Call Customer: {delivery.customerPhone}
            </Button>
          </div>

          {/* Order Details */}
          <div className="flex justify-between text-sm bg-gray-50 p-3 rounded">
            <span>{delivery.items} items</span>
            <span className="font-bold">₹{delivery.amount}</span>
          </div>

          {/* Batch Info */}
          {isBatched && (
            <div className="bg-purple-100 p-3 rounded-lg">
              <p className="text-sm text-purple-800 font-medium mb-1">
                🎯 Batch Delivery Bonus Available
              </p>
              <p className="text-xs text-purple-700">
                Complete this with {delivery.batchWith.join(", ")} to earn ₹50 bonus!
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Navigation className="w-4 h-4 mr-2" />
              Navigate
            </Button>

            <div className="grid grid-cols-2 gap-2">
              {delivery.status === "assigned" && (
                <Button
                  onClick={() => updateDeliveryStatus(delivery.id, "picked")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Picked Up
                </Button>
              )}
              {delivery.status === "picked" && (
                <Button
                  onClick={() => updateDeliveryStatus(delivery.id, "in-transit")}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Start Delivery
                </Button>
              )}
              {delivery.status === "in-transit" && (
                <Button
                  onClick={() => updateDeliveryStatus(delivery.id, "delivered")}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Delivered
                </Button>
              )}
              <Button variant="outline">Contact Support</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const assignedDeliveries = getDeliveriesByStatus("assigned");
  const pickedDeliveries = getDeliveriesByStatus("picked");
  const inTransitDeliveries = getDeliveriesByStatus("in-transit");

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Active Deliveries</h1>
          <p className="text-gray-600">Manage your current delivery tasks</p>
        </div>
        <Badge className="bg-orange-600 text-lg px-4 py-2">
          {deliveries.filter((d) => d.status !== "delivered").length} Active
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{assignedDeliveries.length}</p>
            <p className="text-sm text-gray-600">To Pickup</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">
              {pickedDeliveries.length + inTransitDeliveries.length}
            </p>
            <p className="text-sm text-gray-600">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">
              {deliveries.filter((d) => d.batchWith.length > 0).length}
            </p>
            <p className="text-sm text-gray-600">Batched</p>
          </CardContent>
        </Card>
      </div>

      {/* Deliveries Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({deliveries.filter((d) => d.status !== "delivered").length})</TabsTrigger>
          <TabsTrigger value="assigned">To Pickup ({assignedDeliveries.length})</TabsTrigger>
          <TabsTrigger value="picked">Picked ({pickedDeliveries.length})</TabsTrigger>
          <TabsTrigger value="in-transit">In Transit ({inTransitDeliveries.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {deliveries.filter((d) => d.status !== "delivered").map((delivery) => (
            <DeliveryCard key={delivery.id} delivery={delivery} />
          ))}
        </TabsContent>

        <TabsContent value="assigned" className="mt-6">
          {assignedDeliveries.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No deliveries to pickup</p>
              </CardContent>
            </Card>
          ) : (
            assignedDeliveries.map((delivery) => <DeliveryCard key={delivery.id} delivery={delivery} />)
          )}
        </TabsContent>

        <TabsContent value="picked" className="mt-6">
          {pickedDeliveries.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <PackageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No picked up orders</p>
              </CardContent>
            </Card>
          ) : (
            pickedDeliveries.map((delivery) => <DeliveryCard key={delivery.id} delivery={delivery} />)
          )}
        </TabsContent>

        <TabsContent value="in-transit" className="mt-6">
          {inTransitDeliveries.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                <Navigation className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No deliveries in transit</p>
              </CardContent>
            </Card>
          ) : (
            inTransitDeliveries.map((delivery) => <DeliveryCard key={delivery.id} delivery={delivery} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
