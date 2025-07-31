// src/app/layout.tsx

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast"; // ✅ Toast import

// Page metadata for SEO and browser tab
export const metadata = {
  title: "Framely Admin",
  description: "Admin Panel for Framely Optical Store",
};

/**
 * RootLayout wraps the entire application.
 * It includes global layout elements like Navbar, Footer, and authentication context.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 flex flex-col min-h-screen">
        {/* Wrap the entire app with AuthProvider to make auth state globally available */}
        <AuthProvider>
          {/* Global toast notifications */}
          <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Toast added */}

          {/* Top navigation bar */}
          <Navbar />

          {/* Main content area that expands to fill available space */}
          <main className="flex-1">{children}</main>

          {/* Bottom footer section */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
