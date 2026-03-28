import { api } from "@/lib/axios";
import type {
  LoginPayload,
  LoginResponse,
  RefreshTokenResponse,
  RecruiterRegisterPayload,
  RecruiterRegisterResponse,
} from "../types/auth.types";

export async function loginWithEmail(payload: LoginPayload) {
  const res = await api.post<LoginResponse>("/auth/login", payload);
  return res.data;
}

export async function refreshAccessToken() {
  const res = await api.post<RefreshTokenResponse>("/auth/refresh");
  return res.data;
}

export async function loginWithGoogle() {
  const res = await api.get("/auth/google");
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
