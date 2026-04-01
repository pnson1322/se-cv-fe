"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { loginWithEmail } from "../api/auth.api";
import { useAuth } from "./useAuth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { resolvePostLoginRoute } from "../lib/resolve-post-login-route";

type ApiErrorResponse = {
  success?: boolean;
  statusCode?: number;
  timestamp?: string;
  path?: string;
  message?:
    | string
    | {
        message?: string;
        error?: string;
        statusCode?: number;
      };
};

export function useLogin() {
  const router = useRouter();
  const auth = useAuth();

  const mutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) =>
      loginWithEmail(payload),

    onSuccess: async (response) => {
      const accessToken = response.data.access_token;
      const user = response.data.user;

      auth.login({
        accessToken,
        user,
      });

      try {
        const nextRoute = await resolvePostLoginRoute(user);
        toast.success(response.message || "Đăng nhập thành công");
        router.replace(nextRoute);
      } catch (error) {
        console.error("Resolve post-login route failed:", error);
        toast.error("Không thể xác định trang tiếp theo");
        router.replace("/login");
      }
    },

    onError: (error: AxiosError<ApiErrorResponse>) => {
      const responseData = error.response?.data;

      let message = "Đăng nhập thất bại, vui lòng thử lại";

      if (typeof responseData?.message === "string") {
        message = responseData.message;
      } else if (
        responseData?.message &&
        typeof responseData.message === "object"
      ) {
        message =
          responseData.message.message || responseData.message.error || message;
      }

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
