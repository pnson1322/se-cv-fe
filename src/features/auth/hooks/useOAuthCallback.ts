"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { setAccessToken } from "../lib/auth-storage";
import { useAuth } from "./useAuth";
import { getCurrentUser } from "../api/auth.api";
import { resolvePostLoginRoute } from "../lib/resolve-post-login-route";

export function useOAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    async function handleOAuthCallback() {
      try {
        if (!token) {
          toast.error("Không nhận được token từ Google");
          router.replace("/login/recruiter");
          return;
        }

        setAccessToken(token);

        const userRes = await getCurrentUser();
        const user = userRes.data;

        auth.login({
          accessToken: token,
          user,
        });

        toast.success("Đăng nhập Google thành công");

        const nextRoute = await resolvePostLoginRoute(user);
        router.replace(nextRoute);
      } catch (error) {
        console.error("OAuth callback failed:", error);
        toast.error("Đăng nhập Google thất bại");
        router.replace("/login/recruiter");
      }
    }

    handleOAuthCallback();
  }, [auth, router, searchParams]);
}
