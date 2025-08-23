## 🚀 Deployment Overview (Framely Admin Frontend)

This branch focuses on **deployment hygiene**, **CI/CD modularity**, and **cloud auditability** for the Framely Admin Frontend.

---

### 📦 Hosting & Infrastructure

- **Azure Static Web App**  
  - Hosted via Azure SWA resource (`framely-admin-app`)  
  - Connected to GitHub for automated deployment  
  - Deployment token stored securely in GitHub secrets (`AZURE_STATIC_WEB_APPS_API_TOKEN_ADMIN`)  
  - Resource tagged for cost, ownership, and environment clarity

---

### 🔐 Secrets & Security

- **GitHub Secrets Used**  
  - `AZURE_STATIC_WEB_APPS_API_TOKEN_ADMIN` – for Azure deployment  
  - All secrets are modular and scoped per deployable  
- **No hardcoded secrets** in repo — enforced via code review and hygiene checks

---

### ⚙️ CI/CD Workflow

- **Workflow File**: `Framely/.github/workflows/framely-admin-deploy.yml`  
- **Modular Structure**  
  - Separate workflow per deployable (`framely-customer`, `framely-admin`)  
  - Backend-style comments for clarity and onboarding  
- **Trigger**: On push to `azure-deployment` branch  
- **Steps Include**:  
  - Checkout repo  
  - Install dependencies  
  - Build Next.js app  
  - Deploy to Azure Static Web App

---

### 🧼 Config Hygiene

- `next.config.ts` uses inferred typing for compatibility  
- Enabled:  
  - `reactStrictMode`  
  - `trailingSlash`  
  - `styledComponents` compiler toggle  
- SSR retained for LCP and dynamic rendering

---

### 📁 Folder Structure (Deployment-Relevant)

```bash
Framely/
├── .github/
│   └── workflows/
│       └── framely-admin-deploy.yml
├── frontend/
│   └── framely-admin/
│       ├── public/
│       ├── src/
│       ├── next.config.ts
│       └── README.md  
```


