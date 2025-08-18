# 👓 Framely Admin Dashboard (MVP)

Framely Admin is a **premium admin dashboard** for managing the Framely eyewear store.  
Admins can **manage categories, products, and orders**, and monitor overall data.  
This is the **Admin Frontend (MVP level)** built with **Next.js (App Router) + TypeScript + Tailwind CSS**.

---

## 📌 Tech Stack

- **Next.js 14+ (App Router)** – Modern React framework  
- **TypeScript** – Strict type safety  
- **TailwindCSS** – Utility-first styling  
- **Lucide-react** – Icon library  
- **Axios** – For API calls (`apiClient.ts`)  
- **react-hot-toast** – User-friendly notifications  
- **Global Dark Premium Theme** – Using CSS variables & glassmorphism  
- **Protected Routes** – Redirect to login if unauthenticated  

---

## ✅ Features Implemented (MVP Level)

- ✅ **Dashboard**
  - Overview of orders, revenue, and quick stats (charts optional)
  - Uses reusable **Card** and **Table** components

- ✅ **Categories Page**
  - Add, edit, search, delete categories
  - Glassmorphic tables and modals
  - Fully responsive

- ✅ **Products Page**
  - CRUD operations on products
  - Filter by category and brand
  - Image upload & preview
  - Pagination & search

- ✅ **Orders Page**
  - View all orders with pagination
  - Update order status (`Pending`, `Processing`, `Completed`, `Cancelled`)
  - View order details in modal
  - Delete orders (if required)

- ✅ **Reusable Components**
  - **Buttons**, **Cards**, **Tables**, **Modals**
  - Search bars and filters
  - Smooth transitions and hover effects

- ✅ **Notifications**
  - Success and error messages using **react-hot-toast**

---

## 🌐 Backend API Integration

- **Base API URL** is configured in `apiClient.ts`

- **Category APIs**
  - `/Categories` → Get all categories
  - `/Categories` [POST] → Add category
  - `/Categories/{id}` [PUT] → Update category
  - `/Categories/{id}` [DELETE] → Delete category

- **Product APIs**
  - `/Products` → Get all products
  - `/Products/{id}` → Get product details
  - `/Products` [POST] → Add product
  - `/Products/{id}` [PUT] → Update product
  - `/Products/{id}` [DELETE] → Delete product
  - `/Products/category?name=` → Filter by category
  - `/Products/brand?name=` → Filter by brand
  - `/Products/search?term=` → Search products

- **Order APIs**
  - `/Orders` → Get paginated orders
  - `/Orders/{id}` → Get order by ID
  - `/Orders/{id}/status` [PUT] → Update order status
  - `/Orders/{id}` [DELETE] → Delete order

**Pagination Response Example:**

```json
{
  "totalItems": 120,
  "totalPages": 12,
  "currentPage": 1,
  "pageSize": 10,
  "data": [
    {
      "id": 1,
      "userId": 101,
      "totalPrice": 4999,
      "status": "Pending",
      "items": [
        { "productId": 1, "name": "Premium Aviator", "quantity": 2, "price": 1999 }
      ]
    }
  ]
}
