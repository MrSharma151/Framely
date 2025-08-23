# 🚀 Framely Azure Deployment Branch

This branch consolidates the deployment workflows and infrastructure configuration for the entire Framely platform. It includes:

- **Framely Customer Frontend** – Next.js app hosted on Azure Static Web Apps  
- **Framely Admin Frontend** – Next.js app hosted on Azure Static Web Apps  
- **Framely Backend API** – ASP.NET Core app hosted on Azure App Service (Linux)

Each deployable is isolated with its own CI/CD pipeline, secrets, and cloud resource tagging strategy.

---

## 🧱 Architecture Overview

| Deployable           | Framework        | Hosting Type            | Azure Resource              | Workflow File                                      |
|----------------------|------------------|--------------------------|-----------------------------|----------------------------------------------------|
| Framely Customer     | Next.js          | Azure Static Web App     | `framely`          | `.github/workflows/framely-customer-deploy.yml`   |
| Framely Admin        | Next.js          | Azure Static Web App     | `framely-admin`         | `.github/workflows/framely-admin-deploy.yml`      |
| Framely Backend API  | ASP.NET Core 9.0 | Azure App Service (Linux)| `framely-backend`       | `.github/workflows/azure-deploy.yml`              |

---

## 🔐 Secrets & Security

All secrets are stored securely in GitHub Actions and scoped per deployable:

- `AZURE_STATIC_WEB_APPS_API_TOKEN_CUSTOMER` – Customer frontend deploy token  
- `AZURE_STATIC_WEB_APPS_API_TOKEN_ADMIN` – Admin frontend deploy token  
- `AZURE_CREDENTIALS` – Azure CLI credentials for backend deployment  

Security hygiene includes:

- No hardcoded secrets in the repo  
- Secrets injected via GitHub Actions only  
- CI/CD workflows enforce secret usage and modular separation

---

## ⚙️ CI/CD Workflows

Each deployable has its own workflow file with backend-grade commenting and modular clarity.

### Common Traits

- Triggered on push to `azure-deployment` branch  
- Scoped `paths:` filters to avoid cross-triggering  
- Uses GitHub Actions with secure tokens  
- Steps include:
  - Checkout repo  
  - Install dependencies  
  - Build app  
  - Deploy to Azure

### Workflow Directory

```bash
Framely/
└── .github/
    └── workflows/
        ├── framely-customer-deploy.yml
        ├── framely-admin-deploy.yml
        └── azure-deploy.yml
```

---

## 📦 Hosting & Infrastructure

### Frontend (Customer & Admin)

- Hosted via **Azure Static Web Apps**  
- GitHub-integrated CI/CD  
- Deployment tokens scoped per app  
- SSR retained for LCP optimization and dynamic rendering  
- Image optimization via `next/image` and CDN-ready config  
- Tagged for cost center, environment, and ownership

### Backend (API)

- Hosted via **Azure App Service (Linux)**  
- Published as **self-contained .NET 9.0 app** targeting `linux-x64`  
- Deployment via Azure CLI login (`AZURE_CREDENTIALS`)  
- Modular config with environment toggles and secret injection  
- Tagged for service type, environment, and ownership

---

## 🧼 Config Hygiene

### Frontend (`next.config.ts`)

- Inferred typing for compatibility  
- Enabled:
  - `reactStrictMode`  
  - `trailingSlash`  
  - `styledComponents` compiler toggle  
  - `swcMinify` for build performance  
- SSR retained for dynamic rendering  
- CDN optimization deferred to blob/image integration

### Backend (`Framely.API`, `Framely.Core`, `Framely.Infrastructure`)

- Self-contained publish profile  
- Modular environment config  
- Secure token injection via Azure App Settings  
- Separation of concerns across API, Core logic, and Infrastructure

---

## 📁 Folder Structure

```bash
Framely/
├── .github/
│   └── workflows/
│       ├── framely-customer-deploy.yml
│       ├── framely-admin-deploy.yml
│       └── azure-deploy.yml
├── frontend/
│   ├── framely-customer/
│   │   ├── public/
│   │   ├── src/
│   │   └── next.config.ts
│   ├── framely-admin/
│   │   ├── public/
│   │   ├── src/
│   │   └── next.config.ts
├── backend/
│   ├── Framely.API/
│   ├── Framely.Core/
│   └── Framely.Infrastructure/
```

---

## 📊 Cloud Tagging Strategy

Each Azure resource is tagged with:

- `env`: `production`  
- `owner`: `framely-core`  
- `cost-center`: `frontend` / `backend`  
- `deployable`: `framely` / `framely-admin` / `framely-backend`

This ensures traceability, cost attribution, and environment clarity across cloud dashboards.

---

## 🧠 Summary

This branch reflects:

- Modular CI/CD pipelines for each deployable  
- Secure secret handling and cloud-native deployment  
- Typed config and SSR optimization for frontend apps  
- Self-contained backend deployment with layered architecture  
- Audit-ready tagging and onboarding clarity across the repo

Every deployable is treated as a production-grade surface, with isolated workflows, scoped secrets, and scalable cloud infrastructure.


