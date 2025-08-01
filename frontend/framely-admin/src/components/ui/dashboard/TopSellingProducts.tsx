"use client";

export default function TopSellingProducts() {
  const products = [
    { name: "Premium Aviator Glasses", sold: 230 },
    { name: "Classic Wayfarer", sold: 180 },
    { name: "Round Vintage Frames", sold: 150 },
  ];

  // Find max for relative progress bar
  const maxSold = Math.max(...products.map((p) => p.sold));

  return (
    <div
      className="
        relative group p-6 rounded-xl
        bg-gradient-to-br from-[rgba(20,40,80,0.6)] to-[rgba(10,20,40,0.3)]
        border border-[var(--border-color)]
        backdrop-blur-xl
        shadow-[0_8px_25px_rgba(0,0,0,0.25)]
        transition-all duration-300
        hover:scale-[1.01] hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]
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
            🔥 Top Selling Products
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Best-performing products by sales
          </p>
        </div>
      </div>

      {/* Product List */}
      <ul className="space-y-4">
        {products.map((product, i) => {
          const progress = (product.sold / maxSold) * 100;

          return (
            <li
              key={i}
              className="
                relative rounded-lg p-4 
                bg-[rgba(255,255,255,0.02)]
                border border-[var(--border-color)]
                hover:bg-[rgba(255,255,255,0.05)]
                transition-all
              "
            >
              <div className="flex justify-between items-center">
                {/* Product Name */}
                <div className="flex items-center gap-3">
                  {/* Rank Badge */}
                  <span
                    className="
                      w-7 h-7 flex items-center justify-center 
                      text-xs font-bold rounded-full 
                      bg-gradient-to-r from-[#3E68C2] to-[#8AB4F8]
                      text-white shadow-md
                    "
                  >
                    {i + 1}
                  </span>
                  <span className="font-medium">{product.name}</span>
                </div>

                {/* Sold Count */}
                <span className="text-sm font-semibold text-green-400">
                  {product.sold} sold
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 mt-3 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Footer CTA */}
      <div className="mt-5 flex justify-end">
        <button
          className="
            px-4 py-2 text-xs font-medium rounded-lg
            bg-gradient-to-r from-[#3E68C2] to-[#8AB4F8]
            hover:shadow-[0_4px_12px_rgba(138,180,248,0.35)]
            transition
            text-white
          "
        >
          View All Products →
        </button>
      </div>
    </div>
  );
}
