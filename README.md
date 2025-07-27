# 👓 Framely – Optical E-commerce Web Application  

Framely is an **optical e-commerce platform** for browsing, managing, and selling eyewear products like **glasses, sunglasses, and contact lenses**.  

It consists of:  
- **Backend (ASP.NET Core Web API)** – Core APIs & business logic  
- **Framely Customer Frontend (Next.js)** – User-facing storefront  
- **Framely Admin Panel (Upcoming)** – Admin dashboard for product & order management  

---

## ✅ Current Project Status  

### 1️⃣ Backend (ASP.NET Core Web API) – ✅ MVP Ready  

- ✔ **Product, Category, and Order APIs** created  
- ✔ **DTOs & AutoMapper** integrated  
- ✔ **JWT Authentication + Role-based Authorization**  
- ✔ **Pagination, Sorting, Filtering, and Searching** for products  
- ✔ **Basic validations & error handling** added  
- ✔ **EF Core with migrations** applied  
- ✔ **Swagger API documentation** + partial testing  

**Areas of improvement:**  
- 🔄 Advanced validations & deeper error standardization  
- 🔄 Response wrapping for consistent API responses  
- 🔄 Unit & integration testing  

---

### 2️⃣ Framely Customer Frontend (Next.js + Tailwind) – ✅ MVP Completed  

- ✔ **Next.js App Router setup** with TailwindCSS styling  
- ✔ **Authentication-aware pages** (redirects to login if unauthenticated)  
- ✔ **Shop Page**  
  - Backend-driven **pagination** (10 items per page)  
  - **Category filter** (fetches products by category name)  
  - **Client-side search & sort** (Low→High, High→Low pricing)  
- ✔ **Product Details Page** (with fallback image & category)  
- ✔ **My Orders Page**  
  - Fetch logged-in user orders  
  - Show **order date in IST** (converted from backend UTC)  
  - Status badges (`Pending`, `Processing`, `Completed`, `Cancelled`)  
  - Cancel button for pending orders  
- ✔ **Minimal cart & checkout flow (MVP)**  
- ✔ **Toast notifications** for success/error  

📄 **Detailed Framely Customer README available in `framely-customer/README.md`**  

---

### 3️⃣ Framely Admin Panel – 🚧 Next in Progress  

Next major focus will be building the **Admin Dashboard** for managing:  
- Products & Categories (CRUD)  
- Orders (view, update status, cancel)  
- User management (role-based access)  

This will be a **separate Next.js app (`framely-admin`)** consuming the same backend APIs.  

---

## 🔄 Overall Roadmap  

✅ **Phase 1:** Backend MVP + Customer Frontend MVP – **DONE**  
✅ Basic product listing, category filtering, and order placement working  

🚧 **Phase 2:** Framely Admin Panel (Next.js + Tailwind + Charts) – **NEXT**  
🚧 Add advanced validations, error handling & testing in backend  
🚧 Improve UI/UX with better animations, image optimizations, and infinite scroll  

🎯 **Phase 3:** Deployment on **Azure App Service + Azure SQL Database**  

---

## 🛠 Tech Stack  

- **Backend:** ASP.NET Core Web API, EF Core, AutoMapper, JWT  
- **Frontend (Customer):** Next.js (TypeScript), Tailwind CSS  
- **Frontend (Admin):** Next.js (TypeScript) [Planned]  
- **Database:** SQL Server  
- **Deployment (Planned):** Azure  

---

## 📌 Current MVP Scope  

✅ Users can **browse products**, filter by categories, search & sort  
✅ Authenticated users can **place orders & view their order history**  
✅ Orders show **IST timestamps** and allow **cancellation if pending**  
✅ Backend supports **pagination, filtering, sorting, searching**  

This is an **MVP**, not production-ready yet. Future phases will add:  
- Infinite scroll, improved checkout, payment gateway integration  
- Admin dashboard for full e-commerce management  
- Complete CI/CD deployment  

---

## 👨‍💻 Author  

**Rohit Sharma**  

---

## 📩 Notes  

This project is actively evolving. The **customer-facing frontend (framely-customer)** is **MVP complete**, and now development will shift towards **framely-admin** for product & order management.  

Stay tuned for updates 🚀
