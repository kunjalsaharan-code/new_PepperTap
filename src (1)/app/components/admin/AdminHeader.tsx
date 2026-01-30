import { useNavigate, useLocation } from "react-router";
import { BarChart3, TrendingUp, Activity, Store, ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export function AdminHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <header className="bg-purple-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {location.pathname !== "/admin" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-white hover:bg-purple-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <h1
              className="text-2xl font-bold cursor-pointer flex items-center space-x-2"
              onClick={() => navigate("/admin")}
            >
              <BarChart3 className="w-6 h-6" />
              <span>PEPPERTAP Admin</span>
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            <Button
              variant={location.pathname === "/admin" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate("/admin")}
              className="text-white hover:bg-purple-700"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={isActive("/demand") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate("/admin/demand")}
              className="text-white hover:bg-purple-700"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Demand Prediction
            </Button>
            <Button
              variant={isActive("/performance") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate("/admin/performance")}
              className="text-white hover:bg-purple-700"
            >
              <Activity className="w-4 h-4 mr-2" />
              Performance
            </Button>
            <Button
              variant={isActive("/store-load") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate("/admin/store-load")}
              className="text-white hover:bg-purple-700"
            >
              <Store className="w-4 h-4 mr-2" />
              Store Load
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-white hover:bg-purple-700"
          >
            Switch Role
          </Button>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex justify-around mt-3 pt-3 border-t border-purple-500">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin")}
            className="flex flex-col items-center text-white hover:bg-purple-700 text-xs"
          >
            <BarChart3 className="w-5 h-5" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/demand")}
            className="flex flex-col items-center text-white hover:bg-purple-700 text-xs"
          >
            <TrendingUp className="w-5 h-5" />
            Demand
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/performance")}
            className="flex flex-col items-center text-white hover:bg-purple-700 text-xs"
          >
            <Activity className="w-5 h-5" />
            Performance
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/store-load")}
            className="flex flex-col items-center text-white hover:bg-purple-700 text-xs"
          >
            <Store className="w-5 h-5" />
            Stores
          </Button>
        </nav>
      </div>
    </header>
  );
}
