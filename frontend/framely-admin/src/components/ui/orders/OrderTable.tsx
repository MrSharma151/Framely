import React from "react";
import { Order, OrderStatus } from "@/services/OrderService";
import Button from "../Button";

export interface OrderTableProps {
  orders: Order[];
  onViewDetails: (id: number) => Promise<void>;
  onUpdateStatus: (id: number) => Promise<void>;
  onDelete: (order: Order) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  onViewDetails,
  onUpdateStatus,
  onDelete,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-700 bg-[#121212] shadow-md">
      <table className="min-w-full text-sm text-white">
        <thead className="bg-[#1f1f1f] text-xs uppercase">
          <tr>
            <th className="px-6 py-3 text-left">Order ID</th>
            <th className="px-6 py-3 text-left">Customer</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Mobile</th>
            <th className="px-6 py-3 text-left">Total</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b border-gray-700 hover:bg-[#1e1e1e] transition">
              <td className="px-6 py-4">{order.id}</td>
              <td className="px-6 py-4">{order.customerName}</td>
              <td className="px-6 py-4">{order.email}</td>
              <td className="px-6 py-4">{order.mobileNumber}</td>
              <td className="px-6 py-4">₹{order.totalAmount}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${
                    order.status === "Pending"
                      ? "bg-yellow-600 text-white"
                      : order.status === "Processing"
                      ? "bg-blue-600 text-white"
                      : order.status === "Completed"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => onViewDetails(order.id)}>
                  View
                </Button>
                <Button size="sm" variant="primary" onClick={() => onUpdateStatus(order.id)}>
                  Update Status
                </Button>
                <Button size="sm" variant="danger" onClick={() => onDelete(order)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-4 border-t border-gray-700">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-white">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default OrderTable;
