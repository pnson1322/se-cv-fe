import type { AuthUser } from "../types/auth.types";

const ACCESS_TOKEN_KEY = "access_token";
const USER_KEY = "auth_user";

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

export function setAccessToken(token: string): void {
  getStorage()?.setItem(ACCESS_TOKEN_KEY, token);
}

export function getAccessToken(): string | null {
  return getStorage()?.getItem(ACCESS_TOKEN_KEY) ?? null;
}

export function removeAccessToken(): void {
  getStorage()?.removeItem(ACCESS_TOKEN_KEY);
}

export function setAuthUser(user: AuthUser): void {
  getStorage()?.setItem(USER_KEY, JSON.stringify(user));
}

export function getAuthUser(): AuthUser | null {
  const raw = getStorage()?.getItem(USER_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function removeAuthUser(): void {
  getStorage()?.removeItem(USER_KEY);
}

export function clearAuthStorage(): void {
  removeAccessToken();
  removeAuthUser();
}
