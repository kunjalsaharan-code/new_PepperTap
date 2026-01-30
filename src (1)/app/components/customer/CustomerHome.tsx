import { useNavigate } from "react-router";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { ShoppingBag, Zap, Clock, Users, MapPin, TrendingUp } from "lucide-react";

export function CustomerHome() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "Instant Delivery",
      description: "Get essentials delivered in 15-30 minutes",
      action: () => navigate("/customer/browse?filter=instant"),
    },
    {
      icon: Clock,
      title: "Scheduled Delivery",
      description: "Plan ahead for non-urgent items",
      action: () => navigate("/customer/browse?filter=scheduled"),
    },
    {
      icon: Users,
      title: "Group Orders",
      description: "Order together, save on delivery",
      action: () => navigate("/customer/group-order"),
    },
    {
      icon: MapPin,
      title: "Smart Store Matching",
      description: "Auto-recommended nearby stores",
      action: () => navigate("/customer/browse"),
    },
  ];

  const categories = [
    { name: "Fruits & Vegetables", icon: "🥬", color: "bg-green-100" },
    { name: "Dairy & Eggs", icon: "🥛", color: "bg-blue-100" },
    { name: "Snacks & Beverages", icon: "🍪", color: "bg-orange-100" },
    { name: "Personal Care", icon: "🧴", color: "bg-pink-100" },
    { name: "Household", icon: "🧹", color: "bg-purple-100" },
    { name: "Bakery", icon: "🍞", color: "bg-yellow-100" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Fresh Groceries Delivered Fast
        </h1>
        <p className="text-lg mb-6 opacity-90">
          Smart delivery options tailored to your needs
        </p>
        <Button
          size="lg"
          onClick={() => navigate("/customer/browse")}
          className="bg-white text-green-600 hover:bg-gray-100"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Start Shopping
        </Button>
      </div>

      {/* Delivery Features */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Delivery Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card
                key={idx}
                className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                onClick={feature.action}
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, idx) => (
            <Card
              key={idx}
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-105"
              onClick={() => navigate(`/customer/browse?category=${category.name}`)}
            >
              <CardContent className="p-4 text-center space-y-2">
                <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto text-3xl`}>
                  {category.icon}
                </div>
                <p className="text-sm font-medium">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span>Split Cart Delivery</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Items split across multiple nearby stores with minimal extra charge for your convenience.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>Real-time Inventory</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              See live stock availability from stores near you. No more disappointments!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span>Group Ordering</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Combine orders with friends and family to save on delivery costs.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
