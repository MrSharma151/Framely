"use client";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";  // ✅ Import AuthProvider
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>  {/* ✅ Wrap AuthProvider at top level */}
      <CartProvider>
        {children}
        <Toaster position="top-center" />
      </CartProvider>
    </AuthProvider>
  );
}
