"use client";
import { AlertTriangle } from "lucide-react";

export default function LowStockAlerts() {
  const alerts = [
    { name: "Retro Round Glasses", stock: 4 },
    { name: "Kids Frame - Blue", stock: 2 },
    { name: "Slim Metal Frame", stock: 1 },
  ];

  return (
    <div
      className="
        relative group p-6 rounded-xl
        bg-gradient-to-br from-[rgba(60,20,20,0.3)] to-[rgba(30,10,10,0.2)]
        border border-[var(--border-color)]
        backdrop-blur-xl
        shadow-[0_8px_25px_rgba(0,0,0,0.25)]
        transition-all duration-300
        hover:scale-[1.01] hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]
      "
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-yellow-400 w-6 h-6" />
          <h2
            className="
              text-xl font-bold
              bg-gradient-to-r from-yellow-300 to-red-400
              bg-clip-text text-transparent
            "
          >
             Low Stock Alerts
          </h2>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          Items running out of stock
        </p>
      </div>

      {/* Alert List */}
      <ul className="space-y-3">
        {alerts.map((item, i) => {
          const isCritical = item.stock <= 2;
          return (
            <li
              key={i}
              className={`
                flex flex-col sm:flex-row sm:justify-between sm:items-center
                p-3 rounded-lg
                border border-[var(--border-color)]
                bg-[rgba(255,255,255,0.02)]
                hover:bg-[rgba(255,0,0,0.05)]
                transition-all
              `}
            >
              {/* Product Name */}
              <div className="flex items-center gap-2">
                <span
                  className={`
                    px-2 py-1 text-xs rounded-md font-semibold 
                    ${isCritical
                      ? "bg-red-500/20 text-red-400 border border-red-400/30"
                      : "bg-yellow-500/20 text-yellow-400 border border-yellow-400/30"
                    }
                  `}
                >
                  {isCritical ? "Critical" : "Low"}
                </span>
                <span className="font-medium">{item.name}</span>
              </div>

              {/* Stock Count */}
              <span
                className={`mt-2 sm:mt-0 text-sm font-semibold ${
                  isCritical ? "text-red-400" : "text-yellow-400"
                }`}
              >
                Only {item.stock} left
              </span>
            </li>
          );
        })}
      </ul>

      {/* Footer CTA */}
      <div className="mt-5 flex justify-end">
        <button
          className="
            px-4 py-2 text-xs font-medium rounded-lg
            bg-gradient-to-r from-red-500 to-orange-500
            hover:shadow-[0_4px_12px_rgba(255,100,100,0.35)]
            transition text-white
          "
        >
          View Inventory →
        </button>
      </div>
    </div>
  );
}
