// src/context/AuthContext.tsx
"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

/**
 * Interface for the login API response payload.
 */
interface AuthResponseDto {
  userId: string;
  fullName: string;
  email: string;
  role: "ADMIN"; // Restrict only ADMIN for now
  token: string;
  expiresAt: string;
  refreshToken: string | null;
}

/**
 * Interface for the user data stored locally in state and localStorage.
 */
interface User {
  userId: string;
  fullName: string;
  email: string;
  role: "ADMIN";
  expiresAt: string;
  refreshToken: string | null;
}

/**
 * Shape of the authentication context.
 */
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (authData: AuthResponseDto) => void;
  logout: () => void;
  hydrated: boolean;
  error: string | null;
}

// Create AuthContext with undefined initial value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Props accepted by the AuthProvider component.
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provides authentication state and actions to all children via context.
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load user and token from localStorage when app starts.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        const parsedUser: User = JSON.parse(savedUser);

        // Restore session only if user is an admin
        if (parsedUser.role === "ADMIN") {
          setToken(savedToken);
          setUser(parsedUser);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("❌ Failed to parse stored user:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setHydrated(true);
  }, []);

  /**
   * Handles login by saving user/token and validating role.
   */
  const login = (authData: AuthResponseDto) => {
    if (authData.role !== "ADMIN") {
      setError("Only Admin users are allowed to login.");
      return;
    }

    const { token, ...userData } = authData;

    setToken(token);
    setUser(userData);
    setError(null);

    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  /**
   * Clears session state and localStorage.
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    setError(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  /**
   * Provide context values to all children.
   */
  return (
    <AuthContext.Provider value={{ user, token, login, logout, hydrated, error }}>
      {children}
    </AuthContext.Provider>
  );
};
