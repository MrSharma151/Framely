"use client";

import React, { useState, useEffect } from "react";
import Button from "../Button";
import { OrderStatus } from "@/services/OrderService";

interface OrderStatusUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: OrderStatus;
  onConfirm: (newStatus: OrderStatus) => Promise<void>;
}

const OrderStatusUpdateModal: React.FC<OrderStatusUpdateModalProps> = ({
  isOpen,
  onClose,
  currentStatus,
  onConfirm,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(currentStatus);

  useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg p-6 w-[90%] max-w-md space-y-4">
        <h2 className="text-xl font-semibold">Update Order Status</h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Select New Status:</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
            className="w-full px-3 py-2 border rounded-md dark:bg-zinc-800 dark:text-white"
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm(selectedStatus)}
            disabled={selectedStatus === currentStatus}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusUpdateModal;
