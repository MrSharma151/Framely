"use client";

import React, { useState, useEffect } from "react";
import Button from "../Button";

// ✅ Strict Status Enum
const orderStatusOptions = ["Pending", "Processing", "Completed", "Cancelled"] as const;
type OrderStatus = (typeof orderStatusOptions)[number];

interface OrderFiltersProps {
  onApplyFilters?: (filters: {
    sortBy: string;
    sortOrder: "asc" | "desc";
    status?: OrderStatus;
    orderId?: number;
    userId?: string;
  }) => void;
  statusFilter?: OrderStatus;
  onStatusChange?: (status: OrderStatus) => void;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  onApplyFilters,
  statusFilter,
  onStatusChange,
}) => {
  const [sortBy, setSortBy] = useState("orderDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [status, setStatus] = useState<OrderStatus | "">(statusFilter || "");
  const [orderId, setOrderId] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (statusFilter !== undefined) {
      setStatus(statusFilter);
    }
  }, [statusFilter]);

  const handleStatusChange = (value: string) => {
    const typedValue = value as OrderStatus | "";
    setStatus(typedValue);
    if (onStatusChange && typedValue !== "") {
      onStatusChange(typedValue);
    }
  };

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters({
        sortBy,
        sortOrder,
        status: status || undefined,
        orderId: orderId ? Number(orderId) : undefined,
        userId: userId || undefined,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 bg-white/5 rounded-xl shadow-md">
      {/* 🔢 Sort By */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 rounded bg-transparent border border-gray-500 text-sm"
        >
          <option value="orderDate">Order Date</option>
          <option value="customerName">Customer Name</option>
          <option value="totalAmount">Total Amount</option>
        </select>
      </div>

      {/* ↕️ Sort Order */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold">Sort Order</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="p-2 rounded bg-transparent border border-gray-500 text-sm"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* 🏷️ Order Status */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold">Order Status</label>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="p-2 rounded bg-transparent border border-gray-500 text-sm"
        >
          <option value="">All</option>
          {orderStatusOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* 🧾 Order ID */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold">Order ID</label>
        <input
          type="number"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="e.g. 1024"
          className="p-2 rounded bg-transparent border border-gray-500 text-sm"
        />
      </div>

      {/* 👤 User ID */}
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-semibold">User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="e.g. abc-user-123"
          className="p-2 rounded bg-transparent border border-gray-500 text-sm"
        />
      </div>

      {/* ✅ Apply Button */}
      {onApplyFilters && (
        <div className="flex items-end">
          <Button
            onClick={handleApply}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrderFilters;
