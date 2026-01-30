import { useMemo } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { ShoppingCart, Plus, Minus, Trash2, Store, AlertCircle } from "lucide-react";
import type { CartItem } from "@/app/components/customer/CustomerApp";

interface CartViewProps {
  cart: CartItem[];
  updateQuantity: (itemId: string, storeId: string, quantity: number) => void;
  removeFromCart: (itemId: string, storeId: string) => void;
  clearCart: () => void;
}

export function CartView({ cart, updateQuantity, removeFromCart, clearCart }: CartViewProps) {
  const navigate = useNavigate();

  // Group items by store
  const itemsByStore = useMemo(() => {
    const grouped: Record<string, CartItem[]> = {};
    cart.forEach((item) => {
      if (!grouped[item.storeId]) {
        grouped[item.storeId] = [];
      }
      grouped[item.storeId].push(item);
    });
    return grouped;
  }, [cart]);

  const storeCount = Object.keys(itemsByStore).length;
  const isSplitCart = storeCount > 1;

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = isSplitCart ? 40 + (storeCount - 1) * 20 : 40;
  const splitCartCharge = isSplitCart ? (storeCount - 1) * 20 : 0;
  const total = subtotal + deliveryFee;

  // Check if has instant delivery items
  const hasInstantItems = cart.some((item) => item.isEssential);
  const hasScheduledItems = cart.some((item) => !item.isEssential);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <Card>
          <CardContent className="p-12 text-center">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add items to get started</p>
            <Button onClick={() => navigate("/customer/browse")} className="bg-green-600 hover:bg-green-700">
              Start Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <Button variant="outline" onClick={clearCart}>
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Cart
        </Button>
      </div>

      {/* Split Cart Warning */}
      {isSplitCart && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-1">Split Cart Delivery</h3>
                <p className="text-sm text-blue-800">
                  Your items are from {storeCount} different stores. We'll optimize the delivery for you with minimal extra charge (₹{splitCartCharge}).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {Object.entries(itemsByStore).map(([storeId, items]) => (
            <Card key={storeId}>
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center space-x-2">
                  <Store className="w-5 h-5 text-green-600" />
                  <span>{items[0].storeName}</span>
                  <Badge variant="outline">{items.length} items</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.storeId}`} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-lg font-bold text-green-600">₹{item.price}</p>
                        {item.isEssential && (
                          <Badge className="bg-green-600 text-xs">Instant</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.storeId, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.storeId, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id, item.storeId)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">₹{deliveryFee}</span>
                </div>
                {isSplitCart && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">  (Split cart charge: ₹{splitCartCharge})</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-green-600">₹{total}</span>
                </div>
              </div>

              {/* Delivery Type Info */}
              <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                <h4 className="font-semibold text-sm">Delivery Options Available:</h4>
                {hasInstantItems && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Badge className="bg-green-600">Instant</Badge>
                    <span className="text-gray-600">15-30 min delivery</span>
                  </div>
                )}
                {hasScheduledItems && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Badge variant="outline">Scheduled</Badge>
                    <span className="text-gray-600">Choose your time</span>
                  </div>
                )}
              </div>

              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => navigate("/customer/checkout")}
              >
                Proceed to Checkout
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/customer/browse")}
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
