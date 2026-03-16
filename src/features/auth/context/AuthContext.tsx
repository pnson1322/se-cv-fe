"use client";

import { createContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { AuthContextValue, AuthUser } from "../types/auth.types";
import {
  clearAuthStorage,
  getAccessToken,
  getAuthUser,
  setAccessToken,
  setAuthUser,
  setRefreshToken,
} from "../lib/auth-storage";

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(() => getAuthUser());
  const [accessToken, setAccessTokenState] = useState<string | null>(() =>
    getAccessToken(),
  );
  const [isLoading, setIsLoading] = useState(false);

  const login: AuthContextValue["login"] = ({
    user,
    accessToken,
    refreshToken,
  }) => {
    setAuthUser(user);
    setAccessToken(accessToken);

    if (refreshToken) {
      setRefreshToken(refreshToken);
    }

    setUser(user);
    setAccessTokenState(accessToken);
  };

  const logout = () => {
    clearAuthStorage();
    setUser(null);
    setAccessTokenState(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(user && accessToken),
      isLoading,
      login,
      logout,
    }),
    [user, accessToken, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
