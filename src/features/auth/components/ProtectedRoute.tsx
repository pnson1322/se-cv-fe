"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import type { Role } from "../constants/roles";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: Role[];
  redirectTo?: string;
};

export default function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = "/",
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();

  const userRole = user?.role;

  const isRoleAllowed =
    !allowedRoles || (userRole ? allowedRoles.includes(userRole) : false);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace(redirectTo);
      return;
    }

    if (allowedRoles && !isRoleAllowed) {
      router.replace("/unauthorized");
    }
  }, [
    isAuthenticated,
    isLoading,
    isRoleAllowed,
    allowedRoles,
    redirectTo,
    router,
  ]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-(--color-surface) px-6">
        <div className="rounded-2xl border border-(--color-border) bg-white px-6 py-4 shadow-md">
          <p className="text-(--color-text)">Đang kiểm tra đăng nhập...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles && !isRoleAllowed) {
    return null;
  }

  return <>{children}</>;
}
