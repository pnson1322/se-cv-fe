import { api } from "@/lib/axios";
import type { LoginPayload, LoginResponse } from "../types/auth.types";

export async function loginWithEmail(payload: LoginPayload) {
  const res = await api.post<LoginResponse>("/auth/login", payload);
  return res.data;
}

export async function loginWithGoogle() {
  const res = await api.get("/auth/google");
  return res.data;
}
