import apiClient from "./apiClient";
import Cookies from "js-cookie";

// ✅ Login credentials payload
export interface LoginPayload {
  email: string;
  password: string;
}

// ✅ Auth response from backend
export interface AuthResponse {
  userId: string;
  fullName: string;
  email: string;
  role: "ADMIN";
  token: string;
  expiresAt: string;
  refreshToken: string | null;
}

/**
 * ✅ Sends login request to the API and returns the full authentication response.
 */
export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/Auth/login", data);
  return response.data;
};

/**
 * ✅ Clears JWT token and user data from cookies and redirects to login page.
 */
export const logoutUser = () => {
  Cookies.remove("token");
  Cookies.remove("user");

  // Optional: Add delay for toast to show if needed
  setTimeout(() => {
    window.location.href = "/auth/login";
  }, 300);
};
