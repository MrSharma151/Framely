"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, qty: number) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // ✅ Load from localStorage only on first render
  useEffect(() => {
    try {
      const saved = localStorage.getItem("framely-cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Failed to load cart from localStorage", err);
    }
  }, []);

  // ✅ Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("framely-cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to save cart to localStorage", err);
    }
  }, [cart]);

  // ✅ Add item to cart
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // ✅ Remove item
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Update quantity
  const updateQuantity = (id: number, qty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  // ✅ Clear cart completely (will also clear localStorage)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("framely-cart");
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
