"use client";

import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./ui/LoadingSpinner";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { hydrated } = useAuth();

  // Show loading spinner until hydration completes
  if (!hydrated) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {/* Toast notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Navigation bar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8">{children}</main>

      {/* Footer */}
      <Footer />
    </>
  );
}
