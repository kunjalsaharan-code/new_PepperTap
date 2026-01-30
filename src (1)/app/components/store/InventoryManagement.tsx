import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Progress } from "@/app/components/ui/progress";
import { Search, Plus, Minus, AlertTriangle, CheckCircle2, Package } from "lucide-react";
import { toast } from "sonner";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minimumStock: number;
  price: number;
  status: "high" | "medium" | "low" | "out";
  lastUpdated: string;
}

export function InventoryManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "1",
      name: "Fresh Milk (1L)",
      category: "Dairy & Eggs",
      currentStock: 8,
      minimumStock: 20,
      price: 65,
      status: "low",
      lastUpdated: "2 hours ago",
    },
    {
      id: "2",
      name: "Organic Bananas (1 dozen)",
      category: "Fruits & Vegetables",
      currentStock: 5,
      minimumStock: 15,
      price: 40,
      status: "low",
      lastUpdated: "3 hours ago",
    },
    {
      id: "3",
      name: "Whole Wheat Bread",
      category: "Bakery",
      currentStock: 3,
      minimumStock: 10,
      price: 45,
      status: "low",
      lastUpdated: "1 hour ago",
    },
    {
      id: "4",
      name: "Farm Fresh Eggs (12 pcs)",
      category: "Dairy & Eggs",
      currentStock: 25,
      minimumStock: 20,
      price: 80,
      status: "medium",
      lastUpdated: "30 min ago",
    },
    {
      id: "5",
      name: "Premium Coffee Beans",
      category: "Snacks & Beverages",
      currentStock: 45,
      minimumStock: 15,
      price: 350,
      status: "high",
      lastUpdated: "4 hours ago",
    },
    {
      id: "6",
      name: "Fresh Tomatoes (500g)",
      category: "Fruits & Vegetables",
      currentStock: 50,
      minimumStock: 30,
      price: 35,
      status: "high",
      lastUpdated: "1 hour ago",
    },
    {
      id: "7",
      name: "Greek Yogurt",
      category: "Dairy & Eggs",
      currentStock: 0,
      minimumStock: 15,
      price: 120,
      status: "out",
      lastUpdated: "5 hours ago",
    },
    {
      id: "8",
      name: "Basmati Rice (5kg)",
      category: "Staples",
      currentStock: 35,
      minimumStock: 20,
      price: 450,
      status: "high",
      lastUpdated: "2 hours ago",
    },
  ]);

  const updateStock = (id: string, change: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStock = Math.max(0, item.currentStock + change);
          const status =
            newStock === 0
              ? "out"
              : newStock < item.minimumStock * 0.5
              ? "low"
              : newStock < item.minimumStock
              ? "medium"
              : "high";

          toast.success(`Updated ${item.name} stock to ${newStock}`);

          return {
            ...item,
            currentStock: newStock,
            status,
            lastUpdated: "Just now",
          };
        }
        return item;
      })
    );
  };

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(inventory.map((item) => item.category)))];

  const statusCounts = {
    low: inventory.filter((i) => i.status === "low").length,
    out: inventory.filter((i) => i.status === "out").length,
    total: inventory.length,
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-gray-600">Keep your stock updated to avoid penalties</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Items</p>
                <p className="text-3xl font-bold">{statusCounts.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Low Stock</p>
                <p className="text-3xl font-bold text-orange-600">{statusCounts.low}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Out of Stock</p>
                <p className="text-3xl font-bold text-red-600">{statusCounts.out}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warning */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">Inventory Update Required</h3>
              <p className="text-sm text-yellow-800">
                You have {statusCounts.low} low stock items and {statusCounts.out} out of stock items. 
                Failure to update inventory and fulfill confirmed orders may result in penalties.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => {
                  const stockPercentage = (item.currentStock / item.minimumStock) * 100;
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <div className="space-y-1 min-w-32">
                          <div className="flex justify-between text-sm">
                            <span>{item.currentStock}</span>
                            <span className="text-gray-500">/ {item.minimumStock}</span>
                          </div>
                          <Progress value={Math.min(stockPercentage, 100)} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.status === "high"
                              ? "bg-green-100 text-green-700"
                              : item.status === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : item.status === "low"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {item.status === "out" ? (
                            <>
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Out of Stock
                            </>
                          ) : item.status === "low" ? (
                            <>
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Low
                            </>
                          ) : item.status === "medium" ? (
                            "Medium"
                          ) : (
                            <>
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Good
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>₹{item.price}</TableCell>
                      <TableCell className="text-sm text-gray-600">{item.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStock(item.id, -1)}
                            disabled={item.currentStock === 0}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-semibold">{item.currentStock}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStock(item.id, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => {
                              updateStock(item.id, item.minimumStock - item.currentStock);
                            }}
                          >
                            Restock
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
