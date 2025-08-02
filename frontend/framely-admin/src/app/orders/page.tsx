"use client";

import React, { useEffect, useState } from "react";
import {
  getPaginatedOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  Order,
  OrderStatus, // ✅ Enum-type for strict typing
} from "@/services/OrderService";

import OrderFilters from "@/components/ui/orders/OrderFilters";
import OrderTable from "@/components/ui/orders/OrderTable";
import OrderDetailsModal from "@/components/ui/orders/OrderDetailsModal";
import OrderStatusUpdateModal from "@/components/ui/orders/OrderStatusUpdateModal";
import OrderDeleteConfirmationModal from "@/components/ui/orders/OrderDeleteConfirmationModal";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | undefined>();

  const fetchOrders = async () => {
    const response = await getPaginatedOrders(
      page,
      pageSize,
      "orderDate",
      "desc",
      statusFilter
    );
    if (response) {
      setOrders(response.data);
      setTotalPages(response.totalPages);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter]);

  const handleViewDetails = async (id: number) => {
    const order = await getOrderById(id);
    if (order) {
      setSelectedOrder(order);
      setIsDetailsModalOpen(true);
    }
  };

  const handleStatusUpdate = async (id: number) => {
    const order = await getOrderById(id);
    if (order) {
      setSelectedOrder(order);
      setIsStatusModalOpen(true);
    }
  };

  const handleDeleteClick = (order: Order) => {
    setSelectedOrder(order);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmStatusUpdate = async (newStatus: OrderStatus) => {
    if (!selectedOrder) return;
    const success = await updateOrderStatus(selectedOrder.id, newStatus);
    if (success) {
      fetchOrders();
      setIsStatusModalOpen(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedOrder) return;
    const success = await deleteOrder(selectedOrder.id);
    if (success) {
      fetchOrders();
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="container-wrapper py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Manage Orders</h1>
      </div>

      <OrderFilters
        statusFilter={statusFilter}
        onStatusChange={(status: OrderStatus) => {
          setPage(1);
          setStatusFilter(status);
        }}
      />

      <OrderTable
        orders={orders}
        onViewDetails={handleViewDetails}
        onUpdateStatus={handleStatusUpdate}
        onDelete={handleDeleteClick}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage: number) => setPage(newPage)}
      />

      {/* ✅ Modals */}
      {selectedOrder && (
        <>
          <OrderDetailsModal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            order={selectedOrder}
          />

          <OrderStatusUpdateModal
            isOpen={isStatusModalOpen}
            onClose={() => setIsStatusModalOpen(false)}
            currentStatus={selectedOrder.status}
            onConfirm={handleConfirmStatusUpdate}
          />

          <OrderDeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </div>
  );
};

export default OrdersPage;
