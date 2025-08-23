## 🚀 Deployment Overview (Framely Customer Frontend)

This branch focuses on **deployment hygiene**, **CI/CD modularity**, and **cloud auditability** for the Framely Customer Frontend.

---

### 📦 Hosting & Infrastructure

- **Azure Static Web App**  
  - Hosted via Azure SWA resource (`framely-customer`)
  - Connected to GitHub for automated deployment
  - Deployment token stored securely in GitHub secrets (`AZURE_STATIC_WEB_APPS_API_TOKEN_CUSTOMER`)
  - Resource tagged for cost, ownership, and environment clarity

---

### 🔐 Secrets & Security

- **GitHub Secrets Used**
  - `AZURE_STATIC_WEB_APPS_API_TOKEN_CUSTOMER` – for Azure deployment
  - All secrets are modular and scoped per deployable
- **No hardcoded secrets** in repo — enforced via code review and hygiene checks

---

### ⚙️ CI/CD Workflow

- **Workflow File**: `Framely/.github/workflows/framely-customer-deploy.yml`
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

---

### 📁 Folder Structure (Deployment-Relevant)

```bash
Framely/
├── .github/
│   └── workflows/
│       └── framely-customer-deploy.yml
├── frontend/
│   └── framely-customer/
│       ├── public/
│       ├── src/
│       ├── next.config.ts
│       └── README.md  
```


