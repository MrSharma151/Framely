"use client";
import { BarChart3, TrendingUp } from "lucide-react";

export default function RevenueTrend() {
  return (
    <div
      className="
        relative group
        p-6 rounded-xl 
        bg-gradient-to-br from-[rgba(20,40,80,0.6)] to-[rgba(10,20,40,0.3)]
        border border-[var(--border-color)]
        backdrop-blur-xl
        shadow-[0_8px_25px_rgba(0,0,0,0.25)]
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]
      "
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <div>
          <h2
            className="
              text-xl font-bold 
              bg-gradient-to-r from-[#A5D7E8] to-[#8AB4F8]
              bg-clip-text text-transparent
            "
          >
            📈 Revenue Trend
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Monthly revenue growth overview
          </p>
        </div>

        {/* Icon in gradient badge */}
        <div
          className="
            w-12 h-12 flex items-center justify-center
            rounded-xl shadow-md
            bg-gradient-to-br from-[#3E68C2] to-[#8AB4F8]
            group-hover:scale-105 transition
          "
        >
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Chart Placeholder */}
      <div
        className="
          relative h-56 rounded-lg 
          flex flex-col items-center justify-center
          bg-[rgba(255,255,255,0.03)]
          border border-[var(--border-color)]
          backdrop-blur-md
          shadow-inner
        "
      >
        <BarChart3 className="w-12 h-12 text-[var(--accent-secondary)] opacity-40" />
        <span className="mt-2 text-sm text-[var(--text-secondary)]">
          Revenue Chart Placeholder
        </span>

        {/* Optional gradient glow effect */}
        <div
          className="
            absolute inset-0 rounded-lg 
            opacity-0 group-hover:opacity-10 
            bg-gradient-to-r from-[#A5D7E8] to-[#8AB4F8] blur-xl transition
          "
        ></div>
      </div>

      {/* Footer mini stats */}
      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm">
        <p className="text-green-400 font-medium">
          ✅ +8% compared to last month
        </p>
        <button
          className="
            px-4 py-2 text-xs font-medium rounded-lg
            bg-gradient-to-r from-[#3E68C2] to-[#8AB4F8]
            hover:shadow-[0_4px_12px_rgba(138,180,248,0.35)]
            transition
            text-white
          "
        >
          View Detailed Report
        </button>
      </div>
    </div>
  );
}
