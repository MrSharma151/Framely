import axios from "axios";

// Create a centralized axios instance for all API requests
const apiClient = axios.create({
  baseURL: "https://localhost:7178/api/v1", // Base URL for your backend API
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach the JWT token from localStorage (if it exists)
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Global response interceptor to handle API errors consistently
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    console.error("API Error:", message);

    // If token is invalid or expired, clear local storage and redirect to login
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
