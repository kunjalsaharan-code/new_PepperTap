import { useNavigate, useLocation } from "react-router";
import { Bike, Package, Map, History, ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

export function RiderHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <header className="bg-orange-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {location.pathname !== "/rider" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-white hover:bg-orange-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <h1
              className="text-2xl font-bold cursor-pointer flex items-center space-x-2"
              onClick={() => navigate("/rider")}
            >
              <Bike className="w-6 h-6" />
              <span>PEPPERTAP Rider</span>
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            <Button
              variant={location.pathname === "/rider" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate("/rider")}
              className="text-white hover:bg-orange-700"
            >
              <Bike className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              variant={isActive("/active") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate("/rider/active")}
              className="text-white hover:bg-orange-700 relative"
            >
              <Package className="w-4 h-4 mr-2" />
              Active
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white border-0 px-1.5 py-0 text-xs">
                3
              </Badge>
            </Button>
            <Button
              variant={isActive("/routes") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate("/rider/routes")}
              className="text-white hover:bg-orange-700"
            >
              <Map className="w-4 h-4 mr-2" />
              Routes
            </Button>
            <Button
              variant={isActive("/history") ? "secondary" : "ghost"}
              size="sm"
              onClick={() => navigate("/rider/history")}
              className="text-white hover:bg-orange-700"
            >
              <History className="w-4 h-4 mr-2" />
              History
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-white hover:bg-orange-700"
          >
            Switch Role
          </Button>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex justify-around mt-3 pt-3 border-t border-orange-500">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/rider")}
            className="flex flex-col items-center text-white hover:bg-orange-700 text-xs"
          >
            <Bike className="w-5 h-5" />
            Dashboard
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/rider/active")}
            className="flex flex-col items-center text-white hover:bg-orange-700 text-xs relative"
          >
            <Package className="w-5 h-5" />
            Active
            <Badge className="absolute top-0 right-2 bg-red-500 text-white border-0 text-xs px-1.5 py-0">
              3
            </Badge>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/rider/routes")}
            className="flex flex-col items-center text-white hover:bg-orange-700 text-xs"
          >
            <Map className="w-5 h-5" />
            Routes
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/rider/history")}
            className="flex flex-col items-center text-white hover:bg-orange-700 text-xs"
          >
            <History className="w-5 h-5" />
            History
          </Button>
        </nav>
      </div>
    </header>
  );
}
