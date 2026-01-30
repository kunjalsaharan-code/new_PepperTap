import { useNavigate, useLocation } from "react-router";
import { ShoppingCart, Home, Package, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

interface CustomerHeaderProps {
  cartCount: number;
}

export function CustomerHeader({ cartCount }: CustomerHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <header className="bg-green-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {location.pathname !== "/customer" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-white hover:bg-green-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={() => navigate("/customer")}
            >
              PEPPERTAP
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            <Button
              variant={isActive("/customer") && location.pathname === "/customer" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate("/customer")}
              className="text-white hover:bg-green-700"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button
              variant={isActive("/browse") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate("/customer/browse")}
              className="text-white hover:bg-green-700"
            >
              <Package className="w-4 h-4 mr-2" />
              Browse
            </Button>
            <Button
              variant={isActive("/group-order") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate("/customer/group-order")}
              className="text-white hover:bg-green-700"
            >
              <Users className="w-4 h-4 mr-2" />
              Group Order
            </Button>
            <Button
              variant={isActive("/cart") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate("/customer/cart")}
              className="relative text-white hover:bg-green-700"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white border-0">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-white hover:bg-green-700"
          >
            Switch Role
          </Button>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex justify-around mt-3 pt-3 border-t border-green-500">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/customer")}
            className="flex flex-col items-center text-white hover:bg-green-700 text-xs"
          >
            <Home className="w-5 h-5" />
            Home
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/customer/browse")}
            className="flex flex-col items-center text-white hover:bg-green-700 text-xs"
          >
            <Package className="w-5 h-5" />
            Browse
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/customer/group-order")}
            className="flex flex-col items-center text-white hover:bg-green-700 text-xs"
          >
            <Users className="w-5 h-5" />
            Group
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/customer/cart")}
            className="flex flex-col items-center text-white hover:bg-green-700 text-xs relative"
          >
            <ShoppingCart className="w-5 h-5" />
            Cart
            {cartCount > 0 && (
              <Badge className="absolute top-0 right-2 bg-red-500 text-white border-0 text-xs px-1.5 py-0">
                {cartCount}
              </Badge>
            )}
          </Button>
        </nav>
      </div>
    </header>
  );
}
