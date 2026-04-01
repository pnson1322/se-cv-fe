"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { AuthContextValue, AuthUser } from "../types/auth.types";
import {
  clearAuthStorage,
  getAccessToken,
  getAuthUser,
  setAccessToken,
  setAuthUser,
  removeAuthUser,
} from "../lib/auth-storage";

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

type AuthProviderProps = {
  children: ReactNode;
};

type AuthSnapshot = {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
};

const AUTH_STORAGE_EVENT = "auth-storage-change";

const SERVER_SNAPSHOT: AuthSnapshot = {
  user: null,
  accessToken: null,
  isLoading: true,
};

let currentSnapshot: AuthSnapshot = SERVER_SNAPSHOT;

function buildClientSnapshot(): AuthSnapshot {
  return {
    user: getAuthUser(),
    accessToken: getAccessToken(),
    isLoading: false,
  };
}

function areSnapshotsEqual(a: AuthSnapshot, b: AuthSnapshot) {
  return (
    a.isLoading === b.isLoading &&
    a.accessToken === b.accessToken &&
    JSON.stringify(a.user) === JSON.stringify(b.user)
  );
}

function getSnapshot(): AuthSnapshot {
  if (typeof window === "undefined") {
    return SERVER_SNAPSHOT;
  }

  const nextSnapshot = buildClientSnapshot();

  if (!areSnapshotsEqual(currentSnapshot, nextSnapshot)) {
    currentSnapshot = nextSnapshot;
  }

  return currentSnapshot;
}

function getServerSnapshot(): AuthSnapshot {
  return SERVER_SNAPSHOT;
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = () => {
    const nextSnapshot = buildClientSnapshot();

    if (!areSnapshotsEqual(currentSnapshot, nextSnapshot)) {
      currentSnapshot = nextSnapshot;
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleChange);
  window.addEventListener(AUTH_STORAGE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(AUTH_STORAGE_EVENT, handleChange);
  };
}

function emitAuthChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_STORAGE_EVENT));
}

export function AuthProvider({ children }: AuthProviderProps) {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const login = useCallback<AuthContextValue["login"]>(
    ({ user, accessToken }) => {
      setAuthUser(user);
      setAccessToken(accessToken);
      emitAuthChange();
    },
    [],
  );

  const logout = useCallback(() => {
    clearAuthStorage();
    emitAuthChange();
  }, []);

  const setUser = useCallback((user: AuthUser | null) => {
    if (user) {
      setAuthUser(user);
    } else {
      removeAuthUser();
    }

    emitAuthChange();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: snapshot.user,
      accessToken: snapshot.accessToken,
      isAuthenticated: Boolean(snapshot.user && snapshot.accessToken),
      isLoading: snapshot.isLoading,
      login,
      logout,
      setUser,
    }),
    [snapshot, login, logout, setUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
