import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Textarea } from "@/app/components/ui/textarea";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { Zap, Clock, Calendar, MapPin, CreditCard } from "lucide-react";
import { toast } from "sonner";
import type { CartItem } from "@/app/components/customer/CustomerApp";

interface CheckoutViewProps {
  cart: CartItem[];
  clearCart: () => void;
}

export function CheckoutView({ cart, clearCart }: CheckoutViewProps) {
  const navigate = useNavigate();
  const [deliveryType, setDeliveryType] = useState<"instant" | "scheduled">("instant");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [address, setAddress] = useState("123 Main Street, Apartment 4B, Downtown");
  const [phone, setPhone] = useState("+91 9876543210");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const hasInstantItems = useMemo(() => cart.some((item) => item.isEssential), [cart]);
  const hasScheduledItems = useMemo(() => cart.some((item) => !item.isEssential), [cart]);

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

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = isSplitCart ? 40 + (storeCount - 1) * 20 : 40;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    if (deliveryType === "scheduled" && (!scheduledDate || !scheduledTime)) {
      toast.error("Please select delivery date and time");
      return;
    }

    // Generate random order ID
    const orderId = `ORD${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    toast.success("Order placed successfully!", {
      description: `Order ID: ${orderId}`,
    });

    clearCart();
    navigate(`/customer/track/${orderId}`);
  };

  if (cart.length === 0) {
    navigate("/customer/cart");
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Delivery Option</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={deliveryType} onValueChange={(v) => setDeliveryType(v as "instant" | "scheduled")}>
                <div className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer ${deliveryType === "instant" ? "border-green-500 bg-green-50" : "border-gray-200"}`}>
                  <RadioGroupItem value="instant" id="instant" disabled={!hasInstantItems} />
                  <Label htmlFor="instant" className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold">Instant Delivery</h3>
                      <Badge className="bg-green-600">15-30 min</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Available for essential items within short radius
                    </p>
                    {!hasInstantItems && (
                      <p className="text-sm text-red-600 mt-1">No instant delivery items in cart</p>
                    )}
                  </Label>
                </div>

                <div className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer ${deliveryType === "scheduled" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
                  <RadioGroupItem value="scheduled" id="scheduled" />
                  <Label htmlFor="scheduled" className="flex-1 cursor-pointer">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold">Scheduled Delivery</h3>
                      <Badge variant="outline">Choose Time</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Schedule delivery for a convenient time
                    </p>
                  </Label>
                </div>
              </RadioGroup>

              {/* Scheduled Delivery Options */}
              {deliveryType === "scheduled" && (
                <div className="bg-blue-50 p-4 rounded-lg space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>Delivery Date</span>
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4" />
                        <span>Delivery Time</span>
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Delivery Address</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Payment Method</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-3 p-3 rounded-lg border">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex-1 cursor-pointer">
                    Cash on Delivery
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online" className="flex-1 cursor-pointer">
                    Pay Online (UPI/Card/Wallet)
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items Count */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} items from {storeCount} store{storeCount > 1 ? "s" : ""}
                </p>
              </div>

              {/* Price Breakdown */}
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
                  <div className="text-xs text-gray-500 pl-4">
                    Includes split cart charge for {storeCount} stores
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-green-600">₹{total}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Delivery Details</h4>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center space-x-2">
                    {deliveryType === "instant" ? (
                      <>
                        <Zap className="w-4 h-4 text-green-600" />
                        <span>Instant: 15-30 minutes</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>
                          Scheduled: {scheduledDate || "Not set"} {scheduledTime || ""}
                        </span>
                      </>
                    )}
                  </p>
                  {isSplitCart && (
                    <p className="text-xs text-gray-600">
                      Items will be delivered from multiple stores
                    </p>
                  )}
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={handlePlaceOrder}
              >
                Place Order - ₹{total}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/customer/cart")}
              >
                Back to Cart
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
