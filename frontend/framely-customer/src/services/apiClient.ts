// src/services/apiClient.ts
import axios from "axios";

// ✅ Create a single axios instance
const apiClient = axios.create({
  baseURL: "https://localhost:7178/api/v1", // ✅ Base URL ek hi jagah define
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ OPTIONAL: Attach token automatically if exists
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ✅ OPTIONAL: Handle common errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    // Example: If token expired → auto logout
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
