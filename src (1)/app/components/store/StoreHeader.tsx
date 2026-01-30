import { useNavigate, useLocation } from "react-router";
import { Store, Package, ShoppingBag, TrendingUp, ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export function StoreHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {location.pathname !== "/store" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-white hover:bg-blue-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <h1
              className="text-2xl font-bold cursor-pointer flex items-center space-x-2"
              onClick={() => navigate("/store")}
            >
              <Store className="w-6 h-6" />
              <span>PEPPERTAP Store</span>
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            <Button
              variant={location.pathname === "/store" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate("/store")}
              className="text-white hover:bg-blue-700"
            >
              <Store className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={isActive("/inventory") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate("/store/inventory")}
              className="text-white hover:bg-blue-700"
            >
              <Package className="w-4 h-4 mr-2" />
              Inventory
            </Button>
            <Button
              variant={isActive("/orders") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate("/store/orders")}
              className="text-white hover:bg-blue-700"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Orders
            </Button>
            <Button
              variant={isActive("/performance") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate("/store/performance")}
              className="text-white hover:bg-blue-700"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Performance
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-white hover:bg-blue-700"
          >
            Switch Role
          </Button>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex justify-around mt-3 pt-3 border-t border-blue-500">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/store")}
            className="flex flex-col items-center text-white hover:bg-blue-700 text-xs"
          >
            <Store className="w-5 h-5" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/store/inventory")}
            className="flex flex-col items-center text-white hover:bg-blue-700 text-xs"
          >
            <Package className="w-5 h-5" />
            Inventory
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/store/orders")}
            className="flex flex-col items-center text-white hover:bg-blue-700 text-xs"
          >
            <ShoppingBag className="w-5 h-5" />
            Orders
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/store/performance")}
            className="flex flex-col items-center text-white hover:bg-blue-700 text-xs"
          >
            <TrendingUp className="w-5 h-5" />
            Performance
          </Button>
        </nav>
      </div>
    </header>
  );
}
