"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "../api/auth.api";
import { useAuth } from "./useAuth";
import { toast } from "sonner";
import { AxiosError } from "axios";

type ApiErrorResponse = {
  success?: boolean;
  message?: string;
};

export function useLogin() {
  const router = useRouter();
  const auth = useAuth();

  const mutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      loginWithEmail(payload),

    onSuccess: (response) => {
      const accessToken = response.data.access_token;
      const user = response.data.user;

      auth.login({
        accessToken,
        user,
      });

      toast.success(response.message || "Đăng nhập thành công");

      router.push("/dashboard");
    },

    onError: (error: AxiosError<ApiErrorResponse>) => {
      const message =
        error?.response?.data?.message ||
        "Đăng nhập thất bại, vui lòng thử lại";

      toast.error(message);

      console.error("Login failed:", error);
    },
  });

  return {
    login: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
  };
}
