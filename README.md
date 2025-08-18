## 🚀 Azure Deployment Branch

This branch is dedicated to production deployment via Azure App Service using GitHub Actions.

- CI/CD pipeline is configured via `.github/workflows/azure-deploy.yml`
- Deployment uses **Azure CLI login** with a GitHub secret (`AZURE_CREDENTIALS`) for secure authentication
- The backend is published as a **self-contained .NET 9.0 app** targeting `linux-x64`
- Secrets and credentials are managed securely via **GitHub Actions Secrets**
- Only stable, production-ready code should be pushed here
---
> This setup reflects production-grade CI/CD with modular config, secure secret handling, and cloud-native deployment.  
> Ideal for showcasing backend readiness, cloud integration, and DevOps hygiene.