"use client";

import ProductMetrics from "@/components/ui/dashboard/ProductMetrics";
import RevenueTrend from "@/components/ui/dashboard/RevenueTrend";
import RecentOrders from "@/components/ui/dashboard/RecentOrders";
import TopSellingProducts from "@/components/ui/dashboard/TopSellingProducts";
import LowStockAlerts from "@/components/ui/dashboard/LowStockAlerts";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      
      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">📊 Dashboard</h1>
        <p className="text-[var(--text-secondary)]">
          Welcome back! Here’s a quick insight into your Framely Admin panel.
        </p>
      </div>

      {/* Product & Data Metrics */}
      <ProductMetrics />

      {/* Revenue Trend */}
      <RevenueTrend />

      {/* Recent Orders */}
      <RecentOrders />

      {/* Top Selling Products */}
      <TopSellingProducts />

      {/* Low Stock Alerts */}
      <LowStockAlerts />
    </div>
  );
}