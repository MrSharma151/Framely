// src/services/authService.ts
import apiClient from "./apiClient";

/**
 * Payload sent during login request.
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Interface representing the response received after successful login.
 */
export interface AuthResponse {
  userId: string;
  fullName: string;
  email: string;
  role: "ADMIN"; // Adjust if more roles are added in future
  token: string;
  expiresAt: string;
  refreshToken: string | null;
}

/**
 * Sends login request to the API and returns the full user authentication data.
 * Stores the token and user info locally if needed (optional - usually handled in AuthContext).
 */
export const loginUser = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/Auth/login", data);
  return response.data;
};

/**
 * Clears stored token and user data from local storage and redirects to login page.
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/auth/login";
};
