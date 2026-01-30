import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { CustomerHome } from "@/app/components/customer/CustomerHome";
import { ProductBrowse } from "@/app/components/customer/ProductBrowse";
import { CartView } from "@/app/components/customer/CartView";
import { CheckoutView } from "@/app/components/customer/CheckoutView";
import { GroupOrderView } from "@/app/components/customer/GroupOrderView";
import { OrderTracking } from "@/app/components/customer/OrderTracking";
import { CustomerHeader } from "@/app/components/customer/CustomerHeader";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  storeId: string;
  storeName: string;
  category: string;
  isEssential: boolean;
}

export interface Store {
  id: string;
  name: string;
  distance: number;
  rating: number;
  deliveryTime: string;
  inventoryStatus: "high" | "medium" | "low";
}

export function CustomerApp() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.storeId === item.storeId);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.storeId === item.storeId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string, storeId: string) => {
    setCart((prev) => prev.filter((i) => !(i.id === itemId && i.storeId === storeId)));
  };

  const updateQuantity = (itemId: string, storeId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(itemId, storeId);
    } else {
      setCart((prev) =>
        prev.map((i) =>
          i.id === itemId && i.storeId === storeId ? { ...i, quantity } : i
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerHeader cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route
          path="/browse"
          element={
            <ProductBrowse
              addToCart={addToCart}
              selectedStore={selectedStore}
              setSelectedStore={setSelectedStore}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartView
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={<CheckoutView cart={cart} clearCart={clearCart} />}
        />
        <Route path="/group-order" element={<GroupOrderView />} />
        <Route path="/track/:orderId" element={<OrderTracking />} />
      </Routes>
    </div>
  );
}
