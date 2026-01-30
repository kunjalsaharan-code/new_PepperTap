import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Search, Plus, Store as StoreIcon, MapPin, Star, Clock, Package } from "lucide-react";
import type { CartItem, Store } from "@/app/components/customer/CustomerApp";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  storeId: string;
  storeName: string;
  isEssential: boolean;
  inStock: boolean;
  inventoryCount: number;
}

interface ProductBrowseProps {
  addToCart: (item: CartItem) => void;
  selectedStore: Store | null;
  setSelectedStore: (store: Store) => void;
}

// Mock data for stores
const mockStores: Store[] = [
  {
    id: "store1",
    name: "Fresh Mart Express",
    distance: 0.8,
    rating: 4.5,
    deliveryTime: "15-20 min",
    inventoryStatus: "high",
  },
  {
    id: "store2",
    name: "Green Grocery",
    distance: 1.2,
    rating: 4.7,
    deliveryTime: "20-25 min",
    inventoryStatus: "high",
  },
  {
    id: "store3",
    name: "Quick Stop",
    distance: 0.5,
    rating: 4.3,
    deliveryTime: "10-15 min",
    inventoryStatus: "medium",
  },
  {
    id: "store4",
    name: "Super Bazaar",
    distance: 2.0,
    rating: 4.6,
    deliveryTime: "30-35 min",
    inventoryStatus: "high",
  },
];

// Mock products data
const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Fresh Milk (1L)",
    price: 65,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
    category: "Dairy & Eggs",
    storeId: "store1",
    storeName: "Fresh Mart Express",
    isEssential: true,
    inStock: true,
    inventoryCount: 45,
  },
  {
    id: "p2",
    name: "Organic Bananas (1 dozen)",
    price: 40,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
    category: "Fruits & Vegetables",
    storeId: "store1",
    storeName: "Fresh Mart Express",
    isEssential: true,
    inStock: true,
    inventoryCount: 30,
  },
  {
    id: "p3",
    name: "Whole Wheat Bread",
    price: 45,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    category: "Bakery",
    storeId: "store2",
    storeName: "Green Grocery",
    isEssential: true,
    inStock: true,
    inventoryCount: 25,
  },
  {
    id: "p4",
    name: "Farm Fresh Eggs (12 pcs)",
    price: 80,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400",
    category: "Dairy & Eggs",
    storeId: "store2",
    storeName: "Green Grocery",
    isEssential: true,
    inStock: true,
    inventoryCount: 40,
  },
  {
    id: "p5",
    name: "Premium Coffee Beans",
    price: 350,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
    category: "Snacks & Beverages",
    storeId: "store3",
    storeName: "Quick Stop",
    isEssential: false,
    inStock: true,
    inventoryCount: 15,
  },
  {
    id: "p6",
    name: "Fresh Tomatoes (500g)",
    price: 35,
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400",
    category: "Fruits & Vegetables",
    storeId: "store1",
    storeName: "Fresh Mart Express",
    isEssential: true,
    inStock: true,
    inventoryCount: 50,
  },
  {
    id: "p7",
    name: "Greek Yogurt",
    price: 120,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400",
    category: "Dairy & Eggs",
    storeId: "store3",
    storeName: "Quick Stop",
    isEssential: true,
    inStock: true,
    inventoryCount: 20,
  },
  {
    id: "p8",
    name: "Potato Chips Family Pack",
    price: 95,
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400",
    category: "Snacks & Beverages",
    storeId: "store4",
    storeName: "Super Bazaar",
    isEssential: false,
    inStock: true,
    inventoryCount: 35,
  },
  {
    id: "p9",
    name: "Organic Spinach",
    price: 30,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
    category: "Fruits & Vegetables",
    storeId: "store2",
    storeName: "Green Grocery",
    isEssential: true,
    inStock: true,
    inventoryCount: 28,
  },
  {
    id: "p10",
    name: "Dishwashing Liquid",
    price: 150,
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400",
    category: "Household",
    storeId: "store4",
    storeName: "Super Bazaar",
    isEssential: false,
    inStock: true,
    inventoryCount: 22,
  },
  {
    id: "p11",
    name: "Shampoo 400ml",
    price: 280,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400",
    category: "Personal Care",
    storeId: "store3",
    storeName: "Quick Stop",
    isEssential: false,
    inStock: true,
    inventoryCount: 18,
  },
  {
    id: "p12",
    name: "Basmati Rice (5kg)",
    price: 450,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    category: "Staples",
    storeId: "store1",
    storeName: "Fresh Mart Express",
    isEssential: false,
    inStock: true,
    inventoryCount: 12,
  },
];

