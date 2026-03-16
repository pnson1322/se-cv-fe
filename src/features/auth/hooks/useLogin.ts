"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "../api/auth.api";
import { useAuth } from "./useAuth";

export function useLogin() {
  const router = useRouter();
  const auth = useAuth();

  const mutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      loginWithEmail(payload),

    onSuccess: (data) => {
      auth.login({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      router.push("/dashboard");
    },

    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
