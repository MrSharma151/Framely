# 👓 Framely – Optical E-commerce Platform

Framely is a modern **optical e-commerce solution** for browsing, managing, and selling eyewear products including **glasses, sunglasses, and contact lenses**.
It consists of a **shared ASP.NET Core backend**, a **customer storefront**, and an **admin dashboard** – all deployed on **Azure with CI/CD pipelines**.

---

## 🧩 Architecture Overview

| Layer                 | Framework / Tools        | Hosting (Azure)              |
| --------------------- | ------------------------ | ---------------------------- |
| **Backend API**       | ASP.NET Core 9.0 Web API | Azure App Service (Linux)    |
| **Customer Frontend** | Next.js (TypeScript)     | Azure Static Web Apps        |
| **Admin Frontend**    | Next.js (TypeScript)     | Azure Static Web Apps        |
| **Database**          | SQL Server               | Azure SQL / Managed Instance |
| **Blob Storage**      | Azure Storage Account    | Product Images & Assets      |
| **Monitoring**        | Application Insights     | Telemetry & Logs             |

---

## 🚀 Live Deployment

* **Customer Storefront** 👉 [Framely Customer](https://orange-wave-06841fe00.1.azurestaticapps.net/)
* **Admin Dashboard** 👉 [Framely Admin](https://gentle-glacier-044690e00.1.azurestaticapps.net/)
  ⚠️ Accessible **only with valid admin credentials**

---

## 📌 Project Status

### 1️⃣ Backend – ASP.NET Core Web API (✅ MVP Complete)

* ✔ Products, Categories, Orders APIs
* ✔ JWT Auth + Role-based Authorization
* ✔ Pagination, Filtering, Sorting, Search
* ✔ EF Core migrations + SQL Server
* ✔ Swagger API docs
* 🔄 Next: User Management, Payment Services

**Blob Endpoints (for product images):**

```http
POST   /Blob/upload      # Uploads image → returns public URL
DELETE /Blob/{fileName}  # Deletes image by filename
```

---

### 2️⃣ Customer Frontend – Next.js Storefront (✅ MVP Complete)

* ✔ Product browsing, filtering, searching, sorting
* ✔ Product details page (with fallback image + category view)
* ✔ Cart + checkout flow
* ✔ My Orders page (with IST timestamps + status badges)
* ✔ Cancel option for pending orders
* ✔ Toast notifications
* 🔄 Next: Payment flow integration

📄 Detailed guide → `frontend/framely-customer/README.md`

---

### 3️⃣ Admin Frontend – Next.js Dashboard (✅ MVP Complete)

* ✔ Glassmorphic responsive dashboard
* ✔ CRUD for Products & Categories
* ✔ Order management (view, update status, cancel)
* ✔ Search, filter, pagination
* ✔ Image uploads via **Blob APIs**
* ✔ Revenue & orders overview
* 🔄 Next: Advanced analytics + role-based access

📄 Detailed guide → `frontend/framely-admin/README.md`

---

## ⚙️ Deployment & CI/CD

Branch **`azure-deployment`** → triggers **automatic deployments** on push.

### 🔐 GitHub → Azure Secrets

* `AZURE_STATIC_WEB_APPS_API_TOKEN_CUSTOMER` → Customer deploy token
* `AZURE_STATIC_WEB_APPS_API_TOKEN_ADMIN` → Admin deploy token
* `AZURE_CREDENTIALS` → Backend App Service credentials

### 🌐 GitHub Workflows

* `.github/workflows/framely-customer-deploy.yml` → Customer Storefront
* `.github/workflows/framely-admin-deploy.yml` → Admin Dashboard
* `.github/workflows/azure-deploy.yml` → Backend API

📦 **Hosting Summary**

* **Customer + Admin Frontends** → Azure Static Web Apps (SSR enabled for SEO & LCP)
* **Backend API** → Azure App Service (Linux, self-contained publish)
* **Database** → Azure SQL
* **Storage** → Azure Blob Storage (images)
* **Monitoring** → Application Insights

---

## ☁️ Azure Resources in Use

| Resource                     | Type                 | Purpose                         |
| ---------------------------- | -------------------- | ------------------------------- |
| **framely**                  | Static Web App       | Customer storefront             |
| **framely-admin**            | Static Web App       | Admin dashboard                 |
| **framely-app-service-plan** | App Service Plan     | Backend hosting plan            |
| **framely-backend**          | App Service (Linux)  | ASP.NET Core backend API        |
| **framely-backend (AI)**     | Application Insights | Monitoring & telemetry          |
| **framely-db**               | SQL Database         | Persistent relational data      |
| **framely-sql-server**       | SQL Server           | Database server instance        |
| **framelystorage**           | Storage Account      | Blob storage for product images |

---

## 📂 Repository Structure

```bash
Framely/
├── backend/
│   ├── Framely.API/            # ASP.NET Core Web API
│   ├── Framely.Core/           # Domain logic
│   └── Framely.Infrastructure/ # EF Core + persistence
├── frontend/
│   ├── framely-customer/       # Next.js storefront
│   └── framely-admin/          # Next.js admin dashboard
├── .github/
│   └── workflows/              # CI/CD pipelines
```

---

## 🛠 Running Locally

```bash
# Clone repo
git clone <repo-url>
cd Framely

# Backend
cd backend/Framely.API
dotnet run

# Customer Frontend
cd frontend/framely-customer
npm install
npm run dev

# Admin Frontend
cd frontend/framely-admin
npm install
npm run dev
```

---

## 📊 Roadmap

* ✅ Phase 1: Backend + Customer MVP
* ✅ Phase 2: Admin MVP
* ✅ Phase 3: Azure Deployment (CI/CD enabled)
* 🔜 Phase 4: Payments, Analytics, Advanced RBAC

---

## 👨‍💻 Author

**Rohit Sharma**
📩 [rhs.rohitsharma@gmail.com](mailto:rhs.rohitsharma@gmail.com)

---

