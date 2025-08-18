# 👓 Framely Customer Frontend (MVP)

Framely is an **online eyewear store** where users can browse products, filter by categories, search, place orders, and manage their account.  
This is the **Customer Frontend (MVP level)** built with **Next.js (App Router)**.

---

## 📌 Tech Stack

- **Next.js 14+ (App Router)** – Modern React framework
- **TypeScript** – Strict type safety
- **TailwindCSS** – Utility-first styling
- **Lucide-react** – Icon library
- **Axios** – For API calls (`apiClient.ts`)
- **react-hot-toast** – User-friendly notifications
- **JWT Authentication** – Token stored in `localStorage`
- **Protected Routes** – Redirect to login if unauthenticated

---

## ✅ Features Implemented (MVP Level)

- ✅ **Auth-aware pages**
  - Redirects to `/auth/login` if user not logged in
  - Uses `useAuth()` hook for hydration check

- ✅ **Shop Page**
  - **Backend Pagination** – Shows **10 products per page** with Prev/Next
  - **Category Filter** – Fetches products by category name
  - **Search** – Client-side filtering on loaded products
  - **Sort** – Toggle between `Price Low→High`, `Price High→Low`, or default

- ✅ **Product Details Page**
  - Shows product details fetched from backend
  - Includes fallback image & category name

- ✅ **My Orders Page**
  - Fetches logged-in user's orders
  - **Order Date in IST (converted from backend UTC)**
  - Status badges (`Pending`, `Processing`, `Completed`, `Cancelled`)
  - Cancel button for pending orders
  - Shows ordered items + total price

- ✅ **Cart & Checkout (MVP)**
  - Simple cart management (stored client-side)
  - Basic checkout flow → order placement

- ✅ **Category Filter Component**
  - Displays all categories
  - Allows switching between all products vs. filtered category

- ✅ **Toast Notifications**
  - For errors (e.g., failed API calls)
  - For success (e.g., order cancelled)

---

---

## 🌐 Backend API Integration

- **Base API URL** is configured in `apiClient.ts`
- **Product APIs**
  - `/Products?page=1&pageSize=10&sortBy=name&sortOrder=asc`
  - `/Products/{id}`
  - `/Products/category?name=Men`
  - `/Products/search?term=aviator`
- **Category API**
  - `/Categories` → returns all available categories
- **Order APIs**
  - `/Orders/my` → fetch logged-in user orders
  - `/Orders/{id}/cancel` → cancel pending order

**Pagination Response Structure:**

```json
{
  "totalItems": 43,
  "totalPages": 5,
  "currentPage": 1,
  "pageSize": 10,
  "data": [
    { "id": 1, "name": "Premium Aviator", "price": 1999, "imageUrl": "/img.jpg" }
  ]
}


