'use client';

import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./ui/LoadingSpinner";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { hydrated } = useAuth();

  if (!hydrated) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
