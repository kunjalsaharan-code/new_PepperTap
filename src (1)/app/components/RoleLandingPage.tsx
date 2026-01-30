import { useNavigate } from "react-router";
import { ShoppingBag, Store, Bike, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";

export function RoleLandingPage() {
  const navigate = useNavigate();

  const roles = [
    {
      id: "customer",
      title: "Customer",
      description: "Browse products, place orders, and track deliveries",
      icon: ShoppingBag,
      color: "bg-green-500",
      path: "/customer",
    },
    {
      id: "store",
      title: "Store Manager",
      description: "Manage inventory, process orders, and track performance",
      icon: Store,
      color: "bg-blue-500",
      path: "/store",
    },
    {
      id: "rider",
      title: "Delivery Rider",
      description: "View routes, manage deliveries, and optimize trips",
      icon: Bike,
      color: "bg-orange-500",
      path: "/rider",
    },
    {
      id: "admin",
      title: "Admin",
      description: "System analytics, demand prediction, and performance tracking",
      icon: BarChart3,
      color: "bg-purple-500",
      path: "/admin",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-8">
          <h1 className="text-5xl font-bold text-green-600 mb-4">PEPPERTAP</h1>
          <p className="text-xl text-gray-600">Smart Grocery Delivery Service</p>
          <p className="text-sm text-gray-500 mt-2">Select your role to continue</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-green-400"
                onClick={() => navigate(role.path)}
              >
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className={`${role.color} p-4 rounded-full`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{role.title}</h3>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Overview */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Adaptive Delivery</h3>
              <p className="text-sm text-gray-600">
                Instant & scheduled delivery options based on item type
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold mb-2">Group Ordering</h3>
              <p className="text-sm text-gray-600">
                Combine orders to reduce costs and delivery pressure
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-600">
                Smart routing, demand prediction, and store recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
