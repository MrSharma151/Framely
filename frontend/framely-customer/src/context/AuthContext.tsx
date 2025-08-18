"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

/**
 * ✅ Backend AuthResponseDto (exactly what your API returns)
 */
export interface AuthResponseDto {
  userId: string;
  fullName: string;
  email: string;
  role: string;
  token: string; // JWT Access Token
  expiresAt: string; // ISO string e.g. "2025-07-26T07:41:36Z"
  refreshToken?: string | null;
}

/**
 * ✅ User object stored in Context (everything except token)
 */
export interface User {
  userId: string;
  fullName: string;
  email: string;
  role: string;
  expiresAt: string;
  refreshToken?: string | null;
}

/**
 * ✅ AuthContext type
 */
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (authData: AuthResponseDto) => void;
  logout: () => void;
  hydrated: boolean; // ✅ tells if localStorage was checked
}

/**
 * ✅ Create AuthContext
 */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

/**
 * ✅ Provider Props
 */
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false); // ✅ hydration flag

  /**
   * ✅ Load auth state from localStorage on app start
   */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }

      // ✅ Mark hydration complete
      setHydrated(true);
    }
  }, []);

  /**
   * ✅ Login → Save token & user
   */
  const login = (authData: AuthResponseDto) => {
    const { token, ...userData } = authData;

    setToken(token);
    setUser(userData);

    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  /**
   * ✅ Logout → Clear token & user
   */
  const logout = () => {
    setToken(null);
    setUser(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, hydrated }}>
      {children} {/* ✅ Always render children immediately */}
    </AuthContext.Provider>
  );
};
