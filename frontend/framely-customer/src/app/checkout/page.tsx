"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { placeOrder } from "@/services/orderService";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, total, clearCart } = useCart();
  const { user, hydrated } = useAuth();

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(false);

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (hydrated && !user) {
      toast.error("⚠️ Please login to place your order");
      setTimeout(() => router.replace("/auth/login"), 500);
    }
  }, [hydrated, user, router]);

  // ✅ Autofill user details
  useEffect(() => {
    if (user) {
      setCustomerName(user.fullName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handlePlaceOrder = async () => {
    if (!customerName || !email || !mobileNumber || !address) {
      toast.error("Please fill all required fields");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderPayload = {
      customerName,
      email,
      mobileNumber,
      address,
      totalAmount: total,
      items: cart.map((c) => ({
        productId: c.id,
        quantity: c.quantity,
        unitPrice: c.price,
      })),
    };

    try {
      setLoading(true);
      await placeOrder(orderPayload);
      toast.success("✅ Order placed successfully!");
      clearCart();
      router.push("/orders");
    } catch (err: any) {
      console.error("Order failed:", err.response?.data || err.message);
      toast.error("Failed to place order. Try again!");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  if (cart.length === 0) {
    return (
      <div className="py-20 text-center text-gray-400">
        🛒 Your cart is empty.
        <Button className="mt-4" onClick={() => router.push("/shop")}>
          Go to Shop →
        </Button>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* ✅ Page Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-10">
          🛍 Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ✅ LEFT: Order Summary */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Your Order Summary
            </h2>

            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-700 pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shadow-md"
                    />
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-sm text-gray-400">
                        Qty: {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-green-400">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* ✅ Total */}
            <div className="mt-6 flex justify-between text-xl font-bold">
              <span className="text-gray-300">Total:</span>
              <span className="text-green-400">₹{total.toFixed(2)}</span>
            </div>

            {/* ✅ Friendly note */}
            <div className="mt-6 p-4 rounded-xl bg-green-900/20 text-green-300 text-sm">
              ✅ All prices include applicable taxes. Cash on Delivery available.
            </div>
          </div>

          {/* ✅ RIGHT: Checkout Form */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Customer Information
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePlaceOrder();
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Full Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="tel"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                placeholder="Shipping Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-blue-500"
              />

              {/* ✅ Extra Info */}
              <div className="p-4 rounded-xl bg-blue-900/20 text-blue-300 text-sm leading-relaxed">
                ℹ️ <strong>After placing your order</strong>, our optical experts
                will personally contact you for:
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  <li>Prescription verification</li>
                  <li>Lens measurements & custom fitting</li>
                  <li>Personalized lens advice & recommendations</li>
                  <li>Any special requests before finalizing your eyewear</li>
                </ul>
              </div>

              {/* ✅ Payment Mode */}
              <div className="p-4 rounded-xl bg-gray-900 text-gray-300 text-sm">
                ✅ <strong>Cash on Delivery</strong> (COD) will be used for now.
              </div>

              {/* ✅ Place Order Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full mt-4 text-lg"
                disabled={loading}
              >
                {loading ? "⏳ Placing Order..." : `✅ Place Order (₹${total})`}
              </Button>
            </form>
          </div>
        </div>

        {/* ✅ Additional reassurance section */}
        <div className="mt-12 text-center text-gray-400 text-sm max-w-2xl mx-auto">
          🔒 Your personal information is secure with us.  
          Our team ensures **safe handling of your prescription & eyewear**.
        </div>
      </div>
    </section>
  );
}
