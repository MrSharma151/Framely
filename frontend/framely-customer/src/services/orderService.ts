import apiClient from "./apiClient";

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
  status: "Pending" | "Completed";
  userId: string;
  items: OrderItem[];
}

// ✅ Fetch current user's orders
export const fetchMyOrders = async (): Promise<Order[]> => {
  const res = await apiClient.get<Order[]>("/Orders/my");
  return res.data;
};

// ✅ Place a new order
export const placeOrder = async (payload: {
  customerName: string;
  email: string;
  mobileNumber: string;
  address: string;
  totalAmount: number;
  items: {
    productId: number;
    quantity: number;
    unitPrice: number;
  }[];
}) => {
  const res = await apiClient.post("/Orders", payload);
  return res.data;
};

// ✅ (Optional) Cancel an order
export const cancelMyOrder  = async (orderId: number) => {
  const res = await apiClient.delete(`/Orders/${orderId}`);
  return res.data;
};
