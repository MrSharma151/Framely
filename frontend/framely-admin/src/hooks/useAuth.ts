import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

/**
 * useAuth is a custom hook that provides access to authentication context.
 * It ensures that the hook is used within a valid <AuthProvider /> wrapper.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Throw an error if the hook is used outside the AuthProvider
  if (!context) {
    throw new Error("useAuth must be used within an <AuthProvider />.");
  }

  // Return the authentication context (user, token, login, logout, etc.)
  return context;
};