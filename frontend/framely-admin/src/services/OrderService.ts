import apiClient from "./apiClient";
import { toast } from "react-hot-toast";

// ✅ Strict Order Status Type
export type OrderStatus = "Pending" | "Processing" | "Completed" | "Cancelled";

// 🧾 Order Interfaces
export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  orderId: number;
}

export interface Order {
  id: number;
  orderDate: string;
  customerName: string;
  email: string;
  mobileNumber: string;
  address: string;
  totalAmount: number;
  status: OrderStatus; // ✅ updated
  userId?: string;
  items: OrderItem[];
}

export interface PaginatedOrderResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  data: Order[];
}

// ✅ 1. Get paginated orders
export const getPaginatedOrders = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  sortBy: string = "date",
  sortOrder: "asc" | "desc" = "desc",
  status?: OrderStatus // ✅ updated to match strict type
): Promise<PaginatedOrderResponse | null> => {
  try {
    const params: any = {
      pageNumber,
      pageSize,
      sortBy,
      sortOrder,
    };

    if (status) {
      params.status = status;
    }

    const response = await apiClient.get("/Orders", { params });
    return response.data ?? null;
  } catch (error: any) {
    toast.error("Failed to fetch orders");
    console.error("❌ Error in getPaginatedOrders:", error);
    return null;
  }
};

// ✅ 2. Get single order by ID
export const getOrderById = async (id: number): Promise<Order | null> => {
  try {
    const response = await apiClient.get(`/Orders/${id}`);
    return response.data ?? null;
  } catch (error: any) {
    toast.error("Failed to fetch order details");
    console.error(`❌ Error in getOrderById(${id}):`, error);
    return null;
  }
};

// ✅ 3. Update order status
export const updateOrderStatus = async (id: number, newStatus: OrderStatus): Promise<boolean> => {
  try {
    await apiClient.put(`/Orders/${id}/status?newStatus=${newStatus}`);
    toast.success("Order status updated successfully");
    return true;
  } catch (error: any) {
    toast.error("Failed to update order status");
    console.error("❌ Error in updateOrderStatus:", error);
    return false;
  }
};


// ✅ 4. Delete order
export const deleteOrder = async (id: number): Promise<boolean> => {
  try {
    await apiClient.delete(`/Orders/${id}`);
    toast.success("Order deleted");
    return true;
  } catch (error: any) {
    toast.error("Failed to delete order");
    console.error(`❌ Error in deleteOrder(${id}):`, error);
    return false;
  }
};

// ✅ 5. Get orders by user ID
export const getOrdersByUserId = async (
  userId: string
): Promise<Order[]> => {
  try {
    const response = await apiClient.get(`/Orders/user/${userId}`);
    return response.data ?? [];
  } catch (error: any) {
    toast.error("Failed to fetch orders for user");
    console.error(`❌ Error in getOrdersByUserId(${userId}):`, error);
    return [];
  }
};