export function ProductBrowse({ addToCart, selectedStore, setSelectedStore }: ProductBrowseProps) {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [deliveryFilter, setDeliveryFilter] = useState<string>(searchParams.get("filter") || "all");

  // Get recommended store based on distance and inventory
  const recommendedStore = useMemo(() => {
    return mockStores.reduce((best, current) => {
      if (!best) return current;
      const bestScore = (5 - best.distance) * 2 + best.rating;
      const currentScore = (5 - current.distance) * 2 + current.rating;
      return currentScore > bestScore ? current : best;
    }, mockStores[0]);
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesDelivery =
        deliveryFilter === "all" ||
        (deliveryFilter === "instant" && product.isEssential) ||
        (deliveryFilter === "scheduled" && !product.isEssential);
      const matchesStore = !selectedStore || product.storeId === selectedStore.id;

      return matchesSearch && matchesCategory && matchesDelivery && matchesStore;
    });
  }, [searchQuery, selectedCategory, deliveryFilter, selectedStore]);

  const categories = ["all", "Fruits & Vegetables", "Dairy & Eggs", "Bakery", "Snacks & Beverages", "Personal Care", "Household", "Staples"];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Smart Store Recommendation */}
      {!selectedStore && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <StoreIcon className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-lg">Recommended Store</h3>
                  <Badge className="bg-green-600">Smart Match</Badge>
                </div>
                <h2 className="text-2xl font-bold mb-2">{recommendedStore.name}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{recommendedStore.distance} km away</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{recommendedStore.rating}/5</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{recommendedStore.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Package className="w-4 h-4" />
                    <span className="capitalize">{recommendedStore.inventoryStatus} stock</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Based on distance, availability, and ratings - this is your best match!
                </p>
                <Button onClick={() => setSelectedStore(recommendedStore)} className="bg-green-600 hover:bg-green-700">
                  Shop from {recommendedStore.name}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Store Selector */}
      {selectedStore && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Shopping from</p>
                <h3 className="font-semibold text-lg">{selectedStore.name}</h3>
                <p className="text-sm text-gray-600">
                  {selectedStore.distance} km • {selectedStore.deliveryTime}
                </p>
              </div>
              <Button variant="outline" onClick={() => setSelectedStore(null)}>
                Change Store
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Stores */}
      {!selectedStore && (
        <div>
          <h3 className="text-xl font-semibold mb-4">All Nearby Stores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockStores.map((store) => (
              <Card
                key={store.id}
                className="cursor-pointer hover:shadow-lg transition-all hover:border-green-300"
                onClick={() => setSelectedStore(store)}
              >
                <CardContent className="p-4 space-y-2">
                  <h4 className="font-semibold">{store.name}</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{store.distance} km</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span>{store.rating}/5</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{store.deliveryTime}</span>
                    </div>
                  </div>
                  <Badge
                    className={
                      store.inventoryStatus === "high"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {store.inventoryStatus} stock
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

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
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
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
            <Select value={deliveryFilter} onValueChange={setDeliveryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Delivery Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="instant">Instant Delivery</SelectItem>
                <SelectItem value="scheduled">Scheduled Delivery</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">
            Products ({filteredProducts.length})
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-all">
              <CardContent className="p-4 space-y-3">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  {product.isEssential && (
                    <Badge className="absolute top-2 right-2 bg-green-600">
                      Instant
                    </Badge>
                  )}
                  <Badge
                    className={`absolute top-2 left-2 ${
                      product.inventoryCount > 30
                        ? "bg-green-100 text-green-700"
                        : product.inventoryCount > 15
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.inventoryCount} left
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">{product.storeName}</p>
                  <p className="text-lg font-bold text-green-600">₹{product.price}</p>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                      image: product.image,
                      storeId: product.storeId,
                      storeName: product.storeName,
                      category: product.category,
                      isEssential: product.isEssential,
                    })
                  }
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No products found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
