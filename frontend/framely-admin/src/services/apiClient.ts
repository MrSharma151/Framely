import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: "https://localhost:7178/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach JWT token from cookies to each request
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Global error handler
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    console.error("❌ API Error:", message);

    // Optional: You can also handle 500, 404, etc. globally here
    if (status === 401 || status === 403) {
      Cookies.remove("token");
      Cookies.remove("user");

      // Use a slight delay to allow UI feedback before redirect
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 500);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
