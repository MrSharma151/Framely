"use client";
import { Package, Tag, ShoppingCart, DollarSign } from "lucide-react";

export default function ProductMetrics() {
  const stats = [
    { title: "Total Products", value: "128", change: "+12 this week", changeColor: "text-green-400", icon: Package },
    { title: "Categories", value: "12", change: "Organized", changeColor: "text-blue-400", icon: Tag },
    { title: "Total Orders", value: "458", change: "+34 this week", changeColor: "text-yellow-400", icon: ShoppingCart },
    { title: "Revenue", value: "$12,430", change: "+8% from last week", changeColor: "text-green-400", icon: DollarSign },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="
              relative group 
              p-5 rounded-xl
              bg-gradient-to-br from-[rgba(20,40,80,0.6)] to-[rgba(10,20,40,0.3)]
              border border-[var(--border-color)]
              backdrop-blur-xl
              shadow-[0_8px_25px_rgba(0,0,0,0.25)]
              transition-all duration-300
              hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]
            "
          >
            {/* Icon with soft gradient background */}
            <div
              className="
                w-12 h-12 rounded-xl 
                bg-gradient-to-br from-[#3E68C2] to-[#8AB4F8]
                flex items-center justify-center
                shadow-md
                group-hover:shadow-lg group-hover:scale-105 transition
              "
            >
              <Icon className="w-6 h-6 text-white" />
            </div>

            {/* Title */}
            <h3
              className="
                mt-4 text-lg font-semibold 
                bg-gradient-to-r from-[#A5D7E8] to-[#8AB4F8]
                bg-clip-text text-transparent
              "
            >
              {stat.title}
            </h3>

            {/* Value */}
            <p className="text-3xl font-extrabold mt-2 tracking-wide text-white">
              {stat.value}
            </p>

            {/* Change / Status */}
            <span className={`text-sm mt-1 block ${stat.changeColor}`}>
              {stat.change}
            </span>

            {/* Glow ring on hover */}
            <div className="
              absolute inset-0 rounded-xl
              opacity-0 group-hover:opacity-10
              bg-gradient-to-r from-[#A5D7E8] to-[#8AB4F8]
              blur-xl transition
            "></div>
          </div>
        );
      })}
    </div>
  );
}
