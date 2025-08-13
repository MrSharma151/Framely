"use client";
import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { getProducts, Product } from "@/services/ProductService";

export default function LowStockAlerts() {
  const [alerts, setAlerts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchLowStock = async () => {
      const res = await getProducts(1, 50, "name", "asc");
      const lowStockItems = res.data.filter((p: any) => p.stock <= 5);
      setAlerts(lowStockItems);
    };
    fetchLowStock();
  }, []);

  return (
    <div className="card fade-in hover:shadow-[0_8px_25px_rgba(255,100,100,0.25)] hover:scale-[1.01] transition-transform duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-yellow-400 w-6 h-6" />
          <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-yellow-300 to-red-400 bg-clip-text text-transparent">
            Low Stock Alerts
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
          Items running out of stock
        </p>
      </div>

      {/* Alert List */}
      {alerts.length > 0 ? (
        <ul className="space-y-3">
          {alerts.map((item, i) => {
            const isCritical = (item as any).stock <= 2;
            return (
              <li
                key={i}
                className={`flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-lg border border-[var(--border-color)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,0,0,0.05)] transition-all`}
              >
                {/* Product Name */}
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-md font-semibold ${
                      isCritical
                        ? "bg-red-500/20 text-red-400 border border-red-400/30"
                        : "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30"
                    }`}
                  >
                    {isCritical ? "Critical" : "Low"}
                  </span>
                  <span className="font-medium text-[var(--text-primary)]">{item.name}</span>
                </div>

                {/* Stock Count */}
                <span
                  className={`mt-2 sm:mt-0 text-sm font-semibold ${
                    isCritical ? "text-red-400" : "text-yellow-400"
                  }`}
                >
                  Only {(item as any).stock} left
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-gray-400">No low stock alerts 🎉</p>
      )}

      {/* Footer CTA */}
      <div className="mt-5 flex justify-end">
        <Link href="/products" className="btn-danger text-xs sm:text-sm">
          View Inventory →
        </Link>
      </div>
    </div>
  );
}
