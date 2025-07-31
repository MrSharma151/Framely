"use client";

export default function RecentOrders() {
  const orders = [
    { id: "#1023", name: "John Doe", status: "Completed", amount: "$240", color: "bg-green-500/20 text-green-300" },
    { id: "#1024", name: "Jane Smith", status: "Pending", amount: "$180", color: "bg-yellow-500/20 text-yellow-300" },
    { id: "#1025", name: "David Lee", status: "Cancelled", amount: "$0", color: "bg-red-500/20 text-red-300" },
  ];

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
            🛒 Recent Orders
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Latest customer orders overview
          </p>
        </div>
      </div>

      {/* Table Wrapper for Mobile Scroll */}
      <div className="overflow-x-auto rounded-lg border border-[var(--border-color)]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border-color)] bg-[rgba(255,255,255,0.02)] text-[var(--text-secondary)]">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="
                  border-b border-[var(--border-color)] 
                  hover:bg-[rgba(255,255,255,0.05)] transition
                "
              >
                <td className="py-3 px-4 font-medium">{order.id}</td>
                <td className="py-3 px-4">{order.name}</td>

                {/* Status Badge */}
                <td className="py-3 px-4">
                  <span
                    className={`
                      px-3 py-1 rounded-md text-xs font-medium
                      ${order.color}
                      border border-white/5 shadow-sm
                    `}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Amount */}
                <td className="py-3 px-4 font-semibold">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Mini-Action */}
      <div className="mt-4 flex justify-end">
        <button
          className="
            px-4 py-2 text-xs font-medium rounded-lg
            bg-gradient-to-r from-[#3E68C2] to-[#8AB4F8]
            hover:shadow-[0_4px_12px_rgba(138,180,248,0.35)]
            transition
            text-white
          "
        >
          View All Orders →
        </button>
      </div>
    </div>
  );
}
