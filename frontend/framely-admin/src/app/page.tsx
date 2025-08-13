"use client";

import ProductMetrics from "@/components/ui/dashboard/ProductMetrics";
import RevenueTrend from "@/components/ui/dashboard/RevenueTrend";
import RecentOrders from "@/components/ui/dashboard/RecentOrders";
import TopSellingProducts from "@/components/ui/dashboard/TopSellingProducts";
import LowStockAlerts from "@/components/ui/dashboard/LowStockAlerts";

export default function DashboardPage() {
  return (
    <div className="page-container px-4 sm:px-6 lg:px-8 py-6 space-y-8 fade-in">

      {/* Page Heading */}
      <header>
        <h1 className="title flex items-center gap-2">
          📊 Dashboard
        </h1>
        <p className="text-[var(--text-secondary)] mt-1 text-sm sm:text-base">
          Welcome back! Here’s a quick insight into your Framely Admin panel.
        </p>
      </header>

      {/* Product & Data Metrics */}
      <ProductMetrics />

      {/* Revenue Trend */}
      <RevenueTrend />

      {/* Recent Orders */}
      <RecentOrders />

      {/* Top Selling Products & Low Stock Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TopSellingProducts />
        <LowStockAlerts />
      </div>

    </div>
  );
}
