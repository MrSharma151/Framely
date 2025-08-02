"use client";

import React from "react";
import Button from "../Button";
import { Order } from "@/services/OrderService"; // ✅ Using global Order interface

interface OrderDetailsModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  order,
  onClose,
}) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-[#1a1a1a] w-full max-w-2xl rounded-2xl p-6 relative border border-gray-700 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-white">
          Order #{order.id} Details
        </h2>

        <div className="space-y-2 text-sm text-gray-300">
          <p><strong>Customer:</strong> {order.customerName}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Phone:</strong> {order.mobileNumber}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-md font-semibold text-white mb-2">Items</h3>
          <div className="max-h-48 overflow-y-auto border border-gray-700 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-3 py-2 text-left">Product</th>
                  <th className="px-3 py-2 text-left">Qty</th>
                  <th className="px-3 py-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600 bg-black">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-3 py-2">{item.productName}</td>
                    <td className="px-3 py-2">{item.quantity}</td>
                    <td className="px-3 py-2">₹{item.unitPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-white text-right text-lg font-bold">
            Total: ₹{order.totalAmount.toFixed(2)}
          </p>
        </div>

        <Button
          onClick={onClose}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 float-right"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
