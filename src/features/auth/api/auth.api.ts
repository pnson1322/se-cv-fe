import { api } from "@/lib/axios";
import type {
  LoginPayload,
  LoginResponse,
  RefreshTokenResponse,
  RecruiterRegisterPayload,
  RecruiterRegisterResponse,
  GoogleCallbackResponse,
  AuthUser,
} from "../types/auth.types";

export type GetCurrentUserResponse = {
  success: boolean;
  message: string;
  data: AuthUser;
};

export async function loginWithEmail(payload: LoginPayload) {
  const res = await api.post<LoginResponse>("/auth/login", payload);
  return res.data;
}

export async function refreshAccessToken() {
  const res = await api.post<RefreshTokenResponse>("/auth/refresh");
  return res.data;
}

export async function registerRecruiterAccount(
  payload: RecruiterRegisterPayload,
) {
  const res = await api.post<RecruiterRegisterResponse>(
    "/auth/register",
    payload,
  );
  return res.data;
}

export function getGoogleAuthUrl() {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseURL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is missing in .env");
  }

  return `${baseURL}/auth/google`;
}

export async function getGoogleCallbackUrl(code: string) {
  const res = await api.get<GoogleCallbackResponse>("/auth/google/callback", {
    params: { code },
  });

  return res.data;
}

export async function getCurrentUser() {
  const res = await api.get<GetCurrentUserResponse>("/auth/me");
  return res.data;
}
