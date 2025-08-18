# 👓 Framely – Optical E-commerce Web Application

Framely is a modern **optical e-commerce platform** designed for browsing, managing, and selling eyewear products including **glasses, sunglasses, and contact lenses**.

### 🧩 Architecture Overview
- **Backend:** ASP.NET Core Web API – Core APIs & business logic
- **Customer Frontend:** Next.js – User-facing storefront
- **Admin Panel:** Next.js – Admin dashboard for product & order management

> ✅ All core modules are now MVP complete. Next up:  Deployment.

---

## 🚀 Project Status

### 1️⃣ Backend – ASP.NET Core Web API (✅ MVP Complete)

**Implemented Features:**
- ✔ Product, Category, and Order APIs
- ✔ DTOs with AutoMapper integration
- ✔ JWT Authentication + Role-based Authorization
- ✔ Pagination, Sorting, Filtering, and Searching
- ✔ Basic validations & error handling
- ✔ EF Core with migrations
- ✔ Swagger API docs + partial testing

**Post-MVP Enhancements:**
- 🔄 Advanced validations & consistent error structure
- 🔄 Unified response wrapping
- 🔄 Unit & integration test coverage

---

### 2️⃣ Customer Frontend – Next.js + TailwindCSS (✅ MVP Complete)

**Key Features:**
- ✔ App Router setup with Tailwind styling
- ✔ Auth-aware routing (redirects unauthenticated users)
- ✔ Shop Page
  - Server-side pagination (10 items/page)
  - Category-based filtering
  - Client-side search & sort (Low→High, High→Low)
- ✔ Product Details Page (fallback image + category display)
- ✔ My Orders Page
  - Displays user orders with IST timestamps
  - Status badges: `Pending`, `Processing`, `Completed`, `Cancelled`
  - Cancel option for pending orders
- ✔ Minimal cart & checkout flow
- ✔ Toast notifications for feedback

📄 See detailed customer README in `framely-customer/README.md`

---

### 3️⃣ Admin Panel – Next.js + TailwindCSS (✅ MVP Complete)

**Highlights:**
- 💎 Fully responsive glassmorphic dashboard
- ✔ CRUD for Products & Categories
- ✔ Order management: view, update status, cancel
- ✔ Role-based user access
- ✔ Search, filter, and pagination
- ✔ Modals for Add/Edit/Delete actions
- ✔ Notifications via `react-hot-toast`
- ✔ Basic revenue & order charts

📁 This is a separate Next.js app (`framely-admin`) consuming shared backend APIs.

---

## 🗺️ Roadmap

✅ **Phase 1:** Backend + Customer Frontend MVP  
✅ **Phase 2:** Admin Panel MVP  
✅ **Phase 3:** Deployment

🎯 Deployment Plan:
- Host framely-backend on **Azure App Service**
- Deploy both frontends (`framely-customer`, `framely-admin`) on Azure
- Configure environment variables (API URLs, JWT secrets)
- Enable HTTPS, optimize images, and apply production caching

---

## 🧰 Tech Stack

| Layer        | Technologies                                      |
|--------------|---------------------------------------------------|
| Backend      | ASP.NET Core Web API, EF Core, AutoMapper, JWT    |
| Frontend     | Next.js (TypeScript), Tailwind CSS                |
| Database     | SQL Server                                        |
| Deployment   | Azure App Service                                 |

---

## 📦 MVP Scope

- ✅ Users can browse, search, sort, and filter products
- ✅ Authenticated users can place orders and view history
- ✅ Orders show IST timestamps and allow cancellation if pending
- ✅ Admins can manage products, categories, and orders
- ✅ Backend supports pagination, filtering, sorting, and search

> Framely is now deployment-ready at MVP level.

---

## 👨‍💻 Author

**Rohit Sharma**  
rhs.rohitsharma@gmail.com

---

## 📩 Notes

This project is actively evolving. All core modules—Backend, Customer Frontend, and Admin Panel—are MVP complete and ready for deployment.

Next steps include:
- 💳 Payment flow simulation
- ⚙️ CI/CD pipeline experimentation
- 📊 Advanced analytics & reporting

Stay tuned for updates 🚀

---

## 🛠 Running Locally

```bash
# Clone repository
git clone <repo-url>

# Run Customer Frontend
cd framely-customer
npm install
npm run dev

# Run Admin Panel
cd framely-admin
npm install
npm run dev
```

---


